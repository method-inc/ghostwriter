(function($, ko) {
  
  function Palette() {
    this.colors = {
      red: [255, 0, 0],
      green: [0, 255, 0],
      blue: [0, 0, 255],
      black: [0, 0, 0],
      white: [255, 255, 255]
    };
    this.active = ko.observable(this.colors.black);
  }
  
  window.Palette = Palette;

})(jQuery, ko);