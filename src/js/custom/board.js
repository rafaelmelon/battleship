function Board(user,size) {
  this.user = user;
  this.size = size;
  this.grid = [];
  this._buildGrid();
  this._printGrid();
}

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

Board.prototype._printGrid = function () {
  for(var i = 0; i < this.grid.length; i++){
    $("#"+ this.user).append("<div class='"+this.grid[i].classRow+" "+this.grid[i].classIdRow+"'></div>");
    for(var j = 0; j < this.grid.length; j++){
      $("#"+ this.user).children("."+this.grid[i].classIdRow).append("<div class='"+this.grid[i][j].classCol+" "+this.grid[i][j].classIdCol+"'></div>");
    }
  }
};

Board.prototype.shipRandomComputer = function() {
  var index1 = Math.floor(Math.random() * 10);
  var index2 = Math.floor(Math.random() * 10);
  var index3 = Math.floor(Math.random() * 10);
  var index4 = Math.floor(Math.random() * 10);
  $("#computer").children(".r-"+index1).children(".c-"+index2).addClass("two-cell-ship").next().addClass("two-cell-ship");
  $("#computer").children(".r-"+index3).children(".c-"+index4).addClass("three-cell-ship").next().addClass("three-cell-ship").next().addClass("three-cell-ship");
};


$("#human").append("<div class='board-disabled'><p>Locate your warships</p></div>");
$("#computer").append("<div class='board-disabled'></div>");

var userHumanBoard = new Board("human",10);
var userComputerBoard = new Board("computer",10);
