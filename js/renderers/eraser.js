(function($, ko) {

  var ns = 'eraserRenderer';
  
  function EraserRenderer(canvas, palette, options) {
    var self = this;
    
    this.ctx = canvas.ctx;
    this.position = [null, null];   // [from, to]
    this.width = 20;
    
    $(document).bind(ns + '.down', function(event, position) {
      self.position = [{x: position.x, y: position.y}, {x: position.x, y: position.y}];
    });
    
    $(document).bind(ns + '.move', function(event, position) {
      self.position.shift();
      self.position.push({x: position.x, y: position.y});
      self.stroke();
    });
    
    $(document).bind(ns + '.up', function(event, position) {
    });
  }
  
  EraserRenderer.prototype = {
    
    stroke: function() {
      this.ctx.save();
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = this.width;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(this.position[0].x, this.position[0].y);
        this.ctx.lineTo(this.position[1].x, this.position[1].y);
        this.ctx.stroke();
      this.ctx.restore();
    }
    
  }
  
  window.EraserRenderer = EraserRenderer;

})(jQuery, ko);