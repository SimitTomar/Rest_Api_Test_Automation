const util = require('util');
const exec = util.promisify(require('child_process').exec);

// let {setDefaultTimeout} = require('cucumber');
// setDefaultTimeout(60 * 1000);

// const exec = require('child_process').exec;
const CUCUMBER_EXECUTABLE_PATH = `./node_modules/.bin/cucumber-js `;
const CUCUMBER_COMMAND = `tests_cucumber/features/**/*.feature`;
const COMPLETE_CLI_COMMAND = `${CUCUMBER_EXECUTABLE_PATH} ${CUCUMBER_COMMAND}`;


async function executeCLICommand() {
  const { stdout, stderr } = await exec(COMPLETE_CLI_COMMAND);
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
executeCLICommand();






