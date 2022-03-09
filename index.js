import { keyboardInit } from "./src/clavier.js";
import { wordToFindIinit } from "./src/word-to-find.js";
import { specialChar, listeType } from "./src/traitement-liste.js";
import { liste } from "./src/liste.js";

// import { level1, level2, level3, randomWord, initLevel } from "./src/words.js";
import {
  words,
  randomWord,
  wordInlistLevel,
  initLevel,
  selectOptionInit,
} from "./src/words.js";

keyboardInit();
initLevel();
const word = wordInlistLevel("level1");
wordToFindIinit(word);

const listeFiltre = specialChar(liste);
const listeTypeOption = listeType(listeFiltre);

selectOptionInit(listeTypeOption);
