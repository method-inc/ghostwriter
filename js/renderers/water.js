(function($, ko) {

  var ns = 'waterRenderer';
  
  var lastTip = null;
  
  function Drip(ctx, position, radius, direction) {
    var self = this;
    
    this.ctx = ctx;
    this.pos = position;
    this.dir = direction
    this.r = radius;
    this.opacity = 0.03;
    
    this.debug = $('#debugboard')[0].getContext('2d');
    
    Drip.all.push(this);
  }
  Drip.all = [];
  Drip.prototype = {
    update: function() {
      this.pos.y += 2;
      this.r += 5;
      this.opacity -= 0.001;
      if (this.opacity > 0.001) {
        this.ctx.save();
        this.ctx.translate(this.pos.x, this.pos.y);
        this.ctx.fillStyle = 'rgba(0, 0, 0, ' + this.opacity + ')';
        this.ctx.fillRect(this.r * -.5, this.r * -.5, this.r, this.r);
        this.ctx.restore();
        this.debug.fillStyle = '#0ff';
        this.debug.fillRect(this.pos.x - 2, this.pos.y - 2, 4, 4);
        return 1;
      }
      else {
        Drip.all.splice(Drip.all.indexOf(this), 1);
        return 0;
      }
    }
  };
  
  function WaterRenderer(canvas, options) {
    options = options || {};
    
    var self = this;
    
    this.ctx = canvas.ctx;
    this.lastPoint = null;
    this.lastTip = null;
    
    this.minHeight = options.minHeight || 30;
    this.maxHeight = options.maxHeight || 120;
    this.scale = options.scale || 1.5;
    this.dripping = false;
    this.newDrips = false;
    
    this.debug = $('#debugboard')[0].getContext('2d');
    
    $(document).bind(ns + '.down', function(event, position) {
      self.ctx.fillStyle = '#0f0';
      self.ctx.fillRect(position.x, position.y, 10, 10);
      self.lastPoint = {x: position.x, y: position.y};
      self.newDrips = true;
      self.startDrip();
    });
    
    $(document).bind(ns + '.move', function(event, position) {
      self.lastPoint = {x: position.x, y: position.y};
    });
    
    $(document).bind(ns + '.up', function(event, position) {
      self.ctx.fillStyle = '#f00';
      self.ctx.fillRect(position.x, position.y, 10, 10);
      self.newDrips = false;
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
        if (self.newDrips) {
          new Drip(self.ctx, self.lastPoint, 10, {x: 0, y: 0});
        }
        self.debug.clearRect(0, 0, 750, 500);
        var i = 0;
        while (i < Drip.all.length) {
          i += Drip.all[i].update();
        }
        if (Drip.all.length === 0) {
          self.dripping = false;
        }
        if (self.dripping) {
          window.setTimeout(update, 1000 / 25);
        }
      })();
    },
    stopDrip: function() {
      this.dripping = false;
    },
    endStroke: function() {
      this.lastTip = null;
    }
  }
  
  window.WaterRenderer = WaterRenderer;

})(jQuery, ko);