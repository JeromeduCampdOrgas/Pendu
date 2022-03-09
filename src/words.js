import { wordToFindIinit } from "./word-to-find";

export const level1 = [
  "Ado",
  "Bis",
  "Cor",
  "Fac",
  "Sot",
  "Gaz",
  "Glu",
  "Ski",
  "Jet",
  "Mai",
];

export const level2 = [
  "Ardu",
  "Atre",
  "Cire",
  "Corse",
  "Rhum",
  "Thym",
  "Kaki",
  "Taie",
  "Taux",
  "Clip",
];

const level3 = [
  "Honni",
  "Banjo",
  "Igloo",
  "Seaux",
  "Seuil",
  "Tyran",
  "Boeuf",
  "Moult",
  "Muscs",
  "Menthe",
];

export function initLevel() {
  const select = document.querySelector("#level");

  select.addEventListener("change", function () {
    const level = this.value;
    wordToFindIinit(randomWord(level));
  });
}

export function randomWord(liste) {
  const nbWords = liste.length;
  const index = Math.round(Math.random() * nbWords);
  return liste[index];
}
