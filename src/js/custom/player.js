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
  this.cellFregate = {};
  this.cellDestructor = {};
};

// HUMAN/COMPUTER - CREO LOS JUGADORES
var userHuman = new Player();
var userComputer = new Player(
  ["Dai-gensui","Hermann von Stengel","Bill Branon","Vladimir Antonovich"],
  ["Imperial Japanese Navy","Imperial German Navy","United States Navy","Soviet Union Navy"]
);

// HUMAN - OBTENGO EL NOMBRE DE USUARIO Y LA SELECCIÓN DE LA ARMADA
Player.prototype.getSubmit = function() {

  $('.fx-game.ocean')[0].play();
  $('.fx-game.ocean')[0].loop = true;

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

  sameHeightDivs();
};

// HUMAN - RESET DEL MAPA
Player.prototype.clearSelection = function(){
  userHuman.getShipName = [];
  userHuman.setShipLength = [];
  $(".js-get-ship").removeAttr("disabled");
  $('.js-init-game').attr('disabled', 'disabled');
  $(".board-col").removeClass("two-cell-ship");
  $(".board-col").removeClass("three-cell-ship");
  $("#human .p-stat.direction span").removeClass("hide");
  $('#human-section .b-option .current span').text(userHuman.setShipLength.length);
  $('.b-report .news').append("<p>"+userHuman.name+"_ reset map</p>");
};

// HUMAN - OBTENGO EL TIPO DE BARCO EN EL DATA-ATTRIBUTE
Player.prototype.getShipBoard = function() {

  $('.fx-game.click1')[0].play();

  var shipDataType = $(this).data("ship-type");
  userHuman.getShipName.push(shipDataType);
  $(".btn-rotate").removeAttr("disabled");

  $(this).attr('disabled', 'disabled');
  $("#human.b-board").addClass("enabled");
  $("#human.b-board").addClass(shipDataType);
};

// HUMAN - EJECUTA SCORE EN PANTALLA
Player.prototype.humanScore = function() {
  $("#human .p-stat.score span").text(this.score);
};

// HUMAN - FUNCIÓN PARA DETECTAR EN EL MAPA LOS BARCOS
Player.prototype.humanTarget = function() {

  $('.fx-game.cannon1')[0].play();

  $(".b-panel").attr('data-class','shot2');

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

      $('.fx-game.explosion1')[0].play();

      userHuman.sumShip1 += 1;

      $(".b-panel").attr('data-class','touch2');
      $('.b-report .news').append("<p>"+userHuman.name+"_ fregate touched!</p>");

      if(userHuman.sumShip1 === 2){
        $(".b-panel").attr('data-class','sunken2');
        $('.b-report .news').append("<p>"+userHuman.name+"_ fregate sunken!!!!</p>");
        $(".js-get-ship[data-ship-type='fregate']").addClass("sunken");
        userHuman.setShipLength.pop();
        $('#computer-section .b-option .current span').text(userHuman.setShipLength.length);
      }
    }

    if(userHuman.cellDestructor[0].row === "r-"+random1 && userHuman.cellDestructor[0].col === "c-"+random2 ||
       userHuman.cellDestructor[1].row === "r-"+random1 && userHuman.cellDestructor[1].col === "c-"+random2 ||
       userHuman.cellDestructor[2].row === "r-"+random1 && userHuman.cellDestructor[2].col === "c-"+random2){

       $('.fx-game.explosion1')[0].play();

       userHuman.sumShip2 += 1;
       $(".b-panel").attr('data-class','touch2');
       $('.b-report .news').append("<p>"+userHuman.name+"_ destructor touched!</p>");

       if(userHuman.sumShip2 === 3){
         $(".b-panel").attr('data-class','sunken2');
         $('.b-report .news').append("<p>"+userHuman.name+"_ destructor sunken!!!!</p>");
         $(".js-get-ship[data-ship-type='destructor']").addClass("sunken");
         userHuman.setShipLength.pop();
         $('#computer-section .b-option .current span').text(userHuman.setShipLength.length);
       }
    }
  }

  userHuman.checkBattle();

};

