(function($, ko) {

  var activeBrush = null;
  
  function Brush(mouse, holder) {
  
    var self = this;
    
    this.mouse = mouse;
    this.holder = holder;
    
    this.width = 284;
    this.height = 890;
    this.shadowWidth = 160;
    this.shadowHeight = 266;
    
    this.active = ko.observable(false);
    this.active.subscribe(function(active) {
      if (active) {
        if (activeBrush && activeBrush !== self) {
          activeBrush.active(false);
        }
        activeBrush = self;
      }
    });
    
    this.pos = ko.dependentObservable(function() {
      if (this.active()) {
        return this.mouse.pos();
      }
      else {
        var pos = $('#' + holder).offset();
        return {x: pos.left + 25, y: pos.top + 25};
      }
    }, this);
    this.wx = ko.observable(this.pos().x);
    
    this.down = ko.dependentObservable(function() {
      if (this.active()) {
        return this.mouse.down();
      }
      else {
        return false;
      }
    }, this);
    
    this.left = ko.dependentObservable(function() {
      return (this.pos().x - this.width * .5 - 4) + 'px';
    }, this);
    this.top = ko.dependentObservable(function() {
      return (this.pos().y - this.height * .5 + 6) + 'px';
    }, this);
    this.zIndex = ko.dependentObservable(function() {
      return ~~this.pos().y;
    }, this);
    this.lean = ko.dependentObservable(function() {
      return (this.pos().x - this.wx()) * -.1;
    }, this);
    this.transform = ko.dependentObservable(function() {
      return 'rotate(' + this.lean() + 'deg)';
    }, this);
    
    this.shadowLeft = ko.dependentObservable(function() {
      return (this.pos().x - this.shadowWidth * .5 - 14) + 'px';
    }, this);
    this.shadowTop = ko.dependentObservable(function() {
      return (this.pos().y - this.shadowHeight * .5 - 7) + 'px';
    }, this);
    this.shadowTransform = ko.dependentObservable(function() {
      return 'rotate(' + (-this.lean() - 300) + 'deg)';
    }, this);
    
    // Background update loop
  
    (function update() {
      
      // Create natural lean
      
      var wx = self.wx(),
          x = self.pos().x;
      if (Math.abs(x - wx) > 2) {
        self.wx(wx + (x - wx) * .25);
      }
      
      window.setTimeout(update, 1000 / 25);
    })();
  }
  Brush.prototype = {
    activate: function() {
      console.dir(this);      // Knockout is stupid with scoping so this won't work
      this.active(true);
    }
  };
  
  window.Brush = Brush;

})(jQuery, ko);