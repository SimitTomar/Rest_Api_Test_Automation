# Topic: Creating your First Automation Script with Axios & Cucumber


## Subtopic: First Post Scenario


* Now that we have all the Setup ready lets get started with the intresting bit:
Coding our first scenario

### Overview of Scenario through Postman: 

- In this scenario we'll use the employees API that we covered in the last chapter to add the employee to the database/our records.
- Pick up the employees endpoint from the Restpanda site (already opened in the browser) and paste it in a new tab in Postman (already opened), Add one liner that Postman is a simple tool for interacting with HTTP APIs.
- Select the POST Method, add the body (Copy it from RestPanda Site), keep the Headers as default and execute the scenario
- Once, the scenario is executed, say that the API responds with 200 Status Code and this Response

### Open VSCode and navigate to the Terminal Tab

### Type npm init in the CLI and say that it's used to create a package.json file

### Fill all the relevant fields and talk about them briefly as you fill/skip them

### Once the Package.json is created 

* open the file and glance through various fields and tell that this file will contain the information pertaining to your dependencies used by your project and other metadata (like Project's name, author etc.)

Having dependencies in your project's package.json allows the project to install the versions of the modules it depends on. By running an install command (see the instructions for npm install below) inside of a project, you can install all of the dependencies that are listed in the project's package.json - meaning they don't have to be (and almost never should be) bundled with the project itself.

Second, it allows the separation of dependencies that are needed for production and dependencies that are needed for development. Since, we'll need the modules for testing, we can put them in dev-dependencies
Reference [package.json] link

### Create Folder Structure required for the first Scenario

* Add the below folders through VSCode's Folder icon
tests
tests-features-feature files
tests-features-step-definitions
.vscode


### Add employees.feature file 

(talk a bit about structure..Say, one feature file for one feature or one api in case of microservices) and tell that .feature will be the extension for cucumber

### Paste the Feature file from a word doc and explain the following:
- Cucumber (Nodejs module for BDD, Gherkin Language)
- Various keyword (Feature, Scenario, Given, When, Then, Examples and Background)

### Add Cucumber Plugin for VSCode and reload

### Hover over the steps and tell that the steps are undefined

### Explain that this is just plain english but we need nodejs code for the m/c to understand. 

### Install Cucumber through npm install cucumber --save-dev command, cover the following aspecs:
- npm install command
- Shorthand command - npm i command
- Versioning system in package.json (major, minor, patch)
- npm install moduleName command
- npm install moduleName --save-dev command
- npm module moduleName@version command
- npm module moduleName@latest command
- Global vs Local installation

### High level walkthrough of node_modules folder

### Run the Feature file through Cli and show the logs, explain why that is hapenning

### Create employees.steps.js (to cater to employees.feature. Tell that its a best practise to add **steps** in the name)


### [Require] Cucumber in employees.steps.js

### Explain about const & let

Explain that require is an inbuilt function of nodejs used to include modules that exist in separate files.  The basic functionality of require is that it reads a JavaScript file, executes the file, and then proceeds to return the exports object

### Now, Paste the signatures corresponding to the steps.

### Run again, the steps will pass, but tell that the API itself is not getting tested as of now

----------------------Video 2-----------------------------

### Introduce Axios at this point (Famous HTTP client for node.js with 8-9m weekly downloads, we'll use it to perform various CRUD operations and other stuff)

### Install Axios through np i axios --save-dev

### Require Axios in employees.steps.js

### Copy Post Body from RestPanda and explain about **request options**

### Explain a bit about the below in the second step:
* async/await
* axios function
* then function

### Explain a bit about Chai/Nodejs Assertion

### Run only once all 3 are automated

### Change name in the Feature File to fail the scenario

### Rerun scripts and show failure


[package.json]: 'https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/'
[Requre]: 'https://nodejs.org/en/knowledge/getting-started/what-is-require/'