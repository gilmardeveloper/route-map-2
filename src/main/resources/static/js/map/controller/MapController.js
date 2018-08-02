/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var position;
var view;
var options;
var map;
var polyline;
var template = [];


var companies = [
    { 
        name: 'Este lugar', 
        position: { lat: -23.630512, lng: -46.5363925 },
        address: 'Av dos Estados, 2195',
        neighborhood: 'Santa Teresinha',
        city: 'Santo André - SP'
    },
    { 
        name: 'Outro Lugar', 
        position: { lat: -23.584885, lng: -46.5463616 },
        address: 'Av Vila Ema, 3256',
        neighborhood: 'Vila Ema',
        city: 'São Paulo - SP' 
    },
    ];


    
function init() {
    view = document.getElementById('map');
    polyline = new google.maps.Polyline({
        strokeColor: '#1B5E20',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    options = {
        zoom: 12,
        center: { lat: -23.6742228, lng: -46.5436003}, 
        fullscreenControl: true
    };


    map = new google.maps.Map(view, options);
    directionsServiceInit(map, polyline);
    initMarker();
    initMarkersCompany();

    
   
}


function getDirectionMatrix(origin){

    var origin1 =  origin; //new google.maps.LatLng(55.930385, -3.118425);
    //var origin2 = 'Greenwich, England';
    var destinationA = companies[0].position;
    var destinationB = companies[1].position

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin1],
        destinations: [destinationA, destinationB],
        travelMode: 'WALKING',
       // transitOptions: TransitOptions,
        //drivingOptions: DrivingOptions,
        //unitSystem: UnitSystem,
       // avoidHighways: Boolean,
        //avoidTolls: Boolean,
      }, callback);

}

function callback(response, status) {
  
   if(status == 'OK'){
    
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        var distance = element.distance.text;
        var duration = element.duration.text;
        var from = origins[i];
        var to = destinations[j];

        console.log(from + " para " + to + " distância: " + distance + " duração: " + duration);
       // $("#este-lugar").text("Origin: " + from + " distância: " + distance + " duração: " + duration);
       // $("#outro-lugar").text("Origin: " + from + " distância: " + distance + " duração: " + duration);
        
        var card = '<div class="card bg-light mb-3" style="max-width: 18rem;">' +
                      '<div class="card-header">Origem: ' + from + '</div>' +
                      '<div class="card-body">' +
                        '<h5 class="card-title h6">Destino: ' + to + '</h5>' +
                        '<p class="card-text">Duração: ' + duration + ' distância: ' + distance + '</p>' +
                     '</div>' +
        '</div>';    
        template.push(card);

      }

     } 

      document.getElementById("card-lateral").innerHTML = template.map(function(item, index){ return item });
      template = [];  
     
   }  

}  


function initMarkersCompany() {
    // for (var i = 0; i < autoescolas.length; i++) {
    //    addAutoMarker(autoescolas[i].nome, autoescolas[i].endereco);
    //}
    companies.forEach(item => newCompanyMarker(map, item));
    // newAutoMarker(map,auto[0].position, auto[0].nome);
}


function addPersonMarker(position) {
    parsePerson(map, position);
}

function addCompanyMarker(title, position) {
    parseCompany(map, position, title);
}

function showMarkers() {
    if (isMarker()) {
        setAllMarkers(map);
    } else {
        alert("erro");
    }
}

function hideMarkers() {
    if (isMarker()) {
        clearAllMarkers();
    } else {
        alert("erro");
    }
}

function showRoute() {
    if (isRoute()) {
        calcRoute(getServiceDirections(), getDisplayDirections());
        if (getDisplayDirections().getMap() == null) {
            getDisplayDirections().setMap(map);
        }
        clearAllMarkers();
    } else {
        alert("error");
    }
}

function hideRoute() {
    if (isRoute()) {
        hiddenRoute();
    } else {
        //alert("erro");
    }
}





