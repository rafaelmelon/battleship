function computerRandomFregate(random) {

}
function computerRandomDestructor(random) {

}

// HUMAN - AGREGO LOS BARCOS
Player.prototype.setShipBoard = function() {
  var cellClassRow = $(this).parent().attr('class').split(' '),
  cellClassCol = $(this).attr('class').split(' '),
  cellValueRow = cellClassRow[1],
  cellValueCol = cellClassCol[1];

  /*
  HUMAN - FREGATE warship
  */
  if(userHuman.getShipName[0] === "fregate" || userHuman.getShipName[1] === "fregate"){

    userHuman.setShipLength.push("fregate");
    userHuman.cellSelected.push([cellValueRow,cellValueCol]);

    if(!$('#human').hasClass("shipVertical")){

      $(this).addClass("two-cell-ship").next().addClass("two-cell-ship");

      var aFormat = cellValueCol.slice(-1),
      aFormat2 = Number(aFormat)+1,
      aFormat3 = "c-"+aFormat2;

      userHuman.cellFregate = [{
        row: cellValueRow,
        col: cellValueCol
      },{
        row: cellValueRow,
        col: aFormat3
      }];

    }else{

      var aRotateFormat = cellValueRow.slice(-1),
      aRotateFormat2 = Number(aRotateFormat)+1,
      aRotateFormat3 = "r-"+aRotateFormat2;

      $(this).addClass("two-cell-ship");
      $("#human").children("."+aRotateFormat3).children("."+cellValueCol).addClass("two-cell-ship");

      userHuman.cellFregate = [{
        row: cellValueRow,
        col: cellValueCol
      },{
        row: aRotateFormat3,
        col: cellValueCol
      }];

    }

    userHuman.getShipName = [];
    $('.b-report .news').append("<p>"+userHuman.name+": fregate added to the map</p>");

  /*
  HUMAN - DESTRUCTOR warship
  */
  }else if(userHuman.getShipName[0] === "destructor" || userHuman.getShipName[1] === "destructor"){

    userHuman.setShipLength.push("destructor");
    userHuman.cellSelected.push([cellValueRow,cellValueCol]);

    if(!$('#human').hasClass("shipVertical")){

      $(this).addClass("three-cell-ship").next().addClass("three-cell-ship").next().addClass("three-cell-ship");

      var bFormat = cellValueCol.slice(-1),
      bFormat2 = Number(bFormat)+1,
      bFormat3 = "c-"+bFormat2;

      var cFormat = cellValueCol.slice(-1),
      cFormat2 = Number(cFormat)+2,
      cFormat3 = "c-"+cFormat2;

      userHuman.cellDestructor = [{
        row: cellValueRow,
        col: cellValueCol
      },{
        row: cellValueRow,
        col: bFormat3
      },{
        row: cellValueRow,
        col: cFormat3
      }];

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

      userHuman.cellDestructor = [{
        row: cellValueRow,
        col: cellValueCol
      },{
        row: bRotateFormat3,
        col: cellValueCol
      },{
        row: cRotateFormat3,
        col: cellValueCol
      }];

    }

    userHuman.getShipName = [];
    $('.b-report .news').append("<p>"+userHuman.name+": destructor added to the map</p>");

  }
  $('#human-section .b-option .current span').text(userHuman.setShipLength.length);

  if(userHuman.setShipLength.length === 2){
    $('.js-init-game').removeAttr('disabled');
    $(".btn-rotate").attr('disabled', 'disabled');
    $("#human .p-stat.direction span").addClass("hide");
  }else{
    $('.js-init-game').attr('disabled', 'disabled');
  }
};

// COMPUTER- AGREGO LOS BARCOS ALEATORIAMENTE
Player.prototype.setShipBoard_randomComputer = function() {
  var random1 = Math.floor(Math.random() * 10),
  random2 = Math.floor(Math.random() * 10),
  random3 = Math.floor(Math.random() * 10),
  random4 = Math.floor(Math.random() * 10),
  randomRotate = Math.floor(Math.random() * 2);

  if(randomRotate === 0){
    $('#computer').addClass("shipVertical");
  }

  if(!$('#computer').hasClass("shipVertical")){

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

    userComputer.cellFregate = [{
      row: rowRandom1,
      col: cellRandom2
    },{
      row: rowRandom1,
      col: dFormat2
    }];
    $("#computer").children("."+rowRandom1).children("."+cellRandom2).addClass("two-cell-ship").next().addClass("two-cell-ship");

    var eFormat = random4 + 1,
    eFormat2 = "c-"+eFormat;

    var fFormat = random4 + 2,
    fFormat2 = "c-"+fFormat;

    userComputer.cellDestructor = [{
      row: rowRandom3,
      col: cellRandom4
    },{
      row: rowRandom3,
      col: eFormat2
    },{
      row: rowRandom3,
      col: fFormat2
    }];
    $("#computer").children("."+rowRandom3).children("."+cellRandom4).addClass("three-cell-ship").next().addClass("three-cell-ship").next().addClass("three-cell-ship");

    userComputer.cellSelected.push(["r-"+random1,"c-"+random2],["r-"+random3,"c-"+random4]);
    $('#computer-section .b-option .current span').text(userComputer.setShipLength.length);

  }else{

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

    userComputer.cellFregate = [{
      row: rowRandomRotate1,
      col: cellRandomRotate2
    },{
      row: dFormatRotate2,
      col: cellRandomRotate2
    }];
    $("#computer").children("."+rowRandomRotate1).children("."+cellRandomRotate2).addClass("two-cell-ship");
    $("#computer").children("."+dFormatRotate2).children("."+cellRandomRotate2).addClass("two-cell-ship");

    var eFormatRotate = random3 + 1,
    eFormatRotate2 = "r-"+eFormatRotate;

    var fFormatRotate = random3 + 2,
    fFormatRotate2 = "r-"+fFormatRotate;

    userComputer.cellDestructor = [{
      row: rowRandomRotate3,
      col: cellRandomRotate4
    },{
      row: eFormatRotate2,
      col: cellRandomRotate4
    },{
      row: fFormatRotate2,
      col: cellRandomRotate4
    }];

    $("#computer").children("."+rowRandomRotate3).children("."+cellRandomRotate4).addClass("three-cell-ship");
    $("#computer").children("."+eFormatRotate2).children("."+cellRandomRotate4).addClass("three-cell-ship");
    $("#computer").children("."+fFormatRotate2).children("."+cellRandomRotate4).addClass("three-cell-ship");


    userComputer.cellSelected.push(["r-"+random1,"c-"+random2],["r-"+random3,"c-"+random4]);
    $('#computer-section .b-option .current span').text(userComputer.setShipLength.length);

  }

  $("span.btn-ship").attr('disabled', 'disabled');
};
