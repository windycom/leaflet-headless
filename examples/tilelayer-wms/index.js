/**
 * L.TileLayer.WMS example.
 *
 */

var path = require('path');
var L = require('../../index.js');

var document = global.document;

function tilelayerWmsExample (filename, callback) {
    var element = document.createElement('div');
    element.id = 'map-leaflet-tilelayer-wms';
    document.body.appendChild(element);

    var map = L.map(element.id).setView([30, -90], 4);

    L.tileLayer('https://windytiles.mapy.cz/turist-en/{z}-{x}-{y}', {
        attribution: '&copy; <a href="https://www.windy.com">Windy.com</a>',
    }).addTo(map);
    L.tileLayer.wms('https://ahocevar.com/geoserver/wms', {
        layers: 'topp:states',
        transparent: true,
        opacity: 0.5,
        format: 'image/png'
    }).addTo(map);

    map.saveImage(filename, callback);
}

// export if script is called as a module
if (typeof exports === 'object') {
    module.exports = tilelayerWmsExample;
}

// run the example if it's ran directly
if (require.main === module) {
    console.log('Saving an image with a WMS layer ...');
    console.time('leaflet-tilelayer-wms');

    var filename = path.join(__dirname, 'example-leaflet-tilelayer-wms.png');
    tilelayerWmsExample(filename, function (filename) {
        console.log('Saved file to ' + filename);
        console.timeEnd('leaflet-tilelayer-wms');
    });
}
