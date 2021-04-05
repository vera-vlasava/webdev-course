const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

let word = "";
let wordTemplate = [];
let score = 0;

const game = () => {
  document.querySelector("#form").addEventListener("submit", createWord);
};

const createWord = (event) => {
  event.preventDefault();
  const input = document.querySelector("#newWord");
  word = input.value.trim().toUpperCase();
  input.value = "";
  if (!word) {
    return;
  }
  createAlphaBetButtons();
  createWordTemplate();
  renderScore();
};

const createAlphaBetButtons = () => {
  const alphabetWrapper = document.querySelector("#alphabet");
  alphabetWrapper.innerHTML = "";

  alphabet.forEach((letter) => {
    const button = `<button id=${letter}>${letter}</button>`;
    alphabetWrapper.innerHTML += button;
  });

  const buttons = document.querySelectorAll("#alphabet button");
  for (btn of buttons) {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      checkLetter(event.target.id);
      event.target.classList.add("hide");
    });
  }
};

const createWordTemplate = () => {
  wordTemplate.length = word.length;
  wordTemplate.fill(null);
  renderWord();
};

const renderWord = () => {
  document.querySelector("#win").classList.add("hide");
  let output = "";

  for (let i = 0; i < wordTemplate.length; i++) {
    output += wordTemplate[i] ? wordTemplate[i] : "_";
  }

  document.querySelector("#word").classList.remove("hide");
  document.querySelector("#word").innerHTML = "";
  document.querySelector("#word").innerHTML = output;
};

const checkLetter = (letter) => {
  let match = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      wordTemplate[i] = letter;
      match = true;
    }
  }
  calcScore(match);
  renderWord();
  congrats();
};

const calcScore = (match) => {
  if (!match) {
    score -= 2;
  } else {
    score += 10;
  }
  renderScore();
};

const renderScore = () => {
  const scoreWrapper = document.querySelector("#score-wrapper");
  document.querySelector("#score-wrapper").innerHTML = "";

  const yourScore = document.createElement("h2");
  yourScore.innerText = `Your score`;
  yourScore.id = "score-text";

  const showScore = document.createElement("h2");
  showScore.innerText = score;
  showScore.id = "score-number";

  scoreWrapper.appendChild(yourScore);
  scoreWrapper.appendChild(showScore);
};

const congrats = () => {
  let checkResult = 0;

  for (let letter of wordTemplate) {
    if (!letter) {
      break;
    }
    checkResult++;
  }
  if (checkResult === wordTemplate.length) {
    renderCongrats();
  }
};

const renderCongrats = () => {
  document.querySelector("#word").classList.add("hide");
  document.querySelector("#win").classList.remove("hide");
};

game();
