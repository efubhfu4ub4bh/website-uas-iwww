//dijalankan saat dokumen sudah terload semua dan sudah siap 
let seconds=0;
let minutes=0,childCtr=0,counter=0;
let isStart = false;
let arrId = [];
const arrIsi=['isi 1','isi 2','isi 3','isi 4','isi 5'];

$(document).ready(function () {
    
    //hide() menghilangkan element terpilih
    $("#hilang").hide();
    $("#playground").hide();
 

    $('#ubah').click(function(){
        //text mengubah tulisan dalam element terpilih
        $('#textUbah').text("Ga jadi gaes, gampang kok ternyata :P");
    });

    $("#submit").click(function(){
        var input1=$("input[name=textBaru]").val();
        let ctr = arrId.length + 1;
        arrId.push(ctr);
        var elementBaru=`<button id="${ctr}" class="dynamic"> ` +input1 +" - "+ arrId[arrId.length - 1] + " </button>";
        //appendTo untuk menambah element di html setelah target 
        //appendTo,prependTo
        $(elementBaru).appendTo("#textArea");
         
        $(elementBaru).on("click",function (params) {
            alert("A");
        });


        //setting css via jquery
        $(".dynamic").css({"background-color":"grey","color":"darksalmon","width":"100px"});

    });

    $('#delete').click(function () {
      //pop() mengambil data paling akhir yang masuk dan langsung dihapus dari array
      if($("#delete").attr("name") == "pop"){
        $(`#${arrId.pop()}`).remove();
      }
    });

    $("#shifting").click(function () {
      //shift() mengambil nilai paling awal dari array dan langsung dihapus dari array
      $("input[name=textBaru]").val(arrIsi.shift());
      alert(arrIsi);
    });


    $(".dynamic").hover(function () {
      $(this).css({"cursor":"pointer","font-size":"20"});
    });


    $("#hilang").on("click",function () {
        $("#hilang").hide();
        //show() memunculkan element terpilih
        $("#muncul").show();
        $("#playground").hide();
    });

    $("#muncul").on("click",function () {
      $("#hilang").show();
      $("#muncul").hide();
      $("#playground").show();
  });


    $("#start").click(function() {
      if(!isStart){
        startTimer();
        alert("The Time is Moving");
        if($("#playground").is(":visible")){
          startSpawning();
        }
      }
    });

    $("#stop").click(function() {
      if(isStart){
        startTimer();
        //clearInterval() untuk menghentikan timeInterval agar tidak jalan terus
        clearInterval(tmrBola);
        alert("Stop the Time!!");
      }
    });

    //draggable() agar element bisa di drag and drop, penggunaan HARUS import jquery-ui, URL: http://jqueryui.com/
    $( "#drag" ).draggable();
});

let isFinish=false;
//setInterval adalah fungsi yang akan berjalan terus di belakang program
setInterval(() =>{
   if(isStart){
      seconds++;
      if(seconds>=60){
        minutes++;
        seconds=0;
      }
      $("#menit").html(minutes.toString().padStart(2,"0"));
      $("#detik").html(seconds.toString().padStart(2,"0"));
   }

   if($("#drag").position().left >= $("#finish_line").position().left && !isFinish){
      alert("Finish");
      isFinish=true;
   }
},1000);

function startTimer() {
    isStart=!isStart;
}

//keydown saat suatu key ditekan pada keyboard
$(this).on("keydown",function (event) {
    var player = $("#karakter");
    top = player.css("top");
    left = player.css("left");
    if ($("#playground").is(":visible")) {
      if (event.key == "a" || event.key == "A") {
        left = parseInt(left) - 20;
        if(left<0){
          left+=20;
        }
        player.css("left", left);
      } else if (event.key == "d" || event.key == "D") {
        left = parseInt(left) + 20;
        if(left>480){
          left-=20;
        }
        player.css("left", left);
      }
    }

   
});

$(this).on("keypress",function (event) {
    if(event.key == "f" || event.key=="F"){
      $("#giveRespect").append(" O7 ");
    }
});


function spawnBola() {
    let bola = document.createElement("div");
    bola.classList.add("bola");

    //random
    let x = Math.floor(Math.random()*(500-10));
    let y = Math.floor(Math.random()*(90-10));

    bola.setAttribute("x",x);
    bola.setAttribute("y",y);

    bola.style.position ="absolute";
    bola.style.left = x + 'px';
    bola.style.top = y + 'px'; 

    $("#playground").append(bola);
}

var tmrBola =null;
var ctrTimer =null;

function startSpawning() {
  tmrBola = setInterval(()=>{
    ctrTimer++;
    if(ctrTimer%10==0){
        spawnBola();
    }
  },1000);
}






