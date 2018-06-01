/**
 * Created by himanshujain on 08/04/15.
 */

var svgIcons = require('../constants/svgIconConstants'),
    DEFAULT_ID = 'defaultIcon';

/**
 * Available icons in svgIconConstants
 * {search, facebook, instagram, twitter, adventure, family, friends, romantic, leisure, spiritual, map-marker}
*/

module.exports = {
  getIcon : function(iconId, options) {
    var svgObject = svgIcons[iconId];

    if (svgObject === undefined) {
      svgObject = svgIcons[DEFAULT_ID];
    }
    svgObject = JSON.parse(JSON.stringify(svgObject));

    svgObject.size = options && options.size ? options.size : svgObject.size;
    var strokeWidth = options && options.strokeWidth ? options.strokeWidth : 2;
    var strokeDasharray = options && options.strokeDasharray ? options.strokeDasharray : '';

    var pathTrace = svgObject.path;
    for (var index in pathTrace) {
      pathTrace[index].fill = options && options.fill ? options.fill : pathTrace[index].fill;
      pathTrace[index].stroke = options && options.stroke ? options.stroke : pathTrace[index].stroke;
      pathTrace[index].stroke ? pathTrace[index].strokeWidth = strokeWidth : '';
      pathTrace[index].strokeDasharray ? pathTrace[index].strokeDasharray : pathTrace[index].strokeDasharray = strokeDasharray ;
    }
    svgObject.path = pathTrace;
    return svgObject;
  }
}
