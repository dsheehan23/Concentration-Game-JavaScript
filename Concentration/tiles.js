/*
   Global Variables
   flipCount
      Used to track the number of tiles currently being turned over

   firstFlip
      Used to reference the first tile turned over

   secondFlip
      Used to reference the second tile turned over


   Functions
  
   addEvent(object, evName, fnName, cap)
      Run the function fnName when the event evName occurs in object.

   randomSort(arr)
      Randomly sorts the contents of the arr array.

   setOpacity(object, value)
      Sets the opacity level of object to value

   setupTiles()
      Sets up the tiles for use in the Concentration game

   flipTile()
      Flips a tile showing the image associated with the tile

   checkTiles(tile1, tile2)
      Checks whether the tile1 image source is the same as the
      tile2 image source

   flipBack()
      Flips back flipped over tiles and resets the flipCount
      variable to 0.

   



*/

//Track number of tiles flipped
var flipCount = 0;
var firstFlip;
var secondFlip;


function addEvent(object, evName, fnName, cap) {
    if (object.attachEvent)
        object.attachEvent("on" + evName, fnName);
    else if (object.addEventListener)
        object.addEventListener(evName, fnName, cap);
}

addEvent(window, "load", setupTiles, false);

function setupTiles() {
    var tiles = new Array();

    //populate array of game tile images
    for (var i = 0; i < document.images.length; i++) {
        var tile = document.images[i];

        if (tile.className == "tile" && tile.parentNode.tagName == "A") {
            tiles.push(tile);
        }
    }

    //populate array with pairs of matching game pieces
    var tileImages = new Array();

    //run for loop twice for matching pairs
    for (var i = 0; i < tiles.length / 2; i++) {
        var x = document.createElement("img");
        x.src = "Images/tileimage" + i + ".jpg";
        tileImages.push(x);
    }
    for (var i = 0; i < tiles.length / 2; i++) {
        var x = document.createElement("img");
        x.src = "Images/tileimage" + i + ".jpg";
        tileImages.push(x);
    }

    //randomize game pieces
    randomSort(tileImages);

    // run through game tiles array, assign each piece a game image, call flipTile() if a piece is clicked
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].image = new Image();
        tiles[i].image.src = tileImages[i].src;
        tiles[i].onclick = flipTile; //set up flip event with each tile
    }

    //When show all is clicked, all of the tile pieces show their game image from the custom property
    var show = document.getElementById("showAll");
    show.onclick = function () {
        for (var i = 0; i < tiles.length; i++) {
            tiles[i].src = tiles[i].image.src;
        }
    }

    //when the reload button is clicked, reload the page
    var load = document.getElementById("reload");
    load.onclick = function () {
        location.reload();
    }
}

// flip a tile that is clicked, set its image to its game image if appropriate, update variables
function flipTile() {
    if (flipCount == 0) {
        this.src = this.image.src;
        firstFlip = this;
        flipCount++;
    } else if (flipCount == 1) {
        this.src = this.image.src;
        secondFlip = this;
        flipCount++;
        checkTiles(); // call check tiles
    }

    return false;
}

//check flipped tiles to see if they match, if they do, gray them out, if not, flip back
function checkTiles() {
    if (firstFlip.src != secondFlip.src) {
        setTimeout("flipBack()", 800);
    } else if (firstFlip.src == secondFlip.src) {
        flipCount = 0;
        setOpacity(firstFlip, 70);
        setOpacity(secondFlip, 70);
        firstFlip.onclick = function () {
            return false;
        }
        secondFlip.onclick = function () {
            return false;
        }
    }
}

//reset the two pieces
function flipBack() {
    firstFlip.src = "Images/tile.jpg";
    secondFlip.src = "Images/tile.jpg";
    flipCount = 0;
}

function randomSort(arr) {

    arr.sort(function () {
        return 0.5 - Math.random();
    })

}

function setOpacity(object, value) {


    // Apply the opacity value for IE and non-IE browsers
    object.style.filter = "alpha(opacity = " + value + ")";
    object.style.opacity = value / 100;

}