(function($, ko) {

  function Drawing() {
    this.events = [];
  }
  
  Drawing.prototype = {
  
    event: function(name, args) {
      this.events.push({name: name, args: args});
      $(document).trigger(name, args);
    },
    
    play: function() {
      for (var i = 0; i < this.events.length; i++) {
        $(document).trigger(this.events[i].name, this.events[i].args);
      }
    }
    
  };
  
  window.Drawing = Drawing;

})(jQuery, ko);