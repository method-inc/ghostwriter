(function($, ko) {

  function Controls(drawing) {
    this.drawing = drawing;
  }
  
  Controls.prototype = {
  
    playback: function() {
      this.controls.drawing.play();     // Knockout really scopes this in a retarded way
    },
    
    clear: function() {
      this.controls.drawing.clear();
    }
  }
  
  window.Controls = Controls;

})(jQuery, ko);