import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {

      public base64Image: string;
      constructor(public navCtrl: NavController, private camera: Camera, private base64ToGallery: Base64ToGallery) {}


       options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
        };

    takePicture()
    {

        this.camera.getPicture({
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            console.log(err);
        });
    }

    savePicture(){
      const options: CameraOptions = {
        quality: 100,
        allowEdit : true,
        sourceType: this.camera.DestinationType.DATA_URL,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }
}




