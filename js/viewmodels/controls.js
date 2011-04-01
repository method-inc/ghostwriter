(function($, ko) {

  function Controls(drawing, palette) {
    this.drawing = drawing;
    this.palette = palette;
  }
  
  Controls.prototype = {
  
    clear: function() {
      this.drawing.clear();
      this.palette.active(this.palette.active());   // There may be a more elegant way to store starting color information
    }
  }
  
  window.Controls = Controls;

})(jQuery, ko);