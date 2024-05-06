const flip_button = document.getElementById('flip_button');

const landed = document.getElementById('result');

flip_button.addEventListener('click', function() {
    //chooses from either 0 or 1
    const heads_or_tails = Math.floor(Math.random() * 2);
    
    if(heads_or_tails === 0){
        answer = 'Heads'
        spin()
    } else{
        answer = 'Tails'
        spin()
    }

    // landed.textContent = answer;
});


function spin() {
    // Check if there's an existing result div
    var result = document.querySelector(".result");

    // update content in result
    if(result) {
        result.innerText = `The coin landed on: ${answer}`;
    } else {
        // If there's no existing result div, create a new one
        var roll = document.createElement("div");
        roll.classList.add("result");

        var result = document.createElement("div");
        result.innerText = `The coin landed on: ${answer}`;

        // Append the result to the roll
        roll.appendChild(result);

        // Append the roll to the body of the document
        document.body.appendChild(roll);
    }
}