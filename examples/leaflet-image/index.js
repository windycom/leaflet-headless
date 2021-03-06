/**
 * leaflet-image example.
 *
 */

'use strict';
var fs = require('fs');
var path = require('path');

var L = require('../../index.js');
var document = global.document;

function leafletImageExample (filename, callback) {
    // create an element for the map.
    var element = document.createElement('div');
    element.id = 'map-leaflet-image';
    document.body.appendChild(element);

    var map = L.map(element.id).setView([0, 0], 3);

    // load some geojson
    var gj = JSON.parse(fs.readFileSync(path.join(__dirname, 'countries.geojson')));
    L.geoJson(gj, {
        style: {
            weight: 2
        }
    }).addTo(map);

    L.marker([-12, 14]).addTo(map);
    L.marker([-12, -14]).addTo(map);

    L.tileLayer('https://windytiles.mapy.cz/turist-en/{z}-{x}-{y}', {
        attribution: '&copy; <a href="https://www.windy.com">Windy.com</a>',
    }).addTo(map);

    map.saveImage(filename, callback);
}

// export if script is called as a module
if (typeof exports === 'object') {
    module.exports = leafletImageExample;
}

// run the example if it's ran directly
if (require.main === module) {
    console.log('Saving an image using leaflet-image...');
    console.time('leaflet-image');

    var filename = path.join(__dirname, 'example-leaflet-image.png');
    leafletImageExample(filename, function (filename) {
        console.log('Saved file to ' + filename);
        console.timeEnd('leaflet-image');
    });
}
