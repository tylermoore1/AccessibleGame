var tiles = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

//variable to see which direction arrow is pointing
//0 for right, 1 for up, 2 for left, 3 for down
var arrowDirection = 0;

$(document).ready(function() {
  for (var j = 0; j < 4; j++) {
    $('#idBody').append('<div class="row">\
          <div class="cell d-flex"> \
            <div class="number align-self-center font-weight-bold justify-content-center d-flex align-items-center" \
                id="cell' + j + ',' + 0 + '"> 0 \
            </div> \
          </div> \
          <div class="cell d-flex"> \
            <div class="number align-self-center font-weight-bold justify-content-center d-flex align-items-center" \
                id="cell' + j + ',' + 1 + '"> 0 \
            </div> \
          </div> \
          <div class="cell d-flex"> \
            <div class="number align-self-center font-weight-bold justify-content-center d-flex align-items-center" \
                id="cell' + j + ',' + 2 + '"> 0 \
            </div> \
          </div> \
          <div class="cell d-flex"> \
            <div class="number align-self-center font-weight-bold justify-content-center d-flex align-items-center" \
                id="cell' + j + ',' + 3 + '"> 0 \
            </div> \
          </div> \
        </div>');

  }

  //change all the font colors to the background color so they are invisible
  for (var num = 0; num < 16; num++) {
    var j = Math.floor(num / 4);
    var i = num % 4;
    var id = ('cell' + j + ',' + i);

    if ($('div[id="' + id + '"]').html() == 0) {
      $('div[id="' + id + '"]').css('color', '#A0A0A0');
    }
  }

  //figure out where to place new tile and put either a 2 or a 4 in the square

  addNewNumber();
  updateGrid();

});

function addNewNumber() {

  //this is to figure out which tile to put the number in
  var hasCellBeenFound = false;
  var j = 0;
  var i = 0;
  var id = "";
  var randomNumber = 0;
  while (hasCellBeenFound == false) {
    randomNumber = Math.floor((Math.random() * 16));
    j = Math.floor(randomNumber / 4);
    i = randomNumber % 4;
    id = ('cell' + j + ',' + i);

    if ($('div[id="' + id + '"]').html() == 0) {
      //alert (j + ' , ' + i);
      hasCellBeenFound = true;
    }
  }

  //this is to see if the game should put a 2 or 4 in the tile
  var randomNumber2 = Math.floor((Math.random() * 2) + 1);
  if (randomNumber2 == 1) {
    $('div[id="' + id + '"]').html(2);
    $('div[id="' + id + '"]').css('color', 'black');

    //make sure to put value in tiles array to keep track
    tiles[j][i] = 2;
  }
  else if (randomNumber2 == 2) {
    $('div[id="' + id + '"]').html(4);
    $('div[id="' + id + '"]').css('color', 'black');

    //make sure to put value in tiles array to keep track
    tiles[j][i] = 4;
  }
}

