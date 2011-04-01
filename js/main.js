(function($, ko) {
  
  // Create VM instances
  
  var canvas        = new Canvas('artboard', 'workboard'),
      drawing       = new Drawing(canvas);
      mouse         = new Mouse(),
      activebrush   = ko.observable(null),
      eraser        = new Brush(mouse, 'eraser', 'eraser_holder', activebrush, 'drawing', 'eraserRenderer', drawing),
      pen           = new Brush(mouse, 'pen', 'pen_holder', activebrush, 'drawing', 'inkRenderer', drawing)
      spraygun      = new Brush(mouse, 'spraygun', 'spraygun_holder', activebrush, 'drawing', 'sprayRenderer', drawing),
      marker        = new Brush(mouse, 'marker', 'marker_holder', activebrush, 'drawing', 'markerRenderer', drawing),
      palette       = new Palette(drawing),
      controls      = new Controls(drawing, palette);
  
  // Create Renderers
  
  var sprayRenderer   = new SprayRenderer(canvas, palette),
      inkRenderer     = new InkRenderer(canvas, palette),
      markerRenderer  = new MarkerRenderer(canvas, palette),
      eraserRenderer  = new EraserRenderer(canvas, palette);
    
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
  
  // Bind Views to ViewModel
  
  ko.applyBindings(pen, 'pen');
  ko.applyBindings(spraygun, 'spray');
  ko.applyBindings(marker, 'marker');
  ko.applyBindings(eraser, 'eraser');
  ko.applyBindings(controls, 'controls');
  
  // Non-standard bindings
  
  $('.color').click(function(event) {
    palette.active($(this).attr('data-color'));
    $('.color').removeClass('active');
    $(this).addClass('active');
  });
  
  // Modify the DOM
  
  $('.color').each(function(color) {
    $(this).css('background-color', 'rgb(' + $(this).attr('data-color') + ')');
  });

  // Disable text selection
  
  document.onselectstart = function() {return false;} // ie
  document.onmousedown = function() {return false;} // mozilla
  
  // Load any stored image
  
  drawing.load();
  
})(jQuery, ko);