/**
 * Game Singleton MAIN
 *
 * @copyright: (C) 2017 Erin Du, All Rights Reserved.
 * @author:    Erin Du
 * @version:   1.0.0
 *
 */

'use strict';

const MAX_ROWS = 10;
const MAX_COLS = 10;
const MAX_TURNS = 60;
const SHIP_LENGTH_INFO = [5,4,4,3,2];
class App {
    constructor() {

        this.importOtherClasses();

        // check if music is available or not
        if(this.appSoundManager.isSoundAble == true) {
            // start the music
            this.appSoundManager.startMenuBGM();
        } else {
            // show that there is no music
            document.querySelector(".sound-controller").classList.add("off");
        }

        // check if web storage is able to use or not to store the highscore
        this.isStrageAble = typeof(Storage) !== "undefined";
        if (this.isStrageAble) {
            let highscore = localStorage.getItem("highscore");
            if (highscore) {
                document.querySelector(".highscore-board").innerHTML = highscore;
            } else {
                document.querySelector(".highscore-board").innerHTML = "You haven't played yet :D";
            }
        } else {
            document.querySelector("#show-highscore").classList.add("hide");
        }

        // setup handlers except generated elements
        this.setupAppHandlers();

    }

    importOtherClasses() {
        this.utils = new Utils();
        this.appSoundManager = new AppSoundManager();
    }

    newGame() {

        // set as gameFinishedFlg false to allow player click on the field
        this.gameFinishedFlg = false;

        // start game play BGM
        this.appSoundManager.startGameplayBGM();

        // Initialize app data
        this.initAppData();

        // Initialize game data
        this.initFleet();

        // Initialize screen
        this.initScreen();

        // Setup Handlers
        this.setupGameHandlers();
    }

    initAppData() {

        // set the max turns number
        this.turnNum = MAX_TURNS;

    }

    initFleet() {

        // initialize fleet array to put ships in
        this.fleet = new Array(SHIP_LENGTH_INFO.length);

        // as the const infomation, initialize all ships
        for (let i = 0; i < SHIP_LENGTH_INFO.length; i++) {
            let ship = this.initShip(SHIP_LENGTH_INFO[i], "ninja-" + i);
            ship.hitSound = this.appSoundManager.ninja_hit_voices[i];
            ship.defeatSound = this.appSoundManager.ninja_die_voices[i];
            this.fleet[i] = ship;
        }
    }

    initShip(length, id) {

        // id relate a ship to an icon in the page
        let target = new Ship(id, length);

        // loop unless being succeed to return a ship or tring over 200 times to place a ship
        for (let i = 0; i < 200; i++) {

            // define a Ship direction randomly
            if (this.utils.getRandomIntInclusive(0,1) == 1) {
                target.startLocationX = this.utils.getRandomIntInclusive(0, MAX_COLS - 1);
                target.startLocationY = this.utils.getRandomIntInclusive(0, MAX_ROWS - 1 - length);
                target.endLocationX = target.startLocationX;
                target.endLocationY = target.startLocationY + target.length - 1;

            } else {
                target.startLocationX = this.utils.getRandomIntInclusive(0, MAX_COLS - 1 - length);
                target.startLocationY = this.utils.getRandomIntInclusive(0, MAX_ROWS - 1);
                target.endLocationX = target.startLocationX + target.length - 1;
                target.endLocationY = target.startLocationY ;

            }

            // check if the ship overlaped any other ships
            if (this.isAnyShipOverlaped(target)) {

                // continue this loop to find another position to place a ship
                continue;
            }

            return target;
        }

        alert("System Error: Too many ships are defined.");
    }

    isAnyShipOverlaped(target)  {
        // check if the target ship position does overlap to any other ships in the fleet one by one
        for (let i = 0; i < this.fleet.length; i++) {
            if(this.isOverlaped(target, this.fleet[i])) {
                // overlapped
                return true;
            }
        }

        // not overlapped
        return false;
    }

