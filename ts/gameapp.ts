
//import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
//const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')



console.log('start2!');
//alert('fsdf2');

document.addEventListener('DOMContentLoaded', run, false);

function run() {

  //alert('test31');

 let game: JNGames = new JNGames();
  game.Go();
    
}

class JNGames {

  public static GamesList: Array<string> = [ "København", "Helsinki", "Amsterdam", "Reykjavik", "Oslo", "Lissabon", "Madrid", "London", "Stockholm", "Prag",
  "Berlin", "Budapest", "Wien", "Riga", "Tallinn", "Tirana", "Athen", "Vilnius", "Bern", "Rom", "Dublin",];

   
  public Go(){
    let newGameButton: HTMLElement = document.getElementById('newGameButton');
    let guessLetterButton: HTMLButtonElement = document.getElementById('guessLetterButton') as HTMLButtonElement;
    let guessSolutionButton: HTMLButtonElement = document.getElementById('guessSolutionButton') as HTMLButtonElement;

    newGameButton.addEventListener('click',  function(){ JNGames.startgame(); }, false);


    guessLetterButton.addEventListener('click',   JNGames.guessSingleLetter, false);
    guessSolutionButton.addEventListener('click',   JNGames.guessSolutionButton, false);
  }



  public static guessesLeft: number = 10;
  public static solution: string = "";
  public static solutionInProgress: string = "";
  
  public static startgame(){

    
    let gameTableRow: HTMLElement = document.getElementById('gameTableRow');
    let guessesLeftLabel: HTMLElement = document.getElementById('guessesLeftLabel');
    let singleLetterInput: HTMLInputElement = document.getElementById('singleLetterInput') as HTMLInputElement;
    let solutionInput: HTMLInputElement = document.getElementById('solutionInput') as HTMLInputElement;
    let solutionInformationLabel: HTMLElement = document.getElementById('solutionInformationLabel');

    singleLetterInput.readOnly = false; 
    solutionInput.readOnly = false; 
    solutionInformationLabel.innerHTML = "";


    JNGames.guessesLeft = 10;

    
    let n:number = JNGames.getRandomInt(0, JNGames.GamesList.length - 1);
    //alert(JNGames.GamesList[i]);
    let solution: string = JNGames.GamesList[n];
    JNGames.solution = solution;

    console.log("solution: ", solution);

    JNGames.solutionInProgress = "-------------------".substring(0, solution.length);


    //Gæt med bogstav
    let guessLetterButton: HTMLButtonElement = document.getElementById('guessLetterButton') as HTMLButtonElement;
    guessLetterButton.disabled = false;



    //Gæt hele ordet
    let guessSolutionButton: HTMLButtonElement = document.getElementById('guessSolutionButton') as HTMLButtonElement;
    guessSolutionButton.disabled = false;

    

    //Tabellen med teksten man skal gætte

    while (gameTableRow.childNodes.length) {
      gameTableRow.removeChild(gameTableRow.childNodes[0]);
    }

    for (let i=0; i<solution.length; i++){

      let newHTMLCell: HTMLTableCellElement =  document.createElement('td');
      
      newHTMLCell.id = "HTMLTableDataCellElementid_" + i;
      newHTMLCell.innerHTML = "-";

      gameTableRow.appendChild(newHTMLCell);

    }
    

    //Label med antal forsøg tilbage
    guessesLeftLabel.innerText = JNGames.guessesLeft.toString();




  }
  static guessSolutionButton() {

    let gameTableRow: HTMLElement = document.getElementById('gameTableRow');
    let guessesLeftLabel: HTMLElement = document.getElementById('guessesLeftLabel');
    let singleLetterInput: HTMLInputElement = document.getElementById('singleLetterInput') as HTMLInputElement;
    let solutionInput: HTMLInputElement = document.getElementById('solutionInput') as HTMLInputElement;
    let solutionInformationLabel: HTMLElement = document.getElementById('solutionInformationLabel');
    let guessLetterButton: HTMLButtonElement = document.getElementById('guessLetterButton') as HTMLButtonElement;
    let guessSolutionButton: HTMLButtonElement = document.getElementById('guessSolutionButton') as HTMLButtonElement;
    

    JNGames.guessesLeft--;

    solutionInformationLabel.innerHTML = "";

    //Label med antal forsøg tilbage
    guessesLeftLabel.innerText = JNGames.guessesLeft.toString();


    let solutionGuessed: string = solutionInput.value;
    //console.log(singleLetterInput);
    //alert(letterGuessed);


    //Tabellen med teksten man skal gætte

    while (gameTableRow.childNodes.length) {
      gameTableRow.removeChild(gameTableRow.childNodes[0]);
    }
    

    if (solutionGuessed.toLocaleLowerCase() == JNGames.solution.toLocaleLowerCase()){
      solutionInformationLabel.innerHTML = "Rigtigt gættet!";

      //Tegn løsning
      while (gameTableRow.childNodes.length) {
        gameTableRow.removeChild(gameTableRow.childNodes[0]);
      }
  
      for (let i=0; i<JNGames.solution.length; i++){
  
        let newHTMLCell: HTMLTableCellElement =  document.createElement('td');
        newHTMLCell.id = "HTMLTableDataCellElementid_" + i;
        newHTMLCell.innerHTML = JNGames.solution.substring(i, i+1);
  
        gameTableRow.appendChild(newHTMLCell);
  
      }
    }
    else if (JNGames.guessesLeft == 0){
      solutionInformationLabel.innerHTML = "Ikke flere forsøg! Den rigtige løsning er: " + JNGames.solution;
      singleLetterInput.readOnly = true; 
      solutionInput.readOnly = true; 
      guessLetterButton.disabled = true;
      guessSolutionButton.disabled = true;
    }
    else{
      solutionInformationLabel.innerHTML = "Forkert! Prøv igen.";
    }



    singleLetterInput.value = "";
    solutionInput.value = "";

  
  }


