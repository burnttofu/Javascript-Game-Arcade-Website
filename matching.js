const tiles = document.querySelectorAll('.tile');

let is_tile_flipped = false;
let first_flip, second_flip;
let pairs = 0;

function flip_tile(){
    this.classList.add('flip');
    //cancel repeats
    if(this === first_flip){
        return;
    }

    if(is_tile_flipped != true){
        is_tile_flipped = true;
        first_flip = this;
        console.log(is_tile_flipped, first_flip);

    } else{
        is_tile_flipped = false;
        second_flip = this;

        // console.log('in');
        console.log(first_flip, second_flip);

        correct_pair();
    }
}

function correct_pair(){
    if(first_flip.dataset.name === second_flip.dataset.name){
        first_flip.removeEventListener('click', flip_tile);
        second_flip.removeEventListener('click', flip_tile);
        pairs++;
        // console.log('in2');
    } else{
        //Delay immediate reversal of tile flips
        setTimeout(() => {
            first_flip.classList.remove('flip');
            second_flip.classList.remove('flip');
            // console.log('in3');
        }, 750);
    }
}

function shuffle(){
    tiles.forEach(piece => {
        let rng = Math.floor(Math.random()*8);
        console.log("in");
        piece.style.order = rng;
    });
}

tiles.forEach(piece => piece.addEventListener('click', flip_tile));