/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var origin;
var destination;
var route = [];
var points = [];

function calcRoute(service, display) {

    service.route({
        origin: getOrigin(),
        destination: getDestination(),
        waypoints: getPoints(),
        optimizeWaypoints: true,
        travelMode: 'DRIVING'

    }, function (results, status) {
        if (status == 'OK') {
            display.setDirections(results);
        }
    });

}

function calcOneRoute(origin, destination, index) {

    getServiceDirections().route({
        origin: origin,
        destination: destination.getPosition(),
        travelMode: 'DRIVING'

    }, function (results, status) {
        if (status == 'OK') {
            getDisplayDirections().setDirections(results);
            showInfoRoute(destination.getTitle(), results.routes[0].legs[0].distance.text, results.routes[0].legs[0].duration.text);
            console.log(results);
            console.log(destination);
            console.log(results.routes[0].summary);
            console.log(results.routes[0].legs[0].distance.text);
            console.log(results.routes[0].legs[0].duration.text);
            getContentCompany(destination, results.routes[0].legs[0].distance.text, index);
        }
    });

}

function addRoute(address) {
    route.push(address);
    if (getRouteCount() > 2) {
        setPoint();
    }
}

function getRouteCount() {
    return route.length;
}

function getOrigin() {
    return route[0];
}

function getDestination() {
    return route[route.length - 1];
}

function getRouteOrigin() {
    return route[route.length - 1];
}


function setPoint() {
    points.push({
        location: route[route.length - 2],
        stopover: true
    });
}

function getPoints() {
    return points;
}

function isRoute() {
    if (getRouteCount() >= 2) {
        return true;
    } else {
        return false;
    }
}

function hiddenRoute() {
    getDisplayDirections().setMap(null);
}

function clearRoute() {
    points = [];
    route = [];
    origin = "";
    destination = "";
    getDisplayDirections().setMap(null);
}

