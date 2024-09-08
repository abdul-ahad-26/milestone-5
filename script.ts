document
  .getElementById("resumeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    // Type assertion
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const contactElement = document.getElementById("contact") as HTMLInputElement;
    const educationElement = document.getElementById("education") as HTMLInputElement;
    const skillsElement = document.getElementById("skills") as HTMLInputElement;
    const workExperienceElement = document.getElementById("workExperience") as HTMLInputElement;
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    const usernameElement = document.getElementById("username") as HTMLInputElement;

    if (
      !usernameElement?.value ||
      !nameElement?.value ||
      !emailElement?.value ||
      !contactElement?.value ||
      !profilePictureInput?.files?.[0] ||
      !educationElement?.value ||
      !skillsElement?.value ||
      !workExperienceElement?.value
    ) {
      alert("Please fill out all fields.");
    } else {
      const username = usernameElement.value;
      const resumeURL = `${window.location.origin}/${username}/resume`;

      const name = nameElement.value;
      const email = emailElement.value;
      const contact = contactElement.value;
      const education = educationElement.value;
      const skills = skillsElement.value;
      const workExperience = workExperienceElement.value;

      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile
        ? URL.createObjectURL(profilePictureFile)
        : "";

      const resumeOutput = `
        <h2>Resume</h2>
        <hr>

        <h3>Personal Information</h3>
        ${
          profilePictureFile
            ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">`
            : ""
        }
        <p contenteditable="true" id="editable-name"><strong>Name:</strong> ${name}</p>
        <p contenteditable="true" id="editable-email"><strong>Email:</strong> ${email}</p>
        <p contenteditable="true" id="editable-contact"><strong>Contact:</strong> ${contact}</p>

        <hr>
        <h3>Education</h3>
        <p contenteditable="true" id="editable-education">${education}</p>

        <hr>
        <h3>Skills</h3>
        <p contenteditable="true" id="editable-skills">${skills}</p>

        <hr>
        <h3>Work Experience</h3>
        <p contenteditable="true" id="editable-work-experience">${workExperience}</p>

        <hr>

        <p><strong>Resume URL:</strong> <a href="${resumeURL}" target="_blank">${resumeURL}</a></p>

        <button class="submit" id="downloadPDF">Download PDF</button>
      `;

      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;

        // Add event listeners to editable fields
        const editableFields = document.querySelectorAll("[contenteditable]");
        editableFields.forEach((field) => {
          field.addEventListener("input", (e: Event) => {
            const target = e.target as HTMLElement;
            console.log(`${target.id} updated to:`, target.textContent);
          });
        });

        // Add event listener for PDF download
        const downloadButton = document.getElementById("downloadPDF");
        if (downloadButton) {
          downloadButton.addEventListener("click", downloadResumeAsPDF);
        }
      } else {
        console.error("Element with id 'resumeOutput' not found.");
      }
    }
  });

function downloadResumeAsPDF() {
  const resumeElement = document.getElementById("resumeOutput");

  if (resumeElement) {
    // Temporarily hide elements that should not be included in the PDF
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => (button.style.display = "none"));

    // Trigger print, which allows the user to save the content as a PDF
    window.print();

    // Restore buttons after printing
    buttons.forEach((button) => (button.style.display = "inline-block"));
  }
}
