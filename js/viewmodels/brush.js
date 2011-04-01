(function($, ko) {
  
  function Brush(mouse, el, holder, activebrush, container, renderer, drawing) {
  
    var self = this;
    
    this.el = $('#' + el);
    this.mouse = mouse;
    this.holder = holder;
    this.container = container;
    this.renderer = renderer;
    this.drawing = drawing;
    
    this.restLean = 20;
    this.width = this.el.width();
    this.height = this.el.height();
    
    var shadow = this.el.find('.shadow');
    this.shadowWidth = shadow.width();
    this.shadowHeight = shadow.height();
    
    this.lastPos = {x: 0, y: 0};
    
    this.visible = ko.observable(true);
    this.tracking = ko.observable(true);
    this.activebrush = activebrush;
    
    this.active = ko.dependentObservable(function() {
      return (activebrush() === this);
    }, this);
    
    this.available = ko.dependentObservable(function() {
      return !this.active();
    }, this);
    
    this.pos = ko.dependentObservable(function() {
      if (this.active()) {
        if (this.tracking()) {
          var container = $('#' + this.container).offset(),
              mouse = this.mouse.pos(),
              x = Math.max(-10, (mouse.x - container.left));
          this.lastPos = {x: x, y: (mouse.y - container.top)};
        }
      }
      else {
        var holder = $('#' + this.holder).offset(),
            container = $('#' + this.container).offset();
        this.lastPos = {x: holder.left - container.left + 25, y: holder.top - container.top + 25};
      }
      return this.lastPos;
    }, this);
    
    this.wx = ko.observable(this.pos().x);
    
    this.down = ko.dependentObservable(function() {
      if (this.active() && this.tracking()) {
        return this.mouse.down();
      }
      else {
        return false;
      }
    }, this);
    
    this.left = ko.dependentObservable(function() {
      return (this.pos().x - this.width * .5 - 1) + 'px';
    }, this);
    this.top = ko.dependentObservable(function() {
      return (this.pos().y - this.height * .5) + 'px';
    }, this);
    this.zIndex = ko.dependentObservable(function() {
      return ~~this.pos().y;
    }, this);
    this.lean = ko.dependentObservable(function() {
      return Math.min(35, Math.max(-35, (this.pos().x - this.wx()) * -.15)) + this.restLean;
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
      return 'rotate(' + (-this.lean() - 60) + 'deg)';
    }, this);
    
    // Custom event drawings
    
    // TODO: Bug in Knockout doesn't actually pass the value of "down" if you use the:
    // subscribe(function... , this) method. Fix!
    // (for now, using "self" hack)
    // fix this line: var boundCallback = callbackTarget ? function () { callback.call(callbackTarget) } : callback;
    
    this.down.subscribe(function(down) {
      if (down) {
        drawing.event(self.renderer + '.down', [self.pos()]);
      }
      else {
        drawing.event(self.renderer + '.up', [self.pos()]);
      }
    });
    
    this.pos.subscribe(function(pos) {
      if (self.down()) {
        drawing.event(self.renderer + '.move', pos);
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
  
  Brush.prototype = {
    activate: function() {
      this.activebrush(this);
    }
  }
  
  window.Brush = Brush;

})(jQuery, ko);