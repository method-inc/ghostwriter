(function($, ko) {

  var ns = 'waterRenderer';
  
  var lastTip = null;
  
  function Drop(ctx, position, radius, direction) {
    var self = this;
    
    this.ctx = ctx;
    this.pos = position;
    this.dir = {x: direction.x * .05, y: direction.y * .05};
    this.r = radius;
    this.opacity = 0.02;
    
    this.debug = $('#debugboard')[0].getContext('2d');
    
    window.setTimeout(function() {self.update();}, 1000 / 25);
  }
  Drop.prototype = {
    update: function() {
      var self = this;
      this.debug.clearRect(this.pos.x - 3, this.pos.y - 3, 6, 6);
      this.pos.y += 3;
      this.pos.x += this.dir.x;
      this.pos.y += this.dir.y;
      this.r += 5;
      this.opacity -= 0.001;
      if (this.opacity > 0.001) {
        
        this.ctx.save();
        this.ctx.translate(this.pos.x, this.pos.y);
        this.ctx.fillStyle = 'rgba(0, 20, 30, ' + this.opacity + ')';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.r, 0, 2 * Math.PI, false);
        //this.ctx.fillRect(this.r * -.5, this.r * -.5, this.r, this.r);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
        
        this.debug.fillStyle = '#0ff';
        this.debug.fillRect(this.pos.x - 2, this.pos.y - 2, 4, 4);
        window.setTimeout(function() {self.update();}, 1000 / 25);
      }
    }
  }
  
  function WaterRenderer(canvas, options) {
    options = options || {};
    
    var self = this;
    
    this.ctx = canvas.ctx;
    this.origPos = null;
    this.targetPos = null;
    this.dripping = false;
    
    this.spacing = options.spacing || 15;
    this.scatter = options.scatter || 10;
    this.fps = options.fps || 25;
    this.momentum = options.momentum || 0.05;
    this.dropsize = options.dropsize || 10;
    this.spread = options.spread || 5;
    this.gravity = options.gravity || 2;
    
    
    this.debug = $('#debugboard')[0].getContext('2d');
    
    $(document).bind(ns + '.down', function(event, position) {
      self.targetPos = {x: position.x, y: position.y};
      self.origPos = {x: position.x, y: position.y};
      self.startDrip();
    });
    
    $(document).bind(ns + '.move', function(event, position) {
      self.origPos = self.targetPos;
      self.targetPos = {x: position.x, y: position.y};
    });
    
    $(document).bind(ns + '.up', function(event, position) {
      self.stopDrip();
    });
    
  }
  WaterRenderer.prototype = {
    startDrip: function() {
      if (this.dripping) {
        return;
      }
      var self = this;
      this.dripping = true;
      (function update() {
        if (self.dripping) {
          var dx = self.targetPos.x - self.origPos.x,
              dy = self.targetPos.y - self.origPos.y,
              dist = Math.sqrt(dx * dx + dy * dy) || 1,
              spacing = 15,
              drops = dist / spacing,
              ratio = spacing / dist;
          for (var i = 0; i <= drops; i++) {
            var pos = {x: self.targetPos.x - ratio * dx * i + Math.random() * 20 - 10, y: self.targetPos.y - ratio * dy * i + Math.random() * 20 - 10};
            new Drop(self.ctx, pos, 10, {x: dx, y: dy});
          }
          window.setTimeout(update, 1000 / 25);
        }
      })();
    },
    stopDrip: function() {
      this.dripping = false;
    }
  }
  
  window.WaterRenderer = WaterRenderer;

})(jQuery, ko);