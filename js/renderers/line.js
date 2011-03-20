(function($, ko) {

  var ns = 'lineRenderer';
  
  function LineRenderer(canvas) {
    var self = this;
    
    this.ctx = canvas.ctx;
    
    $(document).bind(ns + '.down', function(event, position) {
      self.ctx.fillRect(position.x, position.y, 10, 10);
    });
  }
  
  window.LineRenderer = LineRenderer;

})(jQuery, ko);