import { keyboardInit } from "./clavier.js";
import { wordToFind } from "./word-to-find.js";
import { specialChar, listeType } from "./traitement-liste.js";
import { liste } from "./liste.js";
import {
  words,
  randomWord,
  wordInlistType,
  initType,
  selectOptionInit,
} from "./words.js";

export function gamer() {
    document.querySelector("#start>button").classList.add("display-none");
        const cache=document.getElementById("cache");
        const gamerWrapper = document.getElementById("gamer");
        const button = document.querySelector("#name-gamer>button");
        cache.classList.add("active");
        gamerWrapper.classList.add("active");
        button.addEventListener("click", function(event) {
            event.preventDefault();
            cache.classList.remove("active");
            gamerWrapper.classList.remove("active");
            const inputValue = document.getElementById("name").value;
            const nameGamer = {
                name : inputValue,
                part : 0,
                lostPart : 0,
                wonPart:0,
            };

            keyboardInit();

            // intialisation des listes de mot par type + select option du html
            const typeDefault = "nom";
            const listeFiltre = specialChar(liste);
            const listeTypeOption = listeType(listeFiltre);
            selectOptionInit(listeTypeOption,typeDefault);
            initType(listeFiltre,nameGamer);

            // tirage du mot + algo recherche du mot
            const word = wordInlistType(typeDefault,listeFiltre);
            wordToFind(word.mot,listeFiltre,nameGamer);
        })
    
}