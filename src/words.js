import { wordToFind } from "./word-to-find.js";
import { keyboardInit } from "./clavier.js";

export class words {
  constructor(type, listOfWords) {
    this.type = type;
    this.listOfWords = [];
  }
  selectType(type,list) {
    this.listOfWords = list.filter(line => line.type === type);
  }
}

export function initType(list,nameGamer) {
  const select = document.querySelector("#type");
  select.addEventListener("change", function () {
    // récupère le nouveau mot en fonction du niveau
    const type = this.value;
    const word = wordInlistType(type,list);
    keyboardInit();
    wordToFind(word.mot,list,nameGamer);
  });
}

export function randomWord(liste) {
  // tire au hasard un mot dans la liste
  const nbWords = liste.length;
  const index = Math.floor(Math.random() * nbWords);
  return liste[index];
}

export function wordInlistType(type,list) {
  const listWords = new words(type);
  listWords.selectType(type,list);
  return randomWord(listWords.listOfWords);
}

export function selectOptionInit(option,selected = option[0]) {
  const select = document.getElementById("type");
  let selectedIndex;
  let i=0;
  for (const type of option) {
    const selectOption = document.createElement("option");
    selectOption.value = type;
    (type === selected) ? selectedIndex = i : "";
    selectOption.innerText = type;
    select.append(selectOption);
    i++;
  }
  select.options[selectedIndex].selected=true;
}