// COMPUTER - FUNCIÓN PARA DETECTAR EN EL MAPA LOS BARCOS
Player.prototype.computerTarget = function() {

  $('.fx-game.cannon2')[0].play();
  $('.fx-game.cannon-special')[0].play();

  $(this).addClass("target");
  $(".b-panel").attr('data-class','shot1');

  var cellClassRow = $(this).parent().attr('class').split(' '),
  cellClassCol = $(this).attr('class').split(' '),
  cellValueRow = cellClassRow[1],
  cellValueCol = cellClassCol[1];

  if(userComputer.cellFregate[0].row === cellValueRow && userComputer.cellFregate[0].col === cellValueCol ||
    userComputer.cellFregate[1].row === cellValueRow && userComputer.cellFregate[1].col === cellValueCol){

    $('.fx-game.explosion2')[0].play();

    userComputer.sumShip3 += 1;

    $(this).addClass("touched");

    $(".b-panel").attr('data-class','touch1');

    if (userHuman.timing < 20) {
      userHuman.score += 50;
      $('.b-report .news').append("<p>Enemy_ fregate touched! <span>+50</span> TIME BONUS</p>");
    }else if((userHuman.timing < 60)) {
      userHuman.score += 30;
      $('.b-report .news').append("<p>Enemy_ fregate touched! <span>+30</span> TIME BONUS</p>");
    }else{
      userHuman.score += 25;
      $('.b-report .news').append("<p>Enemy_ fregate touched! <span>+25</span></p>");
    }

    if(userComputer.sumShip3 === 2){

      $('.fx-game.sunken')[0].play();

      $(".b-panel").attr('data-class','sunken1');

      if (userHuman.timing < 20) {
        userHuman.score += 100;
        $('.b-report .news').append("<p>Enemy_ fregate sunken!!!! <span>+100</span> TIME BONUS</p>");
      }else if((userHuman.timing < 60)) {
        userHuman.score += 60;
        $('.b-report .news').append("<p>Enemy_ fregate sunken!!!! <span>+60</span> TIME BONUS</p>");
      }else{
        userHuman.score += 50;
        $('.b-report .news').append("<p>Enemy_ fregate sunken!!!! <span>+50</span></p>");
      }

      $("span.btn-ship[data-ship-type='fregate']").addClass("sunken");
      userComputer.setShipLength.pop();
      $('#computer-section .b-option .current span').text(userComputer.setShipLength.length);
    }
  }

  if(userComputer.cellDestructor[0].row === cellValueRow && userComputer.cellDestructor[0].col === cellValueCol ||
     userComputer.cellDestructor[1].row === cellValueRow && userComputer.cellDestructor[1].col === cellValueCol ||
     userComputer.cellDestructor[2].row === cellValueRow && userComputer.cellDestructor[2].col === cellValueCol){

     $('.fx-game.explosion2')[0].play();

     userComputer.sumShip4 += 1;

     $(this).addClass("touched");
     $(".b-panel").attr('data-class','touch1');

     if (userHuman.timing < 20) {
       userHuman.score += 100;
       $('.b-report .news').append("<p>Enemy_ destructor touched! <span>+100</span> TIME BONUS</p>");
     }else if((userHuman.timing < 60)) {
       userHuman.score += 80;
       $('.b-report .news').append("<p>Enemy_ destructor touched! <span>+80</span> TIME BONUS</p>");
     }else{
       userHuman.score += 50;
       $('.b-report .news').append("<p>Enemy_ destructor touched! <span>+50</span></p>");
     }

     if(userComputer.sumShip4 === 3){

       $('.fx-game.sunken')[0].play();

       $(".b-panel").attr('data-class','sunken1');

       if (userHuman.timing < 20) {
         userHuman.score += 200;
         $('.b-report .news').append("<p>Enemy_ destructor sunken!!!! <span>+200</span> TIME BONUS</p>");
       }else if((userHuman.timing < 60)) {
         userHuman.score += 160;
         $('.b-report .news').append("<p>Enemy_ destructor sunken!!!! <span>+160</span> TIME BONUS</p>");
       }else{
         userHuman.score += 100;
         $('.b-report .news').append("<p>Enemy_ destructor sunken!!!! <span>+100</span></p>");
       }

       $("span.btn-ship[data-ship-type='destructor']").addClass("sunken");
       userComputer.setShipLength.pop();
       $('#computer-section .b-option .current span').text(userComputer.setShipLength.length);
     }
  }

  $("#computer.b-board").removeClass("enabled");
  //::TIC::TAC::TIC:: SET TIME OUT ::TIC::TAC::TIC::\\
  setTimeout(function(){
    $("#computer.b-board").addClass("enabled");
    userComputer.humanTarget();
  }, 2500);

  userHuman.humanScore();

};

