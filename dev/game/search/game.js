// plots graph
$(function() {
    var points = [];
    var income = 0;
    var plot = $.plot("#placeholder",[{
        data: points,
        points: {show : true}
      }], {
        xaxis: {
            ticks:10,
            min:0,
            max:100
        },
        yaxis: {
            ticks:10,
            min:0,
            max:100
        },
        grid: {
          clickable: true
        }
    });

    var locatorState = new LocatorState(document.getElementById("locator"));
    locatorState.setGoal();
    locatorState.draw();

    $("#placeholder").bind("plotclick", function(event, pos, item) {
      points.pop();
      points.push([pos.x, pos.y]);
      plot.setData([{
        data: points,
        clickable: false,
        points: {
          show: true,
          fill: true,
          radius: 10,
        }
      }]);
      plot.draw();
      locatorState.update(pos);
      locatorState.draw();
      /*
      if (item) {
        highlight(item.series, item.datapoint);
        console.log("You clicked a point!");
      }
      */
    });

    $("#nexttask").click(function() {
      income += locatorState.getPointvalue();
      $("#income").text("So far, your income is $" +
        parseFloat(parseInt(income)) / 100 + ".");

        // reaches income goal
        if (income > 10 * 100) {
          $("#ngshow").hide();
          console.log("income : " + income);
        }
        // clear dot and set new goal
        else {
          points.pop();
          plot.setData([points]);
          plot.draw();
          locatorState.setGoal();
          locatorState.pointvalue = 0;
          $("#earned").text("Money earned for this task (cents) : " +
            parseFloat(locatorState.pointvalue).toFixed(1));
          $("#points").text("Points earned : " + parseFloat(locatorState.pointvalue).toFixed(1));

        }
    });
});

function Point(x, y, radius) {
  this.x = x || 0;
  this.y = y || 0;
  this.value = 0;
  this.radius = radius || 10;
  this.fill = "#EEEEEE";
}

Point.prototype.update = function(value) {
  this.value = value;
};

Point.prototype.draw = function(ctx) {
  // draws triangle
  var path = new Path2D();
  var l = this.radius * Math.sqrt(3) / 4;
  path.moveTo(this.x, this.y - this.value - l);
  path.lineTo(this.x - this.radius, this.y - this.value + l);
  path.lineTo(this.x + this.radius, this.y  - this.value + l);
  ctx.fill(path);
};

function LocatorState(canvas) {
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext('2d');
  this.side = "right";
  this.direction = "up";
  this.goal = {
    x: null,
    y: null
  };
  this.pointvalue = 0;
  this.linelength = this.height / 2;
  this.maxlength = Math.sqrt(square(100 - 0) + square(100 - 0));

  this.point = new Point(this.width / 2, this.height * 3 / 4, 20);
}

LocatorState.prototype.getPointvalue = function() {
  return this.pointvalue;
}

LocatorState.prototype.setGoal = function() {
  this.goal = {
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100)
  };
};

LocatorState.prototype.update = function(guess) {
  console.log(this.goal);
  var distance = Math.sqrt(square(this.goal.x - guess.x) + square(this.goal.y - guess.y));
  // update locator position
  this.pointvalue = 100 - distance * this.linelength / 100;
  var linescale = this.pointvalue * this.linelength / 100;
  this.point.update(linescale);
  $("#earned").text("Money earned for this task (cents) : " + parseFloat(this.pointvalue).toFixed(1));
  $("#points").text("Points earned : " + parseFloat(this.pointvalue).toFixed(1));
};

function square(x) {
  return x * x;
}

// clears canvas
LocatorState.prototype.clear = function() {
  this.ctx.clearRect(0,0,this.width,this.height);
};

// draws inital locator
LocatorState.prototype.draw = function() {
  this.clear();

  // draws text
  this.ctx.font = "20px Lucida Console";
  this.ctx.fillText("Close!", this.width / 8, this.height * 2 / 11);
  this.ctx.fillText("Go " + this.side + "-" + this.direction, this.width * 2 / 4, this.height * 2 / 11);
  // draws line
  this.ctx.beginPath();
  this.ctx.moveTo(this.width / 2, this.height / 4);
  this.ctx.lineTo(this.width / 2, this.height / 4 + this.linelength);
  this.ctx.stroke();

  // draws numbers

  // draw locator
  this.point.draw(this.ctx);
};
