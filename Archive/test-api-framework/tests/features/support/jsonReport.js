const fs = require('fs-extra');
const Cucumber = require('cucumber');
const reporter = require('cucumber-html-reporter');
const JsonFormatter = Cucumber.Listener.JsonFormatter();


module.exports = function JsonOutputHook() {
    let currenttime = new Date().toJSON().replace(/:/g, "-");

    let AbsreportPath = 'tests/reports/output/json/testExecutionReport'+ '-' +currenttime+'.json';
    let htmlReportPath = 'tests/reports/output/html/testExecutionReport'+ '-' +currenttime+'.html';

    JsonFormatter.log = function (json) {
        fs.writeFileSync(AbsreportPath, json, null, 2);
        console.log('Run Complete: json report file location: ' + AbsreportPath);


        let options = {
            theme: 'bootstrap',
            jsonFile: AbsreportPath,
            output: htmlReportPath,
            launchReport: true
        };


        reporter.generate(options);


    };
    this.registerListener(JsonFormatter);
};
