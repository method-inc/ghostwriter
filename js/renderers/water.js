(function($, ko) {

  var ns = 'waterRenderer';
  
  var lastTip = null;
  
  function triangle(ctx, a, b) {
    var dx = b.x - a.x,
        dy = b.y - a.y,
        mx = (a.x + b.x) * .5,
        my = (a.y + b.y) * .5,
        dist = Math.sqrt(dx * dx + dy * dy),
        x = mx,
        y = my + 20 + Math.max(40 - dist, 0);
    //ctx.strokeRect(a.x, a.y, dx, dy + vSize);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(x, y);
    ctx.lineTo(b.x, b.y);
    ctx.closePath();
    ctx.stroke();
    if (lastTip) {
      ctx.beginPath();
      ctx.moveTo(lastTip.x, lastTip.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    lastTip = {x: x, y: y};
  }
  
  function WaterRenderer(canvas) {
    var self = this;
    
    this.ctx = canvas.ctx;
    this.lastPoint = null;
    
    $(document).bind(ns + '.down', function(event, position) {
      self.ctx.fillStyle = '#0f0';
      self.ctx.fillRect(position.x, position.y, 10, 10);
      self.lastPoint = {x: position.x, y: position.y};
    });
    
    $(document).bind(ns + '.move', function(event, position) {
      self.ctx.fillStyle = '#000';
      self.ctx.fillRect(position.x, position.y, 3, 3);
      triangle(self.ctx, self.lastPoint, position);
      self.lastPoint = {x: position.x, y: position.y};
    });
    
    $(document).bind(ns + '.up', function(event, position) {
      self.ctx.fillStyle = '#f00';
      self.ctx.fillRect(position.x, position.y, 10, 10);
      if (self.lastPoint) {
        triangle(self.ctx, self.lastPoint, position);
      }
      self.lastPoint = null;
      lastTip = null;
    });
  }
  
  window.WaterRenderer = WaterRenderer;

})(jQuery, ko);