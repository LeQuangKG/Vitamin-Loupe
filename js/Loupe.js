/*
	Create by: Le Viet Quang (levietquangt2@gmail.com)
	Function make the loupe for image
	Para :
		back : image object will make loupe
		div  : parent div, contain loupe
		left : default left position of loupe
		top  : default top position of loupe
		width: width of loupe
		height: height of loupe
		style : name of css class that will have some style want to apply for loupe
*/
function Loupe(back,div,left,top,width,height,style){
	var my = this;
	this.back = back;
	this.div = div;
	this.left = left;
	this.top = top;
	this.width = width;
	this.height = height;
	this.style = style;
	this.point1 = 695;
	this.point2 = 102;
	this.isMouseDown = false;
	this.viewDiv; this.x; this.y; this.dx; this.dy;
	
	this.init = function(){
		this.x = my.div.offsetWidth - my.width;
		this.y = my.div.offsetHeight - my.height;
		this.dx = my.width/2;
		this.dy = my.height/2;
		my.viewDiv = document.createElement("div");
		my.viewDiv.style.position="absolute";
		my.viewDiv.style.left = my.left + "px";
		my.viewDiv.style.top = my.top + "px";
		my.viewDiv.style.width = my.width + "px";
		my.viewDiv.style.height = my.height + "px";
		my.viewDiv.style.backgroundImage = "url("+my.back.src+")";
		my.viewDiv.style.backgroundPosition=(-my.left)+"px "+(-my.top)+"px";
		my.viewDiv.setAttribute("class",my.style);
		my.div.appendChild(my.viewDiv);
		my.viewDiv.addEventListener("touchstart", my.MouseDown, false);
		my.viewDiv.addEventListener("touchmove", my.MouseMove, false);
		my.viewDiv.addEventListener("touchend", my.MouseUp, false);
		my.div.addEventListener("touchstart", my.MouseDown, false);
		my.div.addEventListener("touchmove", my.MouseMove, false);
		my.div.addEventListener("touchend", my.MouseUp, false);
		my.viewDiv.addEventListener("mousedown", my.MouseDown, false);
		my.div.addEventListener("mousemove", my.MouseMove, false);
		my.div.addEventListener("muouseup", my.MouseUp, false);
	};
	
	this.CheckLimit = function(x,y){
		x = x - my.dx;
		y = y - my.dy;
		var point = [x,y];
		if(point[0]<0) point[0] = 0;
		if(point[0]>=my.x) point[0] = my.x-8;
		if(point[1]<0) point[1] = 0;
		if(point[1]>=my.y) point[1] = my.y-8;
		return point;
	};
	
	this.AutoCenter = function(){
		text.style.zIndex = -1;
		hand.style.zIndex = -1;
		my.viewDiv.style.webkitTransitionDuration = '1000ms';
		my.viewDiv.style.left = this.point1 + "px";
		my.viewDiv.style.top = this.point2 + "px";
		my.viewDiv.style.backgroundPosition =(-this.point1)+"px "+(-this.point2)+"px";
	}
	
	this.MakeLoupe = function(x,y){
		text.style.zIndex = -1;
		hand.style.zIndex = -1;
		var point = my.CheckLimit(x,y);
		my.viewDiv.style.left = point[0] + "px";
		my.viewDiv.style.top = point[1] + "px";
		my.viewDiv.style.backgroundPosition =(-point[0])+"px "+(-point[1])+"px";
	};
	
	this.MouseDown = function(e){
		my.isMouseDown = true;
		text.style.zIndex = -1;
		hand.style.zIndex = -1;
		my.viewDiv.style.webkitTransitionDuration = '0ms';
	};
	
	this.MouseMove = function(e){
		//CloseInfo();
		if(my.isMouseDown==true){
			var evt = e?e:(window.event);
			var x,y;
			if(evt.clientX){
				x = evt.clientX;
				y = evt.clientY;
			}
			else{
				evt.preventDefault();
				x = evt.changedTouches[0].clientX;
				y = evt.changedTouches[0].clientY;
			}
			my.MakeLoupe(x,y);
		}
	};
	
	this.MouseUp = function(){
		my.isMouseDown = false;
	};
	
	this.init();
}