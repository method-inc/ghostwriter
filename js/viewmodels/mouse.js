(function($, ko) {

  function Mouse() {
    this.pos = ko.observable({x: 0, y: 0});
    this.down = ko.observable(false);
  }
  Mouse.prototype = {
    monitor: function() {
      var self = this;
      $(document).bind('mousemove', function(event) {
        self.pos({x: event.pageX, y: event.pageY});  
      });
      $(document).bind('mousedown', function(event) {
        if (event.which === 1) self.down(true);
      });
      $(document).bind('mouseup', function(event) {
        if (event.which === 1) self.down(false);
      });
    }
  }
  
  window.Mouse = Mouse;

})(jQuery, ko);