/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var latLng;
var pos;

function parsePerson(map, address) {
    addRoute(address);
    var geo = new google.maps.Geocoder();
    geo.geocode({'address': address}, function (results, status) {
        if (status == 'OK') {
            newPersonMarker(map, results[0].geometry.location);
        }else{
            console.log(address + ' não foi carregado');
        }
    });
}

function parseCompany(map, address, title) {
    addRoute(address);
    var geo = new google.maps.Geocoder();
    geo.geocode({'address': address}, function (results, status) {
        if (status == 'OK') {
            console.log(title + ' - ' + results[0].geometry.location);
            newCompanyMarker(map, results[0].geometry.location, title);
        }else{
            console.log(title);
        }
    });
}
