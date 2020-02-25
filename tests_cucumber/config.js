// const util = require('util');
// const exec = util.promisify(require('child_process').exec);
const argv = require('yargs').argv;
const exec = require('child_process').exec;


const CUCUMBER_EXECUTABLE_PATH = `./node_modules/.bin/cucumber-js`;
const CUCUMBER_COMMAND = argv.CUCUMBER_COMMAND;
const COMPLETE_CLI_COMMAND = `${CUCUMBER_EXECUTABLE_PATH} ${CUCUMBER_COMMAND}`;
console.log('COMPLETE_CLI_COMMAND', COMPLETE_CLI_COMMAND);


// async function executeCliCommand() {
//   const { stdout, stderr } = await exec(COMPLETE_CLI_COMMAND);
//   console.log('stdout:', stdout);
//   console.error('stderr:', stderr);
// }
// executeCliCommand();


exec(COMPLETE_CLI_COMMAND, [{ env : { FORCE_COLOR: true }}], (error, stdout, stderr) => {

  console.error(`exec error: ${error}`);
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
  return;
});

// let {setDefaultTimeout} = require('cucumber');
// setDefaultTimeout(60 * 1000);