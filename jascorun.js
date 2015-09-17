#! /usr/bin/env node

/**
 * jasmine-cordova-runner
 * index.js
 * copyright 2015 Seth Black
 */

var shell = require('shelljs');
var xml2js = require('xml2js');
var fs = require('fs');

var JCR_HOME = __dirname;
var PWD = shell.pwd();
var APP_DIR = PWD + '/cordova_test_app';

var jasmineCordovaRunner = {
    cordovaExec: function(args) {
        if (Object.prototype.toString.call(args) !== '[object Array]') {
            throw new Error('cordovaExec expects an array');
        }

        var childProcess = shell.exec('cordova ' + args.join(' '), {async:false, silent:false});
    },
    run: function() {
        if (!shell.which('cordova')) {
            console.error('jasmine-cordova-runner requires cordova.');
        }

        if (!shell.test('-d', PWD + '/jasmine')) {
            console.error('This does not seem to be a project with jasmine tests.');
            return;
        }

        if (process.argv.length < 3) {
            console.log('Please let me know which cordova platform you want me to test on.');
            return;
        }

        var platform = process.argv[2];

        if (platform === 'clean') {
            this.clean();
            return;
        }

        this.createProject();
        this.buildProject(platform);
    },
    createProject: function() {
        if (shell.test('-d', APP_DIR)) {
            return;
        }
        shell.cp('-Rf', JCR_HOME + '/cordova_template/', APP_DIR);
    },
    buildProject: function(platform) {
        shell.cd(APP_DIR);

        this.cordovaExec(['platform', 'rm', platform]);

        this.cordovaExec(['plugin', 'add', 'cordova-plugin-console']);

        if (shell.test('-e', PWD + '/plugin.xml')) {
            this.addPluginManually();
        }

        shell.cp('-Rf', PWD + '/jasmine/', APP_DIR + '/www/');

        this.cordovaExec(['platform', 'add', platform]);
        this.cordovaExec(['run', platform]);

        shell.cd(PWD);
    },
    addPluginManually: function() {
        var parser = new xml2js.Parser();

        fs.readFile(PWD + '/plugin.xml', function(err, data) {
            parser.parseString(data, function (err, result) {
                var pluginID = result.plugin.$.id;

                console.log('Adding plugin ' + pluginID);

                var pluginDir = APP_DIR + '/plugins/' + pluginID;

                if (shell.test('-d', pluginDir)) {
                    shell.rm('-rf', pluginDir);
                }

                shell.mkdir(pluginDir);

                shell.cp(PWD + '/plugin.xml', pluginDir);
                shell.cp(PWD + '/package.json', pluginDir);
                shell.cp('-Rf', [PWD + '/scripts', PWD + '/src', PWD + '/www'], pluginDir);
            });
        });
    },
    clean: function() {
        if (shell.test('-d', PWD + '/cordova_test_app')) {
            shell.rm('-rf', PWD + '/cordova_test_app');
        }
    }
}

jasmineCordovaRunner.run();