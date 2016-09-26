function MemeBuilder(cnv) {
	this.canvas = cnv;
	this.ctx = this.canvas.getContext('2d');
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.layers = [];

}

MemeBuilder.prototype = {
	addLayer: function (layer, redraw) {
		redraw = redraw || false;
		var z = this.layers.length;
		layer.z = z;
		this.layers.push(layer);
		
		layer.setBuilder(this);
		if(redraw){
			this.draw();
		}
		return layer;
	},
	deleteLayer:function(l){
		var i = this.layers.indexOf(l);
		if(i!==-1){
			this.layers.splice(i,1);
		}
	},
	draw: function () {
		this.ctx.clearRect(0, 0, this.width, this.height);

		for (var l in this.layers) {
			this.layers[l].draw(this.ctx);
		}
	},
	sortLayers:function(){
		this.layers.sort(function(a,b){
			return a.z < b.z ? 1 : -1;
		});		
	},
	getLayerAt: function (x, y) {
		var sel=false;
		for (var l in this.layers) {
			var layer = this.layers[l];
			if (x > layer.x && x < layer.x + layer.w) {
				if (y > layer.y && y < layer.y + layer.h) {
					sel=layer;
				}
			}
		}
		return sel;

	},
	moveLayerUp:function(layer){
		var orgZ = layer.z;
		if(orgZ==0){
			return;
		}
		var tZ = orgZ-1;
		this.sortLayers();
		var tLayer = this.layers[tZ];
		tLayer.z=orgZ;
		layer.z=tZ;
		this.draw();
		
	},
	moveLayerDown:function(layer){
		var orgZ = layer.z;
		if(orgZ==this.layers.length-1){
			return;
		}
		var tZ = orgZ+1;
		this.sortLayers();
		var tLayer = this.layers[tZ];
		tLayer.z=orgZ;
		layer.z=tZ;
		this.draw();
		
	}

};

function MemeLayer() {
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.builder;
}

function ImageMemeLayer(src) {
	this.x = 0;
	this.y = 0;
	this.offsetX = 0;
	this.offsetY = 0;
	this.w;
	this.h;
	this.orgW;
	this.orgH;
	this.targetW;
	this.targetH;
	this.ratio;
	this.img = new Image();
	this.src = src;
	this.type = 'image';
	this.active=false;
	this.loaded=false;
	this.collapsed=true;
	this.z=0;
	this.builder;
	this.img.onload = function () {
		this.orgW = this.w = this.img.width;
		this.orgH = this.h = this.img.height;
		this.ratio = this.orgW / this.orgH;
		this.loaded=true;
		this.builder.draw();
	}.bind(this);
	this.img.src = src;
}

ImageMemeLayer.prototype = {
	setBuilder: function (b) {
		this.builder = b;
	},
	setTargetWidth: function (w) {
		this.targetW = w;
		this.builder.draw();
	},
	setTargetHeight: function (h) {
		this.targetH = h;
		this.builder.draw();
	},
	draw: function (ctx) {
		if(!this.loaded){
			return;
		}
		
		var iw = this.orgW;
		var ih = this.orgH;

		
		if (this.targetW) {
			iw = this.targetW;
			if (!this.targetH) {
				ih = this.targetW / this.ratio >> 0;
				this.w = iw;
				this.h = ih;
			}
		}
		else if (this.targetH) {
			ih = this.targetH;
			iw = this.targetH * this.ratio>>0;
			this.w = iw;
			this.h = ih;
		}
		ctx.drawImage(this.img, this.offsetX, this.offsetY, this.orgW, this.orgH, this.x, this.y, iw,ih);

	}
};

function TextMemeLayer(){
	this.text = 'Type Here !';
	this.font = 'impact';
	this.fontSize = 36;
	this.color = '#ffffff';
	this.strokeColor = '#000000';
	this.strokeWidth=1;
	this.builder;
	this.active=false;
	this.type='text';
	this.x = 0;
	this.y = 0;
	this.offsetX = 0;
	this.offsetY = 0;
	this.w;
	this.h;
	this.collapsed=true;
	this.z=0;				
}

TextMemeLayer.prototype = {
	setBuilder: function (b) {
		this.builder = b;
	},
	draw: function (ctx) {
		ctx.font = ''+this.fontSize+'px '+this.font;
		ctx.textBaseline='hanging';
		ctx.fillStyle = this.color;
		var size = ctx.measureText(this.text);
		this.w=size.width;
		this.h=this.fontSize;
		
		ctx.fillText(this.text,this.x,this.y);
		if(this.strokeColor){
			ctx.strokeStyle = this.strokeColor;
			ctx.lineWidth = this.strokeWidth;
			ctx.strokeText(this.text,this.x,this.y);
		}
		if(this.active){
			ctx.beginPath();
			ctx.strokeStyle = '#000000';
			ctx.lineWidth = 2;
			ctx.moveTo(this.x+this.w+10,this.y);
			ctx.lineTo(this.x+this.w+10,this.y+this.h);
			ctx.stroke();
		}
	}
};