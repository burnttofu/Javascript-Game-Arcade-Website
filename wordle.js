import { WORDS } from "./words.js";

const max_guesses = 6;
let remaining_attempts = max_guesses;
let current_attempt = [];
let next_position = 0;
let target_word = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(target_word)

function create_board() {
    let board = document.getElementById("game");
    //We want to create a board of a 5 by 6 grid
    for (let i = 0; i < max_guesses; i++) {
        let row = document.createElement("div");
        row.className = "guess-row";
        //all boxes are chiildren of the row
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div");
            box.className = "guess-box";
            row.appendChild(box);
        }

        board.appendChild(row);
    }
}


function checkGuess () {
    let row = document.getElementsByClassName("guess-row")[6 - remaining_attempts];
    let guess_string = '';
    let correct = Array.from(target_word);

    for (const val of current_attempt) {
        guess_string += val;
    }

    if (guess_string.length != 5) {
        error("Not enough characters!");
        return;
    }

    if (!WORDS.includes(guess_string)) {
        error("Word is not in the list!");
        return;
    }

    
    for (let i = 0; i < 5; i++) {
        let letter_color = '';
        let box = row.children[i];
        let letter = current_attempt[i];
        
        let letterPosition = correct.indexOf(current_attempt[i]);
        // is letter in the correct guess
        if (letterPosition === -1) {
            letter_color = 'grey';
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (current_attempt[i] === correct[i]) {
                // shade green 
                letter_color = 'green';
            } else {
                // shade box yellow
                letter_color = 'yellow';
            }

            correct[letterPosition] = "#";
        }

        
        box.style.backgroundColor = letter_color;
        shadeKeyBoard(letter, letter_color);
 
    }

    if (guess_string === target_word) {
        victory_message();
        remaining_attempts = 0;
        return
    } else {
        remaining_attempts--;
        current_attempt = [];
        next_position = 0;

        if (remaining_attempts === 0) {
            defeat_message();
        }
    }
}

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target;
    
    if (!target.classList.contains("keyboard-button")) {
        return;
    }
    let key = target.textContent;
    
    if (key === "Del") {
        key = "Backspace";
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}));
})

function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor;
            if (oldColor === 'green') {
                return;
            } 

            if (oldColor === 'yellow' && color !== 'green') {
                return;
            }

            elem.style.backgroundColor = color;
            break;
        }
    }
}


function place_letter (pressed_letter) {
    if (next_position === 5) {
        return;
    }
    pressed_letter = pressed_letter.toLowerCase();
    console.log("hi");

    let row = document.getElementsByClassName("guess-row")[6 - remaining_attempts];
    // console.log(row.children);
    let box = row.children[next_position];
    box.textContent = pressed_letter;
    box.classList.add("guess-box");
    current_attempt.push(pressed_letter);
    next_position++;
}

function victory_message() {
    var message = document.createElement("div");
    message.classList.add("message");

    var victory_display = document.createElement("div");
    victory_display.classList.add("victory_display");
    victory_display.innerText = "Congratulations you won!";
    
    // Append the big text message to the overlay
    message.appendChild(victory_display);
    
    // Append the overlay to the body of the document
    document.body.appendChild(message);
}

function defeat_message(){
    var message = document.createElement("div");
    message.classList.add("message");

    var defeat_display = document.createElement("div");
    defeat_display.classList.add("defeat_display");
    defeat_display.innerText = `The correct word was: "${target_word}"`;
    
    // Append the big text message to the overlay
    message.appendChild(defeat_display);
    
    // Append the overlay to the body of the document
    document.body.appendChild(message);
}



function error(message) {
    var error = document.getElementById("error");
    error.textContent = message;
    error.style.display = "block";
    error.classList.add("error");
    setTimeout(function() {
        error.style.display = "none";
    }, 3000); 
}




create_board();

document.addEventListener("keyup", (e) => {

    if (remaining_attempts === 0) {
        return;
    }

    let pressed_letter = String(e.key)
    if (pressed_letter === "Backspace" && next_position !== 0) {
        let row = document.getElementsByClassName("guess-row")[6 - remaining_attempts];
        let box = row.children[next_position - 1];
        box.textContent = "";
        // box.classList.remove("guess-box");
        current_attempt.pop();
        next_position--;
        return;
    }

    if (pressed_letter === "Enter") {
        checkGuess();
        return;
    }

    //is searching pressed_letter for any lowercase letters and storing matches
    let found = /[a-z]/gi.test(pressed_letter);
    if (!found || found.length > 1) {
        return;
    } else {
        place_letter(pressed_letter);
    }
})