function isGameOver() {
  var counter = 0;

  for (var num = 0; num < 16; num++) {
    var j = Math.floor(num / 4);
    var i = num % 4;

    if (tiles[j][i] != 0) {
      //also need to make sure none of the surrounding tiles have the same value

      //do inside squares
      if (j > 0 && j < 3 && i > 0 && i < 3) {
        if ((tiles[j][i] != tiles[j-1][i]) && (tiles[j][i] != tiles[j][i-1]) && (tiles[j][i] != tiles[j+1][i]) && (tiles[j][i] != tiles[j][i+1])) {
          counter++;
        }
      }
      //--------------corner squares-------------
      else if (j == 0 && i == 0) {
        if ((tiles[j][i] != tiles[j+1][i]) && (tiles[j][i] != tiles[j][i+1])) {
          counter++;
        }
      }
      else if (j == 0 && i == 3) {
        if ((tiles[j][i] != tiles[j+1][i]) && (tiles[j][i] != tiles[j][i-1])) {
          counter++;
        }
      }
      else if (j == 3 && i == 0) {
        if ((tiles[j][i] != tiles[j-1][i]) && (tiles[j][i] != tiles[j][i+1])) {
          counter++;
        }
      }
      else if (j == 3 && i == 3) {
        if ((tiles[j][i] != tiles[j-1][i]) && (tiles[j][i] != tiles[j][i-1])) {
          counter++;
        }
      }
      //--------------sides-------------
      else if (j == 0 && i > 0 && i < 3) {
        if ((tiles[j][i] != tiles[j][i-1]) && (tiles[j][i] != tiles[j+1][i]) && (tiles[j][i] != tiles[j][i+1])) {
          counter++;
        }
      }
      else if (j == 3 && i > 0 && i < 3) {
        if ((tiles[j][i] != tiles[j][i-1]) && (tiles[j][i] != tiles[j-1][i]) && (tiles[j][i] != tiles[j][i+1])) {
          counter++;
        }
      }
      else if (i == 0 && j > 0 && j < 3) {
        if ((tiles[j][i] != tiles[j-1][i]) && (tiles[j][i] != tiles[j][i+1]) && (tiles[j][i] != tiles[j+1][i])) {
          counter++;
        }
      }
      else if (i == 3 && j > 0 && j < 3) {
        if ((tiles[j][i] != tiles[j-1][i]) && (tiles[j][i] != tiles[j][i-1]) && (tiles[j][i] != tiles[j+1][i])) {
          counter++;
        }
      }
    }
  }
  return counter;
}

function updateGrid() {
  for (var num = 0; num < 16; num++) {
    var j = Math.floor(num / 4);
    var i = num % 4;
    var id = ('cell' + j + ',' + i);

    var val = tiles[j][i];
    $('div[id="' + id + '"]').html(val);

    if ($('div[id="' + id + '"]').html() == 0) {
      $('div[id="' + id + '"]').css('color', '#A0A0A0');
    }

    else if ($('div[id="' + id + '"]').html() < 8) {
      $('div[id="' + id + '"]').css('color', 'black');
    }
    else if ($('div[id="' + id + '"]').html() >= 8) {
      $('div[id="' + id + '"]').css('color', 'white');
    }

    //need to change color of tile depending on what value it has
    if ($('div[id="' + id + '"]').html() == 2) {
      $('div[id="' + id + '"]').css('background-color', '#C0C0C0');
    }
    else if ($('div[id="' + id + '"]').html() == 4) {
      $('div[id="' + id + '"]').css('background-color', '#F1EFCA');
    }
    else if ($('div[id="' + id + '"]').html() == 8) {
      $('div[id="' + id + '"]').css('background-color', '#FACB6E');
    }
    else if ($('div[id="' + id + '"]').html() == 16) {
      $('div[id="' + id + '"]').css('background-color', '#F7B183');
    }
    else if ($('div[id="' + id + '"]').html() == 32) {
      $('div[id="' + id + '"]').css('background-color', '#FA966E');
    }
    else if ($('div[id="' + id + '"]').html() == 64) {
      $('div[id="' + id + '"]').css('background-color', '#F2745B');
    }
    else if ($('div[id="' + id + '"]').html() == 128) {
      $('div[id="' + id + '"]').css('background-color', '#F7E956');
    }
    else if ($('div[id="' + id + '"]').html() == 256) {
      $('div[id="' + id + '"]').css('background-color', '#F3CB05');
    }
    else if ($('div[id="' + id + '"]').html() == 512) {
      $('div[id="' + id + '"]').css('background-color', '#FBD63F');
    }
    else if ($('div[id="' + id + '"]').html() == 1024) {
      $('div[id="' + id + '"]').css('background-color', '#F7CB14');
    }
    else if ($('div[id="' + id + '"]').html() >= 2048) {
      $('div[id="' + id + '"]').css('background-color', '#47443A');
    }
    else if ($('div[id="' + id + '"]').html() == 0) {
      $('div[id="' + id + '"]').css('background-color', '#A0A0A0');
    }
  }
}

