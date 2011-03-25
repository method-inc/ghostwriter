(function($, ko) {

  var ns = 'markerRenderer';
  
  function MarkerRenderer(canvas, palette, options) {
    var self = this;
    
    this.settings = {
      stroke: 12
    };
    
    $.extend(this.settings, options || {})
    
    this.canvas = canvas;
    this.ctx = canvas.ctx;
    this.work = canvas.workCtx;
    
    this.currentStroke = [];
    this.color = [0,0,0];
    
    this.debug = $('#workboard')[0].getContext('2d');
    
    $(document).bind(ns + '.down', function(event, position) {
      self.currentStroke = [{x: position.x, y: position.y}];
    });
    
    $(document).bind(ns + '.move', function(event, position) {
      self.currentStroke.push({x: position.x, y: position.y});
      self.stroke();
    });
    
    $(document).bind(ns + '.up', function(event, position) {
      self.imprint();
    });
    
    $(document).bind('palette.color', function(event, color) {
      self.color = color;
    });
  }
  
  MarkerRenderer.prototype = {
    
    stroke: function() {
      this.work.clearRect(0, 0, 750, 500);
      this.work.save();
        this.work.strokeStyle = 'rgba(' + this.color.join(',') + ', .5)';
        this.work.lineWidth = 10;
        this.work.beginPath();
        this.work.moveTo(this.currentStroke[0].x, this.currentStroke[0].y);
        for (var i = 1; i < this.currentStroke.length; i++) {
          this.work.lineTo(this.currentStroke[i].x, this.currentStroke[i].y);
        }
        this.work.stroke();
      this.work.restore();
    },
    
    imprint: function() {
      //this.ctx.globalCompositeOperation = 'darker';
      this.ctx.drawImage(this.canvas.work, 0, 0);
      this.canvas.workCtx.clearRect(0, 0, 750, 500);
    }
    
  }
  
  window.MarkerRenderer = MarkerRenderer;

})(jQuery, ko);