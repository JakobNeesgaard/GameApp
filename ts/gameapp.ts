
//import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
//const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')



console.log('start2!');
//alert('fsdf2');

let supabaseX = null;

 async function setupSupabase(supabase){

  supabaseX = supabase;

  const { data, error } = await supabase
  .from('activeGame')
  .select();

  console.log('data, error: ', data,error);


  const mySubscription = supabase
  .from('activeGame')
  .on('INSERT', payload => {
    JNGames2.activeGame_insertRecieved(payload);
    
  })
  .subscribe();


  const mySubscription2 = supabase
  .from('activeMove')
  .on('INSERT', payload => {
    JNGames2.activeMove_insertRecieved(payload);
    
  })
  .subscribe();


}

document.addEventListener('DOMContentLoaded', run, false);

function run() {

  //alert('test31');

 let game: JNGames2 = new JNGames2();
  game.Go();
    
}


class JNGames2 {
 

  public static GamesList: Array<string> = [ "København", "Helsinki", "Amsterdam", "Reykjavik", "Oslo", "Lissabon", "Madrid", "London", "Stockholm", "Prag",
  "Berlin", "Budapest", "Wien", "Riga", "Tallinn", "Tirana", "Athen", "Vilnius", "Bern", "Rom", "Dublin",];

  public static solution: string = "";
  public static solutionInProgress: string = "";
  public static playerActive: number = null; 
  public static activeGameID: number = null; 


  public Go(){
    let newGameButton: HTMLElement = document.getElementById('newGameButton');
    let joinGameButton: HTMLElement = document.getElementById('joinGameButton');
    let guessLetterButton: HTMLButtonElement = document.getElementById('guessLetterButton') as HTMLButtonElement;
    let guessSolutionButton: HTMLButtonElement = document.getElementById('guessSolutionButton') as HTMLButtonElement;

    newGameButton.addEventListener('click',  function(){ JNGames2.startGame(); }, false);
    joinGameButton.addEventListener('click',  function(){ JNGames2.joinGame(); }, false);

    guessLetterButton.addEventListener('click',   JNGames2.guessSingleLetter, false);
    guessSolutionButton.addEventListener('click',   JNGames2.guessSolutionButton, false);

    newGameButton.style.display = "block";
    joinGameButton.style.display = "none";

  }


  public static async startGame(){

    
    let gameTableRow: HTMLElement = document.getElementById('gameTableRow');
    let guessesLeftLabel: HTMLElement = document.getElementById('guessesLeftLabel');
    let singleLetterInput: HTMLInputElement = document.getElementById('singleLetterInput') as HTMLInputElement;
    let solutionInput: HTMLInputElement = document.getElementById('solutionInput') as HTMLInputElement;
    let solutionInformationLabel: HTMLElement = document.getElementById('solutionInformationLabel');
    let playerActiveLabel: HTMLElement = document.getElementById('playerActiveLabel');
    let newGameButton: HTMLButtonElement = document.getElementById('newGameButton') as HTMLButtonElement;
    let joinGameButton: HTMLButtonElement = document.getElementById('newGamejoinGameButtonButton') as HTMLButtonElement;


    singleLetterInput.readOnly = true; 
    solutionInput.readOnly = true; 
    solutionInformationLabel.innerHTML = "";
    JNGames2.playerActive = 1;
    playerActiveLabel.innerHTML = "Player1";
    


    let n:number = JNGames2.getRandomInt(0, JNGames2.GamesList.length - 1);
    //alert(JNGames.GamesList[i]);
    let solution: string = JNGames2.GamesList[n];
    JNGames2.solution = solution;

    console.log("solution: ", solution);

    JNGames2.solutionInProgress = "-------------------".substring(0, solution.length);


    //Gæt med bogstav
    let guessLetterButton: HTMLButtonElement = document.getElementById('guessLetterButton') as HTMLButtonElement;
    guessLetterButton.disabled = true;



    //Gæt hele ordet
    let guessSolutionButton: HTMLButtonElement = document.getElementById('guessSolutionButton') as HTMLButtonElement;
    guessSolutionButton.disabled = true;

    

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


    //Alle tidligere spil sættes som inaktive
    const { data, error } = await supabaseX
      .from('activeGame')
      .update({ activeGame: 0 })
  


    //Indsæt række i tabellen med aktivt spil igang
    const { data2, error2 } = await supabaseX
      .from('activeGame')
      .insert([
        { solution: solution, active: 1, player1Joined: 1, player2Joined: 0,  }
      ])


  console.log('Indsæt række: data, error: ', data2, error2);

  }


