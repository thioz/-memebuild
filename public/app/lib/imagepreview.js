function ImagePreview(src,canvas){
	this.src = src;
	this.img = new Image();
	this.canvas = canvas || document.createElement('canvas');
	this.ctx=this.canvas.getContext('2d');
	this.width;
	this.height;
	this.img.onload = function(){
		this.show();
	}.bind(this);
}

ImagePreview.prototype = {
	setSize:function(w,h){
		this.width = w;
		this.height = h;
	},
	show:function(){
		if(!this.width && !this.height){
			this.width = this.img.width;
			this.height = this.img.height;
		}
		
		this.canvas.width=this.width;
		this.canvas.height=this.height;
		this.ctx.drawImage(this.img,0,0);
	}
	
};