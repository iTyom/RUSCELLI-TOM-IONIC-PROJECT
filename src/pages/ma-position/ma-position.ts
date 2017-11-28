import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

/**
 * Generated class for the MaPositionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ma-position',
  templateUrl: 'ma-position.html',
})

export class MaPositionPage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    start = 'chicago, il';
      end = 'chicago, il';
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer;
    location: any= {
        latitude:'',
        longitude:'',
        watchLat:'',
        watchLong:'',
            data: {
                latitude:'',
                longitude:'',
                watchLat:'', 
                watchLong:'',
            }
    };



  constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                private geolocation: Geolocation) {

      this.geolocation.getCurrentPosition().then((resp) => {
      this.location.latitude = "Latitude : " + resp.coords.latitude
      this.location.longitude = "Longitude : " + resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();

    watch.subscribe((data) => {
        this.location.watchLat = "Latitude : " + data.coords.latitude;
        this.location.watchLong = "Longitude : " + data.coords.longitude;
        console.log(this.location.watchLat);
        console.log(this.location.watchLong);
    });

}

 ionViewDidLoad() {
    console.log('ionViewDidLoad MaPositionPage');

    this.initMap();
  };

initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65},
      mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
            'styled_map']
        }
    });



    this.directionsDisplay.setMap(this.map);

  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }




 

}
