(function($, ko, Procrastinate, amplify) {
  
  function Drawing(canvas) {
    this.canvas = canvas;
  }
  
  Drawing.prototype = {
  
    event: function(name, args) {
      var self = this;
      $(document).trigger(name, args);
      Procrastinate.start('drawing.save', 1000, 10000, this.save, this);
    },
    
    clear: function() {
      $(document).trigger('canvas.clear');
    },
    
    save: function() {
      amplify.store('ghostwriter.drawing', this.canvas.el.toDataURL('image/png'));
    },
    
    load: function() {
      var self = this;
      if ('ghostwriter.drawing' in amplify.store()) {
        var img = new Image();
        img.onload = function() {
          self.canvas.ctx.drawImage(img, 0, 0);
        };
        img.src = amplify.store('ghostwriter.drawing');
      }
    }
    
  };
  
  window.Drawing = Drawing;

})(jQuery, ko, Procrastinate, amplify);