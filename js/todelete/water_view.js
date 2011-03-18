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
        maxWidth = 13,
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
  
  ViewModel.waterbrush.active.subscribe(function(active) {
    if (active) {
      $(document).bind('mousemove.waterbrush', function(event) {
        var x = event.pageX,
            y = event.pageY;
        ViewModel.waterbrush.pos({x: x, y: y});
      });
      
      $(document).bind('mousedown.waterbrush', function(event) {
        ViewModel.waterbrush.down(true);
      });
      
      $(document).bind('mouseup.waterbrush', function(event) {
        ViewModel.waterbrush.down(false);
      });
    }
    else {
      $(document).unbind('.waterbrush');
      var pos = $('#waterbrush_holder').offset();
      ViewModel.waterbrush.pos({x: pos.left + 15, y: pos.top + 45});
    }
  });
  
  ViewModel.waterbrush.down.subscribe(function(down) {
    var off = $('#artboard').offset(),
        x = ViewModel.waterbrush.pos().x - off.left,
        y = ViewModel.waterbrush.pos().y - off.top;
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
    var wx = ViewModel.waterbrush.wx(),
        x = ViewModel.waterbrush.pos().x;
    if (Math.abs(x - wx) > 2) {
      ViewModel.waterbrush.wx(wx + (x - wx) * .25);
    }
    window.setTimeout(update, 1000 / 15);
  })();
    
})(jQuery, ko);