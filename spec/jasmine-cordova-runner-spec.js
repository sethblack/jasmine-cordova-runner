var jcr = require("../index");

describe('jasmine-cordova-runner', function() {
    it('should be able to determine if cordova is installed', function() {
        expect(jcr.cordovaExec).toBeDefined();
    });

    it('should be able to successfully run a cordova command', function() {
        expect(jcr.cordovaExec).toBeDefined();
        expect(jcr.cordovaExec(['--version'])).not.toBe(null);
    });
});
