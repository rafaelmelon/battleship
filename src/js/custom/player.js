var Player = function(name,navy){
  this.name = name;
  this.navy = navy;
  this.score = 0;
  this.shipSelectedName = [];
  this.cellSelected = [];
  this.cellFregate = {};
  this.cellDestructor = {};
  this.target = [];
};

// HUMAN/COMPUTER - CREO LOS JUGADORES
var userHuman = new Player();
var userComputer = new Player();

// HUMAN - OBTENGO EL NOMBRE DE USUARIO Y LA SELECCIÓN DE LA ARMADA
function getSubmit(){
  userHuman.name = $(".js-user-id").val();
  userHuman.navy = $('input[name=navyOption]:checked').val();
  var nameTheme = $('input[name=navyOption]:checked').val().replace(/ +/g, "");
  var addThemeBoard = $('#human-section').addClass(nameTheme);
  $('.js-player-name').append(userHuman.name);
  $('.js-player-navy').append(userHuman.navy);
}

// HUMAN - OBTENGO EL TIPO DE BARCO EN EL DATA-ATTRIBUTE
function shipSelection(){
  var shipDataType = $(this).data("ship-type");
  userHuman.shipSelectedName.push(shipDataType);
  $(this).attr('disabled', 'disabled');
  $("#human.b-board").addClass("enabled");
}

// HUMAN - AGREGO LOS BARCOS AL MAPA, SI ES QUE TENGO ALGUNO SELECCIONADO
function addShipBoard(){
  var cellClassRow = $(this).parent().attr('class').split(' ');
  var cellClassCol = $(this).attr('class').split(' ');
  var cellValueRow = cellClassRow[1];
  var cellValueCol = cellClassCol[1];
  for(var i = 0; i < userHuman.shipSelectedName.length;i++){
    switch (userHuman.shipSelectedName[i]) {
      case "fregate":
        $(this).addClass("two-cell-ship").next().addClass("two-cell-ship");
        userHuman.cellSelected.push([cellValueRow,cellValueCol]);

        var aformatValueCol = cellValueCol.slice(-1);
        var aformatValueCol2 = Number(aformatValueCol)+1;
        var aformatValueCol3 = "c-"+aformatValueCol2;

        userHuman.cellFregate = [{
          row: cellValueRow,
          col: cellValueCol
        },{
          row: cellValueRow,
          col: aformatValueCol3
        }];

        console.log(userHuman.cellFregate);

        $('.b-report .news').append("<p>Fregate added to the map</p>");
        userHuman.shipSelectedName[i] = "";
      break;
      case "destructor":
        $(this).addClass("three-cell-ship").next().addClass("three-cell-ship").next().addClass("three-cell-ship");
        userHuman.cellSelected.push([cellValueRow,cellValueCol]);

        var bformatValueCol = cellValueCol.slice(-1);
        var bformatValueCol2 = Number(bformatValueCol)+1;
        var bformatValueCol3 = "c-"+bformatValueCol2;

        var cformatValueCol = cellValueCol.slice(-1);
        var cformatValueCol2 = Number(cformatValueCol)+2;
        var cformatValueCol3 = "c-"+cformatValueCol2;

        userHuman.cellDestructor = [{
          row: cellValueRow,
          col: cellValueCol
        },{
          row: cellValueRow,
          col: bformatValueCol3
        },{
          row: cellValueRow,
          col: cformatValueCol3
        }];

        console.log(userHuman.cellDestructor);

        $('.b-report .news').append("<p>Destructor added to the map</p>");
        userHuman.shipSelectedName[i] = "";
      break;
    }
  }
  if(userHuman.cellSelected.length === 2){
    $('.js-init-game').removeAttr('disabled');
  }else{
    $('.js-init-game').attr('disabled', 'disabled');
  }
  $('#human-section .b-option .ships .current span').text(userHuman.cellSelected.length);
}

// función
function randomM(){
  return Math.floor(Math.random() * 10);
}


