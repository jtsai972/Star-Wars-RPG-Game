var charPlayer, charEnemy, charNum;
var selPanel = "#player-selection";
var selPlayer = true;

charPlayer = charEnemy = charNum = "";

var playerOptions = {
    char1: {
        name: "Obi Wan Kenobi",
        health: 120,
        attack: 8,
        counter: 10,
        img: "assets/images/char1.jpg"
    },
    char2: {
        name: "Luke Skywalker",
        health: 100,
        attack: 4,
        counter: 5,
        img: "assets/images/char2.jpg"
    },
    char3: {
        name: "Darth Sidius",
        health: 150,
        attack: 16,
        counter: 20,
        img: "assets/images/char3.jpg"
    },
    char4: {
        name: "Darth Maul",
        health: 180,
        attack: 20,
        counter: 25,
        img: "assets/images/char4.jpg"
    }
};

console.log(playerOptions.char1.health);

var countChars = Object.keys(playerOptions).length;
console.log(countChars);

//set up character selections
function charGen() {
    for(var i = 0; i< (countChars); i++) {
        charNum = ("char" + (i+1));
        console.log("Character number: " + charNum);

        if(charNum !== charPlayer) {
            printChar();
        }
    }
}

function printChar() {
    $(selPanel + " .panel-content").append(
        $("<figure/>")
            .attr('id', charNum)
            .addClass('character')
            .append(
                $("<h3>").text(playerOptions[charNum].name),
                $("<img>").attr('src', playerOptions[charNum].img),
                $("<p>").text("Health: " + playerOptions[charNum].health)
            )
    );
}

//set up battle
function battleGen() {

}


charGen();

$(document).ready( function() {

    $("#player-selection .character").on("click", function() {
        charPlayer = this.id;
        console.log("Player Character: " + charPlayer);

        $(selPanel).addClass("hide");

        selPanel = "#enemy-selection";

        $(selPanel).removeClass("hide");
        
        charGen();
    });

    $("#player-selection .character").on("click", function() {
        charEnemy = this.id;
        console.log("Enemy Character: " + charEnemy);

        $(selPanel).addClass("hide");

        selPanel = "#battle";

        $(selPanel).removeClass("hide");

        charGen();
    });

});