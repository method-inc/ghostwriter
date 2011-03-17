(function(ko) {

  // Global ViewModel container & view bindings
  
  var ViewModel = {
    brush: new Brush(),
    waterbrush: new WaterBrush()
  };
  
  window.ViewModel = ViewModel;
  
})(ko);