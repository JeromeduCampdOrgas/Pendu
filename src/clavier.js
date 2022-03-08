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
  let keyboard = document.getElementById("keyboard");
  for (let char of alphabet) {
    let letter = document.createElement("div");
    letter.classList.add("letter");
    letter.innerHTML = char;
    keyboard.append(letter);
  }
}
