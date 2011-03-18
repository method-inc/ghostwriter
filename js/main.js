(function() {

  var mouse = new Mouse(),
      inkbrush = new Brush(mouse, 'brush_holder'),
      waterbrush = new Brush(mouse, 'waterbrush_holder');
      
  // Define global ViewModel
  
  window.ViewModel = {
    inkbrush: inkbrush,
    waterbrush: waterbrush,
    mouse: mouse
  };
  
  // Init ViewModels
  
  mouse.monitor();
  
  // Bind Views to ViewModel
  
  ko.applyBindings(ViewModel);
  
  //$('#brush').BrushView();
  //$('#waterbrush').BrushView();

  // Disable text selection
  
  document.onselectstart = function() {return false;} // ie
  document.onmousedown = function() {return false;} // mozilla
  
  // Initial state
  
  ViewModel.inkbrush.active(true);
  ViewModel.waterbrush.active(false);
  
})();