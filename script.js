$(function() {

screen = "";
for(let i = 0; i < 8; i++){
screen += `<tr>`;
for(let j = 0; j < 8; j++){
screen += `<td><div id="y${i}_x${j}"></div></td>`;
}
screen += `</tr>`;
}
$("table").html(screen);



var mass = [
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,0],
[0,0,0,4,1,3,0,0],
[0,0,4,2,3,0,0,0],
[0,0,0,0,2,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0]
]

var color = [
"",
"#AD372F",
"#3781F1",
"#E3B84B",
"#3FAD2F"
]

var names = ["","1","2","3","4"]


//初期設定
$("#y2_x3").css("background-color", color[1]);
$("#y3_x4").css("background-color", color[1]);
$("#y4_x3").css("background-color", color[2]);
$("#y5_x4").css("background-color", color[2]);
$("#y3_x5").css("background-color", color[3]);
$("#y4_x4").css("background-color", color[3]);
$("#y3_x3").css("background-color", color[4]);
$("#y4_x2").css("background-color", color[4]);



var turn = 1;



touch = false;

player();
function player(){

touch = true;
$("h2").html(`<span style="color:${color[turn]};">${names[turn]}</span>さんの番です`);
}


//置いてみよう
for(let i = 0; i < 8; i++){
for(let j = 0; j < 8; j++){

$(`#y${i}_x${j}`).on("click", function(){

if(touch === true){

if(mass[i][j] === 0){

$(`#y${i}_x${j}`).css("background-color", color[turn]);

h = i;
w = j;
m = i;
n = j;
now = 0;

check();

}

}

});
}
}


h = 0; //現在のy
w = 0; //現在のX
m = 0; //固定のy
n = 0; //固定のx
x = 0;
y = 0;
flag = false;
ok = false;




//置けるかチェック
function check(){

touch = false;

switch(now){

case 0:
x = 0;
y = -1;
next();
break;

case 1:
x = 1;
y = 0;
next();
break;

case 2:
x = 0;
y = 1;
next();
break;

case 3:
x = -1;
y = 0;
next();
break;

case 4:
x = 1;
y = -1;
next();
break;

case 5:
x = 1;
y = 1;
next();
break;

case 6:
x = -1;
y = 1;
next();
break;

case 7:
x = -1;
y = -1;
next();
break;


case 8:

if(ok === true){


ok = false;
mass[m][n] = turn;

if(turn != 4){
turn++;
player();
}
else{
turn = 1;
player();
}

}

else{

touch = true;
now = 0;
$(`#y${m}_x${n}`).css("background-color", "transparent");

}



break;

}


}



//どこまでいくか
function next(){



if(h > -1 && h < 8 && w > -1 && w < 8){ //❤️


if(h + y === -1 || h + y === 8 || w + x === -1 || w + x === 8){ //🧡

flag = false;
h = m;
w = n;
now++;
check();

} //🧡


else{ //🧡

if (mass[h + y][w + x] !== turn && mass[h + y][w + x] !== 0){
h += y;
w += x;
flag = true;
next();
}

else if(mass[h + y][w + x] === turn){

if(flag === true){
ok = true;
flag = false;
h = m;
w = n;
setTimeout(draw, 300);
}

else{

flag = false;
h = m;
w = n;
now++;
check();

}
}

else{ 

flag = false;
h = m;
w = n;
now++;
check();

}

} //🧡

} //❤️

else{ //❤️

flag = false;
h = m;
w = n;
now++;
check();



} //❤️
}


function draw(){

if(mass[h + y][w + x] === turn){
now++;
h = m;
w = n;
check();
}

else{

h += y;
w += x;

mass[h][w] = turn;
$(`#y${h}_x${w}`).css("background-color", color[turn]);

setTimeout(draw, 300);

}


}



$("#pass").on("click", function(){

if(touch === true){

if(turn != 4){
turn++;
player();
}
else{
turn = 1;
player();
}

}

})


});
