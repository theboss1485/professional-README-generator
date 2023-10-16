// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string

const licenses = require('../licenseInformation.js');





// TODO: Create a function to generate markdown for README
function createMarkdownForREADME(responses) {

    let markdown = ""

    const title = `## ${responses[0][1]} \n\n`;

    const description = `# Description \n\n ${responses[1][1]}\n\n` ;

    const tableOfContents = "# Table of Contents \n\n\ " + 
    "- [Installation](#installation) \n\ " + 
    "- [Usage](#usage) \n\ " +
    "- [License](#license) \n\ " + 
    "- [Contributing](#contributing) \n\ " + 
    "- [Tests](#tests) \n\ " + 
    "- [Questions](#questions) \n\n" 
    

    

    const installation = `# Installation \n\n ${responses[2][1]}\n\n`;

    const usage = `# Usage \n\n ${responses[3][1]}\n\n`;

    const license = "# License \n\n" + renderLicenseSection(responses[6][1]) + `\n\n` ;

    const contributing = `# Contributing \n\n ${responses[4][1]}\n\n`;
    
    const tests = `# Tests \n\n ${responses[5][1]}\n\n`;

    const username = responses[7][1];

    const email = responses[8][1];

    const questions = `# Questions \n\n` + `Q. What is my GitHub username?\n` + 
    `A. My Github username is ${username} The link to my GitHub profile is [https://github.com/${username}](https://github.com/${username}) \n\n` + 
    `Q. How should I reach you with additional questions?\nA. My email address is ${email}.  Email me there and I will respond to you at my earliest convenience.`+
    `You can also reach out to me on FaceBook or LinkedIn.`

    markdown = title + description + tableOfContents + installation + usage + license + contributing + tests + questions;
    console.log(markdown);

    return markdown;
  
    function findLicense(licenseName){
    

        var licenseInQuestion = licenses.filter(license => {
            

            return license.name === licenseName;
        });
    
        return licenseInQuestion[0];
    }
    
    function renderLicenseBadge(licenseInQuestion) {
        
        var badge = "![" + licenseInQuestion.alternateText + "](" + licenseInQuestion.badgeLink + ")"
        return badge;
    }
    
    // TODO: Create a function that returns the license link
    // If there is no license, return an empty string
    function renderLicenseLink(licenseInQuestion) {
    
        var licenseLink = "[" + licenseInQuestion.name + "](" + licenseInQuestion.actualLicenseLink + ")"
        return licenseLink;
    }
    
    // TODO: Create a function that returns the license section of README
    // If there is no license, return an empty string
    function renderLicenseSection(license) {
    
        var licenseInQuestion = findLicense(license)
        var licenseSection = "This project is under the " + renderLicenseLink(licenseInQuestion) + " " + renderLicenseBadge(licenseInQuestion) + ". " + "\
        Please see the license in the repository for more information." 
        return licenseSection;
    }
}

module.exports = createMarkdownForREADME;


