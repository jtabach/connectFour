// Connect FOur by Jeff Tabachnick
var rowArray = ["#row1", "#row2", "#row3", "#row4", "#row5", "#row6", "#row7"];

var checkForFree = function(column) {
    
    for (var i = rowArray.length-1; i >= 0; i--) {
        if ( $(rowArray[i] + "> ." + column).hasClass('bot') ) {
            console.log('clicked');
            $(rowArray[i] + "> ." + column)
                .removeClass('bot')
                .removeClass('free');
            
            placeColorPiece(i, column);
            checkIfTopRow(i, column);
        }
    }
    
}

var checkIfTopRow = function(i, column) {
    if (i !== 6) {
        $(rowArray[i+1] + "> ." + column)
        .addClass('bot');
    }
};

var placeColorPiece = function(i, column) {
    if ( $('#player1').hasClass('playerTurn') ) {
        $(rowArray[i] + "> ." + column).addClass('red');
        change1to2();
    } else {
        $(rowArray[i] + "> ." + column).addClass('blue');
        change2to1();
    }
};

var change1to2 = function() {
    $('#player1').removeClass('playerTurn');
    $('#player2').addClass('playerTurn');
};

var change2to1 = function() {
    $('#player2').removeClass('playerTurn');
    $('#player1').addClass('playerTurn');
}

var resetGame = function() {
    $('td').removeClass('blue')
        .removeClass('red')
        .addClass('free')
        .removeClass('bot');
    $('.arrow').removeClass('free');
    change2to1();
    $('#row1 > td').addClass('bot');
};

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