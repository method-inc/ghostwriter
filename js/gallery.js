(function($, ko) {
  
  function Stroke() {
    this.points = [];
    this.color = '#000000';
    this.width = 3;
  }
  
  function Scene() {
    this.strokes = [];
    this.child = {
      scene: null,
      x: 0,
      y: 0,
      zoom: 10
    };
  }
  
  function Show() {
    this.scenes = [];
  }
    
})(jQuery, ko);