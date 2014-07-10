define([], function () {
    var Canvas = function (htmlelementid) {
        var _element = document.getElementById(htmlelementid);
        var _ctx = canvas.getContext("2d");
        var _image_data = _ctx.getImageData(0,0,_ctx.canvas.width, _ctx.canvas.height);
        var _raw_data = _image_data.data;
        this.clear = function(color,borderColor) {
            if(borderColor != undefined) {
                _ctx.fillStyle=borderColor;
                _ctx.fillRect(0,0,_ctx.canvas.width, _ctx.canvas.height);
                _ctx.fillStyle=color;
                _ctx.fillRect(1,1,_ctx.canvas.width-2, _ctx.canvas.height-2);
            } else {
                _ctx.fillStyle=color;
                _ctx.fillRect(0,0,_ctx.canvas.width, _ctx.canvas.height);
            } 
        }

        this.stroke = function() {
            _ctx.stroke();
        }

        this.update = function() {
            _ctx.putImageData(_image_data, 0 , 0);
        }
        this.setPixel = function(position, rgba) {
            var index = ((position[1]*(_image_data.width*4)) + (position[0]*4));
            _raw_data[index] = rgba[0];
            _raw_data[index+1] = rgba[1];
            _raw_data[index+2] = rgba[2];
            _raw_data[index+3] = rgba[3];     
        }
        this.getHeight = function () { return _ctx.canvas.height; }
        this.getWidth = function () { return _ctx.canvas.width; }
    };
    return Canvas;
});
