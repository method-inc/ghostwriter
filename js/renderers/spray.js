(function($, ko) {

  var ns = 'sprayRenderer';
  
  function SprayRenderer(canvas, palette, options) {
    var self = this;
    
    this.settings = {
      spacing: 15,
      scatter: 10,
      fps: 25,
      momentum: 0.05,
      radius: 20,
      spread: 9,
      gravity: 3,
      opacity: 0.02,
      fade: 0.004
    };
    
    $.extend(this.settings, options || {})
    
    this.ctx = canvas.ctx;
    this.position = [null, null];                                 // [from, to]
    this.dripping = false;
    this.palette = palette;
    this.color = palette.active();
    
    this.debug = $('#workboard')[0].getContext('2d');
    
    $(document).bind(ns + '.down', function(event, position) {
      self.position = [{x: position.x, y: position.y}, {x: position.x, y: position.y}];
      self.color = self.palette.active();
      self.startDrip();
    });
    
    $(document).bind(ns + '.move', function(event, position) {
      self.position.shift();
      self.position.push({x: position.x, y: position.y});
    });
    
    $(document).bind(ns + '.up', function(event, position) {
      self.stopDrip();
    });  
  }
  
  SprayRenderer.prototype = {
    
    startDrip: function() {
      if (this.dripping) return;
      this.dripping = true;  
      var self = this;
      
      // Update loop
      
      (function update() {
        if (self.dripping) {
          var dx = self.position[1].x - self.position[0].x,
              dy = self.position[1].y - self.position[0].y,
              dist = Math.sqrt(dx * dx + dy * dy) || 1,
              spacing = self.settings.spacing,
              drops = dist / spacing,
              ratio = spacing / dist;
              
          for (var i = 0; i <= drops; i++) {
            var pos = {
                  x: self.position[1].x - ratio * dx * i,
                  y: self.position[1].y - ratio * dy * i
                },
                vel = {x: dx, y: dy};
            new Drop(self.ctx, pos, vel, self.color, self.settings);
          }
          
          window.setTimeout(update, 1000 / self.settings.fps);
        }
      })();
    },
    
    stopDrip: function() {
      this.dripping = false;
    }
  }
  
  window.SprayRenderer = SprayRenderer;
  
  // Helper constructors
  
  function Drop(ctx, position, velocity, color, settings) {
    var self = this;
    
    this.ctx = ctx;
    this.pos = position;
    this.vel = {x: velocity.x * settings.momentum, y: velocity.y * settings.momentum};
    this.r = settings.radius;
    this.settings = settings;
    this.opacity = settings.opacity;
    this.colorString = 'rgba(' + color + ',';
    
    this.debug = $('#workboard')[0].getContext('2d');
    
    window.setTimeout(function() {self.update();}, 1000 / settings.fps);
  }
  
  Drop.prototype = {
    update: function() {
      var self = this;
      
      this.debug.clearRect(this.pos.x - 3, this.pos.y - 3, 6, 6);
      
      this.pos.y    += this.settings.gravity;
      this.pos.x    += this.vel.x;
      this.pos.y    += this.vel.y;
      this.r        += this.settings.spread;
      this.opacity  -= this.settings.fade;
      
      if (this.opacity > this.settings.fade) {
        
        this.ctx.save();
          this.ctx.translate(this.pos.x, this.pos.y);
          this.ctx.fillStyle = this.colorString + this.opacity + ')';
          this.ctx.beginPath();
          this.ctx.arc(0, 0, this.r, 0, 1.8 * Math.PI, false);
          this.ctx.closePath();
          this.ctx.fill();
        this.ctx.restore();
        
        this.debug.fillStyle = '#0ff';
        this.debug.fillRect(this.pos.x - 2, this.pos.y - 2, 4, 4);
        
        window.setTimeout(function() {self.update();}, 1000 / this.settings.fps);
      }
    }
  }

})(jQuery, ko);