    isOverlaped(target, counterTarget){

        // if there is no counterTarget, just return
        if (!counterTarget) {
            return false;
        }

        // format position infomation for putting in isIntersection function
        let line1 = new Line(target.startLocationX, target.startLocationY, target.endLocationX, target.endLocationY);
        let line2 = new Line(counterTarget.startLocationX, counterTarget.startLocationY, counterTarget.endLocationX, counterTarget.endLocationY);

        // check if the two ships overlapping or not
        if (this.utils.isIentersection(line1, line2)) {
            // overlapped
            return true;
        }

        // not overlapped
        return false;
    }

    initScreen() {
        let gameAreaMarkup = `<table id="game-map">`;

        for (let r = 0; r < MAX_ROWS ;r++) {
            gameAreaMarkup += `<tr>`;

            for (let c = 0; c < MAX_COLS ;c++) {
                gameAreaMarkup += `<td class="field before" data-row="${r}" data-col="${c}"></td>`;
            }

            gameAreaMarkup += `</tr>`;
        }
        gameAreaMarkup += `</table>`;

        document.querySelector("#game-area").innerHTML = gameAreaMarkup;
        document.querySelector("#turn-num").innerHTML = this.turnNum;
    }

    setupAppHandlers() {
        // #single-game button clicked event
        document.querySelector("#single-game").addEventListener('click', (event) => {
            document.querySelector("#menu").classList.add("hide");
            document.querySelector("#game-page").classList.remove("hide");
            document.querySelector("body").classList.remove("main-container");
            this.newGame();
        });
        document.querySelector("#show-highscore").addEventListener('click', (event) => {
            document.querySelector("#menu").classList.add("hide");
            document.querySelector("#highscore").classList.remove("hide");
        });

        // #show-instruction button clicked event
        document.querySelector("#show-instruction").addEventListener('click', (event) => {
            document.querySelector("#menu").classList.add("hide");
            document.querySelector("#instruction").classList.remove("hide");
        });

        // .return-menu button clicked event
        document.querySelectorAll(".return-menu").forEach(returnMenuButtonElement => returnMenuButtonElement.addEventListener('click', (event) => {

            // hide all dialogs
            document.querySelectorAll(".dialog").forEach( (dialogElement) => {
                dialogElement.classList.add("hide");
            });

            // hide all of the other pages
            document.querySelectorAll("#game-page, #instruction, #highscore").forEach( (otherPageElement) => {
                otherPageElement.classList.add("hide");
            });

            // reset ninja-shadows
            document.querySelectorAll(".ninja-shadow").forEach( (ninjaShadowElement) => {
                ninjaShadowElement.classList.remove("hit");
            });

            // hide overlay
            document.querySelector(".overlay").classList.add("hide");

            // show the menu
            document.querySelector("#menu").classList.remove("hide");

            // add class to body to keep the layout
            document.querySelector("body").classList.add("main-container");

            this.appSoundManager.startMenuBGM();
        }));

        // .replay-button clicked event
        document.querySelectorAll(".replay-button").forEach(replayButtonElement =>
            replayButtonElement.addEventListener('click', (event) => {

                // hide all the dialogs
                document.querySelectorAll(".dialog").forEach( (dialogElement) => {
                    dialogElement.classList.add("hide");
                });

                // reset ninja-shadows
                document.querySelectorAll(".ninja-shadow").forEach( (ninjaShadowElement) => {
                    ninjaShadowElement.classList.remove("hit");
                });

                // hide overlay
                document.querySelector(".overlay").classList.add("hide");

                // start a new game
                this.newGame();
        }));

        // .overlay clicked event
        document.querySelector(".overlay").addEventListener('click', (event) => {

            // hide all the dialogs
            document.querySelectorAll(".dialog").forEach( (dialogElement) => {
                dialogElement.classList.add("hide");
            });

            // hide .overlay itself
            event.currentTarget.classList.add("hide");

        });

        // .sound-controller button clicked event
        document.querySelector(".sound-controller").addEventListener('click', (event) => {

            // if it is impossible to use sound, do nothing
            if (!this.appSoundManager.isSoundAble) {
                return;
            }

            let target = event.currentTarget;
            if(target.classList.contains("off")) {
                // turn on the sound
                target.classList.remove("off");
                this.appSoundManager.unmute();
            } else {
                // turn off the sound
                target.classList.add("off");
                this.appSoundManager.mute();
            }

        });
    }

