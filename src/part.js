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
            const inputName = document.getElementById("name");
            const inputValue = inputName.value;
            if (inputValue === "") {
                const error = document.getElementById("error");
                error.innerHTML = "Tu dois indiquer ton nom";
                inputName.classList.add("error");
            } else {
                cache.classList.remove("active");
                gamerWrapper.classList.remove("active");
                const selectValue = document.getElementById("round").value;
                const game = {
                    name : inputValue,
                    part : 0,
                    lostPart : 0,
                    wonPart:0,
                    roundPart : parseInt(selectValue),
                };

                keyboardInit();

                // intialisation des listes de mot par type + select option du html
                const typeDefault = "nom";
                const listeFiltre = specialChar(liste);
                const listeTypeOption = listeType(listeFiltre);
                selectOptionInit(listeTypeOption,typeDefault);
                initType(listeFiltre,game);

                // tirage du mot + algo recherche du mot
                const word = wordInlistType(typeDefault,listeFiltre);
                wordToFind(word.mot,listeFiltre,game);
            }
        });
    
}