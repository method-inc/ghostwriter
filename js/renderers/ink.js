(function($, ko) {

  var ns = 'inkRenderer';
  
  function InkRenderer(canvas, palette, options) {
    var self = this;
    
    this.settings = {
      blot: 3,
      stroke: 6
    };
    
    $.extend(this.settings, options || {})
    
    this.ctx = canvas.ctx;
    this.position = [null, null];                                 // [from, to]
    this.width = 2;
    this.color = [0,0,0];
    
    this.debug = $('#debugboard')[0].getContext('2d');
    
    $(document).bind(ns + '.down', function(event, position) {
      self.position = [{x: position.x, y: position.y}, {x: position.x, y: position.y}];
      //self.blot(self.settings.blot);
    });
    
    $(document).bind(ns + '.move', function(event, position) {
      self.position.shift();
      self.position.push({x: position.x, y: position.y});
      self.stroke();
    });
    
    $(document).bind(ns + '.up', function(event, position) {
    });
    
    $(document).bind('palette.color', function(event, color) {
      self.color = color;
    });
  }
  
  InkRenderer.prototype = {
    
    blot: function(radius) {
      this.ctx.save();
        this.ctx.translate(this.position[1].x, this.position[1].y);
        this.ctx.fillStyle = 'rgba(' + this.settings.color.join(',') + ', 1)';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
        this.ctx.closePath();
        this.ctx.fill();
      this.ctx.restore();
    },
    
    stroke: function() {
      var dx = this.position[1].x - this.position[0].x,
          dy = this.position[1].y - this.position[0].y,
          dist = Math.sqrt(dx * dx + dy * dy) || 1;
      this.width += ((this.settings.stroke * (1 - (dist / 15))) - this.width) * .25;
      this.width = Math.min(15, Math.max(1, this.width));
      this.ctx.save();
        this.ctx.strokeStyle = 'rgba(' + this.color.join(',') + ', 1)';
        this.ctx.lineWidth = this.width;
        this.ctx.beginPath();
        this.ctx.moveTo(this.position[0].x, this.position[0].y);
        this.ctx.lineTo(this.position[1].x, this.position[1].y);
        this.ctx.stroke();
      this.ctx.restore();
    }
    
  }
  
  window.InkRenderer = InkRenderer;

})(jQuery, ko);