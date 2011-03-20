(function($, ko) {
  
  function Brush(mouse, holder, activebrush, container, renderer) {
  
    var self = this;
    
    this.mouse = mouse;
    this.holder = holder;
    this.container = container;
    this.renderer = renderer;
    
    this.width = 284;
    this.height = 890;
    this.shadowWidth = 160;
    this.shadowHeight = 266;
    
    this.active = ko.dependentObservable(function() {
      return (activebrush() === this);
    }, this);
    
    this.pos = ko.dependentObservable(function() {
      if (this.active()) {
        var container = $('#' + this.container).offset(),
            mouse = this.mouse.pos();
        return {x: (mouse.x - container.left), y: (mouse.y - container.top)};
      }
      else {
        var holder = $('#' + this.holder).offset(),
            container = $('#' + this.container).offset();
        return {x: holder.left - container.left + 25, y: holder.top - container.top + 25};
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
    
    // Custom event broadcasters
    
    // TODO: Bug in Knockout doesn't actually pass the value of "down" if you use the:
    // subscribe(function... , this) method. Fix!
    // (for now, using "self" hack)
    // fix this line: var boundCallback = callbackTarget ? function () { callback.call(callbackTarget) } : callback;
    
    this.down.subscribe(function(down) {
      if (down) {
        $(document).trigger(self.renderer + '.down', [self.pos()]);
      }
      else {
        $(document).trigger(self.renderer + '.up', [self.pos()]);
      }
    });
    this.pos.subscribe(function(pos) {
      if (self.down()) {
        $(document).trigger(self.renderer + '.move', pos);
      }
    });
    
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
  
  window.Brush = Brush;

})(jQuery, ko);