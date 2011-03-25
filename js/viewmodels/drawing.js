(function($, ko) {

  function trigger(events, index, callback) {
    var event = events[index];
    $(document).trigger(event.name, event.args);
    if (++index < events.length) {
      window.setTimeout(trigger, 15, events, index, callback);
    }
    else {
      callback();
    }
  }
  
  function Drawing() {
    this.events = amplify.store('drawing.events') || [];
    this.playing = ko.observable(false);
  }
  
  Drawing.prototype = {
  
    event: function(name, args) {
      var newEvent = {
        name: name,
        args: args,
        delay: new Date().getTime() - this.lastTime
      };
      this.events.push({name: name, args: args});
      $(document).trigger(name, args);
      amplify.store('drawing.events', this.events);
    },
    
    clear: function() {
      this.events = [];
      amplify.store('drawing.events', this.events);
      $(document).trigger('canvas.clear');
    },
    
    play: function() {
      var self = this;
      this.playing(true);
      $(document).trigger('canvas.clear');
      trigger(this.events, 0, function() {
        self.playing(false);
      });
    }
    
  };
  
  window.Drawing = Drawing;

})(jQuery, ko);