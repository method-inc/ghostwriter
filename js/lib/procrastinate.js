/**
 * Procrastinate - to delay execution of a function (server or browser)
 *
 * - node.js
 *     eg: DrawProject updates project thumbnail when pages are added. CPU intensive.
 *     With sequential adds (multi-upload form), DrawProject runs each time, wasting the last thumbnail.
 *     We delay DrawProject for 5 seconds after each 'add' to see if another 'add' will happen soon.
 *     To avoid starving DrawProject, we set an upper limit of 30 seconds.
 *     
 *      var Procratinate = require('procrastinate');
 *      Procrastinate.start('projectname', 5000, 30000, function() { DrawProject('projectname'); });
 *
 * - Browser
 *
 *      <script src='procrastinate.js'></script>
 *      Procrastinate.start('someUniqueTag', 1000, 8000, function() { ... });
 *
 *      Procrastinate.start('anotherTag', 500, 5000, this.method(), this); // "method" called using "this" context
*/

(function() {

  var pending = {},
      exporter = {};
  
  function queue(fn, context, tag, start, min, max) {
    pending[tag] = {
      fn: fn,
      context: context,
      start: start,
      max: max,
      timeout: setTimeout(run, min, fn, context, tag)
    };
  }
  
  function run(fn, context, tag) {
    fn.call(context);
    delete pending[tag];
  }
  
  function start(tag, min, max, fn, context) {
    var queued = pending[tag],
        now = new Date().getTime();
    
    context = context || this;
    
    if (typeof queued !== 'undefined') {
      clearTimeout(queued.timeout);
      if (now - queued.start > queued.max) run(fn, context, tag);
      else queue(fn, context, tag, queued.start, min, max);
    }
    else queue(fn, context, tag, now, min, max);
  }

  // commonJS export

  if (typeof module !== 'undefined' && ('exports' in module)) {
    exporter = module.exports;
  }
  
  // browser export
  
  else if (typeof window !== 'undefined') {
    exporter = window.Procrastinate = {};
  }
  
  exporter.start = start;
  
})();