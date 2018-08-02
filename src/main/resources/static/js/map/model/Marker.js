/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var contentPerson = '<div class="container text-center" id="content">' +
    '<p>Favor clique em um dos pontos em destaques ( <img src="img/icones/ic_company.png" /> ) no mapa.' +
    '</div>';



var contentCompany = '<div class="col-lg-12">' +
    '<div class="media">' +
    '<i class="fa fa-map-marker align-self-start mr-3 text-orange-0" style="font-size: 3.5em"></i>' +
    '<div class="media-body">' +
    '<h5 class="mt-0 text-orange-0">Mercado XPTO</h5>' +
    '<p class="pt-0 mt-0 mb-0 pb-0"><small> 1,5 km de distância</small></p>' +
    '<p class="pt-0 mt-0 mb-0 pb-0"><small>Rua XPTO, 60</small></p>' +
    '<p class="pt-0 mt-0 mb-0 pb-0"><small>Parque das Nações, Santo André</small></p>' +
    '<p class="pt-0 mt-0"><small>CEP:09280-390</small></p>' +
    '</div>' +
    '</div>' +
    '</div>';




var person = [];
var companies = [];
var markers = [];
var marker;
var urlPerson;
var urlCompany;
var size;
var origin;
var anchor;
var scaledSize;
var i = 0;
var p = 0;
var image;
var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
};
var infoPerson;
var infoCompany;
var infoMap;

function initMarker() {




    urlPerson = 'img/icones/ic_man.png';
    urlCompany = 'img/icones/ic_company.png'; //ic_placa_auto.png';
    size = new google.maps.Size(32, 32);
    origin = new google.maps.Point(0, 0);
    anchor = new google.maps.Point(17, 30);
    scaledSize = new google.maps.Size(32, 32)

    companyImg = {
        url: urlCompany,
        // This marker is 20 pixels wide by 32 pixels high.
        size: size,
        // The origin for this image is (0, 0).
        origin: origin,
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: anchor,
        scaledSize: scaledSize
    }

    personImg = {
        url: urlPerson,
        // This marker is 20 pixels wide by 32 pixels high.
        size: size,
        // The origin for this image is (0, 0).
        origin: origin,
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: anchor,
        scaledSize: scaledSize
    };
}

function newCompanyMarker(map, company) {
    marker = new google.maps.Marker({
        map: map,
        position: company.position,
        title: company.name,
        icon: companyImg
    });
    markers.push(marker);
    companies.push(company);
    //marker.addListener('click', () => hello(marker));
    initListener(i);
    i++;

}

function hello(e) {
    alert(e.getPosition());
}

function initListener(i) {

    google.maps.event.addListener(markers[i], 'click', function () {

        if (person.length > 0) {
            console.log(markers[i].getTitle());
            calcOneRoute(getRouteOrigin(), markers[i], i);
        }else{
            console.log('please add one point...');
            getContentCompany(markers[i], '0 km', i);
        }

    });

}

function newPersonMarker(map, latLng) {

    getDirectionMatrix(latLng);

    marker = new google.maps.Marker({
        map: map,
        position: latLng,
        icon: personImg

    });

    infoPerson = new google.maps.InfoWindow({
        content: contentPerson,
        maxWidth: 210
    });


    marker.addListener('click', function () {
        infoPerson.open(map, marker);
    });

    person.forEach(item => item.setMap(null));
    person.push(marker);
    map.setCenter(marker.getPosition());
    infoMap = map;

}

function setAllMarkers(map) {
    markers.forEach(item => item.setMap(map));
}

function clearAllMarkers() {
    markers.forEach(item => item.setMap(null));
}

function getMarkersCount() {
    return markers.length;
}

function isMarker() {
    if (getMarkersCount() > 0) {
        return true;
    } else {
        return false;
    }
}

function getContentCompany(marker, distance, index) {
    var content = '<div class="col-lg-12">' +
        '<div class="media">' +
        '<i class="fa fa-map-marker align-self-start mr-3 text-orange-0" style="font-size: 3.5em"></i>' +
        '<div class="media-body">' +
        '<h5 class="mt-0 text-orange-0">' + companies[index].name + '</h5>' +
        '<p class="pt-0 mt-0 mb-0 pb-0"><small>' + distance + ' de distância</small></p>' +
        '<p class="pt-0 mt-0 mb-0 pb-0"><small>' + companies[index].address + '</small></p>' +
        '<p class="pt-0 mt-0 mb-0 pb-0"><small>' + companies[index].neighborhood + ', ' + companies[index].city + '</small></p>' +
        '</div>' +
        '</div>' +
        '</div>';

    infoCompany = new google.maps.InfoWindow({
        content: content,
        maxWidth: 210
    });

    infoCompany.open(infoMap, marker);

}