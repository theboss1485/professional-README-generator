// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string

// Here, I pull in the file with the licenses information.
const licenses = require('../licenseInformation.js');





// TODO: Create a function to generate markdown for README

//This function generates the markdown of the README based on the responses the user gave.
function createMarkdownForREADME(responses) {

    let markdown = ""

    const title = `# ${responses[0][1]} \n\n`;

    const description = `## Description \n\n ${responses[1][1]}\n\n` ;

    /* I considered putting the table of contents at the top of the README, instead of after the description.  However,
    the acceptance criteria had the sections listed in the order Description, Table of Contents, etc.  I decided to put the description section 
    and the title inside the table of contents because it seemed more complete to me this way.  I didn't put the table of contents inside itself
    because if you are using the table of contents, you are already at the table of contents.*/
    const tableOfContents = "## Table of Contents \n\n\ " + 
    "- [" + responses[0][1] + "](#"+ responses[0][1] + ")\n\ " +
    "- [Description](#description) \n\ " + 
    "- [Installation](#installation) \n\ " + 
    "- [Usage](#usage) \n\ " +
    "- [License](#license) \n\ " + 
    "- [Contributing](#contributing) \n\ " + 
    "- [Tests](#tests) \n\ " + 
    "- [Questions](#questions) \n\n" 
    

    

    const installation = `## Installation \n\n ${responses[2][1]}\n\n`;

    const usage = `## Usage \n\n ${responses[3][1]}\n\n`;

    let license = "";

    let licenseSection = "";

    /* The renderLicenseSection method returns an empty string if the project isn't under a license, since one of the TODO 
    comments in this file said it should.  However, if the project isn't under a license, the license section will say so,
    rather than just being blank.*/
    license = renderLicenseSection(responses[6][1]);
    console.log("License23", license);

    if(license === ""){

        licenseSection = "## License \n\n" + "This project isn't under a license. \n\n"
    
    } else {

        licenseSection = "## License \n\n" + license + `\n\n` ;
    }
    

    const contributing = `## Contributing \n\n ${responses[4][1]}\n\n`;
    
    const tests = `## Tests \n\n ${responses[5][1]}\n\n`;

    const username = responses[7][1];

    const email = responses[8][1];

    const questions = `# Questions \n\n` + `Q. What is my GitHub username?\n` + 
    `A. My Github username is ${username} The link to my GitHub profile is [https://github.com/${username}](https://github.com/${username}) \n\n` + 
    `Q. How should I reach you with additional questions?\nA. My email address is ${email}.  Email me there and I will respond to you at my earliest convenience.`+
    `You can also reach out to me on FaceBook or LinkedIn.`

    markdown = title + description + tableOfContents + installation + usage + licenseSection + contributing + tests + questions;
    console.log(markdown);

    return markdown;

    // This function finds the license from the list of licenses, when the function is provided with the user's response.
    function findLicense(licenseName){
        
        var licenseInQuestion = "";

        if(licenseName === ""){

            licenseName = "No License"
        }
            
        licenseInQuestion = licenses.filter(license => {

            return license.name === licenseName;
        });
    
        return licenseInQuestion[0];
    }
    
    // This function puts together the badge of the license based on what type of license the user chose.
    function renderLicenseBadge(licenseInQuestion) {

        var badge = null;

        if(licenseInQuestion.name === "No License"){
            
            badge = "";

        } else {

            badge = "![" + licenseInQuestion.alternateText + "](" + licenseInQuestion.badgeLink + ")"
        }
        
        return badge;
    }
    
    // TODO: Create a function that returns the license link
    // If there is no license, return an empty string

    /* This function generates the link to the license that the user chose.  If the project isn't under
    a license, the function returns an empty string.*/
    function renderLicenseLink(licenseInQuestion) {

        var licenseLink = null;

        if(licenseInQuestion.name === "No License"){

            licenseLink = "";
        
        } else {

            licenseLink = "[" + licenseInQuestion.name + "](" + licenseInQuestion.actualLicenseLink + ")";
        } 

        return licenseLink;
    }
    
    // TODO: Create a function that returns the license section of README
    // If there is no license, return an empty string

    /* This function generates the text of the license section and combines it with the link to the license, and the license badge in order 
    to  make the full license section, minus the heading.  If the project isn't under a license, the function returns an empty string.*/
    function renderLicenseSection(license) {
    
        var licenseInQuestion = findLicense(license)

        console.log("License", licenseInQuestion)

        if(licenseInQuestion.name === "No License"){

            return "";
        
        } else {

            var licenseSection = "This project is under the " + renderLicenseLink(licenseInQuestion) + " " + renderLicenseBadge(licenseInQuestion) + ". " +
            "Please see the license in the repository for more information." 
            return licenseSection;
        }
       
    }
}

module.exports = createMarkdownForREADME;