function moveTiles(j, i, moveDirection) {
  //see if no tiles have been moved which means
  var numberOfTilesMoved = 0;

  var cell_i = i;
  var next_cell_i = 0;

  var cell_j = j;
  var next_cell_j = 0;
  if (moveDirection == 'right') {
    next_cell_i = cell_i + 1;
  }
  if (moveDirection == 'left') {
    next_cell_i = cell_i - 1;
  }
  if (moveDirection == 'up') {
    next_cell_j = cell_j - 1;
  }
  if (moveDirection == 'down') {
    next_cell_j = cell_j + 1;
  }

  var hasCellStopped = false;
  while (hasCellStopped == false) {
    //move cells to the right direction
    if (moveDirection == 'right') {
      if (cell_i < 3) {

        if ((tiles[cell_j][cell_i] != 0) && (tiles[cell_j][next_cell_i] == 0)) {
          numberOfTilesMoved++;

          //get value of current cell we are looking at
          var val = tiles[cell_j][cell_i];

          //change the next cell to be what the previous value is so that the cell slides over
          tiles[cell_j][next_cell_i] = val;

          //now need to make previous cell equal to 0
          tiles[cell_j][cell_i] = 0;

          //now need to change cell and next_cell values
          cell_i += 1;
          next_cell_i += 1;
        }
        else {
          hasCellStopped = true;
        }
      }
      else {
        hasCellStopped = true;
      }
    }
    //this one is for left direction
    if (moveDirection == 'left') {
      if (cell_i > 0) {

        if ((tiles[cell_j][cell_i] != 0) && (tiles[cell_j][next_cell_i] == 0)) {
          numberOfTilesMoved++;

          //get value of current cell we are looking at
          var val = tiles[cell_j][cell_i];

          //change the next cell to be what the previous value is so that the cell slides over
          tiles[cell_j][next_cell_i] = val;

          //now need to make previous cell equal to 0
          tiles[cell_j][cell_i] = 0;

          //now need to change cell and next_cell values
          cell_i -= 1;
          next_cell_i -= 1;

        }
        else {
          hasCellStopped = true;
        }
      }
      else {
        hasCellStopped = true;
      }
    }
    //move tiles in the up direction
    if (moveDirection == 'up') {
      if (cell_j > 0) {

        if ((tiles[cell_j][cell_i] != 0) && (tiles[next_cell_j][cell_i] == 0)) {
          numberOfTilesMoved++;

          //get value of current cell we are looking at
          var val = tiles[cell_j][cell_i];

          //change the next cell to be what the previous value is so that the cell slides over
          tiles[next_cell_j][cell_i] = val;

          //now need to make previous cell equal to 0
          tiles[cell_j][cell_i] = 0;

          //now need to change cell and next_cell values
          cell_j -= 1;
          next_cell_j -= 1;
        }
        else {
          hasCellStopped = true;
        }
      }
      else {
        hasCellStopped = true;
      }
    }
    //move cells in the down direction
    if (moveDirection == 'down') {
      if (cell_j < 3) {

        if ((tiles[cell_j][cell_i] != 0) && (tiles[next_cell_j][cell_i] == 0)) {
          numberOfTilesMoved++;

          //get value of current cell we are looking at
          var val = tiles[cell_j][cell_i];

          //change the next cell to be what the previous value is so that the cell slides over
          tiles[next_cell_j][cell_i] = val;

          //now need to make previous cell equal to 0
          tiles[cell_j][cell_i] = 0;

          //now need to change cell and next_cell values
          cell_j += 1;
          next_cell_j += 1;
        }
        else {
          hasCellStopped = true;
        }
      }
      else {
        hasCellStopped = true;
      }
    }
  }

  return numberOfTilesMoved;
}

