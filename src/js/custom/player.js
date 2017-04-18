var Player = function(name,navy){
  this.name = name;
  this.navy = navy;
  this.score = 0;
  this.timing = 0;
  this.shipSelectedName = [];
  this.cellSelected = [];
  this.cellFregate = {};
  this.cellDestructor = {};
  this.target = [];
};

Player.prototype.inter = function() {
  var t = setInterval(function(){
    console.log("PEDO");
    clearInterval(t);
  },1000);
};

// HUMAN/COMPUTER - CREO LOS JUGADORES
var userHuman = new Player();
var userComputer = new Player(
  ["Dai-gensui","Hermann von Stengel","Bill Branon","Vladimir Antonovich"],
  ["Imperial Japanese Navy","Imperial German Navy","United States Navy","Soviet Union Navy"]
);

// HUMAN - OBTENGO EL NOMBRE DE USUARIO Y LA SELECCIÓN DE LA ARMADA
Player.prototype.getSubmit = function() {

  userHuman.name = $(".js-user-id").val();
  userHuman.navy = $('input[name=navyOption]:checked').val();

  var iRandom = Math.floor(Math.random() * 4);

  for(iRandom;iRandom < userComputer.navy.length;iRandom++){
    if(userHuman.navy !== userComputer.navy[iRandom]){
      userComputer.name = userComputer.name[iRandom];
      userComputer.navy = userComputer.navy[iRandom];
      break;
    }
  }

  var humanNameTheme = $('input[name=navyOption]:checked').val().replace(/ +/g, "");
  var computerNameTheme = userComputer.navy.replace(/ +/g, "");

  $('#human-section').addClass(humanNameTheme);
  $('#computer-section').addClass(computerNameTheme);

  $('#human-section .js-player-name').append(userHuman.name);
  $('#human-section .js-player-navy').append(userHuman.navy);

  $('#computer-section .js-player-name').append(userComputer.name);
  $('#computer-section .js-player-navy').append(userComputer.navy);
};



// HUMAN - OBTENGO EL TIPO DE BARCO EN EL DATA-ATTRIBUTE
Player.prototype.shipSelection = function() {
  var shipDataType = $(this).data("ship-type");
  userHuman.shipSelectedName.push(shipDataType);
  $(this).attr('disabled', 'disabled');
  $("#human.b-board").addClass("enabled");
};

// HUMAN - EJECUTA SCORE EN PANTALLA
Player.prototype.humanScore = function() {
  $("#human .p-stat.score span").text(userHuman.score);
};

// HUMAN - FUNCIÓN PARA DETECTAR EN EL MAPA LOS BARCOS
Player.prototype.humanTarget = function() {
  var random1 = Math.floor(Math.random() * 10),
  random2 = Math.floor(Math.random() * 10);

  //userHuman.target.push(["r-"+random1,"c-"+random2]);

  if($("#human").children(".r-"+random1).children(".c-"+random2).hasClass("target")){
    Player.prototype.humanTarget();
  }else{
    $("#human").children(".r-"+random1).children(".c-"+random2).addClass("target");
  }

  for (var i = 0; i < userHuman.cellSelected.length; i++) {
    if(userHuman.cellFregate[i].row === "r-"+random1 && userHuman.cellFregate[i].col === "c-"+random2){

      $('.b-report .news').append("<p>"+userHuman.name+": Fregate touched!</p>");
      userHuman.cellFregate[i].row = 0;
      userHuman.cellFregate[i].col = 0;

      if(userHuman.cellFregate[0].row === 0 && userHuman.cellFregate[1].row ===0){
        $('.b-report .news').append("<p>"+userHuman.name+": Fregate sunken!!!!</p>");
      }
    }
    if(userHuman.cellDestructor[i].row === "r-"+random1 && userHuman.cellDestructor[i].col === "c-"+random2){
      $('.b-report .news').append("<p>"+userHuman.name+": Destructor touched!</p>");
    }
  }
};

// COMPUTER - FUNCIÓN PARA DETECTAR EN EL MAPA LOS BARCOS
Player.prototype.computerTarget = function() {

  $(this).addClass("target");
  $(".two-cell-ship.target").addClass("touched");
  $(".three-cell-ship.target").addClass("touched");

  var cellClassRow = $(this).parent().attr('class').split(' '),
  cellClassCol = $(this).attr('class').split(' '),
  cellValueRow = cellClassRow[1],
  cellValueCol = cellClassCol[1];

  for (var i = 0; i < userComputer.cellSelected.length; i++) {
    if(userComputer.cellFregate[i].row === cellValueRow && userComputer.cellFregate[i].col === cellValueCol){

      //$(".b-panel").attr("data-class","touch");
      $('.b-report .news').append("<p>Enemy: Fregate touched!</p>");
      userHuman.score += 20;
      userComputer.cellFregate[i].row = 0;
      userComputer.cellFregate[i].col = 0;

      if(userComputer.cellFregate[0].row === 0 && userComputer.cellFregate[1].row === 0){
        userHuman.score += 40;
        //$(".b-panel").attr("data-class","sunken");
        $('.b-report .news').append("<p>Enemy: Fregate sunken!!!!</p>");
      }
    }
    if(userComputer.cellDestructor[i].row === cellValueRow && userComputer.cellDestructor[i].col === cellValueCol){
      //$(".b-panel").attr("data-class","touch");
      $('.b-report .news').append("<p>Enemy: Destructor touched!</p>");
      userHuman.score += 25;
    }
  }
  Player.prototype.humanTarget();
  Player.prototype.humanScore();

};

// HUMAN/COMPUTER - SETINTERVAL
function timeRemaining() {
  if(!$("#human .p-stat.time-remaining span").hasClass('pauseTiming')) { //only run if it hasn't got this class 'pauseInterval'
    console.log('game timing...');
    userHuman.timing += 1;
    $("#human .p-stat.time-remaining span").text(userHuman.timing); //just for explaining and showing
    if(userHuman.timing === 100){
      clearInterval(startTimining);
      console.log('game timing OFF');
    }
  }else{
    clearInterval(startTimining);
  }
}
var startTimining = window.setInterval(timeRemaining, 1000);

// COMPUTER - BOTÓN QUE EJECUTA EL INICIO DEL JUEGO
Player.prototype.initGame = function() {
  $(this).attr('disabled', 'disabled');
  $("#computer.b-board").addClass("enabled");
  Player.prototype.setShipBoard_randomComputer();
  /*// TIME CONTROL //*/ $("#human .p-stat.time-remaining span").removeClass();
  window.setInterval(timeRemaining, 1000);
};



$(document).ready(function(){

  //$(".js-modal-player").modal('show');

  //$(".js-submit").on("click",Player.prototype.getSubmit);

  $(".js-get-ship").on("click",Player.prototype.shipSelection);

  $(document.body).on('click','.board-col',Player.prototype.setShipBoard);

  $(document.body).on('click','#computer .board-col',Player.prototype.computerTarget);

  $(".js-init-game").on("click",Player.prototype.initGame);

});