  static guessSingleLetter() {
   
    console.log("JNGames.solutionInProgress", JNGames.solutionInProgress);
    
    let gameTableRow: HTMLElement = document.getElementById('gameTableRow');
    let guessesLeftLabel: HTMLElement = document.getElementById('guessesLeftLabel');
    let singleLetterInput: HTMLInputElement = document.getElementById('singleLetterInput') as HTMLInputElement;
    let solutionInput: HTMLInputElement = document.getElementById('solutionInput') as HTMLInputElement;
    let solutionInformationLabel: HTMLElement = document.getElementById('solutionInformationLabel');
    let guessLetterButton: HTMLButtonElement = document.getElementById('guessLetterButton') as HTMLButtonElement;
    let guessSolutionButton: HTMLButtonElement = document.getElementById('guessSolutionButton') as HTMLButtonElement;
    

    JNGames.guessesLeft--;
    //Label med antal forsøg tilbage
    guessesLeftLabel.innerText = JNGames.guessesLeft.toString();


    let letterGuessed: string = singleLetterInput.value;
    //console.log(singleLetterInput);
    //alert(letterGuessed);


    //Tabellen med teksten man skal gætte

    while (gameTableRow.childNodes.length) {
      gameTableRow.removeChild(gameTableRow.childNodes[0]);
    }

    let newSolutionInProgress: string = "";

    for (let i = 0; i < JNGames.solution.length; i++) {

      let newHTMLCell: HTMLTableCellElement = document.createElement('td');
      newHTMLCell.id = "HTMLTableDataCellElementid_" + i;
      newHTMLCell.innerHTML = JNGames.solutionInProgress.substring(i, i+1);

      if (JNGames.solution.substring(i, i+1).toLocaleLowerCase() == letterGuessed.toLocaleLowerCase()) {
        newHTMLCell.innerHTML = JNGames.solution.substring(i, i+1);
      } 
      
      gameTableRow.appendChild(newHTMLCell);

      //Holder styr på midlertidig løsning
      newSolutionInProgress = newSolutionInProgress.concat(newHTMLCell.innerHTML);

    }//for i

    JNGames.solutionInProgress = newSolutionInProgress;

    if (JNGames.solutionInProgress.toLocaleLowerCase() == JNGames.solution.toLocaleLowerCase()){
      solutionInformationLabel.innerHTML = "Rigtigt gættet!";
    }

    else if (JNGames.guessesLeft == 0){
      solutionInformationLabel.innerHTML = "Ikke flere forsøg! Den rigtige løsning er: " + JNGames.solution;
      singleLetterInput.readOnly = true; 
      solutionInput.readOnly = true; 
      guessLetterButton.disabled = true;
      guessSolutionButton.disabled = true;
    }



    singleLetterInput.value = "";
    solutionInput.value = "";

  }


  public static getRandomInt(min: number, max:number) {
    let min_ceil = Math.ceil(min);
    let max_floor = Math.floor(max);
    return Math.floor(Math.random() * (max_floor - min_ceil + 1)) + min_ceil;
}


}






