import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  imageUrl: any;

  setOptions(srcType: any) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      cameraDirection: Camera.Direction.BACK,
    };
    return options;
  }
  // open the camera
  openCamera() {
    var srcType = Camera.PictureSourceType.CAMERA;
    var options = this.setOptions(srcType);
    // var func = this.createNewFileEntry;

    navigator.camera.getPicture(
      (imageUri) => {
        this.displayImage(imageUri);
        // You may choose to copy the picture, save it somewhere, or upload.
        console.log(this.imageUrl);

        // func(imageUri);
      },
      function cameraError(error) {
        console.debug('Unable to obtain picture: ' + error, 'app');
      },
      options
    );
  }
  // display image
  displayImage(imgUri: any) {
    this.imageUrl = 'data:image/jpeg; base64,' + imgUri;
  }
  // get a file entry
  getFileEntry(imgUri: any) {
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
  // create the file entry
  createNewFileEntry(imgUri: any) {
    window.resolveLocalFileSystemURL(
      cordova.file.cacheDirectory,
      function success(dirEntry) {
        // JPEG file
        dirEntry.filesystem.root.getFile(
          'tempFile.jpeg',
          { create: true, exclusive: false },
          function (fileEntry: any) {
            // Do something with it, like write to it, upload it, etc.
            // writeFile(fileEntry, imgUri);
            console.log('got file: ' + fileEntry.fullPath);
            // displayFileData(fileEntry.fullPath, "File copied to");
          },
          function onErrorCreateFile() {
            alert('error creating file');
          }
        );
      },
      function onErrorResolveUrl() {
        alert('error resolving url');
      }
    );
  }
}
