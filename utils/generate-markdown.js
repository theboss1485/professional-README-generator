
// I put the function to generate the badge down with the rest of the license functions.
let badge = null;

// Here, I pull in the file with the licenses information.
const licenses = require('../license-information');

//This function generates the markdown of the README based on the responses the user gave.
function createMarkdownForREADME(responses) {

    let markdown = ""

    let title = `# ${responses.title}\n\n`;

    const description = `## Description \n\n ${responses.description}\n\n` ;

    /* I considered putting the table of contents at the top of the README, instead of after the description.  However,
    the acceptance criteria had the sections listed in the order Description, Table of Contents, etc.  I decided to put the description section 
    inside the table of contents because it seemed more complete to me this way.  I didn't put the table of contents inside itself
    because if you are using the table of contents, you are already at the table of contents. */
    const tableOfContents = "## Table of Contents \n\n\ " + 
    "- [Description](#description) \n\ " + 
    "- [Installation](#installation) \n\ " + 
    "- [Usage](#usage) \n\ " +
    "- [License](#license) \n\ " + 
    "- [Contributing](#contributing) \n\ " + 
    "- [Tests](#tests) \n\ " + 
    "- [Questions](#questions) \n\n" 
    
    const installation = `## Installation \n\n ${responses.installation}\n\n`;

    const usage = `## Usage \n\n ${responses.usage}\n\n`;

    let license = "";

    let licenseSection = "";

    /* The renderLicenseSection() method returns an empty string if the project isn't under a license, since one of the TODO 
    comments in this file said it should.  However, if the project isn't under a license, the license section will say so,
    rather than just being blank.*/
    license = renderLicenseSection(responses.license);

    if(license === ""){

        licenseSection = "## License \n\n" + "This project isn't under a license. \n\n"
    
    } else {

        licenseSection = "## License \n\n" + license + `\n\n` ;
    }

    title += badge + "\n\n";

    const contributing = `## Contributing \n\n ${responses.contributing}\n\n`;
    
    const tests = `## Tests \n\n ${responses.tests}\n\n`;

    const username = responses.username;

    const email = responses.email;

    /* Since the acceptance criteria didn't ask for other ways to reach the author besides the email address (such as FaceBook or LinkedIn),
    I didn't add them.  The user would have needed to have been asked for a FaceBook or LinkedIn link in addition to what was already asked for.*/
    const questions = `# Questions \n\n` + `Q. What is your GitHub username?\n\n` + 
    `A. My Github username is **${username}**. The link to my GitHub profile is: [https://github.com/${username}](https://github.com/${username})  \n\n` + 
    `Q. How should I reach you with additional questions?\n\nA. My email address is ${email}.  Please email me there with additional questions and I will respond to you at my earliest convenience.`

    markdown = title + description + tableOfContents + installation + usage + licenseSection + contributing + tests + questions;

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

        if(licenseInQuestion.name === "No License"){
            
            badge = "";

        } else {

            badge = "![" + licenseInQuestion.alternateText + "](" + licenseInQuestion.badgeLink + ")"
        }
        
        return badge;
    }

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

    /* This function generates the text of the license section and combines it with the link to the license, and the license badge in order 
    to  make the full license section, minus the heading.  If the project isn't under a license, the function returns an empty string.*/
    function renderLicenseSection(license) {
    
        var licenseInQuestion = findLicense(license)

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