// HUMAN - FUNCIÓN PARA DETECTAR EN EL MAPA LOS BARCOS
function humanTarget(){
  var random1 = Math.floor(Math.random() * 10),
  random2 = Math.floor(Math.random() * 10);



  //userHuman.target.push(["r-"+random1,"c-"+random2]);

  if($("#human").children(".r-"+random1).children(".c-"+random2).hasClass("target")){
    return humanTarget();
  }else{
    $("#human").children(".r-"+random1).children(".c-"+random2).addClass("target");
  }

  if($("#human .board-col").hasClass("touched") && $("#human .board-col").hasClass("target")){
    $('.b-report .news').append("<p>"+userHuman.name+" damaged warship</p>");
  }


  for (var i = 0; i < userHuman.cellSelected.length; i++) {
    if(userHuman.cellFregate[i].row === "r-"+random1 && userHuman.cellFregate[i].col === "c-"+random2){
      console.log("FREGATE touched!!: "+userHuman.cellFregate[i].row+"    "+userHuman.cellFregate[i].col);
      userHuman.cellFregate[i].row = 0;
      userHuman.cellFregate[i].col = 0;
      console.log(userHuman.cellFregate[i]);
      if(userHuman.cellFregate[0].row === 0 && userHuman.cellFregate[1].row ===0){
        alert("BARCO DESTRUIDO!!!!");
      }
    }
    if(userHuman.cellDestructor[i].row === "r-"+random1 && userHuman.cellDestructor[i].col === "c-"+random2){
      console.log("DESTRUCTOR touched!!: "+userHuman.cellDestructor[i].row+"    "+userHuman.cellDestructor[i].col);
    }
  }

}

// COMPUTER - FUNCIÓN PARA DETECTAR EN EL MAPA LOS BARCOS
function computerTarget(){
  $(this).addClass("target");
  $(".two-cell-ship.target").addClass("touched");
  $(".three-cell-ship.target").addClass("touched");
  if($(this).hasClass("touched")){
    $('.b-report .news').append("<p>Enemy damaged warship</p>");
    userHuman.score += 10;
    $('.b-report .score p').text(userHuman.score+" Points");
  }

  humanTarget();
}

// COMPUTER - AGREGO LOS BARCOS AL MAPA ALEATORIAMENTE (CONDICIONES PARA QUE NO REBASE EL MAPA)
function addShipBoard_RandomComputer() {
  var random1 = Math.floor(Math.random() * 10),
  random2 = Math.floor(Math.random() * 10),
  random3 = Math.floor(Math.random() * 10),
  random4 = Math.floor(Math.random() * 10);

  var rowRandom1 = "r-"+random1,
  cellRandom2 = "c-"+random2,
  rowRandom3 = "r-"+random3,
  cellRandom4 = "c-"+random4;

  if(cellRandom2 === "c-9"){
    random2 = random2 - 1;
    $("#computer").children(".r-"+random1).children(".c-"+random2).addClass("two-cell-ship").next().addClass("two-cell-ship");
  }else{
    $("#computer").children(".r-"+random1).children(".c-"+random2).addClass("two-cell-ship").next().addClass("two-cell-ship");
  }

  if(cellRandom4 === "c-9"){
    random4 = random4 - 2;
    $("#computer").children(".r-"+random3).children(".c-"+random4).addClass("three-cell-ship").next().addClass("three-cell-ship").next().addClass("three-cell-ship");
  }else if(cellRandom4 === "c-8"){
    random4 = random4 - 1;
    $("#computer").children(".r-"+random3).children(".c-"+random4).addClass("three-cell-ship").next().addClass("three-cell-ship").next().addClass("three-cell-ship");
  }else{
    $("#computer").children(".r-"+random3).children(".c-"+random4).addClass("three-cell-ship").next().addClass("three-cell-ship").next().addClass("three-cell-ship");
  }

  userComputer.cellSelected.push(["r-"+random1,"c-"+random2],["r-"+random3,"c-"+random4]);
  $('#computer-section .b-option .ships .current span').text(userComputer.cellSelected.length);
}

// COMPUTER - BOTÓN QUE EJECUTA EL INICIO DEL JUEGO
function initGame(){
  $(this).attr('disabled', 'disabled');
  $("#computer.b-board").addClass("enabled");
  addShipBoard_RandomComputer();
}



$(document).ready(function(){

  //$(".js-modal-player").modal('show');

  //$(".js-submit").on("click",getSubmit);

  $(".js-get-ship").on("click",shipSelection);

  $(document.body).on('click','.board-col',addShipBoard);

  $(document.body).on('click','#computer .board-col',computerTarget);

  $(".js-init-game").on("click",initGame);



});