    setupGameHandlers() {

        // game map clicked handler
        document.querySelector("#game-map").addEventListener('click', (event) => {

            // if game have already finished, game field will be unclickable
            if (this.gameFinishedFlg) {
                this.utils.fireClickEvent(".replay-button");
                return;
            }

            // store class list for using it later
            let eventTargetClassList = event.target.classList;

            // avoid this handler fires on a element except .field
            if (!eventTargetClassList.contains("field")) {
                return;
            }

            // if the cell has already clicked before, player can do nothing for it
            if(eventTargetClassList.contains("after")) {
                return;
            };

            // reduce turn num by 1
            this.turnNum -= 1;
            document.querySelector("#turn-num").innerHTML = this.turnNum;

            // get the position of the cell that player clicked
            let pos = {
                r: event.target.getAttribute("data-row"),
                c: event.target.getAttribute("data-col")
            }

            // change the classes of the cell to show it has been already clicked
            eventTargetClassList.remove("before");
            eventTargetClassList.add("after");

            // check if there is a ship
            if(this.hitNinja(pos.r, pos.c)) {
                // if a ship was there, show that player has hit
                eventTargetClassList.add("hit");

            }

            // check if game finished or not
            if (this.playerHasWon()) {
                // player won
                document.querySelector(".dialog.win").classList.remove("hide");
                document.querySelector(".overlay").classList.remove("hide");
                this.gameFinishedFlg = true;
                this.appSoundManager.playVictorySound();

                if (this.isStrageAble) {
                    let highscoreBefore = localStorage.getItem("highscore");

                    if (highscoreBefore < this.turnNum) {
                        // update highscore
                        localStorage.setItem("highscore", this.turnNum);
                        document.querySelector(".dialog.win .message").innerHTML = "You've got a Highscore!";
                    }
                }

            } else if (this.turnNum <= 0) {
                // player lose
                document.querySelector(".dialog.gameover").classList.remove("hide");
                document.querySelector(".overlay").classList.remove("hide");
                this.gameFinishedFlg = true;
                this.appSoundManager.playDefeatSound();

            }

        });
    }

    hitNinja(row, col) {
        // check if there is a ship on the clicked position
        for (let i = 0; i < this.fleet.length; i++) {

            // if both clicked row and col are between the ship positionX and Y, there is a ship
            if(this.fleet[i].startLocationX <= col && col <= this.fleet[i].endLocationX
                && this.fleet[i].startLocationY <= row && row <= this.fleet[i].endLocationY) {

                    // add 1 hit infomation to ship object
                    this.fleet[i].hitSum += 1;

                    if (this.fleet[i].hitSum == this.fleet[i].length) {

                        // store that the ship was defeated
                        this.fleet[i].status = "defeat";

                        // show that the ship was hit
                        document.querySelector("#" + this.fleet[i].id).classList.add("hit");

                        this.appSoundManager.playHitVIO(this.fleet[i].defeatSound);

                    } else {
                        this.appSoundManager.playHitVIOArray(this.fleet[i].hitSound);
                    }

                    return true;

            }
        }

        // if there was no ninja, just give a sound effect of shuriken
        this.appSoundManager.playShurikenSFX();

        return false;
    }

    playerHasWon() {

        // if every ship has defeat status, it means player won
        for (let i = 0; i < this.fleet.length; i++) {
            if(this.fleet[i].status != "defeat") {
                // there is a ship still alive
                return false;
            }
        }

        return true;
    }

    run() {
    }
}

let app = new App();
app.run();
