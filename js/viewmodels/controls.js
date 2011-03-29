(function($, ko) {

  function Controls(drawing) {
    this.drawing = drawing;
  }
  
  /* Basically fix KO like instead of this:
  
  something = ViewModel.controls.playback();
  this.something();
  
  use this:
  
  something = {
    fn: ViewModel.controls.playback,
    context: ViewModel.controls
  }
  something.fn.call(something.fn.context);
  */
  
  Controls.prototype = {
  
    playback: function() {
      this.controls.drawing.play();     // Knockout really scopes this in a retarded way
      //this.drawing.play();
    },
    
    clear: function() {
      this.controls.drawing.clear();
      this.palette.active(this.palette.active());   // There may be a more elegant way to store starting color information
    }
  }
  
  window.Controls = Controls;

})(jQuery, ko);