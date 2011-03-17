(function() {

  document.onselectstart = function() {return false;} // ie
  document.onmousedown = function() {return false;} // mozilla
  
  ko.applyBindings(ViewModel);
  
  // Initial state
  ViewModel.brush.active(true);
  ViewModel.waterbrush.active(false);
  
})();