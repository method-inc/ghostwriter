(function($, ko) {
  
  function Palette(drawing) {
  
    this.colors = {
      red: [128, 0, 0, .33],
      green: [0, 128, 0, .33],
      blue: [0, 0, 128, .33],
      black: [0, 0, 0, .33],
      white: [255, 255, 255, .33]
    };
    
    this.drawing = drawing;
    
    this.active = ko.observable(this.colors.black);
    
    drawing.event('palette.color', [this.active()]);
    
    this.active.subscribe(function(color) {
      drawing.event('palette.color', [color]);
    });
  }
  
  window.Palette = Palette;

})(jQuery, ko);