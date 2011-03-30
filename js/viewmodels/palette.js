(function($, ko) {
  
  function Palette(drawing) {
  
    this.drawing = drawing;
    
    this.active = ko.observable('0,0,0');
    
    drawing.event('palette.color', [this.active()]);
    
    this.active.subscribe(function(color) {
      drawing.event('palette.color', [color]);
    });
  }
  
  window.Palette = Palette;

})(jQuery, ko);