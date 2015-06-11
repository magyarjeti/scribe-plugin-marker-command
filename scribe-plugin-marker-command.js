define("scribe-plugin-marker-command", ['element'], function($__0) {
  "use strict";
  var __moduleName = "scribe-plugin-marker-command";
  if (!$__0 || !$__0.__esModule)
    $__0 = {default: $__0};
  var Element = $__0.default;
  var $__default = function() {
    return function(scribe) {
      var getContainingMark = function(selection) {
        return selection.getContaining(function(node) {
          return node.nodeName === 'MARK';
        });
      };
      var markerCommand = new scribe.api.Command('formatBlock');
      markerCommand.nodeName = 'MARK';
      markerCommand.execute = function() {
        var selection = new scribe.api.Selection();
        var range = selection.range;
        selection.placeMarkers();
        if (!this.queryState()) {
          var wrapper = document.createElement('mark');
          range.surroundContents(wrapper);
        } else {
          var markerNode = getContainingMark(selection);
          Element.unwrap(markerNode.parentNode, markerNode);
        }
      };
      markerCommand.queryState = function() {
        var selection = new scribe.api.Selection();
        return !!getContainingMark(selection);
      };
      scribe.commands.marker = markerCommand;
    };
  };
  return {
    get default() {
      return $__default;
    },
    __esModule: true
  };
});
