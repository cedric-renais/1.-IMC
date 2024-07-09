const BMIData = [
  { name: 'maigreur', color: 'midnightblue', range: [0, 18.5] },
  { name: 'bonne santé', color: 'green', range: [18.5, 25] },
  { name: 'surpoids', color: 'lightcoral', range: [25, 30] },
  { name: 'obésité modérée', color: 'orange', range: [30, 35] },
  { name: 'obésité sévère', color: 'crimson', range: [35, 40] },
  { name: 'obésité morbide', color: 'red', range: 40 },
];

//////////////////////////////////////////////////
// IMC = poids en kilogramme / taille² en mètre //
//////////////////////////////////////////////////

// Selectionne le formulaire dans le DOM
const form = document.querySelector('form');

// Ajoute un écouteur d'événement pour le submit
form.addEventListener('submit', handleForm);

// Fonction qui gère le submit du formulaire
function handleForm(event) {
  // Empêche le rechargement de la page
  event.preventDefault();

  // Appelle la fonction calcultateBMI
  calcultateBMI();
}

// Selectionne tous les inputs dans le DOM
const inputs = document.querySelectorAll('input');

// Fonction qui calcule l'IMC
function calcultateBMI() {
  // Récupère la taille et le poids
  const height = inputs[0].value;
  const weight = inputs[1].value;

  // Si la taille ou le poids est vide ou inférieur à 0
  if (!height || !weight || height <= 0 || weight <= 0) {
    // Appelle la fonction handleError
    handleError();
    return;
  }

  // Calcule l'IMC avec la formule donnée et le stocke dans une constante
  const BMI = (weight / Math.pow(height / 100, 2)).toFixed(1);

  // Affiche l'IMC dans le DOM
  showResult(BMI);
}

// Selectionne les éléments dans le DOM
const displayBMI = document.querySelector('.bmi-value');
const displayResult = document.querySelector('.bmi-result');

// Fonction qui gère les erreurs
function handleError() {
  // Affiche un message d'erreur et réinitialise la couleur
  displayBMI.textContent = 'Whops!';
  displayBMI.style.color = 'inherit';
  displayResult.textContent = 'Veuillez entrer votre taille et votre poids.';
}

// Fonction qui affiche le résultat
function showResult(BMI) {
  // Trouve le rang correspondant à l'IMC dans le tableau BMIData
  const rank = BMIData.find((data) => {
    // Si l'IMC est compris entre les bornes du rang retourne le rang
    if (BMI >= data.range[0] && BMI < data.range[1]) return data;
    // Si l'IMC est supérieur ou égal à la borne supérieure du rang retourne le rang
    else if (typeof data.range === 'number' && BMI >= data.range) return data;
  });

  // Affiche l'IMC dans le DOM avec la couleur correspondante
  displayBMI.textContent = BMI;
  displayBMI.style.color = rank.color;

  // Affiche le rang dans le DOM
  displayResult.textContent = `Vous êtes ${rank.name}`;
}
