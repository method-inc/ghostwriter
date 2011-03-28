(function($, ko) {
  
  function Palette(drawing) {
  
    this.colors = {
      red: [128, 0, 0],
      green: [0, 128, 0],
      blue: [0, 0, 128],
      black: [0, 0, 0],
      white: [255, 255, 255]
    };
    
    this.drawing = drawing;
    
    this.active = ko.observable(this.colors.black);
    
    this.active.subscribe(function(color) {
      drawing.event('palette.color', [color]);
    });
  }
  
  window.Palette = Palette;

})(jQuery, ko);