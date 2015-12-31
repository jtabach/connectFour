// Connect Four by Jeff Tabachnick
var rowArray = ["#row1", "#row2", "#row3", "#row4", "#row5", "#row6", "#row7"];
var colArray = ["col1", "col2", "col3", "col4", "col5", "col6", "col7"];

var color;
var count = 1;
var winner = false;

var indC1,
    indC2,
    indC3,
    indR1,
    indR2,
    indR3;

var checkForFree = function(column) {
    
    for (var i = rowArray.length-1; i >= 0; i--) {
        if ( $(rowArray[i] + "> ." + column).hasClass('bot') ) {
            $(rowArray[i] + "> ." + column)
                .removeClass('bot')
                .removeClass('free');
            
            placeColorPiece(i, column);
            checkIfTopRow(i, column);
            checkForWin(i, column);
        }
    }
    
}

var checkForWin = function(i, column) {
    var startRow = i;
    var startCol;
    
    
    colArray.forEach(function(elem, index) {
        if (elem === column) {
            startCol = index;
        }
    });
    var dirs = ["diag1", "diag2", "vert", "horiz"];
    for (var num = 0; num < 4; num++) {
        checkDirection(rowArray, colArray, startRow, startCol, dirs[num]);
    }
}

var checkDirection = function(row, col, r, c, dir) {
    
    switch (dir) {
        case "diag1":
            indC1 = indR1 = 1;
            indC2 = indR2 = 2;
            indC3 = indR3 = 3;
            break;
        case "diag2":
            indC1 = -1;
            indC2 = -2;
            indC3 = -3;
            indR1 = 1;
            indR2 = 2;
            indR3 = 3;
            break;
        case "vert":
            indC1 = indC2 = indC3 = 0;
            indR1 = 1;
            indR2 = 2;
            indR3 = 3;
            break;
        case "horiz":
            indR1 = indR2 = indR3 = 0;
            indC1 = 1;
            indC2 = 2;
            indC3 = 3;
            break;
    }
    
    console.log(indC1);
    
    if( $(row[r+indR1] + "> ." + col[c+indC1]).hasClass(color) ) {
        checkFourCount();
        if( $(row[r+indR2] + "> ." + col[c+indC2]).hasClass(color) ) {
            checkFourCount();
            if( $(row[r+indR3] + "> ." + col[c+indC3]).hasClass(color) ) {
                checkFourCount();
            } else {
                reverseDirection(row, col, r, c);
            }
        } else {
            reverseDirection(row, col, r, c);
        }
    } else {
        reverseDirection(row, col, r, c);
    }
    
}

var reverseDirection = function(row, col, r, c) {
    if ( $(row[r-indR1] + "> ." + col[c-indC1]).hasClass(color) ) {
        checkFourCount();
        if ( $(row[r-indR2] + "> ." + col[c-indC2]).hasClass(color) ) {
            checkFourCount();
            if ( $(row[r-indR3] + "> ." + col[c-indC3]).hasClass(color) ) {
                checkFourCount();
            } else {
                count = 1;
            }      
        } else {
            count = 1;
        }
    } else {
        count = 1;
    }
}



var checkFourCount = function() {
    count++;
    console.log("Count " + count);
    if(count === 4) {
        $('.arrows').prop('disabled', true);
        winner = true;
        count = 1;
        $('#winner').append(color.toLocaleUpperCase() + " WINS!")
            .css("color", color);
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
        color = 'red';
        $(rowArray[i] + "> ." + column).addClass(color);
        change1to2();
    } else {
        color = 'blue';
        $(rowArray[i] + "> ." + column).addClass(color);
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
    winner = false;
    $('#winner').html("");
};

$(document).ready(function() {
    
    
    
    $('button').on('click', function() {
        if (winner === false) {
            var column = this.id;
            checkForFree(column);
        }
    });
    
    $('#newGame').on('click', function() {
        resetGame();
    });
    
});