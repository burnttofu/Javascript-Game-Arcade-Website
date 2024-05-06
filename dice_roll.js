const roll_button = document.getElementById('roll_button');

const landed = document.getElementById('result');

roll_button.addEventListener('click', function() {
    //chooses from either 0 or 1
    const heads_or_tails = Math.floor(Math.random() * 6);
    
    if(heads_or_tails === 0){
        answer = '1'
        roll();
    } else if(heads_or_tails === 1){
        answer = '2'
        roll();
    } else if(heads_or_tails === 2){
        answer = '3'
        roll();
    } else if(heads_or_tails === 3){
        answer = '4'
        roll();
    } else if(heads_or_tails === 4){
        answer = '5'
        roll();
    } else if(heads_or_tails === 5){
        answer = '6'
        roll();
    }

    // landed.textContent = answer;
});


function roll() {
    // Check if there's an existing result div
    var result = document.querySelector(".result");

    // update content in result
    if(result) {
        result.innerText = `The dice landed on: ${answer}`;
    } else {
        // If there's no existing result div, create a new one
        var roll = document.createElement("div");
        roll.classList.add("result");

        var result = document.createElement("div");
        result.innerText = `The dice landed on: ${answer}`;

        // Append the result to the roll
        roll.appendChild(result);

        // Append the roll to the body of the document
        document.body.appendChild(roll);
    }
}
