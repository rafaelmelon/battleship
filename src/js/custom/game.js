$(document).ready(function(){

  $('.fx-game.music')[0].play();

  $(".js-modal-player").modal('show');

  $(".js-submit").on("click",Player.prototype.getSubmit);

  $(".js-reload").click(function() {
    location.reload();
  });

  $(".js-clear-board").on("click",userHuman.clearSelection);

  $(".js-get-ship").on("click",userHuman.getShipBoard);

  $(document.body).on('click','.board-col',userHuman.setShipBoard);

  $('.btn-rotate').on('click',userHuman.rotate);

  $(document.body).on('click','#computer .board-col',Player.prototype.computerTarget);

  $(".js-init-game").on("click",Player.prototype.initGame);

});
