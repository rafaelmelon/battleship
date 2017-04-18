function Board(user,size) {
  this.user = user;
  this.size = size;
  this.grid = [];
  this._buildGrid();
  this._printGrid();
}

// BOARD - CONSTRUYO EL GRID EN EL OBJETO
Board.prototype._buildGrid = function () {
  for(var i = 0; i < this.size; i++) {
    this.grid[i] = {
      classRow: "board-row",
      classIdRow: "r-"+i
    };
    for(var j = 0; j < this.size; j++) {
      this.grid[i][j] = {
        classCol: "board-col",
        classIdCol: "c-"+j
      };
    }
  }
};



// BOARD - PINTO EL GRID EN EL DOM DESDE LAS PROPIEDADES DEL OBJETO
Board.prototype._printGrid = function () {
  for(var i = 0; i < this.grid.length; i++){
    $("#"+ this.user).append("<div class='"+this.grid[i].classRow+" "+this.grid[i].classIdRow+"'></div>");
    for(var j = 0; j < this.grid.length; j++){
      $("#"+ this.user).children("."+this.grid[i].classIdRow).append("<div class='"+this.grid[i][j].classCol+" "+this.grid[i][j].classIdCol+"'></div>");
    }
  }
};

// BOARD - CREO LOS MAPAS DE LOS JUGADORES
var userHumanBoard = new Board("human",10);
var userComputerBoard = new Board("computer",10);