function addTiles(j, i, moveDirection) {
  var numberOfTilesAdded = 0;

  var cell_i = i;
  var next_cell_i = 0;

  var cell_j = j;
  var next_cell_j = 0;
  if (moveDirection == 'right') {
    next_cell_i = cell_i + 1;
  }
  else if (moveDirection == 'left') {
    next_cell_i = cell_i - 1;
  }
  else if (moveDirection == 'up') {
    next_cell_j = cell_j - 1;
  }
  else if (moveDirection == 'down') {
    next_cell_j = cell_j + 1;
  }

  if (moveDirection == 'right' || moveDirection == 'left') {
    //make sure cell and next cell have same values so that we can add them together. also make sure they are not equal to 0
    if (tiles[cell_j][cell_i] == tiles[cell_j][next_cell_i] && tiles[cell_j][cell_i] != 0) {
      numberOfTilesAdded++;
      //get value of current cell and next cell we are looking at
      var val = tiles[cell_j][cell_i];
      var next_val = tiles[cell_j][next_cell_i];

      //change the next cell to be what the previous value is so that the cell slides over
      tiles[cell_j][next_cell_i] += val;

      //now need to make previous cell equal to 0
      tiles[cell_j][cell_i] = 0;
    }
  }
  if (moveDirection == 'up' || moveDirection == 'down') {
    //make sure cell and next cell have same values so that we can add them together. also make sure they are not equal to 0
    if (tiles[cell_j][cell_i] == tiles[next_cell_j][cell_i] && tiles[cell_j][cell_i] != 0) {
      numberOfTilesAdded++;
      //get value of current cell and next cell we are looking at
      var val = tiles[cell_j][cell_i];
      var next_val = tiles[next_cell_j][cell_i];

      //change the next cell to be what the previous value is so that the cell slides over
      tiles[next_cell_j][cell_i] += val;

      //now need to make previous cell equal to 0
      tiles[cell_j][cell_i] = 0;
    }
  }
  return numberOfTilesAdded;
}

function moveRight() {
  //figure out which direction to move the tiles
  var moveDirection = 'right';

  var numberOfTiles = 0;
  var tiles1 = 0;
  var tiles2 = 0;
  var tiles3 = 0;
  var tiles4 = 0;

  //try to move everything to the right
  for (var i = 3; i >= 0; i--) {
    //need to make sure it's not on the far right of the grid because it can't move anymore if that's the case
    if (i < 3) {
      tiles1 += moveTiles(0, i, moveDirection);
      tiles2 += moveTiles(1, i, moveDirection);
      tiles3 += moveTiles(2, i, moveDirection);
      tiles4 += moveTiles(3, i, moveDirection);

    }
  }
  numberOfTiles += tiles1 + tiles2 + tiles3 + tiles4;
  //now need to add things that are the same
  for (var i = 3; i >= 0; i--) {
    if (i < 3) {
      tiles1 = addTiles(0, i, moveDirection);
      tiles2 = addTiles(1, i, moveDirection);
      tiles3 = addTiles(2, i, moveDirection);
      tiles4 = addTiles(3, i, moveDirection);
    }

  }
  numberOfTiles += tiles1 + tiles2 + tiles3 + tiles4;
  //after everything is added together, need to move tiles again
  for (var i = 3; i >= 0; i--) {
    if (i < 3) {
      tiles1 += moveTiles(0, i, moveDirection);
      tiles2 += moveTiles(1, i, moveDirection);
      tiles3 += moveTiles(2, i, moveDirection);
      tiles4 += moveTiles(3, i, moveDirection);

    }
  }
  numberOfTiles += tiles1 + tiles2 + tiles3 + tiles4;

  return numberOfTiles;
}

function moveLeft() {
  //figure out which direction to move the tiles
  var moveDirection = 'left';

  var numberOfTiles = 0;
  var tiles1 = 0;
  var tiles2 = 0;
  var tiles3 = 0;
  var tiles4 = 0;

  //try to move everything to the right
  for (var i = 0; i <= 3; i++) {
    //need to make sure it's not on the far left of the grid because it can't move anymore if that's the case
    if (i > 0) {
      tiles1 += moveTiles(0, i, moveDirection);
      tiles2 += moveTiles(1, i, moveDirection);
      tiles3 += moveTiles(2, i, moveDirection);
      tiles4 += moveTiles(3, i, moveDirection);

    }
  }
  numberOfTiles += tiles1 + tiles2 + tiles3 + tiles4;
  //now need to add things that are the same
  for (var i = 0; i <= 3; i++) {
    if (i > 0) {
      tiles1 = addTiles(0, i, moveDirection);
      tiles2 = addTiles(1, i, moveDirection);
      tiles3 = addTiles(2, i, moveDirection);
      tiles4 = addTiles(3, i, moveDirection);
    }

  }
  numberOfTiles += tiles1 + tiles2 + tiles3 + tiles4;
  //after everything is added together, need to move tiles again
  for (var i = 0; i <= 3; i++) {
    if (i > 0) {
      tiles1 += moveTiles(0, i, moveDirection);
      tiles2 += moveTiles(1, i, moveDirection);
      tiles3 += moveTiles(2, i, moveDirection);
      tiles4 += moveTiles(3, i, moveDirection);

    }
  }
  numberOfTiles += tiles1 + tiles2 + tiles3 + tiles4;

  return numberOfTiles;
}

