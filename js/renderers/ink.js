(function($, ko) {

  var ns = 'inkRenderer';
  
  function InkRenderer(canvas, palette, options) {
    var self = this;
    
    this.settings = {
      blot: 3,
      stroke: 6,
      thinDistance: 4
    };
    
    $.extend(this.settings, options || {})
    
    this.ctx = canvas.ctx;
    this.position = [null, null];   // [from, to]
    this.width = 2;
    this.color = palette.active();
    this.palette = palette;
    
    this.debug = $('#workboard')[0].getContext('2d');
    
    $(document).bind(ns + '.down', function(event, position) {
      self.position = [{x: position.x, y: position.y}, {x: position.x, y: position.y}];
      self.color = palette.active();
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
    
    stroke: function() {
      var dx = this.position[1].x - this.position[0].x,
          dy = this.position[1].y - this.position[0].y,
          dist = Math.sqrt(dx * dx + dy * dy) || 1;
      this.width += ((this.settings.stroke * (1 - (dist / this.settings.thinDistance))) - this.width) * .25;
      this.width = Math.min(15, Math.max(1, this.width));
      this.ctx.save();
        this.ctx.strokeStyle = 'rgba(' + this.color + ', .7)';
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