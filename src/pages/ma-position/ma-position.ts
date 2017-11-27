import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
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

    location: any= {
        latitude:'',
        longitude:'',
        gyroscope:'',
            data: {
                latitude:'',
                longitude:'',
                gyroscope:'',
            }
    };



  constructor(public navCtrl: NavController, 
                public navParams: NavParams, 
                private geolocation: Geolocation, private gyroscope: Gyroscope) {

    var locationWatch:any[];

      this.geolocation.getCurrentPosition().then((resp) => {
      this.location.latitude = resp.coords.latitude
      this.location.longitude = resp.coords.longitude
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();

        watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
         //data.coords.latitude
         //data.coords.longitude
    });
}

myGyroscope() {
    let options: GyroscopeOptions = {
     frequency: 1000
  };

  this.gyroscope.getCurrent(options)
    .then((orientation: GyroscopeOrientation) => {
       console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
     })
    .catch()


  this.gyroscope.watch()
     .subscribe((orientation: GyroscopeOrientation) => {
        console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);
     });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MaPositionPage');
  };

}
