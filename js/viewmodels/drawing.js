(function($, ko, Procrastinate) {

  var historyLimit = 65536;
  
  function trigger(events, index, interval, callback) {
    var event = events[index];
    $(document).trigger(event.name, event.args);
    if (++index < events.length) {
      if (index % interval === 0)
        window.setTimeout(trigger, 15, events, index, interval, callback);
      else
        trigger(events, index, interval, callback);
    }
    else {
      callback();
    }
  }
  
  function Drawing() {
    this.events = amplify.store('drawing.events') || [];
    this.playing = ko.observable(false);
    this.lastTime = new Date().getTime();
  }
  
  Drawing.prototype = {
  
    event: function(name, args) {
      var self = this;
          now = new Date().getTime(),
          newEvent = {
            name: name,
            args: args,
            delay: now - this.lastTime
          };
      this.lastTime = now;
      this.events.push(newEvent);
      $(document).trigger(name, args);
      Procrastinate.start('drawing.save', 500, 10000, this.save, this);
    },
    
    clear: function() {
      this.events = [];
      this.save();
      $(document).trigger('canvas.clear');
    },
    
    play: function(steps) {
      if (this.playing()) return;
      steps = steps || 60;
      var self = this,
          interval = ~~Math.max(1, Math.min(15, this.events.length / steps));
      this.playing(true);
      $(document).trigger('canvas.clear');
      trigger(this.events, 0, interval, function() {
        self.playing(false);
      });
    },
    
    save: function() {
      if (this.events.length > historyLimit) {
        this.events.splice(0, this.events.length - historyLimit);
      }
      amplify.store('drawing.events', this.events);
    }
    
  };
  
  window.Drawing = Drawing;

})(jQuery, ko, Procrastinate);