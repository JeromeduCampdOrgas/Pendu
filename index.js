import { keyboardInit } from "./src/clavier.js";
import { wordToFindIinit } from "./src/word-to-find.js";
// import { level1, level2, level3, randomWord, initLevel } from "./src/words.js";
import { words,randomWord,wordInlistLevel, initLevel } from "./src/words.js";

keyboardInit();
initLevel();
const word = wordInlistLevel("level1");
wordToFindIinit(word);
