const argv = require('yargs').argv;
const gulp = require('gulp');
const cucumber = require('cucumber');
const reporter = require('cucumber-html-reporter');

const htmlExecutionResultsFolder = 'tests/reports/html/';
const jsonExecutionResultsFolder = 'tests/reports/json/';

let featureFilePath = argv.ff ? `tests/features/**/${argv.ff}.feature` : `tests/features/**/*.feature`;
let runOptions = [];
let reportOptions = {
    theme: 'bootstrap',
    jsonDir: jsonExecutionResultsFolder,
    output: `${htmlExecutionResultsFolder}report.html`,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    ignoreBadJsonFile: true
};

try {
    runOptions.push('--format');
    runOptions.push(`json:${jsonExecutionResultsFolder}report.json`);

    if (argv.tags) {
        runOptions.push('--tags');
        runOptions.push(argv.tags);
    }

} catch (err) {
    throw new Error(err);
}

gulp.task('test', async () => {

    const cli = new cucumber.Cli({
        argv: ['node', 'cucumber-js'].concat(runOptions).concat(featureFilePath),
        cwd: process.cwd(),
        stdout: process.stdout,
    });

    await cli.run()
        .then(() => {
            reporter.generate(reportOptions);
        }).catch(err => {
            throw new Error(err);
        })
})