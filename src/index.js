import "./style.css";

const email = document.querySelector("#email");
const country = document.querySelector("#country");
const form = document.querySelector("form");
const zip = document.querySelector("#zip");
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#passwordConfirmation");

email.addEventListener("input", function () {
  spanErrorDisplay(email);
});
country.addEventListener("input", function () {
  spanErrorDisplay(country);
});
zip.addEventListener("input", function () {
  spanErrorDisplay(zip);
});

password.addEventListener("input", function () {
  passwordSpelling(password);
});
passwordConfirmation.addEventListener("input", function () {
  passwordMatchingTest(password, this);
});

form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) e.preventDefault();
});

function getErrors(node) {
  const checkerArray = [];
  const nodeValidity = node.validity;
  for (let key in nodeValidity) {
    if (nodeValidity[key] === true) checkerArray.push(key);
  }
  switch (checkerArray[0]) {
    case "valueMissing":
      return "Required !";
      break;
    case "typeMismatch":
    case "patternMismatch":
      return `Insérer un ${node.id} valide !`;
    case "valid":
      return "Valide !";
  }
}
function spanErrorDisplay(node) {
  document.querySelector(`#${node.id} + span`).textContent = getErrors(node);
}

const passwordSpelling = function passwordSpellingCheckingForREGEX(password) {
  const passwordRegex = {
    majuscule_manquante: new RegExp("[A-Z]"),
    minuscule_manquante: new RegExp("[a-z]"),
    chiffres_manquant: new RegExp("[0-9]"),
    caractere_special_manquant: new RegExp("[&|?]"),
  };
  for (let key in passwordRegex) {
    if (password.value.search(passwordRegex[key]) === -1) {
      password.setCustomValidity("badInput");
      return passWordSpellingError(password, key);
    }
  }
  passWordSpellingError(password, "valide !");
  password.setCustomValidity("");
};
function passWordSpellingError(passwordnode, error) {
  document.querySelector(`#${passwordnode.id} + span`).textContent = error;
}

function passwordMatchingTest(password1, password2) {
  if (password1.value != password2.value) {
    password2.setCustomValidity("no match");
    return passWordSpellingError(password2, "invalide !");
  }
  passWordSpellingError(password2, "Match !");
  password2.setCustomValidity("");
}
