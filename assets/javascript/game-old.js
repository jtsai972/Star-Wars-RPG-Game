var charPlayer = "", 
    charEnemy = "", 
    charNum = "",
    charType = "",
    player = "",
    enemy = "";
var selPanel = "#player-selection";
var countAttack = 0;
var victory = false,
    loss = false;

var charOptions = {
    char1: {
        name: "Obi Wan Kenobi",
        health: 120,
        fullHealth: 120,
        attack: 8,
        counter: 10,
        img: "assets/images/char1.jpg",
        isAvailable: true
    },
    char2: {
        name: "Luke Skywalker",
        health: 100,
        fullHealth: 100,
        attack: 4,
        counter: 5,
        img: "assets/images/char2.jpg",
        isAvailable: true
    },
    char3: {
        name: "Darth Sidius",
        health: 150,
        fullHealth: 150,
        attack: 16,
        counter: 20,
        img: "assets/images/char3.jpg",
        isAvailable: true
    },
    char4: {
        name: "Darth Maul",
        health: 180,
        fullHealth: 180,
        attack: 20,
        counter: 25,
        img: "assets/images/char4.jpg",
        isAvailable: true
    }
};

//console.log(charOptions.char1.health); //making sure stuff works

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
    if(charOptions[charNum].isAvailable = true){
        console.log("Is this available? yes")
        $(selPanel + " .panel-content").append(
            $("<figure/>")
                .attr('id', charNum)
                .addClass('character')
                .append(
                    $("<h3>").text(charOptions[charNum].name),
                    $("<img>").attr('src', charOptions[charNum].img),
                    $("<p class='health'>").text("Health: " + charOptions[charNum].health)
                )
        );
    }
}

function printBattle(charNum) {
    $(selPanel + " .panel-content figure" + charType)
        .attr('id', charNum)
        .addClass('character')
        .append(
            $("<h3>").text(charOptions[charNum].name),
            $("<img>").attr('src', charOptions[charNum].img),
            $("<p class='health'>").text("Health: " + charOptions[charNum].health)
        );
    console.log("Print battle");
}

function newPlayer() {
    selPanel = "#battle";
    charNum = charPlayer;
    charType = "#player";
    printBattle(charNum);
    $("#" +charNum + " .health").attr("id", "player-health");
    console.log("print player")
}

function newEnemy() {
    victory = false;
    charNum = charEnemy;
    charType = "#enemy";
    $("#battle #enemy").css("opacity", 1);
    printBattle(charNum);
    $("#" +charNum + " .health").attr("id", "enemy-health");
    console.log("print enemy")
}

function logCombat() {
    console.log("logging combat");

    if (victory === true) {
        $("#log .panel-content").prepend(
            $("<div class='combat'>").prepend(
                $("<p>").text(`You won! Pick a new enemy`)
            )
        );
    } else if (loss === true) {
        $("#log .panel-content").prepend(
            $("<div class='combat'>").prepend(
                $("<p>").text(`You were defeated. Pick a new character`)
            )
        );
    }else {
        $("#log .panel-content").prepend(
            $("<div class='combat'>").prepend(
                $("<p>")
                    .text(`You attacked ${enemy.name} for ${player.attack * countAttack} damage`),
                $("<p>")
                    .text(`${enemy.name} attacked you for ${enemy.attack} damage`)
            )
        );
    }    
}

function printHealth() {
    $("#player-health.health").text("Health: " + player.health);
    $("#enemy-health.health").text("Health: " +enemy.health);

    console.log("Player Health: " + player.health);
    console.log("Enemy Health: " + enemy.health);
}

function newGame() {
    var selPanel = "#player-selection";
    var countAttack = 0;
    var victory = false,
        loss = false;
    
    for(var i = 0; i< (countChars); i++) {
        charNum = ("char" + (i+1));
        //console.log("Character number: " + charNum);
        charOptions[charNum].isAvailable = true;
        charOptions[charNum].health = charOptions[charNum].fullHealth;
    }

    $("#player-selection").removeClass("hide");
    $("#battle").find("#player").empty();
    $("#battle").find("#enemy").empty();
}

$(document).ready( function() {

    $("#player-selection").on("click", ".character", function() {
        charPlayer = this.id;
        player = charOptions[charPlayer];
        console.log("Player Character: " + charPlayer);

        player.isAvailable = false;

        $(selPanel).addClass("hide");
        //console.log(selPanel);

        //print character in battlezone
        charNum = charPlayer;
        console.log(charNum);
        newPlayer();

        selPanel = "#enemy-selection";

        $(selPanel).removeClass("hide");
        //console.log(selPanel);
        
        //print characters in enemy selection
        charGen();

        
    });

    $("#enemy-selection").on("click", ".character", function() {
        charEnemy = this.id;
        enemy = charOptions[charEnemy];
        console.log("Enemy Character: " + charEnemy);

        victory = false;
        enemy.isAvailable = false;

        selPanel = "#enemy-selection";

        $(selPanel).addClass("hide");
        //console.log(selPanel);
        charNum = charEnemy;
        console.log(charNum);
        selPanel = "#battle";
        newEnemy();

        $(selPanel).removeClass("hide");
        //console.log(selPanel);
    });

    $("#battle").on("click", "#attack", function() {
        //console.log("attack!");
        $("#log").removeClass("hide");

        countAttack++;
        console.log("Attack: " + countAttack);

        /* player.attack * countAttack;
        console.log("Player attack: " + player.attack); */

        //set health
        player.health -= enemy.counter;
        enemy.health -= (player.attack * countAttack);

        if(player.health <= 0) {
            loss = true;
            newGame();
        } 
        if(enemy.health <= 0) {
            victory = true;
            //newEnemy
            $("#enemy-selection").find("#"+charEnemy).remove();
            $("#enemy-selection").removeClass("hide");

            $("#battle").find("#" + charEnemy).empty();
            $("#battle #enemy").css("opacity", 0);
            $("#log").find(".combat").remove();
            //$("#battle .panel-content").empty();

            countAttack = 0;

        } 
        
        printHealth();
        logCombat();
    });

});