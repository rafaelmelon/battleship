var Player = function(name,navy){
  this.name = name;
  this.navy = navy;
  this.score = 0;
  this.timing = 0;
  this.sumShip1 = 0;
  this.sumShip2 = 0;
  this.sumShip3 = 0;
  this.sumShip4 = 0;
  this.getShipName = [];
  this.setShipLength = [];
  this.cellSelected = [];
  this.cellFregate = {};
  this.cellDestructor = {};
};

Player.prototype.intervalComputerTarget = function() {
  var t = setInterval(function(){
    console.log("PEDO");
    //$(".b-panel").attr("data-class","touch");
    clearInterval(t);
  },2000);
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

// HUMAN - RESET DEL MAPA
Player.prototype.clearSelection = function(){
  userHuman.getShipName = [];
  userHuman.cellSelected = [];
  $(".js-get-ship").removeAttr("disabled");
  $('.js-init-game').attr('disabled', 'disabled');
  $('#human-section .b-option .ships .current span').text(userHuman.cellSelected.length);
  $('.b-report .news').append("<p>"+userHuman.name+": reset map</p>");
  $("#human").find(".board-col").removeClass("two-cell-ship");
  $("#human").find(".board-col").removeClass("three-cell-ship");
};

// HUMAN - OBTENGO EL TIPO DE BARCO EN EL DATA-ATTRIBUTE
Player.prototype.getShipBoard = function() {
  var shipDataType = $(this).data("ship-type");
  userHuman.getShipName.push(shipDataType);
  $(".btn-rotate").removeAttr("disabled");

  $(this).attr('disabled', 'disabled');
  $("#human.b-board").addClass("enabled");
};

// HUMAN - EJECUTA SCORE EN PANTALLA
Player.prototype.humanScore = function() {
  $("#human .p-stat.score span").text(this.score);
};

// HUMAN - FUNCIÓN PARA DETECTAR EN EL MAPA LOS BARCOS
Player.prototype.humanTarget = function() {
  var random1 = Math.floor(Math.random() * 10),
  random2 = Math.floor(Math.random() * 10);

  if($("#human").children(".r-"+random1).children(".c-"+random2).hasClass("target")){
    Player.prototype.humanTarget();
  }else{
    $("#human").children(".r-"+random1).children(".c-"+random2).addClass("target");

    if ($("#human").children(".r-"+random1).children(".c-"+random2).hasClass("two-cell-ship")) {
      $("#human").children(".r-"+random1).children(".c-"+random2).addClass("touched");
    }
    if($("#human").children(".r-"+random1).children(".c-"+random2).hasClass("three-cell-ship")) {
      $("#human").children(".r-"+random1).children(".c-"+random2).addClass("touched");
    }

    if(userHuman.cellFregate[0].row === "r-"+random1 && userHuman.cellFregate[0].col === "c-"+random2 ||
      userHuman.cellFregate[1].row === "r-"+random1 && userHuman.cellFregate[1].col === "c-"+random2){

      userHuman.sumShip1 += 1;

      $('.b-report .news').append("<p>"+userHuman.name+": fregate touched!</p>");

      if(userHuman.sumShip1 === 2){
        $('.b-report .news').append("<p>"+userHuman.name+": fregate sunken!!!!</p>");
        $(".js-get-ship[data-ship-type='fregate']").addClass("sunken");
        userHuman.cellSelected.pop();
        $('#human-section .b-option .ships .current span').text(userHuman.cellSelected.length);
      }
    }

    if(userHuman.cellDestructor[0].row === "r-"+random1 && userHuman.cellDestructor[0].col === "c-"+random2 ||
       userHuman.cellDestructor[1].row === "r-"+random1 && userHuman.cellDestructor[1].col === "c-"+random2 ||
       userHuman.cellDestructor[2].row === "r-"+random1 && userHuman.cellDestructor[2].col === "c-"+random2){

       userHuman.sumShip2 += 1;

       $('.b-report .news').append("<p>"+userHuman.name+": destructor touched!</p>");

       if(userHuman.sumShip2 === 3){
         $('.b-report .news').append("<p>"+userHuman.name+": destructor sunken!!!!</p>");
         $(".js-get-ship[data-ship-type='destructor']").addClass("sunken");
         userHuman.cellSelected.pop();
         $('#human-section .b-option .ships .current span').text(userHuman.cellSelected.length);
       }
    }
  }

};

// COMPUTER - FUNCIÓN PARA DETECTAR EN EL MAPA LOS BARCOS
Player.prototype.computerTarget = function() {

  $(this).addClass("target");

  var cellClassRow = $(this).parent().attr('class').split(' '),
  cellClassCol = $(this).attr('class').split(' '),
  cellValueRow = cellClassRow[1],
  cellValueCol = cellClassCol[1];

  if(userComputer.cellFregate[0].row === cellValueRow && userComputer.cellFregate[0].col === cellValueCol ||
    userComputer.cellFregate[1].row === cellValueRow && userComputer.cellFregate[1].col === cellValueCol){

    //userHuman.intervalComputerTarget();
    userComputer.sumShip3 += 1;

    $(this).addClass("touched");
    $('.b-report .news').append("<p>Enemy: fregate touched! <span>+20</span></p>");
    userHuman.score += 20;

    if(userComputer.sumShip3 === 2){
      userHuman.score += 40;
      $('.b-report .news').append("<p>Enemy: fregate sunken!!!! <span>+40</span></p>");
      $("span.btn-ship[data-ship-type='fregate']").addClass("sunken");
      userComputer.cellSelected.pop();
      $('#computer-section .b-option .ships .current span').text(userComputer.cellSelected.length);
    }
  }

  if(userComputer.cellDestructor[0].row === cellValueRow && userComputer.cellDestructor[0].col === cellValueCol ||
     userComputer.cellDestructor[1].row === cellValueRow && userComputer.cellDestructor[1].col === cellValueCol ||
     userComputer.cellDestructor[2].row === cellValueRow && userComputer.cellDestructor[2].col === cellValueCol){

     userComputer.sumShip4 += 1;

     $(this).addClass("touched");
     $('.b-report .news').append("<p>Enemy: destructor touched! <span>+25</span></p>");
     userHuman.score += 25;

     if(userComputer.sumShip4 === 3){
       userHuman.score += 50;
       $('.b-report .news').append("<p>Enemy: destructor sunken!!!! <span>+50</span></p>");
       $("span.btn-ship[data-ship-type='destructor']").addClass("sunken");
       userComputer.cellSelected.pop();
       $('#computer-section .b-option .ships .current span').text(userComputer.cellSelected.length);
     }
  }

  userComputer.humanTarget();
  userHuman.humanScore();

  if (userComputer.cellSelected.length === 0 && userHuman.cellSelected.length > 0) {
    $('.b-report .news').append("<p><span>"+userHuman.name+" WIN!!</span></p>");
  }else if (userHuman.cellSelected.length === 0 && userComputer.cellSelected.length > 0) {
    $('.b-report .news').append("<p><span>The enemy has defeated you</span></p>");
  }

};

// HUMAN/COMPUTER - SETINTERVAL
/*function timeRemaining() {
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
var startTimining = window.setInterval(timeRemaining, 1000);*/

// COMPUTER - BOTÓN QUE EJECUTA EL INICIO DEL JUEGO
Player.prototype.initGame = function() {
  $(this).attr('disabled', 'disabled');
  $("#computer.b-board").addClass("enabled");
  $('.b-report .news').append("<p>The battle begins!</p>");
  Player.prototype.setShipBoard_randomComputer();

  $(".js-clear-board").attr('disabled', 'disabled');
  /*// TIME CONTROL //*/ $("#human .p-stat.time-remaining span").removeClass();
  //window.setInterval(timeRemaining, 1000);
};

Player.prototype.rotate = function() {
  $('#human').toggleClass("shipVertical");
  $(this).toggleClass("btn-shipVertical");
  if ($(this).is(".btn-shipVertical")) {
    $("#human .p-stat.direction span").text("Vertical battleship");
    $('.b-report .news').append("<p><span>"+userHuman.name+": the battleship is oriented vertitcally</span></p>");
  } else {
    $("#human .p-stat.direction span").text("the battleship is oriented horizontally");
  }
};

$(document).ready(function(){

  //$(".js-modal-player").modal('show');

  //$(".js-submit").on("click",Player.prototype.getSubmit);

  $(".js-clear-board").on("click",userHuman.clearSelection);

  $(".js-get-ship").on("click",userHuman.getShipBoard);

  $(document.body).on('click','.board-col',userHuman.setShipBoard);

  $('.btn-rotate').on('click',userHuman.rotate);

  $(document.body).on('click','#computer .board-col',Player.prototype.computerTarget);

  $(".js-init-game").on("click",Player.prototype.initGame);

});