  public static async joinGame(){

    
    let gameTableRow: HTMLElement = document.getElementById('gameTableRow');
    let guessesLeftLabel: HTMLElement = document.getElementById('guessesLeftLabel');
    let singleLetterInput: HTMLInputElement = document.getElementById('singleLetterInput') as HTMLInputElement;
    let solutionInput: HTMLInputElement = document.getElementById('solutionInput') as HTMLInputElement;
    let solutionInformationLabel: HTMLElement = document.getElementById('solutionInformationLabel');
    let playerActiveLabel: HTMLElement = document.getElementById('playerActiveLabel');
    let newGameButton: HTMLButtonElement = document.getElementById('newGameButton') as HTMLButtonElement;
    let joinGameButton: HTMLButtonElement = document.getElementById('joinGameButton') as HTMLButtonElement;


    singleLetterInput.readOnly = false; 
    solutionInput.readOnly = false; 
    solutionInformationLabel.innerHTML = "";
    JNGames2.playerActive = 2;
    playerActiveLabel.innerHTML = "Player2";

    newGameButton.style.display = "block";
    newGameButton.disabled = true;
    joinGameButton.style.display = "block";
    joinGameButton.disabled = true;


    //Indsæt række i tabellen med aktivt spil igang
    const { data, error } = await supabaseX
      .from('activeGame')
      .insert([
        { solution: JNGames2.solution, active: 1, player1Joined: 1, player2Joined: 1,  }
      ])

   

  }

  public static activeGame_insertRecieved(payload: any) {

    let gameTableRow: HTMLElement = document.getElementById('gameTableRow');
    let guessesLeftLabel: HTMLElement = document.getElementById('guessesLeftLabel');
    let singleLetterInput: HTMLInputElement = document.getElementById('singleLetterInput') as HTMLInputElement;
    let solutionInput: HTMLInputElement = document.getElementById('solutionInput') as HTMLInputElement;
    let guessLetterButton: HTMLButtonElement = document.getElementById('guessLetterButton') as HTMLButtonElement;
    let guessSolutionButton: HTMLButtonElement = document.getElementById('guessSolutionButton') as HTMLButtonElement;

    let solutionInformationLabel: HTMLElement = document.getElementById('solutionInformationLabel');
    let playerActiveLabel: HTMLElement = document.getElementById('playerActiveLabel');
    let newGameButton: HTMLButtonElement = document.getElementById('newGameButton') as HTMLButtonElement;
    let joinGameButton: HTMLButtonElement = document.getElementById('joinGameButton') as HTMLButtonElement;


    console.log('Change received!', payload);

    let solution: string = payload.new.solution;
    let player1Joined: boolean = payload.new.player1Joined;
    let player2Joined: boolean = payload.new.player2Joined;
    let activeGameID = payload.new.id;
    


    //Player1 har trykket "start"
    if (player1Joined == true && player2Joined == false){

     
      //Sæt op for spiller to
      if (JNGames2.playerActive == null){
        JNGames2.playerActive = 2; //Vigtig, da player2 nu sættes som aktiv i det aktuelle browser
        JNGames2.solution = solution; //Vigtig, da solution nu sættes i den aktuelle browser

        playerActiveLabel.innerHTML = "Player2";

        newGameButton.style.display = "none";
        joinGameButton.style.display = "block";
        joinGameButton.disabled = false;
  
        solutionInformationLabel.innerText = "";

        while (gameTableRow.childNodes.length) {
          gameTableRow.removeChild(gameTableRow.childNodes[0]);
        }
    
        for (let i=0; i<solution.length; i++){
    
          let newHTMLCell: HTMLTableCellElement =  document.createElement('td');
          
          newHTMLCell.id = "HTMLTableDataCellElementid_" + i;
          newHTMLCell.innerHTML = "-";
    
          gameTableRow.appendChild(newHTMLCell);
    
        }


      };
        

      //Sæt op for spiller 1
      if (JNGames2.playerActive == 1)
      {
        solutionInformationLabel.innerText = "Afventer player 2";

        newGameButton.style.display = "block";
        joinGameButton.style.display = "block";
        newGameButton.disabled = true;
        joinGameButton.disabled = true;

      }
    }//Første insert


    //Player2 har trykket "join"
    if (player1Joined == true && player2Joined == true){


      //Det aktive spil er defineret ved den række der (nu) er indsat:
      JNGames2.activeGameID = payload.new.id;

      //Spiller1 er klar til at spille
      if (JNGames2.playerActive == 1){

        singleLetterInput.readOnly = false;
        solutionInput.readOnly = false;
        guessLetterButton.disabled = false;
        guessSolutionButton.disabled = false;

        solutionInformationLabel.innerText = "";

      }
      //Spiller2 afventer
      if (JNGames2.playerActive == 2){

          singleLetterInput.readOnly = true;
          solutionInput.readOnly = true;
          guessLetterButton.disabled = true;
          guessSolutionButton.disabled = true;

          solutionInformationLabel.innerText = "Afventer player 1";
  
        }


    }

  }



