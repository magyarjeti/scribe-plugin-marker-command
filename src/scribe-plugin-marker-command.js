export default function() {
    return function(scribe) {
        var markerCommand = new scribe.api.Command('formatBlock');
        markerCommand.nodeName = 'MARK';

        markerCommand.execute = function() {
            var selection = new scribe.api.Selection();
            var range = selection.range;

                selection.placeMarkers();
            if (!this.queryState()) {
                var wrapper = document.createElement("mark");
                range.surroundContents(wrapper);
            } else {
                console.log(range);
            }
        };

        markerCommand.queryState = function() {
            var selection = new scribe.api.Selection();
            var range = selection.range;

            return range.commonAncestorContainer.nodeName === this.nodeName
                || range.commonAncestorContainer.parentNode.nodeName === this.nodeName;
        };

        scribe.commands.marker = markerCommand;
    };
}
