function Editor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.layers = {};
    
}

Editor.prototype = {
    
    render: function () {
        var keys = Object.keys(this.layers);
        keys.sort();
        this.renderStack(keys)
    },
    renderStack:function(stack){
      
      var item = stack.shift();
      
      if(item === undefined){
          return;
      }
      console.log(item)
      this.layers[item].draw(this.ctx,function(){
          this.renderStack(stack);
      }.bind(this));
    },
    addLayer:function(layer, index){
        if(index == undefined){
            var keys = Object.keys(this.layers);
            index = keys.length+1;
        }
        this.layers[index] =  layer;
    }
};


function CanvasImg(src, w, h) {
    this.src = src;
    this.img;
    this.w = w;
    this.h = h;
}

CanvasImg.prototype = {
    draw: function (ctx,cb) {
        if (!this.img) {
            this.img = new Image();
            this.img.onload = function () {
                this.imgw = this.img.width;
                this.imgh = this.img.height;
                this.draw(ctx,cb);
            }.bind(this);

            this.img.src = this.src;
            return;
        }

        var r = this.imgw / this.imgh;
        if(!this.w){
            var h = this.h;
            var w = h * r;
        }

        ctx.drawImage(this.img, 0, 0,this.imgw, this.imgh, 0, 0, w, h);
        if(cb){
            cb();
        }
    }
}