//import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js'
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Create a single supabase client for interacting with your database 
//const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
console.log('start2!');
//alert('fsdf2');
function testSupabase(supabase) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase
            .from('activeGame')
            .select();
        console.log('data, error: ', data, error);
    });
}
document.addEventListener('DOMContentLoaded', run, false);
function run() {
    //alert('test31');
    let game = new JNGames();
    game.Go();
}
class JNGames {
    Go() {
        let newGameButton = document.getElementById('newGameButton');
        let guessLetterButton = document.getElementById('guessLetterButton');
        let guessSolutionButton = document.getElementById('guessSolutionButton');
        newGameButton.addEventListener('click', function () { JNGames.startgame(); }, false);
        guessLetterButton.addEventListener('click', JNGames.guessSingleLetter, false);
        guessSolutionButton.addEventListener('click', JNGames.guessSolutionButton, false);
    }
    static startgame() {
        let gameTableRow = document.getElementById('gameTableRow');
        let guessesLeftLabel = document.getElementById('guessesLeftLabel');
        let singleLetterInput = document.getElementById('singleLetterInput');
        let solutionInput = document.getElementById('solutionInput');
        let solutionInformationLabel = document.getElementById('solutionInformationLabel');
        singleLetterInput.readOnly = false;
        solutionInput.readOnly = false;
        solutionInformationLabel.innerHTML = "";
        JNGames.guessesLeft = 10;
        let n = JNGames.getRandomInt(0, JNGames.GamesList.length - 1);
        //alert(JNGames.GamesList[i]);
        let solution = JNGames.GamesList[n];
        JNGames.solution = solution;
        console.log("solution: ", solution);
        JNGames.solutionInProgress = "-------------------".substring(0, solution.length);
        //Gæt med bogstav
        let guessLetterButton = document.getElementById('guessLetterButton');
        guessLetterButton.disabled = false;
        //Gæt hele ordet
        let guessSolutionButton = document.getElementById('guessSolutionButton');
        guessSolutionButton.disabled = false;
        //Tabellen med teksten man skal gætte
        while (gameTableRow.childNodes.length) {
            gameTableRow.removeChild(gameTableRow.childNodes[0]);
        }
        for (let i = 0; i < solution.length; i++) {
            let newHTMLCell = document.createElement('td');
            newHTMLCell.id = "HTMLTableDataCellElementid_" + i;
            newHTMLCell.innerHTML = "-";
            gameTableRow.appendChild(newHTMLCell);
        }
        //Label med antal forsøg tilbage
        guessesLeftLabel.innerText = JNGames.guessesLeft.toString();
    }
    static guessSolutionButton() {
        let gameTableRow = document.getElementById('gameTableRow');
        let guessesLeftLabel = document.getElementById('guessesLeftLabel');
        let singleLetterInput = document.getElementById('singleLetterInput');
        let solutionInput = document.getElementById('solutionInput');
        let solutionInformationLabel = document.getElementById('solutionInformationLabel');
        let guessLetterButton = document.getElementById('guessLetterButton');
        let guessSolutionButton = document.getElementById('guessSolutionButton');
        JNGames.guessesLeft--;
        solutionInformationLabel.innerHTML = "";
        //Label med antal forsøg tilbage
        guessesLeftLabel.innerText = JNGames.guessesLeft.toString();
        let solutionGuessed = solutionInput.value;
        //console.log(singleLetterInput);
        //alert(letterGuessed);
        //Tabellen med teksten man skal gætte
        while (gameTableRow.childNodes.length) {
            gameTableRow.removeChild(gameTableRow.childNodes[0]);
        }
        if (solutionGuessed.toLocaleLowerCase() == JNGames.solution.toLocaleLowerCase()) {
            solutionInformationLabel.innerHTML = "Rigtigt gættet!";
            //Tegn løsning
            while (gameTableRow.childNodes.length) {
                gameTableRow.removeChild(gameTableRow.childNodes[0]);
            }
            for (let i = 0; i < JNGames.solution.length; i++) {
                let newHTMLCell = document.createElement('td');
                newHTMLCell.id = "HTMLTableDataCellElementid_" + i;
                newHTMLCell.innerHTML = JNGames.solution.substring(i, i + 1);
                gameTableRow.appendChild(newHTMLCell);
            }
        }
        else if (JNGames.guessesLeft == 0) {
            solutionInformationLabel.innerHTML = "Ikke flere forsøg! Den rigtige løsning er: " + JNGames.solution;
            singleLetterInput.readOnly = true;
            solutionInput.readOnly = true;
            guessLetterButton.disabled = true;
            guessSolutionButton.disabled = true;
        }
        else {
            solutionInformationLabel.innerHTML = "Forkert! Prøv igen.";
        }
        singleLetterInput.value = "";
        solutionInput.value = "";
    }
    static guessSingleLetter() {
        console.log("JNGames.solutionInProgress", JNGames.solutionInProgress);
        let gameTableRow = document.getElementById('gameTableRow');
        let guessesLeftLabel = document.getElementById('guessesLeftLabel');
        let singleLetterInput = document.getElementById('singleLetterInput');
        let solutionInput = document.getElementById('solutionInput');
        let solutionInformationLabel = document.getElementById('solutionInformationLabel');
        let guessLetterButton = document.getElementById('guessLetterButton');
        let guessSolutionButton = document.getElementById('guessSolutionButton');
        JNGames.guessesLeft--;
        //Label med antal forsøg tilbage
        guessesLeftLabel.innerText = JNGames.guessesLeft.toString();
        let letterGuessed = singleLetterInput.value;
        //console.log(singleLetterInput);
        //alert(letterGuessed);
        //Tabellen med teksten man skal gætte
        while (gameTableRow.childNodes.length) {
            gameTableRow.removeChild(gameTableRow.childNodes[0]);
        }
        let newSolutionInProgress = "";
        for (let i = 0; i < JNGames.solution.length; i++) {
            let newHTMLCell = document.createElement('td');
            newHTMLCell.id = "HTMLTableDataCellElementid_" + i;
            newHTMLCell.innerHTML = JNGames.solutionInProgress.substring(i, i + 1);
            if (JNGames.solution.substring(i, i + 1).toLocaleLowerCase() == letterGuessed.toLocaleLowerCase()) {
                newHTMLCell.innerHTML = JNGames.solution.substring(i, i + 1);
            }
            gameTableRow.appendChild(newHTMLCell);
            //Holder styr på midlertidig løsning
            newSolutionInProgress = newSolutionInProgress.concat(newHTMLCell.innerHTML);
        } //for i
        JNGames.solutionInProgress = newSolutionInProgress;
        if (JNGames.solutionInProgress.toLocaleLowerCase() == JNGames.solution.toLocaleLowerCase()) {
            solutionInformationLabel.innerHTML = "Rigtigt gættet!";
        }
        else if (JNGames.guessesLeft == 0) {
            solutionInformationLabel.innerHTML = "Ikke flere forsøg! Den rigtige løsning er: " + JNGames.solution;
            singleLetterInput.readOnly = true;
            solutionInput.readOnly = true;
            guessLetterButton.disabled = true;
            guessSolutionButton.disabled = true;
        }
        singleLetterInput.value = "";
        solutionInput.value = "";
    }
    static getRandomInt(min, max) {
        let min_ceil = Math.ceil(min);
        let max_floor = Math.floor(max);
        return Math.floor(Math.random() * (max_floor - min_ceil + 1)) + min_ceil;
    }
}
JNGames.GamesList = ["København", "Helsinki", "Amsterdam", "Reykjavik", "Oslo", "Lissabon", "Madrid", "London", "Stockholm", "Prag",
    "Berlin", "Budapest", "Wien", "Riga", "Tallinn", "Tirana", "Athen", "Vilnius", "Bern", "Rom", "Dublin",];
JNGames.guessesLeft = 10;
JNGames.solution = "";
JNGames.solutionInProgress = "";
//# sourceMappingURL=gameapp.js.map