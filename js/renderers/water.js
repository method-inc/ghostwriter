(function($, ko) {

  var ns = 'waterRenderer';
  
  var lastTip = null;
  
  function Drip(ctx, x, y) {
    var self = this;
    
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = 10;
    this.opacity = 0.03;
    
    (function update() {
      self.y += 2;
      self.r += 5;
      self.opacity -= 0.001;
      if (self.opacity > 0.001) {
        self.ctx.save();
        self.ctx.translate(self.x, self.y);
        self.ctx.fillStyle = 'rgba(0, 0, 0, ' + self.opacity + ')';
        self.ctx.fillRect(self.r * -.5, self.r * -.5, self.r, self.r);
        self.ctx.restore();
        window.setTimeout(update, 1000 / 25);
      }
    })();
  }
  
  function WaterRenderer(canvas, options) {
    options = options || {};
    
    var self = this;
    
    this.ctx = canvas.ctx;
    this.lastPoint = null;
    this.lastTip = null;
    
    this.minHeight = options.minHeight || 30;
    this.maxHeight = options.maxHeight || 120;
    this.scale = options.scale || 1.5;
    
    $(document).bind(ns + '.down', function(event, position) {
      self.ctx.fillStyle = '#0f0';
      self.ctx.fillRect(position.x, position.y, 10, 10);
      self.lastPoint = {x: position.x, y: position.y};
    });
    
    $(document).bind(ns + '.move', function(event, position) {
      //self.ctx.fillStyle = '#000';
      //self.ctx.fillRect(position.x, position.y, 3, 3);
      //self.triangle(self.lastPoint, position);
      new Drip(self.ctx, position.x, position.y);
      self.lastPoint = {x: position.x, y: position.y};
    });
    
    $(document).bind(ns + '.up', function(event, position) {
      self.ctx.fillStyle = '#f00';
      self.ctx.fillRect(position.x, position.y, 10, 10);
      /*
      if (self.lastPoint) {
        self.triangle(self.lastPoint, position);
      }*/
      self.endStroke();
    });
    
  }
  WaterRenderer.prototype = {
    endStroke: function() {
      this.lastPoint = null;
      this.lastTip = null;
    },
    triangle: function(a, b) {
      var dx = b.x - a.x,
          dy = b.y - a.y,
          mx = (a.x + b.x) * .5,
          my = (a.y + b.y) * .5,
          dist = Math.sqrt(dx * dx + dy * dy),
          x = mx,
          y = my + Math.max(this.maxHeight - dist * this.scale, this.minHeight),
          ctx = this.ctx;
      /*
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(x, y);
      ctx.lineTo(b.x, b.y);
      ctx.closePath();
      ctx.stroke();
      */
      if (this.lastTip) {
        ctx.beginPath();
        ctx.moveTo(this.lastTip.x, this.lastTip.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      this.lastTip = {x: x, y: y};
    }
  }
  
  window.WaterRenderer = WaterRenderer;

})(jQuery, ko);