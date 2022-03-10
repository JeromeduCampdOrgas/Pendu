const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export function keyboardInit() {
  const keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";
  for (const char of alphabet) {
if (alphabet.indexOf(char)%9 === 0) {
  const lineLetter = document.createElement("div");
  lineLetter.classList.add("line-letter");
  keyboard.append(lineLetter);
} 
  const lineInsertLetter = document.querySelector("#keyboard>.line-letter:last-child");
    const letter = document.createElement("button");
    letter.classList.add("letter");
    letter.classList.add("active");
    letter.innerHTML = char;
    lineInsertLetter.append(letter);
  }
}