import { wordInlistType } from "./words.js";
import { keyboardInit } from "./clavier.js";

export function wordToFindIinit(word,list) {
  console.log("mot à trouver : "+word);
  // réinitialise le mot à vide et le résultat dans le DOM + cache bouton recommencer
  document.getElementById("word-location").innerHTML="";
  document.getElementById("result").innerHTML="";
  document.querySelector("#start>button").classList.add("display-none");
  document.querySelector("#hanged>img").src="media/potence00.png";
    let count = 0,
        found =0;
    
    // affiche les emplacements du mot
    const wordLocation = document.getElementById("word-location");
    // copie du mot avant split pour tester sans les accents
    const wordWithoutAccent = word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    word = word.toLowerCase().split("");
    let i=0;
    for (const char of word) {
        const letter = document.createElement("span");
        letter.classList.add("letter");
        letter.setAttribute("data-id",i);
        // letter.innerHTML = char;
        wordLocation.append(letter);
        i++;
    }
    // écoute sur les touches pour vérifier la concordance lettre / mot
    const keyboard = document.querySelectorAll("#keyboard .letter");
    for (const key of keyboard) {
        key.addEventListener("click", function verifLetterInWord(e) {
          if (count<6 && found !== word.length) {
        const keyPushed = e.target;
        const letterKeyPushed = keyPushed.innerText.toLowerCase();
        // teste le mot sans accent
        if (wordWithoutAccent.includes(letterKeyPushed)) {
            // lettre trouvée => affiche les lettres + modif touche
            key.classList.add("find");
            word.forEach( (letterWord,index) => {
              // teste la lettre sans accent
              const letterWithoutAccent  = letterWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (letterKeyPushed === letterWithoutAccent) {
                    letterInSpan(letterWord, index);
                    found++;
                }
            } );
            if (found === word.length) {
                displayResult("vous avez gagné !","win",list);
            }
        } else {
            // lettre non trouvée => modif touche + compteur + pendu 
            key.classList.add("notfind");
            count++;
            displayHanged(count);
            if (count === 6) {
                displayResult("vous avez perdu !","loose",list);
                word.forEach( (letterWord,index) => {
                        letterInSpan(letterWord, index,false);
                } );
            }
        }
      keyPushed.removeEventListener("click", verifLetterInWord);
      key.classList.remove("active");
    } 
  });
  }

}

export function letterInSpan(letter, index,found = true) {
  // récupère le span correspondant à l'index pour afficher la lettre
  const spanLetter = document.querySelector(
    '#word-location [data-id="' + index + '"]'
  );
  if (found) spanLetter.classList.add("found");
  spanLetter.innerHTML = letter.toUpperCase();
}

function displayResult(result, classe,list) {
  // affiche le résultat
  const insertResult = document.getElementById("result");
  const insertResultH2 = document.createElement("h2");
  insertResultH2.innerHTML = result.toUpperCase();
  insertResultH2.classList.add(classe);
  insertResult.append(insertResultH2);
  document.getElementById("keyboard").innerHTML = "";

  // bouton recommencer
  const restart = document.querySelector("#start>button");
  restart.classList.remove("display-none");
  restart.onclick = function() {
    const type = document.querySelector("#type").value;
    const word = wordInlistType(type,list);
    keyboardInit();
    wordToFindIinit(word.mot,list);
  }
}

function displayHanged(count) {
    const imgHanged = document.querySelector("#hanged>img");
    imgHanged.src="media/potence0"+count+".png";
}
