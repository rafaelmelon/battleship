var Player = function(name,navy,score){
  this.name = name;
  this.navy = navy;
  this.score = score;
  this.shipSelected = [];
  this.cellSelected = [];
};

var userHuman = new Player();
var userComputer = new Player();

function getSubmit(){
  userHuman.name = $(".js-user-id").val();
  userHuman.navy = $('input[name=navyOption]:checked').val();
  var nameTheme = $('input[name=navyOption]:checked').val().replace(/ +/g, "");
  var addThemeBoard = $('#human-section').addClass(nameTheme);
  $('.js-player-name').append(userHuman.name);
  $('.js-player-navy').append(userHuman.navy);
}

function shipSelection(){
  var shipDataType = $(this).data("ship-type");
  userHuman.shipSelected.push(shipDataType);
  $(this).attr('disabled', 'disabled');
  $("#human .board-disabled").addClass("hide");
}

function addShipBoard(){
  var cellClassRow = $(this).parent().attr('class').split(' ');
  var cellClassCol = $(this).attr('class').split(' ');
  var cellValueRow = cellClassRow[1];
  var cellValueCol = cellClassCol[1];
  for(var i = 0; i < userHuman.shipSelected.length;i++){
    switch (userHuman.shipSelected[i]) {
      case "fregate":
        $(this).addClass("two-cell-ship").next().addClass("two-cell-ship");
        userHuman.cellSelected.push([cellValueRow,cellValueCol]);
        $('.b-report .news').append("<p>Barco 1 agregado al mapa</p>");
        userHuman.shipSelected[i] = "";
      break;
      case "destructor":
        $(this).addClass("three-cell-ship").next().addClass("three-cell-ship").next().addClass("three-cell-ship");
        userHuman.cellSelected.push([cellValueRow,cellValueCol]);
        $('.b-report .news').append("<p>Barco 2 agregado al mapa</p>");
        userHuman.shipSelected[i] = "";
      break;
    }
  }
  if(userHuman.cellSelected.length === 2){
    $('.js-init-game').removeAttr('disabled');
  }else{
    $('.js-init-game').attr('disabled', 'disabled');
  }
}

function shipTarget(){
  $(this).addClass("target");
}

function initGame(){
  $("#computer .board-disabled").addClass("hide");
  userComputerBoard.shipRandomComputer();
}


$(document).ready(function(){


  $(".js-modal-player").modal('show');

  $(".js-submit").on("click",getSubmit);

  $(".js-get-ship").on("click",shipSelection);

  $(document.body).on('click','.board-col',addShipBoard);

  $(document.body).on('click','.board-col',shipTarget);

  $(".js-init-game").on("click",initGame);



});