  public static async guessSingleLetter(){

    console.log('guessSingleLetter');

    let gameTableRow: HTMLElement = document.getElementById('gameTableRow');
    let guessesLeftLabel: HTMLElement = document.getElementById('guessesLeftLabel');
    let singleLetterInput: HTMLInputElement = document.getElementById('singleLetterInput') as HTMLInputElement;
    let solutionInput: HTMLInputElement = document.getElementById('solutionInput') as HTMLInputElement;
    let solutionInformationLabel: HTMLElement = document.getElementById('solutionInformationLabel');
    let guessLetterButton: HTMLButtonElement = document.getElementById('guessLetterButton') as HTMLButtonElement;
    let guessSolutionButton: HTMLButtonElement = document.getElementById('guessSolutionButton') as HTMLButtonElement;
    let newGameButton: HTMLButtonElement = document.getElementById('newGameButton') as HTMLButtonElement;
    let joinGameButton: HTMLButtonElement = document.getElementById('newGamejoinGameButtonButton') as HTMLButtonElement;


    let letterGuessed: string = singleLetterInput.value;
  

    //Tabellen med teksten man skal gætte

    while (gameTableRow.childNodes.length) {
      gameTableRow.removeChild(gameTableRow.childNodes[0]);
    }

    let newSolutionInProgress: string = "";

    for (let i = 0; i < JNGames2.solution.length; i++) {

      let newHTMLCell: HTMLTableCellElement = document.createElement('td');
      newHTMLCell.id = "HTMLTableDataCellElementid_" + i;
      newHTMLCell.innerHTML = JNGames2.solutionInProgress.substring(i, i+1);

      if (JNGames2.solution.substring(i, i+1).toLocaleLowerCase() == letterGuessed.toLocaleLowerCase()) {
        newHTMLCell.innerHTML = JNGames2.solution.substring(i, i+1);
      } 
      
      gameTableRow.appendChild(newHTMLCell);

      //Holder styr på midlertidig løsning
      newSolutionInProgress = newSolutionInProgress.concat(newHTMLCell.innerHTML);

    }//for i

    JNGames2.solutionInProgress = newSolutionInProgress;

   

    singleLetterInput.readOnly = true; 
    solutionInput.readOnly = true; 
    guessLetterButton.disabled = true;
    guessSolutionButton.disabled = true;
  
    singleLetterInput.value = "";
    solutionInput.value = "";

    let playerActiveX = JNGames2.playerActive;
 
    if (JNGames2.solutionInProgress.toLocaleLowerCase() == JNGames2.solution.toLocaleLowerCase()){
      solutionInformationLabel.innerHTML = "Rigtigt gættet!";
      JNGames2.playerActive = null;
     
    }



      //Indsæt række i tabellen med aktivt spil igang
      const { data, error } = await supabaseX
      .from('activeMove')
      .insert([
        { activeGameID: JNGames2.activeGameID, guessTypeID: 1, partlyGuessedSolution: JNGames2.solutionInProgress, guess:letterGuessed,  playerNumber: playerActiveX,  }
      ])

      

  }




