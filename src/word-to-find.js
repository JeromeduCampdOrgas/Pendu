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
                  displayResult("gagné !","win",list,nameGamer);
              }
          } else {
              // lettre non trouvée => modif touche + compteur + pendu 
              key.classList.add("notfind");
              count++;
              displayHanged(count);
              if (count === 6) {
                nameGamer.lostPart++;
                  displayResult("perdu !","loose",list,nameGamer);
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
  const insertResult = document.getElementById("result");
  if (gamer.part < 1) {
    const gameWelcome = document.createElement("h2");
    gameWelcome.classList.add("text-zoom-in-zoom-out","welcome");
    const welcomeMessage = `Bienvenue ${gamer.name}`;
    gameWelcome.innerHTML = welcomeMessage.toUpperCase();
    insertResult.append(gameWelcome);
    setTimeout(()=>{
      gameWelcome.remove();
      const gameFirst = document.createElement("h2");
      gameFirst.classList.add("focus-in","first-game");
      gameFirst.innerHTML = "première partie";
      insertResult.append(gameFirst);
    },2500);
  } else {
      const gameRound = (gamer.part>1) ? "manches" : "manche";
      const winMessage = (gamer.wonPart > 1) ? "manches gagnées" : "manche gagnée";
      const lostMessage = (gamer.lostPart > 1) ? "manche perdues" : "manche perdue";
      const gamePart = document.createElement("div");
      gamePart.classList.add("part");
      gamePart.innerHTML= `${gamer.name} tu as joué ${gamer.part} ${gameRound} sur ${partMax}`;
      insertResult.append(gamePart);
      const resultDetail = document.createElement("div");
      resultDetail.classList.add("result-detail");
      resultDetail.innerHTML =`<span class="won">${gamer.wonPart} ${winMessage}</span><span class="lost">${gamer.lostPart} ${lostMessage}</span>`;
      insertResult.append(resultDetail);
    }
}

function displayResult(result, classe,list,gamer) {
  // affiche le résultat
  const insertResult = document.getElementById("result");
  const insertResultH2 = document.createElement("h2");
  insertResult.innerHTML = "";
  insertResultH2.innerHTML = result.toUpperCase();
  insertResultH2.classList.add(classe,"result","anim-result");
  insertResult.append(insertResultH2);
  document.getElementById("keyboard").innerHTML = "";

  // bouton recommencer
  gamer.part++;
  const restart = document.querySelector("#start>button");
  const restartContent = (gamer.part < partMax) ? "manche suivante" : "terminer la partie"; 
  restart.classList.remove("display-none");
  restart.innerHTML = restartContent;
  restart.onclick = function() {
    const type = document.querySelector("#type").value;
    const word = wordInlistType(type,list);
    keyboardInit();
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
    endGameMessage.classList.add("anim-zoom-in");
    endGameMessage.innerHTML = `Ta partie est terminée.<br/>`;
    const winMessage = (gamer.wonPart > 1) ? "manches" : "manche";
    if (gamer.wonPart === 0 ) {
      endGameMessage.innerHTML +=`Quel dommage ${gamer.name},<br/>tu n'as gagné aucune manche.<br/>Retente ta chance`;
    } else {
      endGameMessage.innerHTML +=(gamer.wonPart > gamer.lostPart) ? `Bravo ${gamer.name}<br/>tu as gagné ${gamer.wonPart} ${winMessage} sur ${partMax}` : `Quel dommage ${gamer.name},<br/>tu n'as gagné que ${gamer.wonPart} ${winMessage} sur ${partMax}.<br/>Tu peux t'améliorer, retente ta chance`;
    }
    const reload = document.createElement("button");
    reload.classList.add("cursor","restart","focus-in","delay2s");
    reload.innerHTML = "recommencer une partie";
    container.append(endGameMessage);
    container.append(reload);
    reload.addEventListener("click", ()=> {location.reload();})
}
