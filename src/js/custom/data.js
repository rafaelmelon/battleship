Player.prototype.battleshipFregate = function(cells,row1,col1,row2,col2,row3,col3) {
  this.cells = cells;
  this.cellFregate = [{
    row: row1,
    col: col1
  },{
    row: row2,
    col: col2
  }];
};
Player.prototype.battleshipDestructor = function(cells,row1,col1,row2,col2,row3,col3) {
  this.cells = cells;
  this.cellDestructor = [{
    row: row1,
    col: col1
  },{
    row: row2,
    col: col2
  },{
    row: row3,
    col: col3
  }];
};

// HUMAN - AGREGO LOS BARCOS
Player.prototype.setShipBoard = function() {

  $('.fx-game.click2')[0].play();

  var cellClassRow = $(this).parent().attr('class').split(' '),
  cellClassCol = $(this).attr('class').split(' '),
  cellValueRow = cellClassRow[1],
  cellValueCol = cellClassCol[1];

  //\\//\\ HUMAN - FREGATE //\\//\\
  if(userHuman.getShipName[0] === "fregate" || userHuman.getShipName[1] === "fregate"){

    userHuman.setShipLength.push("fregate");

    if(!$('#human').hasClass("shipVertical")){
      $(this).addClass("two-cell-ship").next().addClass("two-cell-ship");

      var aFormat = cellValueCol.slice(-1),
      aFormat2 = Number(aFormat)+1,
      aFormat3 = "c-"+aFormat2;

      userHuman.battleshipFregate(2,cellValueRow,cellValueCol,cellValueRow,aFormat3);
    }else{
      var aRotateFormat = cellValueRow.slice(-1),
      aRotateFormat2 = Number(aRotateFormat)+1,
      aRotateFormat3 = "r-"+aRotateFormat2;

      $(this).addClass("two-cell-ship");
      $("#human").children("."+aRotateFormat3).children("."+cellValueCol).addClass("two-cell-ship");

      userHuman.battleshipFregate(2,cellValueRow,cellValueCol,aRotateFormat3,cellValueCol);
    }

    userHuman.getShipName = [];
    $('.b-report .news').append("<p>"+userHuman.name+"_ fregate added to the map</p>");

  //\\//\\ HUMAN - DESTRUCTOR //\\//\\
  }else if(userHuman.getShipName[0] === "destructor" || userHuman.getShipName[1] === "destructor"){

    userHuman.setShipLength.push("destructor");

    if(!$('#human').hasClass("shipVertical")){
      $(this).addClass("three-cell-ship").next().addClass("three-cell-ship").next().addClass("three-cell-ship");

      var bFormat = cellValueCol.slice(-1),
      bFormat2 = Number(bFormat)+1,
      bFormat3 = "c-"+bFormat2;

      var cFormat = cellValueCol.slice(-1),
      cFormat2 = Number(cFormat)+2,
      cFormat3 = "c-"+cFormat2;

      userHuman.battleshipDestructor(3,cellValueRow,cellValueCol,cellValueRow,bFormat3,cellValueRow,cFormat3);
    }else{
      var bRotateFormat = cellValueRow.slice(-1),
      bRotateFormat2 = Number(bRotateFormat)+1,
      bRotateFormat3 = "r-"+bRotateFormat2;

      var cRotateFormat = cellValueRow.slice(-1),
      cRotateFormat2 = Number(cRotateFormat)+2,
      cRotateFormat3 = "r-"+cRotateFormat2;

      $(this).addClass("three-cell-ship");
      $("#human").children("."+bRotateFormat3).children("."+cellValueCol).addClass("three-cell-ship");
      $("#human").children("."+cRotateFormat3).children("."+cellValueCol).addClass("three-cell-ship");

      userHuman.battleshipDestructor(3,cellValueRow,cellValueCol,bRotateFormat3,cellValueCol,cRotateFormat3,cellValueCol);
    }

    userHuman.getShipName = [];
    $('.b-report .news').append("<p>"+userHuman.name+"_ destructor added to the map</p>");

  }
  $('#human-section .b-option .current span').text(userHuman.setShipLength.length);

  if(userHuman.setShipLength.length === 2){
    $('.js-init-game').removeAttr('disabled');
    $(".btn-rotate").attr('disabled', 'disabled');
    $("#human .p-stat.direction span").addClass("hide");
    if(userHuman.setShipLength.length === 2 && userComputer.setShipLength.length === 2){
      $('.js-init-game').attr('disabled', 'disabled');
    }
  }else{
    $('.js-init-game').attr('disabled', 'disabled');
  }
};

