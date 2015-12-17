function Get() {};
Get.prototype = {
  distance : function(x1,y1,x2,y2) {
    return Math.sqrt(this.square(x2-x1)+this.square(y2-y1));
  },
  square : function(x) {
    return x * x;
  }
};

function Slider(canvas, options) {
  console.log(canvas);
  console.log(options);
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  // new variables
  this.height = canvas.height;
  this.width = canvas.width;
  this.ticks = options.ticks || null;
  this.ticklabels = options.ticklabels || null;
  this.min = options.min || 0;
  this.max = options.max || 100;
  this.value = null;
  this.x = this.width / 2;
  this.y = this.height / 16;
  this.lineHeight = 7 * this.height / 8;
  this.lineWidth = 25;

  this.pointradius = 15;
  this.point = new Point(this.ctx, {
    x : this.x,
    y : this.y + this.lineHeight,
    radius : this.pointradius,
    max : this.y
  });
  this.get = new Get();
  //$scope.maxpoints = (Math.floor(Math.random() * 80) + 20) * $scope.scale;

  //if (this.practice) $scope.maxpoints = maxpoints * $scope.scale;
  this.setupevents();
}

Slider.prototype.getPointvalue = function() {
  return this.pointvalue;
};

Slider.prototype = {
  setupevents : function() {
    that = this;
    function mousedownListener (evt) {
      var distance = that.get.distance(evt.x,evt.y,that.point.x,that.point.y-that.point.value);
      console.log("try");
      // if the click is within the limits of the slider, start the values
      if (that.inbounds(evt))  {
        var value = (that.max - that.min) * (that.lineHeight - evt.y - that.y) / that.lineHeight;
        that.point.update(that.lineHeight - evt.y + that.y, value);

        that.draw();
        // value = 10 * evt.x / linelength;
        that.canvas.addEventListener('mousemove', mousemoveListener);
        that.canvas.removeEventListener('mousedown', mousedownListener);
        that.canvas.addEventListener('mouseup', mouseupListener);
        that.draw();
        console.log('cli');
      }
    }
    function mousemoveListener (evt) {
      // if the click gets out of range, turn off the drag
      if (!that.inbounds(evt)) {
    		that.canvas.addEventListener("mousedown", mousedownListener, false);
    		that.canvas.removeEventListener("mouseup", mouseupListener, false);
    		that.canvas.removeEventListener("mousemove", mousemoveListener, false);
      }
      var value = (that.max - that.min) * (that.lineHeight - evt.y - that.y) / that.lineHeight;
      that.point.update(that.lineHeight - evt.y + that.y, value);
      that.draw();
      console.log('move');
    }
    function mouseupListener (evt) {
  		that.canvas.addEventListener("mousedown", mousedownListener, false);
  		that.canvas.removeEventListener("mouseup", mouseupListener, false);
  		that.canvas.removeEventListener("mousemove", mousemoveListener, false);
      console.log('ck');
    }
		this.canvas.addEventListener('mousedown',mousedownListener);
  },
  inbounds : function(evt) {
    return evt.x > this.x - this.lineWidth  && evt.x < this.x + this.lineWidth &&
           evt.y > this.y && evt.y < this.y + this.lineHeight;
  },
  update : function() {
  },
  clear : function() {
    this.ctx.clearRect(0,0,this.width,this.height);
  },
  init : function() {
    this.clear();
    // draws line
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x, this.y + this.lineHeight);
    this.ctx.lineWidth = this.lineWidth + 2;
    this.ctx.strokeStyle = '#999999';
    this.ctx.stroke();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.stroke();
  },
  draw : function() {
    this.clear();
    // draws line
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x, this.y + this.lineHeight);
    this.ctx.lineWidth = this.lineWidth + 2;
    this.ctx.strokeStyle = '#999999';
    this.ctx.stroke();
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.stroke();


    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y + this.lineHeight);
    this.ctx.lineTo(this.x, this.point.y - this.point.value - this.point.radius);
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = '#cccccc';
    this.ctx.stroke();

    this.point.draw();
  },
  reset : function() {
  },
};

function Point(ctx, options) {
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.value = 0;
  this.radius = options.radius || 10;
  this.fill = "#EEEEEE";
  this.ctx = ctx;
  this.max = options.max;
  this.points = 0;
}

Point.prototype = {
  update : function(value, points) {
    if (value <= this.max) this.value = this.max;
    this.value = value;
    this.points = points;
  },
  draw : function() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y - this.value - this.radius, this.radius, 0, 2*Math.PI);
    this.ctx.closePath();
    this.ctx.lineWidth = 2;
    this.ctx.fillStyle = '#dadada';
    this.ctx.fill();
    this.ctx.strokeStyle = '#999999';
    this.ctx.stroke();
    this.ctx.font = "25px Arial";
    this.ctx.fillStyle = '#000000';
    this.ctx.fillText(this.points, this.x - this.radius, this.y - this.value - 5);
  },
  reset : function() {
    this.value = 0;
    this.draw(this.ctx);
  }
};

window.onload = function() {
  var slider = new Slider(document.getElementById("slider"), {
    min : 0,
    max : 10
  });
  slider.init();
}
