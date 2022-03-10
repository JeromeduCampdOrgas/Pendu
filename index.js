import { keyboardInit } from "./src/clavier.js";
import { wordToFindIinit } from "./src/word-to-find.js";
import { specialChar, listeType } from "./src/traitement-liste.js";
import { liste } from "./src/liste.js";

import {
  words,
  randomWord,
  wordInlistType,
  initType,
  selectOptionInit,
} from "./src/words.js";

keyboardInit();

const listeFiltre = specialChar(liste);
const listeTypeOption = listeType(listeFiltre);
selectOptionInit(listeTypeOption,"nom");

const word = wordInlistType('adjectif',listeFiltre);
wordToFindIinit(word.mot,listeFiltre);
initType(listeFiltre);