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
      console.log("Saving...");
      amplify.store('ghostwriter.drawing', this.canvas.el.toDataURL('image/png'));
    },
    
    load: function() {
      var self = this;
      console.log("Loading...")
      if ('ghostwriter.drawing' in amplify.store()) {
        console.log("Key found...")
        var img = new Image();
        img.onload = function() {
          console.log("image loaded...")
          self.canvas.ctx.drawImage(img, 0, 0);
        };
        img.src = amplify.store('ghostwriter.drawing');
      }
    }
    
  };
  
  window.Drawing = Drawing;

})(jQuery, ko, Procrastinate, amplify);