/*
    NOTE TO-DO list



        JS for App
        1. Make player stats change based on upgrades purchased

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

        2. rocky.fist.strength to increase by 0.5 once progress reaches 100, then resets rocky.fist.strength to 0

        3. add special sounds to buttons/actions
            - boxing bell sound effect for start screen button and matchup button
            - money sound 1 when money is made
            - money sound 2 when money is spent
            - damage sound when rocky loses
            - cheer when rocky wins



        
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
                progressRate: 5,
            },
            money: {
                balance: 0,
                prizeRate: 50,
            },
            kos: 0,
            currentRound: 1,
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



        // gamePlay
            // used for renderGame

        const gamePlay = []



     // NOTE RENDER LOGIC 

        // RENDER FUNCTIONS

            // renderFightWon
                // increases money.balance and fist.progress, calls updateMoney and updateFistProgress to manipulate DOM

            const renderFightWon = function() {
                rocky.money.balance += rocky.money.prizeRate
                rocky.fist.progress += rocky.fist.progressRate
                updateMoney()
                updateFistProgress()
                console.log('fight won!');
            }



            // renderFightLost
                // decreases rocky.health.remainingHealth, then calls updateHealth to manipulate DOM

            const renderFightLost = function() {
                rocky.health.remainingHealth -= 1
                updateHealth()
                console.log('fight lost...');
            }



            // renderFightDrawn
                // for now, logs 'it was a draw'

            const renderFightDrawn = function() {
                console.log('it was a draw');
            }



            // renderRound
                // calls upateRound to manipuate DOM, and increases currentRound

            const renderRound = function() {
                updateRound()
                console.log(`Round #${rocky.currentRound}`);
                rocky.currentRound ++
            }            



            // renderGame
                // sets rocky.currentRound to 1, calls updateRound to manipulate DOM
                // setInterval is called to iterate each rendering functions in gamePlay array every second
                // if rocky's remainingHealth reachs 0, interval breaks and rocky's ko increases, updateKos is ran to manipulate DOM, then calls switchScreen to go to upgrade screen

            const renderGame = function() {
                rocky.currentRound = 1
                updateRound()

                let counter = 0;
                let i = setInterval(function(){
                    gamePlay[counter]()
                    counter ++;

                    if(rocky.health.remainingHealth === 0) {
                        clearInterval(i)
                        rocky.kos ++
                        updateKos()
                        switchScreen()
                    }

                }, 1000)

            }

    // NOTE GAME LOGIC

        // generateEnemy
            // creates a number of enemies specified in an array

        const generateEnemy = function (arr, num) {
            for(let i = 0; i < num; i++){
                arr[i] = new Enemy()
            }
        }



        // generateRounds
            // creates specified number of enemies for each round

        const generateRounds = function () {
            generateEnemy(rounds.round1, 3);
            generateEnemy(rounds.round2, 5);
            generateEnemy(rounds.round3, 10);
            generateEnemy(rounds.round4, 15);
            generateEnemy(rounds.round5, 20);
        }



        // recoverHealth
            // recovers rocky's remainingHealth to maxHealth

        const recoverHealth = function() {
            rocky.health.remainingHealth = rocky.health.maxHealth
        }



        // fight
            // compares fist strength and pushes renderFunctions to gamePlay array accordingly

        const fight = function(enemy) {
            if (rocky.fist.strength < enemy.fist) {
                gamePlay.push(renderFightLost)
            } else if (rocky.fist.strength > enemy.fist) {
                gamePlay.push(renderFightWon)
            } else {
                gamePlay.push(renderFightDrawn)
            }
        }

        

        // loopEnemies
            // iterates each element in an array to call fight function

        const loopEnemies = function(enemies) {
            for(enemy of enemies){
                    fight(enemy)
                }
        }



        // loopRounds
            // iterates each element in an array to push renderRound function and call loopEnemies
        
        const loopRounds = function() {
            const matchList = Object.values(rounds)

            for (let i = 0; i <= matchList.length-1; i++) {
                gamePlay.push(renderRound)
                loopEnemies(matchList[i])
            }
        }



        // gamePlayReset
            // resets gamePlay array
            const gamePlayReset = function() {
                gamePlay.length = 0
            }
        


        // matchUp
            // calls functions below to: 
                // 1. reset gamePlay array 
                // 2. generate a new rounds array
                // 3. iterate each round in rounds array
                // 4. iterate each render functions in gamePlay array

        const matchUp = function () {
            gamePlayReset()
            generateRounds()
            loopRounds()
            renderGame()
        } 



// NOTE JS for DOM

    // audio

    let audio = document.getElementById('player')
    audio.volume = 0.7
    

    // Sound button mute on/off

    $('.sound-button').click(function(){
        $(this).toggleClass('sound-off')
        if($(this).hasClass('sound-off')){
            $(this).attr('src','img/sound-off.png')
            audio.muted = true;
        } else {
            $(this).attr('src','img/sound-on.png')
            audio.muted = false
        }
    })



    // switchScreen
            // switches screen between matchup and upgrade

        const switchScreen = function() {
            recoverHealth()
            
            updateHealth()
            
            $('#matchup-screen').toggleClass('d-none')
            $('#upgrade-screen').toggleClass('d-none')
        }



    // Buttons on each screens
        // start screen's button to switch to matchup screen

        $('#play-button').click(function(){
            $('#start-screen').toggleClass('d-none')
            $('#matchup-screen').toggleClass('d-none')
            matchUp()
        })


        // upgrade screen's button

        $('#matchup-button').click(function(){
            switchScreen()
            matchUp()
        })

    
    // STATUS UPDATES

            // updateFistProgress
                // updates DOM's .fist-progress to rocky.fist.progress's value

            const updateFistProgress = function() {
                $('.fist-progress').css('width', `${rocky.fist.progress}`)
            }



            // updateMoney
                // updates DOM's .money to rocky.money.balance

            const updateMoney = function() {
                $('.money').text(`💰 $${rocky.money.balance}`)
            }



            // updateHealth
                // updates DOM's .health to number of hearts matching rocky.health.remainingHealth
            const updateHealth = function() {
                $('.health').text('💓'.repeat(rocky.health.remainingHealth))
            }



            // updateRound
                // updates DOM's .stages based on rocky.currentRound

            const updateRound = function() {
                $('.stages').removeClass('current-round')
                $(`#stage${rocky.currentRound}`).addClass('current-round')
            }



            // updateKos
                // updates DOM's .ko based on rocky.kos

            const updateKos = function() {
                $('.ko').text(`Knocked out: ${rocky.kos}`)
            }