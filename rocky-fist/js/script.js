/*
    NOTE TO-DO list



        JS for App

        1. create an intro with skip button
        
        2. add rocky character and enemy characters
        
        3. add an ending, add boss fight

        4. add special sounds to buttons/actions
            - boxing bell sound effect for start screen button and matchup button
            - money sound 1 when money is made
            - money sound 2 when money is spent
            - damage sound when rocky loses
            - cheer when rocky wins

        

        minor fixes
            - rocky fist to update image
            - adjust stage progress styling to be more visible



        
*/

// NOTE JS for App

    // NOTE VARIABLES

        // player
        const rocky = {
            health: {
                remainingHealth: 1,
                maxHealth: 1
            },
            fist: {
                strength: 1,
                progress: 0,
                progressRate: 5,
            },
            money: {
                balance: 0,
                prizeRate: 25,
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
                upgrades.strength.executeUpgrade()
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
                    } else if (counter + 1 === gamePlay.length + 1) {
                        clearInterval(i)
                        console.log('game is cleared!');
                    }

                }, 1000)

            }

    // NOTE GAME LOGIC

        // Upgrdaes

            // upgrades

            const upgrades = {
                strength: {
                    executeUpgrade: 
                    function() {
                        if(rocky.fist.strength !== 2.5){
                            rocky.fist.progress += rocky.fist.progressRate
                            updateFistUpgrade()
                            updateFistProgress()
                        }
                    },
                    cost: 50
                },
                shake: {
                    executeUpgrade:
                    function() {
                        $('#strength div p').text('Strength + 25')
                        $('#shake').addClass('max')
                        if(rocky.fist.progressRate === 5) {
                            rocky.fist.progressRate = 25
                        }
                    },
                    cost: 1000
                },
                endurance: {
                    executeUpgrade: 
                    function() {
                        if(rocky.health.maxHealth < 5) {
                            rocky.health.maxHealth ++
                            recoverHealth()
                            updateHealth()
                        } else if (rocky.health.maxHealth = 5) {
                            rocky.health.maxHealth ++
                            recoverHealth()
                            updateHealth()
                            $('#endurance').addClass('max')
                        }
                    },
                    cost: 100
                },
                peloton: {
                    executeUpgrade:
                    function() {
                        rocky.fist.strength = 2.5
                        rocky.fist.progress = 100
                        rocky.health.maxHealth = 6
                        updateFistProgress()
                        recoverHealth()
                        updateHealth()
                        $('#strength, #shake, #endurance, #peloton').addClass('max')
                    },
                    cost: 2000
                },
                news: {
                    executeUpgrade:
                    function() {
                        if(rocky.money.prizeRate > 250){
                            rocky.money.prizeRate = 500
                            $('#news').addClass('max')
                        } else if (rocky.money.prizeRate !== 500) {
                            rocky.money.prizeRate *=2
                        }
                    },
                    cost: 500
                },
                agency: {
                    executeUpgrade:
                    function() {
                        $('#agency').addClass('max')

                        if(rocky.money.prizeRate === 500){
                            $('#news').removeClass('max')
                        }
                        $('#news div p').text('Increases $ per win (max $1000 per win)')
                        upgrades.news.executeUpgrade = function() {
                            if(rocky.money.prizeRate > 250){
                                rocky.money.prizeRate = 1000
                                $('#news').addClass('max')
                            } else if (rocky.money.prizeRate !== 1000) {
                                rocky.money.prizeRate *=4
                            }
                        }
                    },
                    cost: 1000
                }
            }

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
            generateEnemy(rounds.round1, 2);
            generateEnemy(rounds.round2, 3);
            generateEnemy(rounds.round3, 5);
            generateEnemy(rounds.round4, 10);
            generateEnemy(rounds.round5, 15);
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
            audio.play()
        })


        // upgrade screen's button

        $('#matchup-button').click(function(){
            switchScreen()
            matchUp()
        })

    
    // Upgrade items
        // check balance
        const checkBalance = function (upgrade, cost) {
            if(rocky.money.balance >= cost){
                rocky.money.balance -= cost
                updateMoney()
                upgrade()
            } else {
                console.log('insufficient balance');
            }
        }

        // upgrade-items div style
        $('.upgrade-items').mousedown(function(){
            $(this).addClass('shadow-sm')
        })
        $('.upgrade-items').mouseup(function(){
            $(this).removeClass('shadow-sm')
        })
        $('.upgrade-items').mouseleave(function(){
            $(this).removeClass('shadow-sm')
        })

        // upgrade-items click handler
        $('.upgrade-items').click( function () {
            const upgrade = $(this).attr('id')
            if(!$(this).hasClass('max')){
                checkBalance(upgrades[upgrade].executeUpgrade, upgrades[upgrade].cost)
            }
        })

    
    // STATUS UPDATES

            // updateFistProgress
                // updates DOM's .fist-progress to rocky.fist.progress's value

            const updateFistProgress = function() {
                $('.fist-progress').css('width', `${rocky.fist.progress}`)
            }

            // updateFistUpgrade

            const updateFistUpgrade = function() {
                if (rocky.fist.strength === 2.0 && rocky.fist.progress >= 100) {
                    rocky.fist.strength += 0.5
                    rocky.fist.progress = 100
                    $('#strength').addClass('max')
                } else if (rocky.fist.strength < 2.0 && rocky.fist.progress >= 100) {
                    rocky.fist.strength += 0.5
                    rocky.fist.progress = rocky.fist.progress - 100
                }
            }



            // updateMoney
                // updates DOM's .money to rocky.money.balance

            const updateMoney = function() {
                $('.money').text(`💰 $${rocky.money.balance.toLocaleString()}`)
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