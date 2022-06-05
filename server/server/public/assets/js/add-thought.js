const $addKeywordBtn = document.querySelector('#add-keyword');
const $thoughtForm = document.querySelector('#thought-form');
const $customKeywordsList = document.querySelector('#custom-keywords-list');

const handleAddKeyword = event => {
  event.preventDefault();

  const keywordValue = document.querySelector('#new-keyword').value;

  if (!keywordValue) {
    return false;
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'keyword';
  checkbox.value = keywordValue;
  checkbox.id = keywordValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const label = document.createElement('label');
  label.textContent = keywordValue;
  label.htmlFor = keywordValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const divWrapper = document.createElement('div');

  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $customKeywordsList.appendChild(divWrapper);

  keywordValue.value = '';
};

const handleThoughtSubmit = event => {
  event.preventDefault();

  const thoughtName = $thoughtForm.querySelector('#thought-name').value;
  const createdBy = $thoughtForm.querySelector('#created-by').value;
  const thoughtText = $thoughtForm.querySelector('#thought-thoughtText').value;
  const keywords = [...$thoughtForm.querySelectorAll('[name=keyword]:checked')].map(keyword => {
    return keyword.value;
  });

  if (!thoughtName || !createdBy || !keywords.length) {
    return;
  }

  const formData = { thoughtName, createdBy, thoughtText, keywords };
};

$thoughtForm.addEventListener('submit', handleThoughtSubmit);
$addKeywordBtn.addEventListener('click', handleAddKeyword);
