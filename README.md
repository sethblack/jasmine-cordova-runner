jasmine-cordova-runner
======================

Are you a crazy person who likes to develop Apache Cordova plugins that can only be tested
on real devices (like, say Bluetooth plugins written in C)? Do you also exclusively
test your code in Jasmine? Fantastic! This plugin may be just the thing you're looking
for.

# Install

```shell
$ npm install -g jascorun
```

# Usage

You'll need to have a mostly intact Apache Cordova plugin with a functioning jasmine directory.
Then all you need to do is plug in a phone of your choosing and run

```shell
$ jascorun android
```

or even

```shell
$ jascorun ios
```

This should create a cordova_test_app directory inside your plugin's directory and run the app
on your phone. You may want to add cordova_test_app to your local .gitignore to keep your repo
clean.

# SpecRunners

Because Cordova injects plugins after the DOM has loaded you'll need to wrap your specs with
a 'deviceready' listener.

# Debugging

Hahaha! It's in Javascript. Good luck!