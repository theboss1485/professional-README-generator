const createMarkdownForREADME = require('./utils/generateMarkdown.js');
const licenses = require('./licenseInformation.js');

const inquirer = require('inquirer');

const fs = require('fs');

const questions = [

    /*0*/
    {
        type: 'input',
        name: 'title',
        message: 'To start, what is the title of your project?',
        default: 'My Project',
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
        name: 'contributing',
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
        default: 'MIT License',
    },
    /*7*/
    {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?',
        default: 'someone',
        validate: validateUsername
    },
    /*8*/
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
        default: 'someone@example.com',
        validate: validateEmail
    }
];

const rl = null;

// This function creates the README file using the markdown created in the init function.
function writeREADME(markdown){

    /* I decided to call the generated file generatedREADME.md because the actual README for this program
    is called README.md and thus calling the generated README, README.md, and then running the program would overwrite 
    this program's actual README that I wrote. */
    fs.writeFile("generatedREADME.md", markdown);

    //If the write to the file is unsuccessful, execution will be passed to the catch block, and this console.log() statement won't be executed. 
    console.log("The write to the file was successful.")
        
    
}

// This function is called to start the program, and is the main function of the app.
async function init() {

    console.log("Welcome to the Professional README Generator.  The program will ask you a series of questions and then generate a professional README based on your responses.");

    try{
        let responses = await askQuestions();
        let markdown = createMarkdownForREADME(responses);
        writeREADME(markdown);
    
    } catch(error){

        console.log(error.message)
    }

}

// This function asks the questions of the user after the program starts.
async function askQuestions(){

    var responses = await inquirer.prompt(questions);

    return responses;
}

// This function validates the responses that the user types in for most of the questions.
function validateInput(input){

    if(input.trim() === ''){
        
        return 'That was an invalid response.  Please try again.'
    }

    return true;
}

// This function validates the user's email.
function validateEmail(input){

    /*I took this regular expression from https://www.tutorialspoint.com/checking-for-valid-email-address-using-regular-expressions-in-java,
    and modified it as necessary.*/
    const pattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]+$/

    if(pattern.test(input) === true){

        return true;

    } else {

        return "That was an invalid response. Please try again and enter a valid email address."
    }
}

// This function validates the user's GitHub username.
function validateUsername(input){

    /* I used regex101.com, a tutorial found at https://masteringjs.io/tutorials/fundamentals/regex-not-starting-with#:~:
    text=Make%20sure%20your%20regular%20expression,the%20start%20of%20the%20string.&text=Another%20approach%20is%20to%20use,the%20set%20negates%20the%20set., and 
    the Xpert Learning assistant AI to help write this regular expression. */
    const pattern = /^(?!-)(?!.*--)(?:[a-zA-Z0-9-]{0,39})[^-]$/

    if(pattern.test(input) === true){

        return true;

    } else {

        return "That was an invalid response.  GitHub Usernames must contain only alphanumeric characters and dashes," +
        "must not contain more than one dash in a row, must not begin or end with dashes, and must have no more than 39 characters.  Please try again."
    }
}

// This is the function call to initialize the application.
init();


