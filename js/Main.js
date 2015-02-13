var img = [];
var text,hand;
var wrapper;
var flag = false;
var _Loupe;
var video;
var cube;
var rotate;
function LoadImg(){
	for(i=0;i<6;i++){
		img[i] = new Image();
		img[i].src = 'img/'+(i+1)+'.png';
	}
}

function OpenInfo(n){		
	setTimeout(function(){
		video.style.zIndex = 4;
		video.play();
		setTimeout(function(){
			rotate.imgDiv.style.left = 496 + 'px';
			rotate.imgDiv.style.top = 308 + 'px';
			rotate.imgDiv.style.opacity =1;
			rotate.AutoRotate();
		},15000);
	},1000);
	flag = true;
}

function CloseInfo(){
	if(flag == true ){
		document.body.removeChild(video);
		//document.body.removeChild(video);
		video.style.zIndex = 0;
		flag = false;
	}
}

function ButtonAction(){
	var obj = event.target;
	var n = parseInt(obj.id);
	_Loupe.AutoCenter();
	OpenInfo();
}

function AddAction(){
	var obj = document.getElementsByTagName('div');
	var n = obj.length;
	for(var i=0; i <n; i++){
		var k = parseInt(obj[i].id);
		if(k){
			obj[i].addEventListener('click',ButtonAction,false);
		}
	}	
}

window.onload = function(){	
	var div = document.getElementById("wrapper");
	video = document.getElementById("example");
	text = document.getElementById("text");
	hand = document.getElementById("hand");
	div.addEventListener('touchmove',function(){event.preventDefault();},false);
	document.body.addEventListener('touchmove',function(){event.preventDefault();},false);
	video.addEventListener('end',function(){
		rotate.imgDiv.style.opacity =1;
		rotate.AutoRotate();
	},false);
	AddAction();
	var back = new Image();
	back.src = 'img/back.jpg';
	_Loupe = new Loupe(back,div,727,60,180,180,"Loupe");
	var div1 = document.body;
	var style = 'imgDiv';
	var imgFolder = 'img/rotate/';
	var imgCount = 54;
	rotate = new Move360(div1,imgFolder,imgCount,style);
}