  public static async guessSolutionButton(){

    
    console.log('guessSolutionButton');

    let gameTableRow: HTMLElement = document.getElementById('gameTableRow');
    let guessesLeftLabel: HTMLElement = document.getElementById('guessesLeftLabel');
    let singleLetterInput: HTMLInputElement = document.getElementById('singleLetterInput') as HTMLInputElement;
    let solutionInput: HTMLInputElement = document.getElementById('solutionInput') as HTMLInputElement;
    let solutionInformationLabel: HTMLElement = document.getElementById('solutionInformationLabel');
    let guessLetterButton: HTMLButtonElement = document.getElementById('guessLetterButton') as HTMLButtonElement;
    let guessSolutionButton: HTMLButtonElement = document.getElementById('guessSolutionButton') as HTMLButtonElement;
    let newGameButton: HTMLButtonElement = document.getElementById('newGameButton') as HTMLButtonElement;
    let joinGameButton: HTMLButtonElement = document.getElementById('newGamejoinGameButtonButton') as HTMLButtonElement;

    let solutionGuessed: string = solutionInput.value;
  

    singleLetterInput.readOnly = true; 
    solutionInput.readOnly = true; 
    guessLetterButton.disabled = true;
    guessSolutionButton.disabled = true;
  
    singleLetterInput.value = "";
    solutionInput.value = "";
  
    let playerActiveX = JNGames2.playerActive;

    if (solutionGuessed.toLocaleLowerCase() == JNGames2.solution.toLocaleLowerCase()){

      solutionInformationLabel.innerHTML = "Rigtigt gættet!" + " Player" + playerActiveX + " har vundet";
     
      newGameButton.disabled = false;

      JNGames2.playerActive = null;

      //Tegn løsning
      while (gameTableRow.childNodes.length) {
        gameTableRow.removeChild(gameTableRow.childNodes[0]);
      }

      for (let i=0; i<JNGames2.solution.length; i++){

        let newHTMLCell: HTMLTableCellElement =  document.createElement('td');
        newHTMLCell.id = "HTMLTableDataCellElementid_" + i;
        newHTMLCell.innerHTML = JNGames2.solution.substring(i, i+1);

        gameTableRow.appendChild(newHTMLCell);

      }
     
    }

    //Indsæt række i tabellen med aktivt spil igang
    const { data, error } = await supabaseX
    .from('activeMove')
    .insert([
      { activeGameID: JNGames2.activeGameID, guessTypeID: 2, partlyGuessedSolution: JNGames2.solutionInProgress, guess:solutionGuessed,  playerNumber: playerActiveX,  }
    ])



  }




