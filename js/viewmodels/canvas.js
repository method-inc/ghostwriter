(function($, ko) {

  function Canvas(elementId, workId) {
    
    var self = this;
    
    this.el = document.getElementById(elementId);
    this.ctx = this.el.getContext('2d');
    
    this.work = document.getElementById(workId);
    this.workCtx = this.work.getContext('2d');
    
    $(document).bind('canvas.clear', function() {
      self.ctx.clearRect(0, 0, 750, 500);
      self.workCtx.clearRect(0, 0, 750, 500);
    });
  }
  
  window.Canvas = Canvas;

})(jQuery, ko);