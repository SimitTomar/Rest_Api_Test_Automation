const util = require('util');
const exec = util.promisify(require('child_process').exec);
const argv = require('yargs').argv;


const CUCUMBER_EXECUTABLE_PATH = `./node_modules/.bin/cucumber-js`;
const CUCUMBER_COMMAND = argv.CUCUMBER_COMMAND;
console.log('CUCUMBER_COMMAND', CUCUMBER_COMMAND);
const COMPLETE_CLI_COMMAND = `${CUCUMBER_EXECUTABLE_PATH} ${CUCUMBER_COMMAND}`;


async function executeCliCommand() {
  const { stdout, stderr } = await exec(COMPLETE_CLI_COMMAND);
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
executeCliCommand();




// let {setDefaultTimeout} = require('cucumber');
// setDefaultTimeout(60 * 1000);