  public static activeMove_insertRecieved(payload: any) {

    let gameTableRow: HTMLElement = document.getElementById('gameTableRow');
    let guessesLeftLabel: HTMLElement = document.getElementById('guessesLeftLabel');
    let singleLetterInput: HTMLInputElement = document.getElementById('singleLetterInput') as HTMLInputElement;
    let solutionInput: HTMLInputElement = document.getElementById('solutionInput') as HTMLInputElement;
    let guessLetterButton: HTMLButtonElement = document.getElementById('guessLetterButton') as HTMLButtonElement;
    let guessSolutionButton: HTMLButtonElement = document.getElementById('guessSolutionButton') as HTMLButtonElement;

    let solutionInformationLabel: HTMLElement = document.getElementById('solutionInformationLabel');
    let playerActiveLabel: HTMLElement = document.getElementById('playerActiveLabel');
    let newGameButton: HTMLButtonElement = document.getElementById('newGameButton') as HTMLButtonElement;
    let joinGameButton: HTMLButtonElement = document.getElementById('joinGameButton') as HTMLButtonElement;


    console.log('Change received!', payload);

    let guessTypeID: number = payload.new.guessTypeID; //1 == bogstav. 2 == hel løsning
    let guess: string = payload.new.guess;
    let partlyGuessedSolution: string = payload.new.partlyGuessedSolution;
    let playerNumber: number = payload.new.playerNumber; //Den spiller som lige har udført et træk


    JNGames2.solutionInProgress = partlyGuessedSolution;

    solutionInformationLabel.innerHTML = "Player" + playerNumber + " gættede på: " + guess + ". Afventer player" + (playerNumber == 1 ? 2 : 1) + "...";

    singleLetterInput.readOnly = playerNumber == JNGames2.playerActive ? true : false; 
    solutionInput.readOnly = playerNumber == JNGames2.playerActive ? true : false; 
    guessLetterButton.disabled = playerNumber == JNGames2.playerActive ? true : false; 
    guessSolutionButton.disabled = playerNumber == JNGames2.playerActive ? true : false; 
  
    singleLetterInput.value = "";
    solutionInput.value = "";

    //Tabellen med teksten man skal gætte

    while (gameTableRow.childNodes.length) {
      gameTableRow.removeChild(gameTableRow.childNodes[0]);
    }

    for (let i = 0; i < JNGames2.solution.length; i++) {

      let newHTMLCell: HTMLTableCellElement = document.createElement('td');
      newHTMLCell.id = "HTMLTableDataCellElementid_" + i;
      newHTMLCell.innerHTML = partlyGuessedSolution.substring(i, i+1);
      gameTableRow.appendChild(newHTMLCell);

    }//for i


    if (guessTypeID == 1 && partlyGuessedSolution.toLocaleLowerCase() == JNGames2.solution.toLocaleLowerCase()){

      solutionInformationLabel.innerHTML += "<br>" + "Rigtigt gættet!" + " Player" + playerNumber + " har gættet på " + guess + " og har vundet.";
     
      newGameButton.disabled = false;

      singleLetterInput.readOnly = true; 
      solutionInput.readOnly = true; 
      guessLetterButton.disabled = true; 
      guessSolutionButton.disabled = true; 

      JNGames2.playerActive = null;
      JNGames2.solutionInProgress = "";
      JNGames2.activeGameID = null;

      while (gameTableRow.childNodes.length) {
        gameTableRow.removeChild(gameTableRow.childNodes[0]);
      }
  
      for (let i = 0; i < JNGames2.solution.length; i++) {
  
        let newHTMLCell: HTMLTableCellElement = document.createElement('td');
        newHTMLCell.id = "HTMLTableDataCellElementid_" + i;
        newHTMLCell.innerHTML = JNGames2.solution.substring(i, i+1);
        gameTableRow.appendChild(newHTMLCell);
  
      }//for i

    }


    if (guessTypeID == 2 && guess.toLocaleLowerCase() == JNGames2.solution.toLocaleLowerCase()){

      solutionInformationLabel.innerHTML += "<br>" + "Rigtigt gættet!" + " Player" + playerNumber + " har gættet på " + guess + " og har vundet";
     
      newGameButton.disabled = false;

      singleLetterInput.readOnly = true; 
      solutionInput.readOnly = true; 
      guessLetterButton.disabled = true; 
      guessSolutionButton.disabled = true; 

      JNGames2.playerActive = null;
      JNGames2.solutionInProgress = "";
      JNGames2.activeGameID = null;
   


      while (gameTableRow.childNodes.length) {
        gameTableRow.removeChild(gameTableRow.childNodes[0]);
      }
  
      for (let i = 0; i < JNGames2.solution.length; i++) {
  
        let newHTMLCell: HTMLTableCellElement = document.createElement('td');
        newHTMLCell.id = "HTMLTableDataCellElementid_" + i;
        newHTMLCell.innerHTML = JNGames2.solution.substring(i, i+1);
        gameTableRow.appendChild(newHTMLCell);
  
      }//for i

    }

  }




  public static getRandomInt(min: number, max:number) {
    let min_ceil = Math.ceil(min);
    let max_floor = Math.floor(max);
    return Math.floor(Math.random() * (max_floor - min_ceil + 1)) + min_ceil;
  }



}//class JNGames2





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






