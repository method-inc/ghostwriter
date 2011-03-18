(function($, ko) {
  
  function WaterBrush() {
    this.width = 284;
    this.height = 890;
    this.shadowWidth = 160;
    this.shadowHeight = 266;
    
    this.active = ko.observable(false);
    this.pos = ko.observable({x: 0, y: 0});
    this.wx = ko.observable(this.pos().x);
    this.down = ko.observable(false);
    
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
  }
  
  window.WaterBrush = WaterBrush;

})(jQuery, ko);