function moveUp() {
  //figure out which direction to move the tiles
  var moveDirection = 'up';

  var numberOfTiles = 0;
  var tiles1 = 0;
  var tiles2 = 0;
  var tiles3 = 0;
  var tiles4 = 0;

  //try to move everything to the right
  for (var j = 0; j <= 3; j++) {
    //need to make sure it's not on the upside of the grid because it can't move anymore if that's the case
    if (j > 0) {
      tiles1 += moveTiles(j, 0, moveDirection);
      tiles2 += moveTiles(j, 1, moveDirection);
      tiles3 += moveTiles(j, 2, moveDirection);
      tiles4 += moveTiles(j, 3, moveDirection);

    }
  }
  numberOfTiles += tiles1 + tiles2 + tiles3 + tiles4;
  //now need to add things that are the same
  for (var j = 0; j <= 3; j++) {
    if (j > 0) {
      tiles1 = addTiles(j, 0, moveDirection);
      tiles2 = addTiles(j, 1, moveDirection);
      tiles3 = addTiles(j, 2, moveDirection);
      tiles4 = addTiles(j, 3, moveDirection);
    }

  }
  numberOfTiles += tiles1 + tiles2 + tiles3 + tiles4;
  //after everything is added together, need to move tiles again
  for (var j = 0; j <= 3; j++) {
    if (j > 0) {
      tiles1 += moveTiles(j, 0, moveDirection);
      tiles2 += moveTiles(j, 1, moveDirection);
      tiles3 += moveTiles(j, 2, moveDirection);
      tiles4 += moveTiles(j, 3, moveDirection);

    }
  }
  numberOfTiles += tiles1 + tiles2 + tiles3 + tiles4;

  return numberOfTiles;
}

function moveDown() {
  //figure out which direction to move the tiles
  var moveDirection = 'down';

  var numberOfTiles = 0;
  var tiles1 = 0;
  var tiles2 = 0;
  var tiles3 = 0;
  var tiles4 = 0;

  //try to move everything down
  for (var j = 3; j >= 0; j--) {
    //need to make sure it's not on the far bottom of the grid because it can't move anymore if that's the case
    if (j < 3) {
      tiles1 += moveTiles(j, 0, moveDirection);
      tiles2 += moveTiles(j, 1, moveDirection);
      tiles3 += moveTiles(j, 2, moveDirection);
      tiles4 += moveTiles(j, 3, moveDirection);

    }
  }
  numberOfTiles += tiles1 + tiles2 + tiles3 + tiles4;
  //now need to add things that are the same
  for (var j = 3; j >= 0; j--) {
    if (j < 3) {
      tiles1 = addTiles(j, 0, moveDirection);
      tiles2 = addTiles(j, 1, moveDirection);
      tiles3 = addTiles(j, 2, moveDirection);
      tiles4 = addTiles(j, 3, moveDirection);
    }

  }
  numberOfTiles += tiles1 + tiles2 + tiles3 + tiles4;
  //after everything is added together, need to move tiles again
  for (var j = 3; j >= 0; j--) {
    if (j < 3) {
      tiles1 += moveTiles(j, 0, moveDirection);
      tiles2 += moveTiles(j, 1, moveDirection);
      tiles3 += moveTiles(j, 2, moveDirection);
      tiles4 += moveTiles(j, 3, moveDirection);

    }
  }
  numberOfTiles += tiles1 + tiles2 + tiles3 + tiles4;

  return numberOfTiles;
}


