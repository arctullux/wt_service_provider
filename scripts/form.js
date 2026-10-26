const FIRST_NAME = document.getElementById("f_name");
const LAST_NAME = document.getElementById("l_name");
const EMAIL = document.getElementById("email");
const INQUIRY = document.getElementById("inquiry");
const FORM = document.getElementById("contact_form");
const FORM_LABEL = document.getElementById("form_label");

// TODO: Add an else clause to all if statements, catching future successful events.
FORM.addEventListener('submit', (e) => {
  let noTextError = false;
  if (FIRST_NAME.value === `` || FIRST_NAME.value == null ) {
    if (!noTextError) {
      noTextError = true;
    }
    FIRST_NAME.style.border = "2px solid red";
  }

  if (LAST_NAME.value === `` || LAST_NAME.value == null ) {
    if (!noTextError) {
      noTextError = true;
    }
    LAST_NAME.style.border = "2px solid red";
  }

  if (EMAIL.value === `` || EMAIL.value == null) {
    if (!noTextError) {
      noTextError = true;
    }
    EMAIL.style.border = "2px solid red";
  }

  if (INQUIRY.value === `` || INQUIRY.value == null) {
    if (!noTextError) {
      noTextError = true;
    }
    INQUIRY.style.border = "2px solid red";
  }
  if (noTextError) {
    FORM_LABEL.textContent = "All fields are required.";
  }
})