/*var canPlaceBoat = false;
while (!canPlaceBoat) {}*/

// COMPUTER - AGREGO LOS BARCOS ALEATORIAMENTE
Player.prototype.setShipBoard_randomComputer = function() {

  $('.fx-game.click2')[0].play();

  var random1 = Math.floor(Math.random() * 10),
  random2 = Math.floor(Math.random() * 10),
  random3 = Math.floor(Math.random() * 10),
  random4 = Math.floor(Math.random() * 10),
  randomRotate = Math.floor(Math.random() * 2);

  if(randomRotate === 0){
    $('#computer').addClass("shipVertical");
  }

  if(!$('#computer').hasClass("shipVertical")){

    /*if(userComputer.cellFregate[0].row && userComputer.cellFregate[0].col ===
      userComputer.cellDestructor[0].row && userComputer.cellDestructor[0].col ||
      userComputer.cellFregate[0].row && userComputer.cellFregate[1].col ===
      userComputer.cellDestructor[0].row && userComputer.cellDestructor[0].col) {}*/

    if(random2 === 9){
      random2 = random2 - 1;
    }
    if(random4 === 9){
      random4 = random4 - 2;
    }else if (random4 === 8) {
      random4 = random4 - 1;
    }

    var rowRandom1 = "r-"+random1,
    cellRandom2 = "c-"+random2,
    rowRandom3 = "r-"+random3,
    cellRandom4 = "c-"+random4;

    var dFormat = random2 + 1,
    dFormat2 = "c-"+dFormat;

    userComputer.battleshipFregate(2,rowRandom1,cellRandom2,rowRandom1,dFormat2);
    $("#computer").children("."+rowRandom1).children("."+cellRandom2).addClass("two-cell-ship").next().addClass("two-cell-ship");
    userComputer.setShipLength.push("fregate");

    var eFormat = random4 + 1,
    eFormat2 = "c-"+eFormat;
    var fFormat = random4 + 2,
    fFormat2 = "c-"+fFormat;

    userComputer.battleshipDestructor(3,rowRandom3,cellRandom4,rowRandom3,eFormat2,rowRandom3,fFormat2);
    $("#computer").children("."+rowRandom3).children("."+cellRandom4).addClass("three-cell-ship").next().addClass("three-cell-ship").next().addClass("three-cell-ship");
    userComputer.setShipLength.push("destructor");


  }else{

    /*if(userComputer.cellFregate[0].row && userComputer.cellFregate[0].col ===
      userComputer.cellDestructor[0].row && userComputer.cellDestructor[0].col ||
      userComputer.cellFregate[1].row && userComputer.cellFregate[0].col ===
      userComputer.cellDestructor[0].row && userComputer.cellDestructor[0].col) {}*/

    if(random1 === 9){
      random1 = random1 - 1;
    }
    if(random3 === 9){
      random3 = random3 - 2;
    }else if (random3 === 8) {
      random3 = random3 - 1;
    }

    var rowRandomRotate1 = "r-"+random1,
    cellRandomRotate2 = "c-"+random2,
    rowRandomRotate3 = "r-"+random3,
    cellRandomRotate4 = "c-"+random4;

    var dFormatRotate = random1 + 1,
    dFormatRotate2 = "r-"+dFormatRotate;

    userComputer.battleshipFregate(2,rowRandomRotate1,cellRandomRotate2,dFormatRotate2,cellRandomRotate2);
    $("#computer").children("."+rowRandomRotate1).children("."+cellRandomRotate2).addClass("two-cell-ship");
    $("#computer").children("."+dFormatRotate2).children("."+cellRandomRotate2).addClass("two-cell-ship");
    userComputer.setShipLength.push("fregate");

    var eFormatRotate = random3 + 1,
    eFormatRotate2 = "r-"+eFormatRotate;
    var fFormatRotate = random3 + 2,
    fFormatRotate2 = "r-"+fFormatRotate;

    userComputer.battleshipDestructor(3,rowRandomRotate3,cellRandomRotate4,eFormatRotate2,cellRandomRotate4,fFormatRotate2,cellRandomRotate4);
    $("#computer").children("."+rowRandomRotate3).children("."+cellRandomRotate4).addClass("three-cell-ship");
    $("#computer").children("."+eFormatRotate2).children("."+cellRandomRotate4).addClass("three-cell-ship");
    $("#computer").children("."+fFormatRotate2).children("."+cellRandomRotate4).addClass("three-cell-ship");
    userComputer.setShipLength.push("destructor");

  }

  $('#computer-section .b-option .current span').text(userComputer.setShipLength.length);
  $("span.btn-ship").attr('disabled', 'disabled');

};
