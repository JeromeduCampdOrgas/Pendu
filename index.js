import { keyboardInit } from "./src/clavier.js";
import { wordToFindIinit } from "./src/word-to-find.js";

keyboardInit();

const wordToFind = "partager";
wordToFindIinit(wordToFind);
