(function($, ko) {

  var ns = 'inkRenderer';
  
  function InkRenderer(canvas, options) {
    var self = this;
    
    this.settings = {
      blot: 3,
      stroke: 6,
      color: [0,0,0]
    };
    
    $.extend(this.settings, options || {})
    
    this.ctx = canvas.ctx;
    this.position = [null, null];                                 // [from, to]
    this.width = 2;
    
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
        this.ctx.strokeStyle = '#000';
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