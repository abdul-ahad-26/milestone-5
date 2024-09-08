document
  .getElementById("resumeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    // Type assertion for input elements
    const usernameElement = document.getElementById("username") as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const contactElement = document.getElementById("contact") as HTMLInputElement;
    const educationElement = document.getElementById("education") as HTMLInputElement;
    const skillsElement = document.getElementById("skills") as HTMLInputElement;
    const workExperienceElement = document.getElementById("workExperience") as HTMLInputElement;

    if (
      !usernameElement.value ||
      !nameElement.value ||
      !emailElement.value ||
      !contactElement.value ||
      !educationElement.value ||
      !skillsElement.value ||
      !workExperienceElement.value
    ) {
      alert("Please fill out all fields.");
    } else {
      const username = usernameElement.value;
      const resumeURL = `${window.location.origin}/${username}/resume`;  // Example: username.vercel.app/resume

      const resumeOutput = `
        <h2>Resume</h2>
        <hr>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> ${nameElement.value}</p>
        <p><strong>Email:</strong> ${emailElement.value}</p>
        <p><strong>Contact:</strong> ${contactElement.value}</p>
        <hr>
        <h3>Education</h3>
        <p>${educationElement.value}</p>
        <hr>
        <h3>Skills</h3>
        <p>${skillsElement.value}</p>
        <hr>
        <h3>Work Experience</h3>
        <p>${workExperienceElement.value}</p>
        <hr>
        <p><strong>Resume URL:</strong> <a href="${resumeURL}" target="_blank">${resumeURL}</a></p>
        <button id="downloadPDF">Download PDF</button>
      `;
      
      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
      }

      // Add event listener for PDF download
      const downloadButton = document.getElementById("downloadPDF");
      if (downloadButton) {
        downloadButton.addEventListener("click", downloadResumeAsPDF);
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
  