var _a;
(_a = document
    .getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    var _a, _b;
    event.preventDefault();
    // Type assertion
    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var contactElement = document.getElementById("contact");
    var educationElement = document.getElementById("education");
    var skillsElement = document.getElementById("skills");
    var workExperienceElement = document.getElementById("workExperience");
    var profilePictureInput = document.getElementById("profilePicture");
    var usernameElement = document.getElementById("username");
    if (!(usernameElement === null || usernameElement === void 0 ? void 0 : usernameElement.value) ||
        !(nameElement === null || nameElement === void 0 ? void 0 : nameElement.value) ||
        !(emailElement === null || emailElement === void 0 ? void 0 : emailElement.value) ||
        !(contactElement === null || contactElement === void 0 ? void 0 : contactElement.value) ||
        !((_a = profilePictureInput === null || profilePictureInput === void 0 ? void 0 : profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0]) ||
        !(educationElement === null || educationElement === void 0 ? void 0 : educationElement.value) ||
        !(skillsElement === null || skillsElement === void 0 ? void 0 : skillsElement.value) ||
        !(workExperienceElement === null || workExperienceElement === void 0 ? void 0 : workExperienceElement.value)) {
        alert("Please fill out all fields.");
    }
    else {
        var username = usernameElement.value;
        var resumeURL = "".concat(window.location.origin, "/").concat(username, "/resume");
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var contact = contactElement.value;
        var education = educationElement.value;
        var skills = skillsElement.value;
        var workExperience = workExperienceElement.value;
        var profilePictureFile = (_b = profilePictureInput.files) === null || _b === void 0 ? void 0 : _b[0];
        var profilePictureURL = profilePictureFile
            ? URL.createObjectURL(profilePictureFile)
            : "";
        var resumeOutput = "\n        <h2>Resume</h2>\n        <hr>\n\n        <h3>Personal Information</h3>\n        ".concat(profilePictureFile
            ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\">")
            : "", "\n        <p contenteditable=\"true\" id=\"editable-name\"><strong>Name:</strong> ").concat(name_1, "</p>\n        <p contenteditable=\"true\" id=\"editable-email\"><strong>Email:</strong> ").concat(email, "</p>\n        <p contenteditable=\"true\" id=\"editable-contact\"><strong>Contact:</strong> ").concat(contact, "</p>\n\n        <hr>\n        <h3>Education</h3>\n        <p contenteditable=\"true\" id=\"editable-education\">").concat(education, "</p>\n\n        <hr>\n        <h3>Skills</h3>\n        <p contenteditable=\"true\" id=\"editable-skills\">").concat(skills, "</p>\n\n        <hr>\n        <h3>Work Experience</h3>\n        <p contenteditable=\"true\" id=\"editable-work-experience\">").concat(workExperience, "</p>\n\n        <hr>\n\n        <p><strong>Resume URL:</strong> <a href=\"").concat(resumeURL, "\" target=\"_blank\">").concat(resumeURL, "</a></p>\n\n        <button class=\"submit\" id=\"downloadPDF\">Download PDF</button>\n      ");
        var resumeOutputElement = document.getElementById("resumeOutput");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            // Add event listeners to editable fields
            var editableFields = document.querySelectorAll("[contenteditable]");
            editableFields.forEach(function (field) {
                field.addEventListener("input", function (e) {
                    var target = e.target;
                    console.log("".concat(target.id, " updated to:"), target.textContent);
                });
            });
            // Add event listener for PDF download
            var downloadButton = document.getElementById("downloadPDF");
            if (downloadButton) {
                downloadButton.addEventListener("click", downloadResumeAsPDF);
            }
        }
        else {
            console.error("Element with id 'resumeOutput' not found.");
        }
    }
});
function downloadResumeAsPDF() {
    var resumeElement = document.getElementById("resumeOutput");
    if (resumeElement) {
        // Temporarily hide elements that should not be included in the PDF
        var buttons = document.querySelectorAll("button");
        buttons.forEach(function (button) { return (button.style.display = "none"); });
        // Trigger print, which allows the user to save the content as a PDF
        window.print();
        // Restore buttons after printing
        buttons.forEach(function (button) { return (button.style.display = "inline-block"); });
    }
}
