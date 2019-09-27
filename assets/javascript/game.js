//Variables
    //object
    var charOptions = {
        char1: {
            name: "Obi Wan Kenobi",
            attack: 8,
            baseAttack: 8,
            counter: 10,
            health: 120,
            baseHealth: 120,
            img: "assets/images/char1.jpg",
            isAvailable: true
        },
        char2: {
            name: "Luke Skywalker",
            attack: 4,
            baseAttack: 4,
            counter: 5,
            health: 100,
            baseHealth: 100,
            img: "assets/images/char2.jpg",
            isAvailable: true
        },
        char3: {
            name: "Darth Sidius",
            attack: 16,
            baseAttack: 16,
            counter: 20,
            health: 150,
            baseHealth: 150,
            img: "assets/images/char3.jpg",
            isAvailable: true
        },
        char4: {
            name: "Darth Maul",
            attack: 20,
            baseAttack: 20,
            counter: 25,
            health: 180,
            baseHealth: 180,
            img: "assets/images/char4.jpg",
            isAvailable: true
        }
    };
    var countChars = Object.keys(charOptions).length;
    //String variables
    var playerID = "", 
        enemyID = "", 
        charNum = 0,
        enemyNum = countChars,
        char = "",
        player = "",
        enemy = "",
        logContent = "",
        selPanel = "#player-selection";
    //number variables
    var countAttack = 0;
    //booleans
    var victory = false,
        loss = false;


$(document).ready( function() {
    //Initializing
    charGen();

    //Selecting player character
    $("#player-selection").on("click", ".character", function() {
        //setting id
            playerID = this.id;
            console.log("Player Character: " + playerID);
        //setting player
            player = charOptions[playerID];
            player.isAvailable = false;
            console.log(player.isAvailable);
        //print character in battlezone
            newPlayer();
        //select panel
            selPanel = "#enemy-selection";
        //print characters in enemy selection
        charGen();  
    });
    //Selecting Enemy
    $("#enemy-selection").on("click", ".character", function() {
        //setting id
            enemyID = this.id;
            console.log("Enemy Character: " + enemyID);
        //setting enemy
            enemy = charOptions[enemyID];
            enemy.isAvailable = false;
        //add enemy to battle-zone
            newEnemy();
        //Remove combat log
            $("#log").find(".panel-content").empty();
            $("#log").addClass("hide");
    });

    $("#battle").on("click", "#attack", function() {
        countAttack++;
        player.attack  = (player.baseAttack * countAttack);
        //set health
        player.health -= enemy.counter;
        enemy.health -= player.attack;
        //make the combat log visible
        $("#log").removeClass("hide");

        if(player.health <= 0) {
            loss = true;
            //remove enemy selection
                $("#enemy-selection").find(".panel-content").empty();
                $("#enemy-selection").addClass("hide");
            //empty log
                $("#log").find(".panel-content").empty();
            //hide battlezone
                $("#battle").addClass("hide");
            //check if it hid stuff
                console.log("hidden");
        } 
        if(enemy.health <= 0) {
            victory = true;
            //Remove defeated enemy from enemy selection
                $("#enemy-selection").find("#"+enemyID).remove();
                $("#enemy-selection").removeClass("hide");
            //Empty battlezone enemy and set opacity to 0
                $("#battle").find("#enemy").empty();
                $("#battle #enemy").css("opacity", 0);
            //Remove combat log
                $("#log").find(".panel-content").empty();
            //reset countAttack
                countAttack = 0;
            //reset enemyID
                enemyID = "";
        } 
        updateHealth();
        logCombat();
    });

    $("#log").on("click", "#new-game", function() {
        newGame();
    });

});


//set up character selections
function charGen() {
    for(var i = 0; i< (countChars); i++) {
        charNum = ("char" + (i+1));
        //console.log("Character number: " + charNum);

        if(charOptions[charNum].isAvailable === true){
            console.log("This character isAvailable: " + charNum)
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
                $("<p class='health'>").text("Health: " + charOptions[charNum].health)
            )
    );
}

function newPlayer() {
    //show/hide sections
        $("#player-selection").addClass("hide");
        $("#enemy-selection").removeClass("hide");
    //Print to battlezone
    $("#battle #player")
        .append(
            $("<h3>").text(player.name),
            $("<img>").attr('src', player.img),
            $("<p class='health'>").text("Health: " + player.baseHealth)
        )
}

function newEnemy() {
    enemyNum--;
    console.log(enemyNum);

    if (enemyNum > 0) {
        //set victory and loss
            victory = false;
            loss = false;
        //show/hide panels
            $("#enemy-selection").addClass("hide");
            $("#battle").removeClass("hide");
        // Print the battlezone
        $("#battle #enemy")
            .css("opacity", 1)
            .append(
                $("<h3>").text(enemy.name),
                $("<img>").attr('src', enemy.img),
                $("<p class='health'>").text("Health: " + enemy.baseHealth)
            )
    } else { 

    }
}

function updateHealth() {
    if(loss === true) {
        //resetting player attack and health
        player.attack = player.baseAttack;
        player.health = player.baseHealth;
        //making player an available character to pick again
        //player.isAvailable = true;
    } else if(victory === true) {
        //resetting enemy attack and health
        enemy.attack = enemy.baseAttack;
        enemy.health = enemy.baseHealth;
    } else {
        //logging health stats
        $("#player .health").text(player.health);
        $("#enemy .health").text(enemy.health);
    }
}

function logCombat() {
    if (loss === true) {
        //thing isn't hiding, attempting temp fix
        $("#enemy-selection").addClass("hide");
        //If loss is true
        logContent =
            `<div id="restart">
                <p>You lost!</p>
                <button id="new-game">Try again?</button>
            </div>`
    } else if(victory === true) {
        //checking if there are still enemies left
        if (enemyNum > 1) {
            //If victory is true
            logContent =
            `<p>You won!</p>
            <p>Choose another opponent!</p>`
        } else {
            //If all enemies defeated
            $("#enemy-selection").addClass("hide");
            $("#battle").addClass("hide");

            logContent =
            `<div id="restart">
                <p>You won!</p>
                <p>You have defeated all your opponents!</p>
                <button id="new-game">Play again?</button>
            </div>`;
        }
        
    } else {
        //if still in combat
        logContent = 
            `<p>You attack ${enemy.name} for ${player.attack} damage</p>
            <p>${enemy.name} attacks you for ${enemy.counter} damage</p>`
    }

    //logging attacks to log
    $("#log .panel-content")
        .prepend(
            $("<div class='combat'>")
                .prepend(logContent)
        );
}
function newGame() {
    //setting victory or loss
        victory = false;
        loss = false;
    //remove player and enemy IDs
        playerID = "";
        enemyID = "";
        enemyNum = countChars;
    //make all characters available again
        for(var i = 0; i< (countChars); i++) {
            char = charOptions[("char" + (i+1))];
            char.isAvailable = true;
            char.health = char.baseHealth;
            char.attack = char.baseAttack;
        }
    //empty panels
        $("#enemy-selection").find(".panel-content").empty();
        $("#battle").find("#player").empty();
        $("#battle").find("#enemy").empty();
    //set attacks back to 0
        countAttack = 0;
    //select Panel
        selPanel = "#player-selection";
    //Show panel
        $("#player-selection").removeClass("hide");
    //hide other sections
        $("#enemy-selection").addClass("hide");
        $("#battle").addClass("hide");
        $("#log").addClass("hide");
}