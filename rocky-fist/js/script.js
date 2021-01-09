// Future improvements:

    // add an intro story with a skip button
    // add visual changes to rocky's fist upon upgrades
    // change characters as round progresses
    // show #turns left per round

// NOTE JS for App

    // NOTE Audio
        // Background Audio
        let audio = new Audio('music/track-1.mp3')
        audio.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        }, false);

        // Game Start & Match Up
        const audioMatchup = function() {
            new Audio('music/boxing-bell.mp3').play()
        }

        // Money Earned
        const audioMoneyEarned = function() {
            new Audio('music/money-earned.mp3').play()
        }

        // Money Spent
        const audioMoneySpent = function() {
            new Audio('music/money-spent.mp3').play()
        }

        // Insufficient Money
        const audioInsufficientMoney = function() {
            new Audio('music/insufficient-money.mp3').play()
        }

        // Damage
        const audioDamage = function() {
            new Audio('music/damage.mp3').play()
        }

        // Stage complete
        const audioRoundComplete = function() {
            new Audio('music/round-complete.mp3').play()
        }

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
            animate: {
                stopRocky: false,
            }
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
    

    
    // NOTE GAME LOGIC

        // Upgrades

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
                        audio.pause()
                        audio = new Audio('music/track-2.mp3')
                        audio.play()
                        rocky.fist.strength = 2.5
                        rocky.fist.progress = 100
                        rocky.health.maxHealth = 6
                        $('.fist').attr('src', 'img/infinity-gauntlet.png').attr('width', '15px')
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
            generateEnemy(rounds.round1, 1);
            generateEnemy(rounds.round2, 3);
            generateEnemy(rounds.round3, 5);
            generateEnemy(rounds.round4, 8);
            generateEnemy(rounds.round5, 10);
        }



        // recoverHealth
            // recovers rocky's remainingHealth to maxHealth

        const recoverHealth = function() {
            rocky.health.remainingHealth = rocky.health.maxHealth
        }



        // evalauteEnemyHand
            // evaluates which enemy hand should display in game

        const evaluateEnemyHand = function() {
            if(enemy.fist === 0){
                    gamePlay.push(renderHands1)
                } else if (enemy.fist === 1) {
                    gamePlay.push(renderHands2)
                } else {
                    gamePlay.push(renderHands3)
                }
        }


        // fight
            // compares fist strength and pushes renderFunctions to gamePlay array accordingly

        const fight = function(enemy) {
            if (rocky.fist.strength < enemy.fist) {
                gamePlay.push(renderDelay)
                evaluateEnemyHand()
                gamePlay.push(renderFightLost)
            } else if (rocky.fist.strength > enemy.fist) {
                gamePlay.push(renderDelay)
                evaluateEnemyHand()
                gamePlay.push(renderFightWon)
            } else {
                gamePlay.push(renderDelay)
                evaluateEnemyHand()
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
                gamePlay.push(renderDelay)
                loopEnemies(matchList[i])
                gamePlay.push(renderRoundComplete)
                gamePlay.push(renderDelay)
            }
        }



        // gamePlayReset
            // resets gamePlay array
            const gamePlayReset = function() {
                gamePlay.length = 0

            }

        // initialize
            const initialize = function() {
                rocky.health.remainingHealth = 1
                rocky.health.maxHealth = 1
                rocky.fist.strength = 1
                rocky.fist.progress = 0
                rocky.fist.progressRate = 5
                rocky.money.balance = 0
                rocky.money.prizeRate = 25
                rocky.kos = 0
                rocky.currentRound = 1
                $('.upgrade-items').removeClass('max')
                $('.fist').attr('src', 'img/glove.png').attr('width', '20px')
                $('#rocky').removeClass('ending')
                $('#strange').removeClass('disappear')
                updateFistProgress()
                updateFistUpgrade()
                updateHealth()
                updateKos()
                updateMoney()
                audio.pause()
                audio = new Audio('music/track-1.mp3')
        }
        


        // matchUp
            // calls functions below to: 
                // 1. reset gamePlay array 
                // 2. generate a new rounds array
                // 3. iterate each round in rounds array
                // 4. iterate each render functions in gamePlay array

        const matchUp = function () {
            audioMatchup()
            gamePlayReset()
            generateRounds()
            loopRounds()
            renderGame()
        } 



     // NOTE RENDER LOGIC 

        // RENDER FUNCTIONS

            // renderFightWon
                // increases money.balance and fist.progress, calls updateMoney and updateFistProgress to manipulate DOM

            const renderFightWon = function() {
                $('#rocky').attr('src', 'img/rocky-wins.png')
                $('#strange').attr('src', 'img/strange-lost.png')
                audioMoneyEarned()
                if(rocky.fist.strength !== 2.5){
                    rocky.fist.progress += 1
                    updateFistUpgrade()
                    updateFistProgress()
                }
                rocky.money.balance += rocky.money.prizeRate
                updateMoney()
            }



            // renderFightLost
                // decreases rocky.health.remainingHealth, then calls updateHealth to manipulate DOM

            const renderFightLost = function() {
                $('#rocky').attr('src', 'img/rocky-lost.png')
                $('#strange').attr('src', 'img/strange-wins.png')
                audioDamage()
                rocky.health.remainingHealth -= 1
                updateHealth()
            }



            // renderFightDrawn

            const renderFightDrawn = function() {
                $('#rocky').attr('src', 'img/rocky-body.png')
                $('#strange').attr('src', 'img/strange-body.png')
            }

            // renderEnemy

            const renderEnemy = function(enemy) {
                if(enemy.fist === 0){
                    $('#strange').attr('src', 'img/strange-scissors.png')
                } else if (enemy.fist === 1) {
                    $('#strange').attr('src', 'img/strange-rock.png')
                } else if (enemy.fist === 2) {
                    $('#strange').attr('src', 'img/strange-paper.png')
                }
            }



            // renderDelay
                // delay before round starts

            const renderDelay = function() {
                $('#rocky').css('left', '100px')
                $('#strange').css('left', '280px')
                rocky.animate.stopRocky = false
                moveChar($('#rocky'))
                moveChar($('#strange'))
                $('#rocky').attr('src', 'img/rocky-body.png')
                $('#strange').attr('src', 'img/strange-body.png')
            }

            // renderHands
            
            const renderHands1 = function() {
                rocky.animate.stopRocky = true
                $('#rocky').attr('src', 'img/rocky-rock.png')
                $('#strange').attr('src', 'img/strange-scissors.png')
            }

            const renderHands2 = function() {
                rocky.animate.stopRocky = true
                $('#rocky').attr('src', 'img/rocky-rock.png')
                $('#strange').attr('src', 'img/strange-rock.png')
            }

            const renderHands3 = function() {
                rocky.animate.stopRocky = true
                $('#rocky').attr('src', 'img/rocky-rock.png')
                $('#strange').attr('src', 'img/strange-paper.png')
            }


            
            // renderRoundComplete
                // stage complete message

            const renderRoundComplete = function() {
                if(rocky.currentRound > 1){
                    $('.victory').text(`You get $${(rocky.currentRound)*rocky.money.prizeRate} for completing round# ${rocky.currentRound -1}!`)
                    animateRoundComplete()
                    rocky.money.balance += (rocky.currentRound)*rocky.money.prizeRate
                    updateMoney()
                    audioRoundComplete()
                }
            }



            // renderRound
                // calls upateRound to manipuate DOM, and increases currentRound

            const renderRound = function() {
                updateRound()
                $('.round').text(`Round ${rocky.currentRound}`)
                animateRound()
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
                        setTimeout(function(){
                            switchScreen()
                            $('#rocky').attr('src', 'img/rocky-body.png')
                            $('#strange').attr('src', 'img/strange-body.png')
                        }, 500)
                    } else if (counter + 1 === gamePlay.length + 1) {
                        clearInterval(i)
                        audio.pause()
                        audio = new Audio('music/ending.mp3')
                        audio.play()
                        renderEnding()
                    }

                }, 1000)

            }



            // renderEnding

            const renderEnding = function() {
                rocky.animate.stopRocky = true;
                $('#rocky').css('left', '100px')
                $('#strange').css('left', '280px')
                $('#rocky').attr('src', 'img/rocky-body.png')
                $('#strange').attr('src', 'img/strange-body.png')
                $('#rocky').addClass('ending')
                $('#strange').addClass('disappear')
                $('#start-screen h2, #start-screen h3').css('display', 'block')
                $('#start-screen h3').text(`Number of KOs taken: ${rocky.kos}`)
                $('#play-button').text('REPLAY')
                setTimeout(function() {
                    $('#start-screen').toggleClass('d-none')
                    $('#matchup-screen').toggleClass('d-none')
                }, 3000)
            }



        // Animation

            // animateRoundComplete
                // animates round complete message

            const animateRoundComplete = function() {
                $('.victory').addClass('animate')
                setTimeout(function(){
                    $('.victory').removeClass('animate')
                }, 2000)
            }

            
            
            // animateRound
                // animates round message

            const animateRound = function() {
                $('.round').addClass('animate')
                setTimeout(function(){
                    $('.fight').addClass('animate')
                }, 1000)
                setTimeout(function(){
                    $('.round').removeClass('animate')
                    $('.fight').removeClass('animate')
                }, 2000)
            }

            // moveChar
                // moves characters left and right

            const moveChar = function($char) {
                let leftVal = parseInt($char.css('left'),10)
                let counter = 5;
                let i = setInterval(function(){
                    leftVal += counter
                    $char.css('left', `${leftVal}px`)
                    counter *= -1;

                    if(rocky.animate.stopRocky === true) {
                        clearInterval(i)
                    } 

                }, 500)
            }

    // Other JS for DOM

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
                initialize()
                matchUp()
                audioMatchup()
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
                    audioMoneySpent()
                    rocky.money.balance -= cost
                    updateMoney()
                    upgrade()
                } else {
                    audioInsufficientMoney()
                    $('#insufficient').css('display', 'block')
                    setTimeout(function(){
                        $('#insufficient').css('display', 'none')
                    },500)
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
                        $('.fist').attr('src', 'img/infinity-gauntlet.png').attr('width', '15px')
                        $('#strength').addClass('max')
                    } else if (rocky.fist.strength === 1.5 && rocky.fist.progress >= 100) {
                        rocky.fist.strength += 0.5
                        rocky.fist.progress = rocky.fist.progress - 100
                        $('.fist').attr('src', 'img/infinity-gauntlet-no-stone.png').attr('width', '13px')
                    } else if (rocky.fist.strength === 1.0 && rocky.fist.progress >= 100) {
                        rocky.fist.strength += 0.5
                        rocky.fist.progress = rocky.fist.progress - 100
                        $('.fist').attr('src', 'img/fist.png').attr('width', '10px')
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