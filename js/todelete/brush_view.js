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
  
})(jQuery, ko);