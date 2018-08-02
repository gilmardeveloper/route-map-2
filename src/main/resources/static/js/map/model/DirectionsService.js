/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var service;
var display;

function directionsServiceInit(map, polyline){
    service = new google.maps.DirectionsService();
    display = new google.maps.DirectionsRenderer({map: map, draggable : true, suppressMarkers: true, polylineOptions: polyline});    
}

function getServiceDirections(){
    return service;
}

function getDisplayDirections(){
    return display;
}

function directionsRoute(){
    calcRoute(service, display);
}


