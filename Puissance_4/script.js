$(document).ready(function () {

    class Puissance4
    {
        constructor(selector, column = 7, row = 6, player1Color = 'red', player2Color = 'green', player1 = 'JOUEUR 1', player2 = 'JOUEUR 2')
        {
            this.column = column;
            this.row = row;
            this.player1Color = player1Color;
            this.player2Color = player2Color;
            this.player1 = player1;
            this.player2 = player2;
            this.selector = selector;
            this.countTurn = 1;
            this.currentTurn = 1;
            this.winner = null;
            this.scorePlayer1 = 0;
            this.scorePlayer2 = 0;
            this.scoreDraw = 0;

            this.displayPlayer();
            this.displayGame();
            this.displayTurn();
            document.getElementById('puissance4').addEventListener('click', (event)=>this.addColor(event));
            this.displayScore();
        }

        displayPlayer()
        {
            document.getElementById('player1').style.color = this.player1Color;
            document.getElementById('player1').innerHTML = this.player1;
            $('#player1').show();

            document.getElementById('player2').style.color = this.player2Color;
            document.getElementById('player2').innerHTML = this.player2;
            $('#player2').hide();
        }

        displayTurn()
        {
            document.getElementById('turn').innerHTML = "Tour " + this.countTurn;
        }


        displayGame()
        {
            const $game = $(this.selector);
            $game.html("");

            for (let row = (this.row -1); row >= 0; row--)
            {
                const $row = $('<div>').addClass('row');

                for (let column = 0; column < this.column; column++)
                {
                    const $column = $('<div>').addClass('column empty').attr('data-column', column).attr('data-row', row).attr('data-statut' , 'empty');
                    $row.append($column);
                }
                $game.append($row);
            }       
        }

        addColor(event)
        {
            let target = event.target;
            let targetCol = target.getAttribute("data-column");

            if (targetCol == undefined || targetCol == null || targetCol == "")
            {
                console.log('empty');
            }
            else
            {
                for (let row = 0; row < this.row; row++) 
                {
            
                    let getTarget = document.querySelector(`[data-column='${targetCol}'][data-row='${row}']`);
                    
                    if (getTarget.getAttribute('data-statut') == 'empty')
                    {
                        if (this.countTurn == 1 || this.countTurn %2 != 0) 
                        {
                            getTarget.setAttribute('data-statut' , 'player1');
                            getTarget.style.backgroundColor = this.player1Color;
                            this.currentTurn = 1;
                            
                            $('#player1').hide();
                            $('#player2').show();
                        }
                        else
                        {
                            getTarget.setAttribute('data-statut' , 'player2');
                            getTarget.style.backgroundColor = this.player2Color;
                            this.currentTurn = 2;

                            $('#player1').show();
                            $('#player2').hide();
                        }
                        this.countTurn++;
                        this.displayTurn();
                        break;
                    }
                }

                if (this.winnerIs('player' + this.currentTurn) == true)
                {
                    this.winner = this.currentTurn;
                }
                else if (this.countTurn >= this.column * this.row)
                {
                    this.winner = 0;
                }


                if (this.winner == 0)
                {
                    alert ("Match nul !")
                    this.scoreDraw = this.scoreDraw +1;
                    this.displayScore();
                }
                else if (this.winner == 1) 
                {
                    alert (`${this.player1} a gagné !`);
                    this.scorePlayer1 = this.scorePlayer1 +1;
                    this.displayScore();
                }
                else if (this.winner == 2)
                {
                    alert (`${this.player2} a gagné !`);
                    this.scorePlayer2 = this.scorePlayer2 +1;
                    this.displayScore();
                }
            }
        }

        winnerIs(player)
        {
            let count = 0;

            for (let row = 0; row < this.row; row++)
            {
                for (let column = 0; column < this.column; column++)
                {
                    if (document.querySelector(`[data-column='${column}'][data-row='${row}']`).getAttribute('data-statut') == player)
                    {
                        count = count+1;
                    }
                    else
                    {
                        count = 0;
                    }

                    if (count >=4)
                    {
                        return true;
                    }
                    // console.log(`column=${column},  row=${row}`);
                }
                // console.log('   ');
            }

            count = 0;

            for (let column = 0; column < this.column; column++)
            {
                for (let row = 0; row < this.row; row++)
                {
                    if (document.querySelector(`[data-column='${column}'][data-row='${row}']`).getAttribute('data-statut') == player)
                    {
                        count = count+1;
                    }
                    else
                    {
                        count = 0;
                    }

                    if (count >=4)
                    {
                        return true;
                    }
                }
            }
        }

        displayScore()
        {
            document.getElementById('vicoire').innerHTML = "<p style=color:" + this.player1Color + ">" +  "Score " + this.player1 + " = " + this.scorePlayer1 + "</p>" + "<p style=color:" + this.player2Color + ">" + "Score " + this.player2 + " = " + this.scorePlayer2 + "</p>" + "<p>" + "Match nul = " + this.scoreDraw + "</p>";
            
        }

        restart()
        {
            this.countTurn = 1;
            this.currentTurn = 1;
            this.winner = null;

            this.displayPlayer();
            this.displayGame();
            this.displayTurn();
        }
    }

    const puissance4 = new Puissance4('#puissance4', 7, 6, 'green', 'red', "Christopher", "Roger");
    $('#restart').click(function()
    {
        puissance4.restart();
    })
});
