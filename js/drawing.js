(function($, ko) {

  function Drawing() {}
  
  Drawing.prototype = {
    event: function(name, args) {
      $(document).trigger(name, args);
    }
  };
  
  window.Drawing = Drawing;

})(jQuery, ko);