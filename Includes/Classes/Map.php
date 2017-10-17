<?php

namespace Includes\Classes;

class Map
{

    public static function setup()
    {
        // Mapss
        add_action( 'wp_footer', array('Map', 'render' ) );
    }

    // wp_footer action here instead of cluttering up the template.
    public static function render() {

        if( is_page('contact-us') )  {
            ?>

            <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAMhpBMrnA8vGvYFCe5BID6kDMVrzg_w20"></script>

            <script type="text/javascript">

                // Paddington Garden's javascript variables
                var paddingtonGardensTheme = { "templateURI" : '<?= LJS_URL ?>' };

                function initialize() {
                    var center = { lat: 51.500981, lng: -0.091577 },
                        styles = [
                             { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [ { "color": "#ce0538" }, { "gamma": "1.2" } ] },
                            { "featureType": "administrative.province", "elementType": "all", "stylers": [ { "visibility": "off" } ] },
                            { "featureType": "landscape", "elementType": "all", "stylers": [ { "saturation": -100 },
                            { "lightness": 65 },
                            { "visibility": "on" } ] },
                            { "featureType": "poi", "elementType": "all", "stylers": [ { "saturation": -100 },
                            { "lightness": 51 },
                            { "visibility": "simplified" } ] },
                            { "featureType": "poi", "elementType": "labels", "stylers": [ { "visibility": "off" } ] },
                            { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#7e7d92" } ] },
                            { "featureType": "road.highway", "elementType": "all", "stylers": [ { "saturation": -100 },
                            { "visibility": "simplified" } ] },
                            { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "saturation": "0" },
                            { "lightness": "30" },
                            { "color": "#393845" } ] },
                            { "featureType": "road.arterial", "elementType": "all", "stylers": [ { "saturation": -100 },
                            { "lightness": 30 },
                            { "visibility": "on" } ] },
                            { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [ { "color": "#393845" } ] },
                            { "featureType": "road.local", "elementType": "all", "stylers": [ { "saturation": -100 },
                            { "lightness": 40 },
                            { "visibility": "on" } ] },
                            { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [ { "color": "#393845" } ] },
                            { "featureType": "transit", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] },
                            { "featureType": "transit", "elementType": "labels.text", "stylers": [ { "saturation": "0" },
                            { "color": "#393845" } ] },
                            { "featureType": "water", "elementType": "geometry", "stylers": [ { "lightness": "0" },
                            { "saturation": "0" },
                            { "color": "#9b96a3" } ] },
                            { "featureType": "water", "elementType": "labels", "stylers": [ { "visibility": "on" },
                            { "lightness": "0" },
                            { "saturation": "0" },
                            { "color": "#393845" } ] }
                         ];

                    var map_properties = {
                        center: center,
                        zoom: 15,
                       //  mapTypeId: google.maps.MapTypeId.ROADMAP,
                        disableDefaultUI: true,
                        zoomControl: true,
                        scrollwheel: false,
                        styles: styles,
                        disableDoubleClickZoom: true,
                        backgroundColor: "#F7F2F9",
                    };

                    var map     = new google.maps.Map(document.getElementById( "map" ), map_properties ),
                        marker  = new google.maps.Marker( {
                            position: { lat: 51.500981, lng: -0.091577 },
                            map: map,
                            title: 'Paddington Gardens',
                            icon: paddingtonGardensTheme.templateURI + '/assets/media/icons/pin.png',
                        }),
                        center  = map.getCenter();

                    google.maps.event.addDomListener(window, 'resize', function () {
                        map.setCenter(center);
                    });

                }

                google.maps.event.addDomListener(window, 'load', initialize);

            </script>


            <?php
        }
    }

}
