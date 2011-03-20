(function() {

  // Create VM instances
  
  var mouse         = new Mouse(),
      activebrush   = ko.observable(null),
      inkbrush      = new Brush(mouse, 'inkbrush_holder', activebrush, 'wrap', 'waterRenderer'),
      waterbrush    = new Brush(mouse, 'waterbrush_holder', activebrush, 'wrap', 'waterRenderer'),
      canvas        = new Canvas('artboard'),
      waterRenderer = new WaterRenderer(canvas);
    
  // Init ViewModels
  
  activebrush(inkbrush);
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