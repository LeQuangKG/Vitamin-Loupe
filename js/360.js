/*
*/
function Move360(div,imgFolder,imgCount,style){
	var my = this;
	this.div = div;
	this.imgFolder = imgFolder;
	this.imgCount = imgCount;
	this.img = [];
	this.imgDiv = null;
	this.index = 0;
	this.style = style;
	this.a = false;
	this.x; this.y; this.dx; this.timer;
	this.init = function(){
		for(var i=0; i< my.imgCount; i++){
			my.img[i] = new Image();
			my.img[i].src = my.imgFolder+i+'.png';
		}
		my.imgDiv = document.createElement('div');
		my.imgDiv.className = my.style;
		my.imgDiv.style.backgroundImage = 'url('+my.img[0].src+')';
		my.div.appendChild(my.imgDiv);
		my.div.addEventListener('touchstart', my.TouchStart, false);
		my.div.addEventListener('touchmove', my.TouchMove, false);
		my.imgDiv.addEventListener('touchend', my.TouchEnd, false);
		//my.AutoRotate();
	};
	
	this.AutoRotate = function(){
		my.a = true;
		if(my.index>=my.imgCount-1) my.index = 0;
		else my.index = my.index + 1;
		my.imgDiv.style.backgroundImage = 'url('+my.img[my.index].src+')';
		my.timer = setTimeout(my.AutoRotate,50,my);
	};

	this.TouchStart = function(e){
		clearTimeout(my.timer);
		my.x = e.changedTouches[0].clientX;
		y = e.changedTouches[0].clientY;
		if(y<300) return;
	
	};
	this.TouchMove = function(e){
		e.preventDefault();
		var x = e.changedTouches[0].clientX;
		y = e.changedTouches[0].clientY;
		my.dx = x - my.x;
		my.x = x;
		if(y<300){
			my.imgDiv.style.webkitTransitionDuration = '0s';
			my.imgDiv.style.left = (x-5) + 'px';
			my.imgDiv.style.top = (y-10) + 'px';
		}
		else{
			// Move left
			if(my.dx > 0){
				my.index = my.index - 2;
				if(my.index<0) my.index = my.imgCount;
			}
			if(my.dx < 0){
				my.index = my.index + 2;
				if(my.index>my.imgCount) my.index = 0;
			} 
			my.imgDiv.style.backgroundImage = 'url('+my.img[my.index].src+')';
		}
		my.y = y;
	};
	
	this.TouchEnd = function(){
		if(my.a == false) return;
		if(my.x>600){
			my.imgDiv.style.webkitTransitionDuration = '1s';
			my.imgDiv.style.left = 766 + 'px';
			my.imgDiv.style.top = 161 + 'px';
			setTimeout(function(){
				my.imgDiv.style.opacity = 0;
				my.imgDiv.style.webkitTransform = 'rotate(90deg)';
				setTimeout(function(){document.location.href='gotopn:5';},1100);
			},1000);
		}
		else{
			my.imgDiv.style.webkitTransitionDuration = '1s';
			my.imgDiv.style.left = 496 + 'px';
			my.imgDiv.style.top = 308 + 'px';
		}
	};
	
	this.init();
	
}