//******************************************this function is to play the game the normal way with the four arrow keys ************//
// $(document).keydown(function(e) {
//   var numberOfTilesMoved = 0;
//     switch(e.which) {
//         case 37: // left
//           numberOfTilesMoved = moveLeft();
//           //alert (numberOfTilesMoved);
//           break;
//
//         case 38: // up
//           numberOfTilesMoved = moveUp();
//           break;
//
//         case 39: // right
//           numberOfTilesMoved = moveRight();
//           break;
//
//         case 40: // down
//           numberOfTilesMoved = moveDown();
//           break;
//
//         default: return; // exit this handler for other keys
//     }
//     e.preventDefault(); // prevent the default action (scroll / move caret)
//
//     updateGrid();
//
//     setTimeout(function() {
//       if (numberOfTilesMoved > 0) {
//         addNewNumber();
//         updateGrid();
//       }
//     }, 100);
//
//     //setTimeout(updateGrid, 110);
//
//     setTimeout(function() {
//       counter = isGameOver();
//       if (counter >= 16) {
//         var highestTile = 0;
//         for (var num = 0; num < 16; num++) {
//           var j = Math.floor(num / 4);
//           var i = num % 4;
//
//           if (tiles[j][i] > highestTile) {
//             highestTile = tiles[j][i];
//           }
//         }
//         $.alert({
//           title: 'Game Over',
//           content: 'The highest number you got to was ' + highestTile,
//         });
//       }
//     }, 600);
// });

var keyPressed = false;
var counter = 1;

$(document).on('keydown', function(e) {
  var key;
  if (keyPressed == false) {
    keyPressed = true;
    key = String.fromCharCode(e.keyCode);

    counter = setInterval(function() {
       counter--;
    }, 500);
  }

});

$(document).on('keyup', function() {
  if (keyPressed == true) {
    keyPressed = false;
    if (counter <= 0) {
      var numberOfTilesMoved = 0;
        //move right
       if (arrowDirection == 0) {
         numberOfTilesMoved = moveRight();
       }
       //move up
       else if (arrowDirection == 1) {
         numberOfTilesMoved = moveUp();
       }
       //move left
       else if (arrowDirection == 2) {
         numberOfTilesMoved = moveLeft();
       }
       //move down
       else if (arrowDirection == 3) {
         numberOfTilesMoved = moveDown();
       }
       counter = 1;
       clearInterval(counter);

       updateGrid();

       setTimeout(function() {
         if (numberOfTilesMoved > 0) {
           addNewNumber();
           updateGrid();
         }
       }, 100);

       //setTimeout(updateGrid, 110);

       setTimeout(function() {
         counter = isGameOver();
         if (counter >= 16) {
           var highestTile = 0;
           for (var num = 0; num < 16; num++) {
             var j = Math.floor(num / 4);
             var i = num % 4;

             if (tiles[j][i] > highestTile) {
               highestTile = tiles[j][i];
             }
           }
           $.alert({
             title: 'Game Over',
             content: 'The highest number you got to was ' + highestTile,
           });
         }
       }, 200);
     }
     else {
       //move up
       //for some reason this is the only way it works (even though 0 is suppose to be for right)
       if (arrowDirection == 0){
         $('#idArrow').html('');
         $('#idArrow').append('<i class="fas fa-chevron-up fa-8x" style="color:#CAC9C7"></i>');
       }
       //move left
       else if (arrowDirection == 1){
         $('#idArrow').html('');
         $('#idArrow').append('<i class="fas fa-chevron-left fa-8x" style="color:#CAC9C7"></i>');
       }
       //move down
       else if (arrowDirection == 2){
         $('#idArrow').html('');
         $('#idArrow').append('<i class="fas fa-chevron-down fa-8x" style="color:#CAC9C7"></i>');
       }
       //move right
       else if (arrowDirection == 3){
         $('#idArrow').html('');
         $('#idArrow').append('<i class="fas fa-chevron-right fa-8x" style="color:#CAC9C7"></i>');
       }
       arrowDirection++;
       arrowDirection = arrowDirection % 4;
     }
  }
});
