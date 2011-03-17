(function($, ko) {

  // Event Listeners
  
  var ctx = $('#artboard')[0].getContext('2d');
  
  var lastPaint = null,
      steps = 0;
  
  function startPaint(x, y) {
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(x, y);
    lastPaint = {x: x, y: y};
    steps = 0;
  }
  
  function paint(x, y) {
    var dx = (x - lastPaint.x),
        dy = (y - lastPaint.y),
        distance = Math.sqrt(dx * dx + dy * dy),
        maxWidth = 5,
        width = Math.max(2, maxWidth - distance * .13),
        alpha = 1; //Math.max(0, 1.5 - (width / maxWidth));
    if (++steps > 2) {
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(lastPaint.x, lastPaint.y);
      steps = 0;
    }
    //ctx.save();
      
      //ctx.beginPath();
      //ctx.moveTo(lastPaint.x, lastPaint.y);
      ctx.lineTo(x, y);
      //ctx.closePath();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineCap = 'round';
      ctx.lineWidth = width + 5;
      ctx.stroke();
      ctx.lineWidth = width + 2;
      ctx.stroke();
      ctx.strokeStyle = 'rgba(0, 0, 0, ' + alpha + ')';
      ctx.lineCap = 'round';
      ctx.lineWidth = width;
      ctx.stroke();
    //ctx.restore();
    lastPaint = {x: x, y: y};
  }
  
  // Subscribe to changes in the brush state
  
  ViewModel.brush.active.subscribe(function(active) {
    if (active) {
      $(document).bind('mousemove.brush', function(event) {
        var x = event.pageX,
            y = event.pageY;
        ViewModel.brush.pos({x: x, y: y});
      });
      
      $(document).bind('mousedown.brush', function(event) {
        ViewModel.brush.down(true);
      });
      
      $(document).bind('mouseup.brush', function(event) {
        ViewModel.brush.down(false);
      });
    }
    else {
      $(document).unbind('.brush');
      var pos = $('#brush_holder').offset();
      ViewModel.brush.pos({x: pos.left, y: pos.top});
    }
  });
  
  ViewModel.brush.down.subscribe(function(down) {
    var off = $('#artboard').offset(),
        x = ViewModel.brush.pos().x - off.left,
        y = ViewModel.brush.pos().y - off.top;
    if (down) {
      startPaint(x, y);
      paint(x, y);
      $(document).bind('mousemove.painting', function(event) {
        x = event.pageX - off.left,
        y = event.pageY - off.top;
        paint(x, y);
      });
    }
    else {
      $(document).unbind('mousemove.painting');
    }
  });
  
  // Background update loop
  
  (function update() {
    
    // Create natural lean
    
    var wx = ViewModel.brush.wx(),
        x = ViewModel.brush.pos().x;
    if (Math.abs(x - wx) > 2) {
      ViewModel.brush.wx(wx + (x - wx) * .25);
    }
    
    window.setTimeout(update, 1000 / 15);
  })();
    
})(jQuery, ko);