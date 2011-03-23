(function($, ko) {

  function Canvas(elementId) {
    
    var self = this;
    
    this.el = document.getElementById(elementId);
    this.ctx = this.el.getContext('2d');
    
    $(document).bind('canvas.clear', function() {
      self.ctx.clearRect(0, 0, 750, 500);
    });
  }
  
  window.Canvas = Canvas;

})(jQuery, ko);