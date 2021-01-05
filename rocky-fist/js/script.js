/*
    NOTE TO-DO list



        JS for App
        1. Make matchUp function iterate every second
        2. Make player stats change based on upgrades purchased

            Money
            - If money.balance is insufficient, upgrade click shows "insufficient balance", if money.balance has enough balance, money balance is deducted and upgrade will be applied
            - Format number as currency with comma only on display

            Basic Upgrades
            - health.maxHealth goes up one per endurance training upgrade, caps at 12
            - fist.progress goes up by fist.progressRate, up to 100 per strength training upgrade. Once fist.progress reaches 100, fist.strength increases by 0.5, caps at 2.5
            - money.prizeRate doubles per News Coverage, caps at 200

            Advanced upgrades
            - Protein Shake increases fist.progressRate to 5, not purchasable after the first purchase
            - Peloton bike maxes out health.maxHealth (12) and fist.strength (2.5), not purchaseable after the first purchase
            - Agency Contract makes News Coverage to quadraple instead of double, not purchasable after the first upgrade




        JS for DOM
        1. Handle clicks for each upgrades
        2. Make stats UIs update based on player variables
        3. Make rounds progress bar update per stage



        
*/

// NOTE JS for App

    // NOTE VARIABLES

        // player
        const rocky = {
            health: {
                remainingHealth: 2,
                maxHealth: 2
            },
            fist: {
                strength: 1,
                progress: 0,
                progressRate: 1,
            },
            money: {
                balance: 0,
                prizeRate: 50,
            },
            kos: 0,
        }

        // enemy
        class Enemy {
            constructor(){
                this.health = 1
                this.fist = Math.floor(Math.random() * Math.floor(3))
            }
        }

        // rounds
        const rounds = {
            round1: [],
            round2: [],
            round3: [],
            round4: [],
            round5: [],
        }

    // NOTE FUNCTIONS

        // generate enemy
            // creates a number of enemies specified in an array

        const generateEnemy = function (arr, num) {
            for(let i = 0; i < num; i++){
                arr[i] = new Enemy()
            }
        }

        // generate round
            // creates specified number of enemies for each round

        const generateRounds = function () {
            generateEnemy(rounds.round1, 3);
            generateEnemy(rounds.round2, 5);
            generateEnemy(rounds.round3, 10);
            generateEnemy(rounds.round4, 15);
            generateEnemy(rounds.round5, 20);
        }

        // recoverHealth

        const recoverHealth = function() {
            rocky.health.remainingHealth = rocky.health.maxHealth
        }

        // fight
            // compares fist strength and takes away rocky or enemy's health. If rocky wins, rocky makes money

        const fight = function(enemy) {
            if (rocky.fist.strength < enemy.fist) {
                rocky.health.remainingHealth --
                console.log('enemy wins!');
            } else if (rocky.fist.strength > enemy.fist) {
                enemy.health --
                rocky.money.balance += rocky.money.prizeRate
                console.log('rocky wins!');
            } else {
                console.log('tied');
            }
        }

        // match up
            // recovers rocky's remaining health, calls generate rounds function, calls fight function

        const matchUp = function () {

            recoverHealth()

            generateRounds()

            const matchList = Object.values(rounds)

            for (let i = 0; i <= matchList.length-1; i++) {
                // NOTE make changes to rounds progress bar in $('#matchup-screen')
                console.log(`round ${i+1}`);

                for(enemy of matchList[i]){
                    
                    fight(enemy)

                    if(rocky.health.remainingHealth === 0){
                        console.log('game over');
                        rocky.kos ++
                        return
                    } else if (enemy.health === 0) {
                    }

                }
            }

        }


// NOTE JS for DOM

    // Sound button mute on/off

    $('.sound-button').click(function(){
        $(this).toggleClass('sound-off')
        if($(this).hasClass('sound-off')){
            $(this).attr('src','img/sound-off.png')
        } else {
            $(this).attr('src','img/sound-on.png')
        }
    })

    // Buttons on each screens

    $('#play-button').click(function(){
        $('#start-screen').toggleClass('d-none')
        $('#matchup-screen').toggleClass('d-none')
        matchUp()
    })

    $('#matchup-button').click(function(){
        $('#matchup-screen').toggleClass('d-none')
        $('#upgrade-screen').toggleClass('d-none')
        matchUp()
    })