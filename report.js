// const { removeSync } = require('fs-extra');
const reporter = require('cucumber-html-reporter');
const currentTime = new Date().toJSON().replace(/:/g, "-");

// removeSync('tests/reports/output/tmpJson/');

var options = {
    theme: 'bootstrap',
    jsonDir: 'tests_cucumber/reports/tmpJson/',
    output: `tests_cucumber/reports/html/report-${currentTime}.html`,
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    ignoreBadJsonFile: true
};

reporter.generate(options);
