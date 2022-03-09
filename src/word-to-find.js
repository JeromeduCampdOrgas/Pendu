export function wordToFindIinit(word) {
    let count = 0,
        found =0;
    // affiche les emplacements du mot
    const wordLocation = document.getElementById("word-location");
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
        const keyPushed = e.target;
        const letterKeyPushed = keyPushed.innerText.toLowerCase();
        if (word.includes(letterKeyPushed)) {
            // lettre trouvée => affiche les lettres + modif touche
            key.classList.add("find");
            // word.forEach((letterWord,index) => (letterKeyPushed === letterWord) ? verifLetterInWord(letterWord,index) : ''); 
            word.forEach( (letterWord,index) => {
                if (letterKeyPushed === letterWord) {
                    letterInSpan(letterWord, index);
                    found++;
                }
            } );
            if (found === word.length) {
                displayResult("vous avez gagné !","win");
            }
        } else {
            // lettre non trouvée => modif touche + compteur + pendu 
            key.classList.add("notfind");
            count++;
            displayHanged(count);
            if (count === 6) {
                displayResult("vous avez perdu !","loose");
                word.forEach( (letterWord,index) => {
                        letterInSpan(letterWord, index);
                } );
            }
        }
        keyPushed.removeEventListener("click", verifLetterInWord);
            key.classList.remove("active");
      });
}
}

export function letterInSpan(letter, index) {
    // récupère le span correspondant à l'index pour afficher la lettre
const spanLetter = document.querySelector('#word-location [data-id="'+index+'"]');
spanLetter.innerHTML = letter.toUpperCase();
}

function displayResult(result,classe) {
    const insertResult = document.getElementById("result");
    const insertResultH2 = document.createElement("h2");
    insertResultH2.innerHTML = result.toUpperCase();
    insertResultH2.classList.add(classe);
    insertResult.append(insertResultH2);
}

function displayHanged(count) {
    const imgHanged = document.querySelector("#hanged>img");
    imgHanged.src="media/potence0"+count+".png";
}

// export function verifLetterInWord(key,word) {
//     console.log(key);
//     if (word.includes(key.innerText.toLowerCase())) {
//         console.log("trouvé");
//     } else {
//         key.removeEventListener("click");
//         key.classList.remove("active");
//     }
// }