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
      controls      = new Controls(drawing);
  
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
  
  // Define global ViewModel
  
  window.ViewModel = {
    eraser: eraser,
    pen: pen,
    spraygun: spraygun,
    marker: marker,
    mouse: mouse,
    activebrush: activebrush,
    palette: palette,
    canvas: canvas,
    controls: controls,
    drawing: drawing
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
  
  $('.color').click(function(event) {
    ViewModel.palette.active($(this).attr('data-color'));
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