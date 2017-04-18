// HUMAN - AGREGO LOS BARCOS
function setShipBoard(){

  var cellClassRow = $(this).parent().attr('class').split(' '),
  cellClassCol = $(this).attr('class').split(' '),
  cellValueRow = cellClassRow[1],
  cellValueCol = cellClassCol[1];

  for(var i = 0; i < userHuman.shipSelectedName.length;i++){
    switch (userHuman.shipSelectedName[i]) {
      case "fregate":
        $(this).addClass("two-cell-ship").next().addClass("two-cell-ship");
        userHuman.cellSelected.push([cellValueRow,cellValueCol]);

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

        $('.b-report .news').append("<p>"+userHuman.name+": Fregate added to the map</p>");
        userHuman.shipSelectedName[i] = "";
      break;
      case "destructor":
        $(this).addClass("three-cell-ship").next().addClass("three-cell-ship").next().addClass("three-cell-ship");
        userHuman.cellSelected.push([cellValueRow,cellValueCol]);

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

        $('.b-report .news').append("<p>"+userHuman.name+": Destructor added to the map</p>");
        userHuman.shipSelectedName[i] = "";
      break;
    }
  }

  // ACTIVO EL JUEGO SI HAY DOS BARCOS SELECCINADOS
  if(userHuman.cellSelected.length === 2){
    $('.js-init-game').removeAttr('disabled');
  }else{
    $('.js-init-game').attr('disabled', 'disabled');
  }
  $('#human-section .b-option .ships .current span').text(userHuman.cellSelected.length);
}


// COMPUTER- AGREGO LOS BARCOS ALEATORIAMENTE
function setShipBoard_randomComputer() {
  var random1 = Math.floor(Math.random() * 10),
  random2 = Math.floor(Math.random() * 10),
  random3 = Math.floor(Math.random() * 10),
  random4 = Math.floor(Math.random() * 10);

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

  $("#computer").children("."+rowRandom1).children("."+cellRandom2).addClass("two-cell-ship").next().addClass("two-cell-ship");
  $("#computer").children("."+rowRandom3).children("."+cellRandom4).addClass("three-cell-ship").next().addClass("three-cell-ship").next().addClass("three-cell-ship");

  //console.log(userComputer.cellFregate[0].row+" y "+userComputer.cellFregate[0].col+" segunda casilla: "+userComputer.cellFregate[1].row+" y "+userComputer.cellFregate[1].col);
  //console.log(userComputer.cellDestructor[0].row+" y "+userComputer.cellDestructor[0].col+" segunda casilla: "+userComputer.cellDestructor[1].row+" y "+userComputer.cellDestructor[1].col+" tercera casilla: "+userComputer.cellDestructor[2].row+" y "+userComputer.cellDestructor[2].col);

  userComputer.cellSelected.push(["r-"+random1,"c-"+random2],["r-"+random3,"c-"+random4]);
  $('#computer-section .b-option .ships .current span').text(userComputer.cellSelected.length);
}
