var charPlayer = "", 
    charEnemy = "", 
    charNum = "",
    player = "",
    enemy = "";
var selPanel = "#player-selection";
var countAttack = 0;

var charOptions = {
    char1: {
        name: "Obi Wan Kenobi",
        health: 120,
        attack: 8,
        counter: 10,
        img: "assets/images/char1.jpg",
        isAvailable: true
    },
    char2: {
        name: "Luke Skywalker",
        health: 100,
        attack: 4,
        counter: 5,
        img: "assets/images/char2.jpg",
        isAvailable: true
    },
    char3: {
        name: "Darth Sidius",
        health: 150,
        attack: 16,
        counter: 20,
        img: "assets/images/char3.jpg",
        isAvailable: true
    },
    char4: {
        name: "Darth Maul",
        health: 180,
        attack: 20,
        counter: 25,
        img: "assets/images/char4.jpg",
        isAvailable: true
    }
};

//console.log(charOptions.char1.health);

var countChars = Object.keys(charOptions).length;
//console.log(countChars);

charGen();

//set up character selections
function charGen() {
    for(var i = 0; i< (countChars); i++) {
        charNum = ("char" + (i+1));
        //console.log("Character number: " + charNum);

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
                $("<h3>").text(charOptions[charNum].name),
                $("<img>").attr('src', charOptions[charNum].img),
                $("<p>").text("Health: " + charOptions[charNum].health)
            )
    );
}

//set up battle
function battleGen() {
    charNum = charPlayer;
    printChar();

    $("#battle .panel-content").append(
        $("<button>")
            .attr('id', "attack")
            .text("Attack")
    );

    charNum = charEnemy;
    printChar();
}

function logCombat() {
    console.log("logging combat");

    $("#log .panel-content").prepend(
        $("<div class='combat'>").prepend(
            $("<p>")
                .text(`You attacked ${enemy.name} for ${player.attack} damage`),
            $("<p>")
                .text(`${enemy.name} attacked you for ${enemy.attack} damage`)
        )
    );
}

$(document).ready( function() {

    $("#player-selection").on("click", ".character", function() {
        charPlayer = this.id;
        player = charOptions[charPlayer];
        console.log("Player Character: " + charPlayer);

        $(selPanel).addClass("hide");
        //console.log(selPanel);

        selPanel = "#enemy-selection";

        $(selPanel).removeClass("hide");
        //console.log(selPanel);
        
        charGen();
    });

    $("#enemy-selection").on("click", ".character", function() {
        charEnemy = this.id;
        enemy = charOptions[charEnemy];
        console.log("Enemy Character: " + charEnemy);

        $(selPanel).addClass("hide");
        //console.log(selPanel);

        selPanel = "#battle";

        $(selPanel).removeClass("hide");
        //console.log(selPanel);

        battleGen();
    });

    $("#battle").on("click", "#attack", function() {
        //console.log("attack!");
        $("#log").removeClass("hide");

        countAttack++;

        player.attack *= countAttack;
        console.log("Player attack: " + player.attack);

        logCombat();
    });

});