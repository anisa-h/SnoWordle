
var height = 6; //number of guesses
var width = 5; //length of word

var row = 0; 
var col = 0; 

var gameOver = false; 
var word = "anisa"; //the word to guess


window.onload = function() {
    intialize(); 
}

function intialize() {

    //create the board
    // loop of 30, to create 6 rows and 5 columns
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";  
            document.getElementById("Board").appendChild(tile);
        }
    }
    //key presses
    document.addEventListener("keyup", (e) => {
        if (gameOver) return; //if game is over, do nothing

        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currentTile = document.getElementById(row.toString() + "-" + col.toString());
                if (currentTile.innerText == "") {
                    currentTile.innerText = e.code[3];
                    col += 1;
                                }
                            }
        }
    
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {   
            col -= 1;
        }    

            let currentTile = document.getElementById(row.toString() + "-" + col.toString());
            currentTile.innerText = "";
        }
    
        else if (e.code == "Enter") {
            update();
            row += 1; //start new row 
            col = 0;  // restart to first letter
        }

        if (!gameOver && row == height) {
            gameOver = true; 
            document.getElementById("Answer").innerText = "The word was: " + word;
        }
    
    })
    
}   

function update() {
    let correct = 0; 
    let letterCount = {}; //anisa -> {a: 2, n: 1, i: 1, s: 1}
    for (let i = 0; i < word.length; i++) {
        letter = word[i].toLowerCase();
        if (letterCount[letter]) {
            letterCount[letter] += 1; 
        }
        else{
            letterCount[letter] = 1; 
        }
    }
        // let currentTile = document.getElementById(row.toString() + "-" + c.toString());
        // let letter = currentTile.innerText;
    

//first loop to check for correct letters    
    for (let c = 0; c < width; c++) {
        let currentTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currentTile.innerText;

        if (word[c].toLowerCase() == letter.toLowerCase()) { //if letter is correct
            currentTile.classList.add("correct");
            correct += 1;
            letterCount[letter.toLowerCase()] -= 1; //decrease the count of the letter
        }
             if (correct == width) { //if all letters are correct
                gameOver = true; 
                document.getElementById("Answer").innerText = "You win! The word was: " + word.toUpperCase();
        }
        }
       
        //CHECK IT TWICE! FOR DUPLICATE LETTERS
        for (let c = 0; c < width; c++) {
        let currentTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currentTile.innerText;

            if (!currentTile.classList.contains("correct")) { 
                if (word.toLowerCase().includes(letter.toLowerCase())&&letterCount[letter] > 0) { //if letter is in the word but not in the correct position
                    currentTile.classList.add("present");
                    letterCount[letter.toLowerCase()] -= 1; //decrease the count of the letter
                }
                else { //if letter is not in the word
                    currentTile.classList.add("absent");    
                }
         }
    }
}
