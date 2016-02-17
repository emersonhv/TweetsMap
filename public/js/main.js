/**
 * Created by Emerson on 30/01/2016.
 */
var data;
var markers = [];
var markers_manage = [];
(function(){
    angular.module('myApp',[]).controller('GeoTweetsCtrl',['$scope','$http',function($scope, $http){
        $scope.datos;
        $scope.radio = 100000;

        var fecha = new Date();
        $scope.fecha_max = fecha.getFullYear()+"-"+("0"+fecha.getMonth()).slice(-2)+"-"+("0"+fecha.getDate()).slice(-2);
        fecha.setDate(fecha.getDate() - 6);
        $scope.fecha_min = fecha.getFullYear()+"-"+("0"+fecha.getMonth()).slice(-2)+"-"+("0"+fecha.getDate()).slice(-2);

        var mapOptions = {
            center: new google.maps.LatLng(4.854338411104777,-73.7061201875),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            mapTypeControl: true,
            streetViewControl: true
        };

        var map = new google.maps.Map(document.getElementById("mapa_div"),mapOptions);

        var cityCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: map,
            center: new google.maps.LatLng(4.854338411104777,-73.7061201875),
            radius: 1000
        });
        //console.log(cityCircle);

        var m_draggable = new google.maps.Marker({
            position: new google.maps.LatLng(4.854338411104777,-73.7061201875),
            draggable: true,
            map: map,
            title:'Marcador Raiz'
        });

        google.maps.event.addListener(m_draggable, 'drag', function(){
            $scope.changePosition(m_draggable);
        });

        $scope.changePosition = function(marker) {
            var markerLatLng = marker.getPosition();
            $scope.latlon = markerLatLng.lat()+','+markerLatLng.lng();
            cityCircle.bindTo('center', marker, 'position');
        }

        $scope.changeRadius = function(){
            cityCircle.setRadius(parseInt($scope.radio));//console.log(cityCircle);
        }

        /*google.maps.event.addListener(m_draggable, 'click', function(){
         $scope.changeRadius(m_draggable);
         });

         $scope.changeRadius = function(marker) {
         var markerLatLng = marker.getPosition();
         console.log(markerLatLng.lat()+', '+markerLatLng.lng());
         cityCircle.setRadius(parseInt($scope.radio));//console.log(cityCircle);
         }*/ // CODIGO PARA CAMBIAR RADIO DE CIRCULO CON GOOGLE MAPS HACIENDO CLICK EN MARCARDOR

        $scope.sendForm = function (){

            var dataSearch = {"busqueda":$scope.busqueda, "latlon":$scope.latlon, "until":$scope.fecha_lim, "radio":$scope.radio};
            $http.post("/tweets",dataSearch).success(function(response){
                $scope.datos = response;
                data = response;
                console.log(data);
                for(i = 0; i<data.statuses.length; i++) {
                    //if(_.has(data.statuses[i].entities,"media")){
                    var contenido = data.statuses[i].user.name;
                    var icono = "";
                    if(_.has(data.statuses[i].entities,"media")){
                        contenido = data.statuses[i].user.name+"<br>"+
                            "<img src='"+data.statuses[i].entities.media[0].media_url+"' class='image-entities'/>";
                        //console.log(data.statuses[i].entities.media[0].media_url);
                        icono = "photo.png";
                    }else{
                        contenido = data.statuses[i].user.name+"<br>"+"<p class='format-text'>"+data.statuses[i].text+"</p>";
                        icono = "comment.png";
                    }
                    markers.push([
                        contenido,
                        data.statuses[i].geo.coordinates[0],
                        data.statuses[i].geo.coordinates[1],
                        data.statuses[i].user.profile_image_url,
                        icono
                    ]);
                    //}
                }

                inicializar_mapa(map);
            });
        }

    }]);
})();

function inicializar_mapa(map) {

    var infowindow = new google.maps.InfoWindow(), marker, i;

    for (i = 0; i < markers.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(markers[i][1], markers[i][2]),
            map: map,
            //icon: "twitter2.png"
            icon: markers[i][4]
        });
        console.log(markers[i][3]);
        markers_manage.push(marker);

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(markers[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}

function deleteMarkers(){
    if(markers_manage.length != 0){
        for (i = 0; i < markers_manage.length; i++) {
            markers_manage[i].setMap(null);
        }
    }
    markers_manage = [];
    markers = [];
}
