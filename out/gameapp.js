//import { createClient } from '@supabase/supabase-js'
// Create a single supabase client for interacting with your database 
//const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
console.log('start2!');
//alert('fsdf2');
document.addEventListener('DOMContentLoaded', run, false);
function run() {
    //alert('test31');
    var game = new JNGames();
    game.Go();
}
var JNGames = /** @class */ (function () {
    function JNGames() {
    }
    JNGames.prototype.Go = function () {
        var newGameButton = document.getElementById('newGameButton');
        var guessLetterButton = document.getElementById('guessLetterButton');
        var guessSolutionButton = document.getElementById('guessSolutionButton');
        newGameButton.addEventListener('click', function () { JNGames.startgame(); }, false);
        guessLetterButton.addEventListener('click', JNGames.guessSingleLetter, false);
        guessSolutionButton.addEventListener('click', JNGames.guessSolutionButton, false);
    };
    JNGames.startgame = function () {
        var gameTableRow = document.getElementById('gameTableRow');
        var guessesLeftLabel = document.getElementById('guessesLeftLabel');
        var singleLetterInput = document.getElementById('singleLetterInput');
        var solutionInput = document.getElementById('solutionInput');
        var solutionInformationLabel = document.getElementById('solutionInformationLabel');
        singleLetterInput.readOnly = false;
        solutionInput.readOnly = false;
        solutionInformationLabel.innerHTML = "";
        JNGames.guessesLeft = 10;
        var n = JNGames.getRandomInt(0, JNGames.GamesList.length - 1);
        //alert(JNGames.GamesList[i]);
        var solution = JNGames.GamesList[n];
        JNGames.solution = solution;
        console.log("solution: ", solution);
        JNGames.solutionInProgress = "-------------------".substring(0, solution.length);
        //Gæt med bogstav
        var guessLetterButton = document.getElementById('guessLetterButton');
        guessLetterButton.disabled = false;
        //Gæt hele ordet
        var guessSolutionButton = document.getElementById('guessSolutionButton');
        guessSolutionButton.disabled = false;
        //Tabellen med teksten man skal gætte
        while (gameTableRow.childNodes.length) {
            gameTableRow.removeChild(gameTableRow.childNodes[0]);
        }
        for (var i = 0; i < solution.length; i++) {
            var newHTMLCell = document.createElement('td');
            newHTMLCell.id = "HTMLTableDataCellElementid_" + i;
            newHTMLCell.innerHTML = "-";
            gameTableRow.appendChild(newHTMLCell);
        }
        //Label med antal forsøg tilbage
        guessesLeftLabel.innerText = JNGames.guessesLeft.toString();
    };
    JNGames.guessSolutionButton = function () {
        var gameTableRow = document.getElementById('gameTableRow');
        var guessesLeftLabel = document.getElementById('guessesLeftLabel');
        var singleLetterInput = document.getElementById('singleLetterInput');
        var solutionInput = document.getElementById('solutionInput');
        var solutionInformationLabel = document.getElementById('solutionInformationLabel');
        var guessLetterButton = document.getElementById('guessLetterButton');
        var guessSolutionButton = document.getElementById('guessSolutionButton');
        JNGames.guessesLeft--;
        solutionInformationLabel.innerHTML = "";
        //Label med antal forsøg tilbage
        guessesLeftLabel.innerText = JNGames.guessesLeft.toString();
        var solutionGuessed = solutionInput.value;
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
            for (var i = 0; i < JNGames.solution.length; i++) {
                var newHTMLCell = document.createElement('td');
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
    };
    JNGames.guessSingleLetter = function () {
        console.log("JNGames.solutionInProgress", JNGames.solutionInProgress);
        var gameTableRow = document.getElementById('gameTableRow');
        var guessesLeftLabel = document.getElementById('guessesLeftLabel');
        var singleLetterInput = document.getElementById('singleLetterInput');
        var solutionInput = document.getElementById('solutionInput');
        var solutionInformationLabel = document.getElementById('solutionInformationLabel');
        var guessLetterButton = document.getElementById('guessLetterButton');
        var guessSolutionButton = document.getElementById('guessSolutionButton');
        JNGames.guessesLeft--;
        //Label med antal forsøg tilbage
        guessesLeftLabel.innerText = JNGames.guessesLeft.toString();
        var letterGuessed = singleLetterInput.value;
        //console.log(singleLetterInput);
        //alert(letterGuessed);
        //Tabellen med teksten man skal gætte
        while (gameTableRow.childNodes.length) {
            gameTableRow.removeChild(gameTableRow.childNodes[0]);
        }
        var newSolutionInProgress = "";
        for (var i = 0; i < JNGames.solution.length; i++) {
            var newHTMLCell = document.createElement('td');
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
    };
    JNGames.getRandomInt = function (min, max) {
        var min_ceil = Math.ceil(min);
        var max_floor = Math.floor(max);
        return Math.floor(Math.random() * (max_floor - min_ceil + 1)) + min_ceil;
    };
    JNGames.GamesList = ["København", "Helsinki", "Amsterdam", "Reykjavik", "Oslo", "Lissabon", "Madrid", "London", "Stockholm", "Prag",
        "Berlin", "Budapest", "Wien", "Riga", "Tallinn", "Tirana", "Athen", "Vilnius", "Bern", "Rom", "Dublin",];
    JNGames.guessesLeft = 10;
    JNGames.solution = "";
    JNGames.solutionInProgress = "";
    return JNGames;
}());
//# sourceMappingURL=gameapp.js.map