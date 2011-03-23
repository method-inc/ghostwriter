(function($, ko) {

  function trigger(events, index) {
    var event = events[index];
    $(document).trigger(event.name, event.args);
    if (++index < events.length) {
      window.setTimeout(trigger, 1000 / 45, events, index);
    }
  }

  function Drawing() {
    this.events = [];
  }
  
  Drawing.prototype = {
  
    event: function(name, args) {
      this.events.push({name: name, args: args});
      $(document).trigger(name, args);
    },
    
    clear: function() {
      $(document).trigger('canvas.clear');
    },
    
    play: function() {
      this.clear();
      trigger(this.events, 0);
    }
    
  };
  
  window.Drawing = Drawing;

})(jQuery, ko);