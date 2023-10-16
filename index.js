// TODO: Include packages needed for this application

const createMarkdownForREADME = require('./utils/generateMarkdown.js');
const licenses = require('./licenseInformation.js');

const inquirer = require('inquirer');

const fs = require('fs');

// TODO: Create an array of questions for user input
const questions = [

    /*0*/
    {
        type: 'input',
        name: 'title',
        message: 'To start, what is the title of your project?',
        validate: validateInput
    },
    /*1*/
    {
        type: 'input',
        name: 'description',
        message: 'What is the description of your project?',
        default: 'This is my project, created using JavaScript.',
        validate: validateInput
        
    },
    /*2*/
    {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions for your project?',
        default: 'N/A',
        validate: validateInput
        
    },
    /*3*/
    {
        type: 'input',
        name: 'usage',
        message: 'How does a user use your project?',
        default: 'Click the link in the README, and read the information on the project page.',
        validate: validateInput
    },
    /*4*/
    {
        type: 'input',
        name: 'contribution',
        message: 'How does a user contribute to your project?',
        default: 'N/A',
        validate: validateInput
    },
    /*5*/
    {
        type: 'input',
        name: 'tests',
        message: 'What tests can a user run to make sure the application is working properly?',
        default: 'N/A',
        validate: validateInput
    },
    /*6*/
    {
        type: 'list',
        name: 'license',
        message: 'What license should your project have?  Please select a license from the list of options:',
        choices: licenses.map(license => license.name),
        default: '',
    },
    /*7*/
    {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?',
        default: 'N/A',
        validate: validateUsername
    },
    /*8*/
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
        default: 'N/A',
        validate: validateEmail
    }
];

const rl = null;

// TODO: Create a function to write README file

// TODO: Create a function to initialize app
async function init() {

    console.log("Welcome to the Professional README Generator.  The program will ask you a series of questions and then generate a professional README based on your responses.");

    // rl = readline.createInterface({

    //     input: process.stdin,
    //     output: process.stdout

    // });

    let responses = await askQuestions();
    let markdown = createMarkdownForREADME(responses);
    fs.writeFile('README.md', markdown, function(error){

        if(error){

            console.log(error);
        }
    });
}

async function askQuestions(){

    var responses = await inquirer.prompt(questions);

    console.log("Responses", responses);

    return Object.entries(responses);

}

function validateInput(input){

    if(input.trim() === ''){
        return 'That was an invalid response.  Please try again.'
    }

    return true;
}

function validateEmail(input){

    //I took this regular expression from https://www.tutorialspoint.com/checking-for-valid-email-address-using-regular-expressions-in-java
    const pattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

    if(pattern.test(input) === true){

        return true;

    } else {

        return "That was an invalid response. Please try again and enter a valid email address."
    }

}

function validateUsername(input){

    /* I useed regex101.com, a tutorial found at https://masteringjs.io/tutorials/fundamentals/regex-not-starting-with#:~:
    text=Make%20sure%20your%20regular%20expression,the%20start%20of%20the%20string.&text=Another%20approach%20is%20to%20use,the%20set%20negates%20the%20set., and 
    the Xpert Learning assistant AI to help write this regular expression. */

    const pattern = /^[^-](?!.*--)[a-zA-Z0-9-]{1,39}[^-]$/

    if(pattern.test(input) === true){

        return true;

    } else {

        return "That was an invalid response.  GitHub Usernames must contain only alphanumeric characters and dashes, \
        must not contain more than one dash in a row, must not begin or end with dashes, and must have no more than 39 characters.  Please try again."
    }

}

// Function call to initialize app
init();


