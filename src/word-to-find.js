import { wordInlistType } from "./words.js";
import { keyboardInit } from "./clavier.js";
import { partMax } from "../index.js";

export function wordToFind(word,list,nameGamer) {
  if (nameGamer.part >= partMax) {
    endGame(nameGamer);
  } else {
    // console.log de triche
    console.log("mot à trouver : "+word);
    // réinitialise le mot à vide et le résultat dans le DOM + cache bouton recommencer
    document.getElementById("word-location").innerHTML="";
    document.getElementById("result").innerHTML="";
    document.querySelector("#start>button").classList.add("display-none");
    document.querySelector("#hanged>img").src="media/potence00.png";
    console.log(nameGamer);
    // bandeau result
    displayGameBanner(nameGamer);

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
                nameGamer.wonPart++;
                  displayResult("vous avez gagné !","win",list,nameGamer);
              }
          } else {
              // lettre non trouvée => modif touche + compteur + pendu 
              key.classList.add("notfind");
              count++;
              displayHanged(count);
              if (count === 6) {
                nameGamer.lostPart++;
                  displayResult("vous avez perdu !","loose",list,nameGamer);
                  word.forEach( (letterWord,index) => {
                          letterInSpan(letterWord, index,false);
                  } );
              }
          }
        keyPushed.disabled = true;
        key.classList.remove("active");
      } 
    });
    }
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

function displayGameBanner(gamer) {
  console.log("displaygamer "+gamer);
  const insertResult = document.getElementById("result");
  if (gamer.part < 1) {
    console.log("bienvenue");
    const gameBanner = document.createElement("h2");
    gameBanner.innerHTML = `Bienvenue ${gamer.name}`;
    insertResult.append(gameBanner);
  } else {
      const gameBanner = document.createElement("p");
      gameBanner.innerHTML= `Joueur ${gamer.name} / Nombre de manches jouées : ${gamer.part} sur ${partMax} / ${gamer.wonPart} gagnées / ${gamer.lostPart} perdues`;
      insertResult.append(gameBanner);
    }
}

function displayResult(result, classe,list,gamer) {
  // affiche le résultat
  const insertResult = document.getElementById("result");
  const insertResultH2 = document.createElement("h2");
  insertResult.innerHTML = "";
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
    gamer.part++;
    wordToFind(word.mot,list,gamer);
  }
}

function displayHanged(count) {
    const imgHanged = document.querySelector("#hanged>img");
    imgHanged.src="media/potence0"+count+".png";
}

function endGame(gamer) {
    document.getElementById("result").remove();
    const container = document.getElementById("container");
    container.classList.add("end-game");
    container.innerHTML = "";
    const endGameMessage = document.createElement("div");
    endGameMessage.innerHTML = `${gamer.name}, ta partie est terminée<br/>`;
    const winMessage = (gamer.wonPart > 1) ? "manches" : "manche";
    if (gamer.wonPart === 0 ) {
      endGameMessage.innerHTML +=`Dommage, tu n'as gagné aucune manche<br/>Retente ta chance`;
    } else {
      endGameMessage.innerHTML +=(gamer.wonPart > gamer.lostPart) ? `<img src="https://giphy.com/embed/iJgoGwkqb1mmH1mES3" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen>Bravo tu as gagné ${gamer.wonPart} ${winMessage} sur ${partMax}` : `Dommage, tu n'as gagné que ${gamer.wonPart} ${winMessage} sur ${partMax}<br/>Retente ta chance`;
    }
    const reload = document.createElement("button");
    reload.classList.add("cursor");
    reload.innerHTML = "recommence une partie";
    container.append(endGameMessage);
    container.append(reload);
    reload.addEventListener("click", ()=> {location.reload();})
}
