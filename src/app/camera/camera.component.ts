import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  camImage: string = '';
  showCam() {
    if (this.camImage.length > 0) {
      return true;
    } else {
      return;
    }
  }

  setOptions(srcType: any) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true,
    };
    return options;
  }

  openCamera() {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = this.setOptions(srcType);
    var func = this.createNewFileEntry;

    navigator.camera.getPicture(
      (imageUri) => {
        this.displayImage(imageUri);
        // You may choose to copy the picture, save it somewhere, or upload.
        func(imageUri);
      },
      function cameraError(error) {
        console.debug('Unable to obtain picture: ' + error, 'app');
      },
      options
    );
  }

  displayImage(imgUri: string) {
    this.camImage = 'data:image/jpeg;base64,' + imgUri;
  }

  getFileEntry(imgUri: string) {
    window.resolveLocalFileSystemURL(
      imgUri,
      function success(fileEntry) {
        // Do something with the FileEntry object, like write to it, upload it, etc.
        // writeFile(fileEntry, imgUri);
        console.log('got file: ' + fileEntry.fullPath);
        // displayFileData(fileEntry.nativeURL, "Native URL");
      },
      () => {
        // If don't get the FileEntry (which may happen when testing
        // on some emulators), copy to a new FileEntry.
        this.createNewFileEntry(imgUri);
      }
    );
  }

  createNewFileEntry(imgUri: string) {
    window.resolveLocalFileSystemURL(
      cordova.file.cacheDirectory,
      function success(dirEntry) {
        // JPEG file
        dirEntry.filesystem.root.getFile(
          'tempFile.jpeg',
          { create: true, exclusive: false },
          function (fileEntry) {
            // Do something with it, like write to it, upload it, etc.
            // writeFile(fileEntry, imgUri);
            console.log('got file: ' + fileEntry.fullPath);
            // displayFileData(fileEntry.fullPath, "File copied to");
          },
          function onErrorCreateFile() {
            alert('Could not create file');
          }
        );
      },
      function onErrorResolveUrl() {
        alert('Could not resolve url');
      }
    );
  }

  // takePicture() {
  //   navigator.camera.getPicture(this.onSuccess, this.onFail, {
  //     quality: 50,
  //     destinationType: Camera.DestinationType.DATA_URL,
  //     sourceType: Camera.PictureSourceType.CAMERA,
  //     encodingType: Camera.EncodingType.JPEG,
  //     mediaType: Camera.MediaType.PICTURE,
  //   });
  // }
  // onSuccess(imageData: any) {
  //   this.image = 'data:image/jpeg;base64,' + imageData;
  // }
  // onFail(err: string) {
  //   alert('Operation Failed' + err);
  // }
}
