import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('input', throttle(onInputType, 500));
formEl.addEventListener('submit', onFormSubmit);

const FEEDBACK_FORM = 'feedback-form-state';

let formData = JSON.parse(localStorage.getItem(FEEDBACK_FORM)) || {};
updateForm();
function onInputType(evt) {
  const inputName = evt.target.name;
  const inputValue = evt.target.value;

  formData[inputName] = inputValue;

  localStorage.setItem(FEEDBACK_FORM, JSON.stringify(formData));
}

function updateForm() {
  const savedForm = localStorage.getItem(FEEDBACK_FORM);
  const parsedForm = JSON.parse(savedForm);

  if (parsedForm) {
    formEl.elements.message.value = parsedForm.message || '';
    formEl.elements.email.value = parsedForm.email || '';
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const email = evt.currentTarget.email.value;
  const message = evt.currentTarget.message.value;
  const saveFormData = {
    email,
    message,
  };

  console.log(saveFormData);
  formEl.reset();
  localStorage.clear();
  formData = {};
}
