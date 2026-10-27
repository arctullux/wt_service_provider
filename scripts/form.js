const FIRST_NAME = document.getElementById("f_name");
const LAST_NAME = document.getElementById("l_name");
const EMAIL = document.getElementById("email");
const INQUIRY = document.getElementById("inquiry");
const FORM = document.getElementById("contact_form");
const FORM_LABEL = document.getElementById("form_label");

// Track whether a submission is currently in progress
let isSubmitting = false;

FORM.addEventListener('submit', async function(e) {
  // 1. If already submitting, stop right here to prevent duplicate requests
  console.log("Submitting form...");
  if (isSubmitting) {
    e.preventDefault();
    return;
  }

  let noTextError = false;

  if (FIRST_NAME.value === `` || FIRST_NAME.value == null ) {
    noTextError = true;
    FIRST_NAME.style.border = "2px solid red";
  } else {
    FIRST_NAME.style.border = "1px solid black";
  }

  if (LAST_NAME.value === `` || LAST_NAME.value == null ) {
    noTextError = true;
    LAST_NAME.style.border = "2px solid red";
  } else {
    LAST_NAME.style.border = "1px solid black";
  }

  if (EMAIL.value === `` || EMAIL.value == null) {
    noTextError = true;
    EMAIL.style.border = "2px solid red";
  } else {
    EMAIL.style.border = "1px solid black";
  }

  if (INQUIRY.value === `` || INQUIRY.value == null) {
    noTextError = true;
    INQUIRY.style.border = "2px solid red";
  } else {
    INQUIRY.style.border = "1px solid black";
  }

  if (noTextError) {
    FORM_LABEL.textContent = "All fields are required.";
    FORM_LABEL.style.color = "red";
  }

  e.preventDefault();

  // If there are validation errors, don't proceed with submission
  if (noTextError) {
    return;
  }

  // 2. Lock the submission flag so duplicate clicks are blocked
  isSubmitting = true;
  FORM_LABEL.textContent = "Submitting your message...";
  FORM_LABEL.style.color = "black";

  const FORM_DATA = new FormData(this);

  try {
    const RESPONSE = await fetch("https://formspree.io/f/xgaaawvg", {
      method: 'POST',
      body: FORM_DATA,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (RESPONSE.ok) {
      this.reset(); // Clears form after successful formspree submission
      FORM_LABEL.textContent = "Your form has been submitted successfully. Our team will reach out within a 24 hour period.";
      FORM_LABEL.style.color = "#6fe824";
      console.log("Submission complete.");
      // Reset borders back to normal
      FIRST_NAME.style.border = "1px solid black";
      LAST_NAME.style.border = "1px solid black";
      EMAIL.style.border = "1px solid black";
      INQUIRY.style.border = "1px solid black";
    } else {
      const DATA = await RESPONSE.json();
      if (DATA.hasOwnProperty('errors')) {
        FORM_LABEL.textContent = "Error: " + DATA.errors.map(error => error.message).join(", ");
      } else {
        FORM_LABEL.textContent = "Oops! There was a problem submitting your form. Please try again later.";
        console.log("Submission incomplete, inconclusive error.");
      }
      FORM_LABEL.style.color = "red";
    }
  } catch (error) {
    FORM_LABEL.textContent = "Network error. Please check your connection.";
    FORM_LABEL.style.color = "red";
    console.log("Submission incomplete. Possible network error.");
  } finally {
    // 3. Always unlock the submission flag when the request finishes (success or fail)
    isSubmitting = false;
  }
});
