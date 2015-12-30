var columnArray = ["col1", "col2", "col3", "col4", "col5", "col6", "col7"];
var rowArray = ["#row1", "#row2", "#row3", "#row4", "#row5", "#row6", "#row7"];

var checkForFree = function(column) {
    
    for (var i = rowArray.length-1; i >= 0; i--) {
        if ( $(rowArray[i] + "> ." + column).hasClass('bot') ) {
            console.log('clicked');
            $(rowArray[i] + "> ." + column)
                .removeClass('bot')
                .removeClass('free');
            
            if ( $('#player1').hasClass('playerTurn') ) {
                $(rowArray[i] + "> ." + column).addClass('red');
                $('#player1').removeClass('playerTurn');
                $('#player2').addClass('playerTurn');
            } else {
                $(rowArray[i] + "> ." + column).addClass('blue');
                $('#player2').removeClass('playerTurn');
                $('#player1').addClass('playerTurn');
            }
            
            if (i !== 6) {
                $(rowArray[i+1] + "> ." + column)
                .addClass('bot');
            }
        }
    }
    
}

var resetGame = function() {
    $('td').removeClass('blue')
        .removeClass('red')
        .addClass('free')
        .removeClass('bot');
    $('.arrow').removeClass('free');
    $('#player2').removeClass('playerTurn');
    $('#player1').addClass('playerTurn');
    $('#row1 > td').addClass('bot');
}

$(document).ready(function() {
    
    $('#player2 .playerTurn').hide();
    
    $('button').on('click', function() {
        var column = this.id;
        checkForFree(column);
    });
    
    $('#newGame').on('click', function() {
        resetGame();
    });
    
});