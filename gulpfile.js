const gulp = require('gulp'),
    cucumber = require('cucumber'),
    reporter = require('cucumber-html-reporter'),
    argv = require('yargs').argv,
    htmlExecutionResultsFolder = 'tests_cucumber/reports/html/',
    jsonExecutionResultsFolder = 'tests_cucumber/reports/json/';

process.env.ff = (argv.ff) ? argv.ff : process.env.ff;
let featureFilePath = process.env.ff == 'undefined' ? `tests_cucumber/features/**/*.feature` : `tests_cucumber/features/**/${argv.ff}.feature`;

process.env.tags = (argv.tags) ? argv.tags : process.env.tags;
let tags = process.env.tags == 'undefined' ? '' : argv.tags;

let reportOptions = {
    theme: 'bootstrap',
    jsonDir: jsonExecutionResultsFolder,
    output: `${htmlExecutionResultsFolder}report.html`,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    ignoreBadJsonFile: true
};

let runOptions = [];

runOptions.push('--format');
runOptions.push(`json:${jsonExecutionResultsFolder}report.json`);

if (tags != '') {
    runOptions.push('--tags');
    runOptions.push(tags);
}

gulp.task('test', () => {
    const cli = new cucumber.Cli({
        argv: ['node', 'cucumber-js'].concat(runOptions).concat(featureFilePath),
        cwd: process.cwd(),
        stdout: process.stdout,
    });

    return new Promise((resolve, reject) => {
        cli.run()
            .then(data => {
                reporter.generate(reportOptions);
                resolve();
            }).catch(err => {
                reject(err);
            });        
    });
})