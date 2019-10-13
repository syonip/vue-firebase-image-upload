import config from "./config";

async function getCameraFileObject() {
  return new Promise((resolve, reject) => {

    let camera = navigator.camera;

    const options = {
      quality: 50,
      destinationType: camera.DestinationType.FILE_URI,
      encodingType: camera.EncodingType.JPG,
      mediaType: camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
      correctOrientation: true,
      targetWidth: config.photos.maxWidth
    };

    camera.getPicture(imageURI => {
      window.resolveLocalFileSystemURL(imageURI,
        function (fileEntry) {
          fileEntry.file(
            function (fileObject) {
              resolve(fileObject)
            },
            function (err) {
              console.error(err);
              reject(err);
            }
          );
        },
        function () { }
      );
    },
      console.error,
      options
    );
  })

}

async function getBase64FromFileObject(fileObject) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.onloadend = function (evt) {
      var image = new Image()
      image.onload = function (e) {
        resolve(evt.target.result)
      }
      image.src = evt.target.result
    }
    reader.readAsDataURL(fileObject)
  })
}

async function getBase64FromCamera() {
  let fileObject = await getCameraFileObject();
  let base64 = await getBase64FromFileObject(fileObject);
  return base64;
}

export default {
  getBase64FromCamera
}