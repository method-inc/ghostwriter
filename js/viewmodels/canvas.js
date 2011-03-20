(function($, ko) {

  function Canvas(elementId) {
    
    var self = this;
    
    this.el = document.getElementById(elementId);
    this.ctx = this.el.getContext('2d');    
  }
  
  window.Canvas = Canvas;

})(jQuery, ko);