(function() {

  // Create VM instances
  
  var mouse         = new Mouse(),
      activebrush   = ko.observable(null),
      pen           = new Brush(mouse, 'pen_holder', activebrush, 'drawing', 'inkRenderer')
      inkbrush      = new Brush(mouse, 'inkbrush_holder', activebrush, 'drawing', 'inkRenderer'),
      waterbrush    = new Brush(mouse, 'waterbrush_holder', activebrush, 'drawing', 'waterRenderer'),
      canvas        = new Canvas('artboard');
  
  // Create Renderers
  
  var waterRenderer = new WaterRenderer(canvas),
      inkRenderer   = new InkRenderer(canvas);
    
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
    canvas: canvas
  };
  
  // Bind Views to ViewModel
  
  ko.applyBindings(ViewModel);

  // Disable text selection
  
  document.onselectstart = function() {return false;} // ie
  document.onmousedown = function() {return false;} // mozilla
  
  
})();