// HUMAN/COMPUTER - DETECTAR GANADOR
Player.prototype.checkBattle = function() {
  if (userComputer.setShipLength.length === 0 && userHuman.setShipLength.length > 0) {
    $(".b-panel").attr('data-class','win');
    $('.b-report .news').append("<p><span>"+userHuman.name+" WIN!!</span></p>");

    $('.m-stat .h4').append(userHuman.name+" WIN!!");
    $('.m-stat .score').append("You rating: <span>"+userHuman.score+"</span>");
    $('.m-stat .timing').append("Game time: <span>"+userHuman.timing+"</span>s");
    $(".m-stat .b-panel").attr('data-class','win');
    //::TIC::TAC::TIC:: SET TIME OUT ::TIC::TAC::TIC::\\
    setTimeout(function(){
      $('.fx-game.music')[0].pause();
      $('.fx-game.beep')[0].pause();
      $('.fx-game.ocean')[0].pause();
      $('.fx-game.win')[0].play();
      $('.fx-game.sunken')[0].play();
      $(".js-modal-stat").modal('show');
    }, 2000);
  }else if (userHuman.setShipLength.length === 0 && userComputer.setShipLength.length > 0) {
    $(".b-panel").attr('data-class','defeat');
    $('.b-report .news').append("<p><span>The enemy has defeated you</span></p>");

    $('.m-stat .h4').append("The enemy has defeated you");
    $('.m-stat .score').append("You rating: <span>"+userHuman.score+"</span>");
    $('.m-stat .timing').append("Game time: <span>"+userHuman.timing+"</span>s");
    $(".m-stat .b-panel").attr('data-class','defeat');
    //::TIC::TAC::TIC:: SET TIME OUT ::TIC::TAC::TIC::\\
    setTimeout(function(){
      $('.fx-game.music')[0].pause();
      $('.fx-game.beep')[0].pause();
      $('.fx-game.ocean')[0].pause();
      $('.fx-game.defeat')[0].play();
      $(".js-modal-stat").modal('show');
    }, 3000);
  }
};

// HUMAN/COMPUTER - SETINTERVAL
Player.prototype.gameTime = function() {
  var x = setInterval(function() {
    userHuman.timing += 1;
    $("#human .p-stat.time-remaining span").text(userHuman.timing);
    if (userHuman.timing === 100) {
      clearInterval(x);
    }
  }, 1000);
};

// COMPUTER - BOTÓN QUE EJECUTA EL INICIO DEL JUEGO
Player.prototype.initGame = function() {

  $('.fx-game.speech1')[0].play();
  $('.fx-game.beep')[0].play();
  $('.fx-game.beep')[0].loop = true;

  $(".b-panel").attr('data-class','sea2');
  userHuman.gameTime();
  $(this).attr('disabled', 'disabled');
  $("#computer.b-board").addClass("enabled");
  $('.b-report .news').append("<p>The battle begins!</p>");
  Player.prototype.setShipBoard_randomComputer();
  $(".js-clear-board").attr('disabled', 'disabled');

};

Player.prototype.rotate = function() {
  $('#human').toggleClass("shipVertical");
  $(this).toggleClass("btn-shipVertical");
  if ($(this).is(".btn-shipVertical")) {
    $("#human .p-stat.direction span").text("Vertical battleship");
    $('.b-report .news').append("<p>"+userHuman.name+"_ the battleship is oriented vertically</p>");
  } else {
    $("#human .p-stat.direction span").text("Horizontal battleship");
    $('.b-report .news').append("<p>"+userHuman.name+"_ the battleship is oriented horizontally</p>");
  }
};

function sameHeightDivs(){
  var heightPrim = $("#human-section").height();
  $(".g-board").height(heightPrim);
}
