function Toolbox(builder) {
	this.builder = builder;
	this.canvas = builder.canvas;
	this.ctx = this.canvas.getContext('2d');

	this.tools = {};
	this.events = {};
	this.activeTool;
	this.activeToolId;
	this.initEvents();
}

Toolbox.prototype = {
	fireEvents: function (e, data) {
		if (!this.events[e]) {
			return;
		}
		for (var i in this.events[e]) {
			var evt = this.events[e][i];
			evt.handler.apply(evt.tool, data);
		}
	},
	registerEvent: function (e, tool, handler) {
		if (!this.events[e]) {
			this.events[e] = [];
		}
		this.events[e].push({tool: tool, handler: handler});
	},
	initEvents: function () {
		this.canvas.addEventListener('mousedown', function (e) {
			if (this.activeTool) {

				this.activeTool.fireEvents('mousedown', [this.getMousePosition(e)]);
			}
		}.bind(this));
		this.canvas.addEventListener('mouseup', function (e) {
			if (this.activeTool) {

				this.activeTool.fireEvents('mouseup', [this.getMousePosition(e)]);
			}
		}.bind(this));
		this.canvas.addEventListener('mousemove', function (e) {
			if (this.activeTool) {
				this.activeTool.fireEvents('mousemove', [this.getMousePosition(e)]);
			}
		}.bind(this));
	},
	getMousePosition: function (e) {
		return {x: e.offsetX, y: e.offsetY};
	},
	setActiveTool: function (tid) {
		if (this.tools[tid]) {
			this.activeToolId = tid;
			this.activeTool = this.tools[tid];
		}
	},
	registerTool: function (id, tool) {
		tool.setToolbox(this);
		this.tools[id] = tool;
	}
};

function Tool() {
	this.toolbox;
	this.hasoptions = false;
	this.events = {};
}

Tool.prototype = {
	setToolbox: function (tb) {
		this.toolbox = tb;
		this.init();
	},
	init: function () {

	},
	fireEvents: function (e, data) {
		if (!this.events[e]) {
			return;
		}
		for (var i in this.events[e]) {
			var evt = this.events[e][i];
			evt.apply(this, data);
		}
	},
	registerEvent: function (e, handler) {
		if (!this.events[e]) {
			this.events[e] = [];
		}
		this.events[e].push(handler);
	}
};

MoveTool.prototype = new Tool();
MoveTool.prototype.constructor = MoveTool;
function MoveTool() {
	this.mousedown = false;
	this.dragOffset = {x: 0, y: 0};
	this.dragLayer;

	Tool.call(this);
	this.registerEvent('mousedown', function (pos) {
		this.mousedown = true;
		var layer = this.toolbox.builder.activeLayer;
		if (layer) {
			this.dragLayer = layer;
			this.dragOffset.x = pos.x - layer.x;
			this.dragOffset.y = pos.y - layer.y;
		}
	});
	this.registerEvent('mouseup', function (pos) {
		this.mousedown = false;
		this.dragLayer = false;
	});
	this.registerEvent('mousemove', function (pos) {
		if (this.dragLayer) {
			this.dragLayer.x = pos.x - this.dragOffset.x;
			this.dragLayer.y = pos.y - this.dragOffset.y;
			this.toolbox.builder.draw();
		}
	});
}

BrushTool.prototype = new Tool();
BrushTool.prototype.constructor = BrushTool;
function BrushTool() {
	this.mousedown = false;
	this.brush = {size: 20, hardness: 20, shape: 'circle',flow:50};
	this.color = [0, 0, 0];
	this.dragOffset = {x: 0, y: 0};
	this.actLayer;

	Tool.call(this);
	this.hasoptions = true;

	this.registerEvent('mousedown', function (pos) {
		this.mousedown = true;
		var layer = this.toolbox.builder.activeLayer;
		if (layer && layer.type != 'text') {
			this.actLayer = layer;
			var brush = this.getBrush();
			var cpos = {x:pos.x-this.actLayer.x,y:pos.y-this.actLayer.y}
			brush.draw(layer.getCtx(), cpos);
		}
	});
	this.registerEvent('mouseup', function (pos) {
		this.mousedown = false;
		this.actLayer = false;
	});
	this.registerEvent('mousemove', function (pos) {
		if (this.actLayer) {
			var cpos = {x:pos.x-this.actLayer.x,y:pos.y-this.actLayer.y}
			this.draw(cpos);
			//this.toolbox.builder.draw();
		}
	});

}

BrushTool.prototype.draw = function (pos) {
	
	var brush = this.getBrush();
	brush.draw(this.actLayer.getCtx(), pos);
	this.toolbox.builder.draw();

};
BrushTool.prototype.onColorChange = function (c) {
	this.color = c;
}

BrushTool.prototype.init = function () {
	this.toolbox.registerEvent('colorchange', this, this.onColorChange)
};

BrushTool.prototype.getBrush = function () {
	if (this.brush.shape == 'circle') {
		return new CircleBrush(this.color, this.brush);
	}
};
EraseTool.prototype = new Tool();
EraseTool.prototype.constructor = EraseTool;
function EraseTool() {
	this.mousedown = false;
	this.options = {size: 20, hardness: 20, shape: 'circle',flow:50};
	this.color = [0, 0, 0];
	this.dragOffset = {x: 0, y: 0};
	this.actLayer;

	Tool.call(this);
	this.hasoptions = false;

	this.registerEvent('mousedown', function (pos) {
		this.mousedown = true;
		var layer = this.toolbox.builder.activeLayer;
		if (layer && layer.type != 'text') {
			this.actLayer = layer;
		
		}
	});
	this.registerEvent('mouseup', function (pos) {
		this.mousedown = false;
		this.actLayer = false;
	});
	this.registerEvent('mousemove', function (pos) {
		if (this.actLayer) {
			var cpos = {x:pos.x-this.actLayer.x,y:pos.y-this.actLayer.y};
			this.draw(cpos);
			
			//this.toolbox.builder.draw();
		}
	});

}

EraseTool.prototype.draw = function (pos) {
	var ctx = this.actLayer.getCtx();
	
	ctx.clearRect(pos.x,pos.y,this.options.size,this.options.size);
	this.toolbox.builder.draw();

};
 
 

ColorPickerTool.prototype = new Tool();
ColorPickerTool.prototype.constructor = ColorPickerTool;
function ColorPickerTool() {
	Tool.call(this);
	this.color = [255, 255, 255];
}

ColorPickerTool.prototype.selectColor = function (c) {
	this.color = c;
	this.toolbox.fireEvents('colorchange', [c]);
};

function CircleBrush(color, options) {
	this.color = color;
	this.options = options;
}

CircleBrush.prototype = {
	draw: function (ctx, pos) {
		var cpos = {x: pos.x + this.options.size / 2, y: pos.y + this.options.size / 2};
		var grad = ctx.createRadialGradient(cpos.x, cpos.y, this.options.size, cpos.x, cpos.y, 0);
		var a = this.options.hardness / 100;
		var flow = this.options.flow / 100;
		grad.addColorStop(0, 'rgba(' + this.color.join(',') + ',0)');
		grad.addColorStop((1 - a), 'rgba(' + this.color.join(',') + ','+flow+')');

		ctx.fillStyle = grad;
		ctx.beginPath();
		ctx.arc(cpos.x, cpos.y, this.options.size, 0, 2 * Math.PI);
		ctx.fill();
	}
};
