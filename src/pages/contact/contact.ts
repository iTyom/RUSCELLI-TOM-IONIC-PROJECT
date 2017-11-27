import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { VideoCapturePlus, VideoCapturePlusOptions, MediaFile } from '@ionic-native/video-capture-plus';
import { MediaCapture, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { LocalNotifications } from '@ionic-native/local-notifications';



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {
        app: any = {nom: String, version: Number, complement: String};
        public base64Image: string;
        videoUrl : String;


        constructor(public navCtrl: NavController, 
            private camera: Camera, 
            private base64ToGallery: Base64ToGallery, 
            private videoCapturePlus: VideoCapturePlus, 
            private mediaCapture: MediaCapture, 
            private localNotifications: LocalNotifications) {

                this.app.nom = "Application regroupant des fonctionnalités";
                this.app.version = 1.0;
                this.app.complement = "Tom Ruscelli";
        }


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

            this.app.base64Image = this.base64ToGallery;

            this.base64ToGallery.base64ToGallery(imageData, { prefix: '_img' }).then(
               res => {
                   this.doNotification();
                   console.log('Saved image to gallery ', res)
               },
               err => console.log('Error saving image to gallery ', err)
          );
        }, (err) => {
            console.log(err);
        });
    }

    takeVideo(){
        let options: CaptureImageOptions = { limit: 3 };
        this.mediaCapture.captureVideo(options)
          .then(
            (data: MediaFile[]) => {
              this.videoUrl = data[0].fullPath; // On recupère le chemin de la video
            },
            (err: CaptureError) => console.error(err)
          );
  }

  doNotification() {
            this.localNotifications.schedule({
            id : 1,
            title : 'Success',
            text : 'Notification',
            at : new Date(new Date().getTime() + 3600),
            data : {mydata : 'data'}
          });
        }
}




