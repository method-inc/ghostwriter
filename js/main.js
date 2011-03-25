(function($, ko) {

  // Create Drawing instance
  
  var drawing = new Drawing();
  
  // Create VM instances
  
  var mouse         = new Mouse(),
      activebrush   = ko.observable(null),
      pen           = new Brush(mouse, 'pen_holder', activebrush, 'drawing', 'inkRenderer', drawing)
      inkbrush      = new Brush(mouse, 'inkbrush_holder', activebrush, 'drawing', 'markerRenderer', drawing),
      waterbrush    = new Brush(mouse, 'waterbrush_holder', activebrush, 'drawing', 'waterRenderer', drawing),
      palette       = new Palette(drawing),
      canvas        = new Canvas('artboard', 'workboard'),
      controls      = new Controls(drawing);
  
  // Create Renderers
  
  var waterRenderer   = new WaterRenderer(canvas, palette),
      inkRenderer     = new InkRenderer(canvas, palette),
      markerRenderer  = new MarkerRenderer(canvas, palette);
    
  // Init ViewModels
  
  activebrush(pen);
  mouse.monitor();
  
  activebrush.subscribe(function (brush) {
    if (brush === null) {
      $('body').removeClass("brushy");
    }
    else {
      $('body').addClass("brushy");
    }
  });
  
  // Define global ViewModel
  
  window.ViewModel = {
    pen: pen,
    inkbrush: inkbrush,
    waterbrush: waterbrush,
    mouse: mouse,
    activebrush: activebrush,
    palette: palette,
    canvas: canvas,
    controls: controls
  };
  
  // Bind Views to ViewModel
  
  ko.applyBindings(ViewModel);
  
  // Non-standard bindings
  
  $('#wrap').bind('click', function(event) {
    //console.dir(event);
  });
  
  $('#sidebar').mouseenter(
    function(event) {
      ViewModel.activebrush().tracking(false);
      return false;
    });
  $('#sidebar').mouseleave(
    function(event) {
      ViewModel.activebrush().tracking(true);
      return false;
    }
  );

  // Disable text selection
  
  document.onselectstart = function() {return false;} // ie
  document.onmousedown = function() {return false;} // mozilla
  
  
})(jQuery, ko);