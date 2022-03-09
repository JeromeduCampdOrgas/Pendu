import { wordToFindIinit } from "./word-to-find.js";
import { keyboardInit } from "./clavier.js";

export class words {
  constructor(level, listOfWords) {
    this.level = level;
    this.listOfWords = [];
  }
  selectLevel() {
    switch (this.level) {
      case "level1":
        this.listOfWords = [
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
        break;
      case "level2":
        this.listOfWords = [
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
        break;
        break;
      case "level3":
        this.listOfWords = [
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
        break;
    }
  }
}

export function initLevel() {
  const select = document.querySelector("#level");
  select.addEventListener("change", function () {
    // récupère le nouveau mot en fonction du niveau
    const level = this.value;
    const word = wordInlistLevel(level);
    keyboardInit();
    wordToFindIinit(word);
  });
}

export function randomWord(liste) {
  // tire au hasard un mot dans la liste
  const nbWords = liste.length;
  const index = Math.floor(Math.random() * nbWords);
  return liste[index];
}

export function wordInlistLevel(level) {
  const listWords = new words(level);
  listWords.selectLevel(level);
  return randomWord(listWords.listOfWords);
}

export function selectOptionInit(option) {
  const select = document.getElementById("level");
  for (const type of option) {
    const selectOption = document.createElement("option");
    selectOption.value = type;
    selectOption.innerText = type;
    select.append(selectOption);
  }
}
