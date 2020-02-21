'use strict';

const path = require('path'),
    gulp = require('gulp'),
    fs = require('fs'),
    findRemoveSync = require('find-remove'),
    fs_extra = require('fs-extra'),
    through = require('through2'),
    dargs = require('dargs'),
    gutil = require('gulp-util'),
    spawn = require('child_process').spawn,
    deepmerge = require('deepmerge'),
    argv = require('yargs').argv,
    exec = require('child_process').exec,
    runSequence = require('run-sequence');

const isWin = /^win/.test(process.platform);
const cmd = isWin ? 'wdio.cmd' : 'wdio';
let seleniumServer;


let webdriver = module.exports = function(options) {
    return through.obj(function(file, enc, done) {
        let tags = ['~@unit'];
        let config = require(file.history[0]).config;
        config.cucumberOpts = config.cucumberOpts || {};

        if(argv.tags) {
            tags = tags.concat(argv.tags.split(','));
        }

        if (config.defaultTags) {
            tags = tags.concat(config.defaultTags);
        }

        config.cucumberOpts.tags = tags;

        let jsString = [];
        jsString.push('exports.config=');
        jsString.push(JSON.stringify(config));

        let currenttime = new Date().toJSON().replace(/:/g, "-");
        let tmpFile = path.resolve(__dirname, 'cuke-'+currenttime+'.tmp');
        fs.writeFileSync(tmpFile, jsString.join(''));

        let stream = this,
            configFile = tmpFile,
            isWin = /^win/.test(process.platform),
            wdioBin = path.join(__dirname, 'node_modules', '.bin', isWin ? 'wdio.cmd' : 'wdio');

        let opts = deepmerge({
            wdioBin: wdioBin
        }, options || {});

        /**
         * check webdriverio dependency
         */
        if (!fs.existsSync(opts.wdioBin)) {
            return this.emit('error', new gutil.PluginError('gulp-webdriver', 'Haven\'t found the WebdriverIO test runner', {
                showStack: false
            }));
        }

        let args = process.execArgv.concat([configFile]).concat(dargs(opts, {
            excludes: ['wdioBin'],
            keepCamelCase: true
        }));

        gutil.log('spawn wdio with these attributes:\n', args.join('\n'));
        let wdio = spawn(opts.wdioBin, args, {
            stdio: 'inherit'
        });

        wdio.on('exit', function(code) {
            gutil.log('wdio testrunner finished with exit code', code);
            console.log("Deleting tmp cuke file");
            fs.unlinkSync(tmpFile);
            done();
            done = null;
        });

        return stream;
    });
};

gulp.task('run-api', () => {
    return gulp.src('tests/conf/local.conf.js').pipe(webdriver({
        wdioBin: path.join(__dirname, 'node_modules', '.bin', cmd)
    }));
});

gulp.task('run-wdio', (cb) => {
    return runSequence('start-selenium-and-wdio', 'stop-selenium', cb);
});

gulp.task('start-selenium-and-wdio', () => {
    const Chromeexecutable = isWin ? './node_modules/chromedriver/lib/chromedriver/chromedriver.exe' : 'node_modules/chromedriver/bin/chromedriver';
    const command = 'java -jar ./node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.53.1.jar -log ../seleniumLog.txt -Dwebdriver.chrome.driver=' + path.resolve(__dirname, Chromeexecutable);

    console.log('Starting Selenium Server');
    seleniumServer = exec(command, function() {
        seleniumServer = null;
    });
    return gulp.src('tests/conf/local.conf.js').pipe(webdriver({

        wdioBin: path.join(__dirname, 'node_modules', '.bin', cmd)

    }));
});

gulp.task('stop-selenium', (cb) => {

    if (seleniumServer) {
        process.kill(seleniumServer.pid, 'SIGINT');
    }
    cb();
    process.exit(0);

});

gulp.task('remove-samples', () => {
    findRemoveSync('tests/', {prefix: 'sample'});
    fs_extra.remove('find-customer-details-api');
    fs_extra.remove('mock-server');
});
