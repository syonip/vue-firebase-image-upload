import store from "./store";
import cordovaCamera from "./cordova-camera";
import imageOps from "./image-ops";
import config from "./config";


async function uploadImageFromCamera() {
    let base64 = await cordovaCamera.getBase64FromCamera();

    let imageData = imageOps.removeBase64Prefix(base64);

    let thumbnailImageData = await imageOps.generateThumbnail(
        imageData,
        config.photos.thumbnailMaxWidth
    );

    let localPic = {
        url: imageOps.addBase64Prefix(thumbnailImageData),
        uploading: true
    };
    store.addPic(localPic);

    let uploadedPic = await store.state.workerInstance.uploadPicture(
        imageData
    );
    store.updatePicUploaded(localPic, uploadedPic);
}

export default {
    uploadImageFromCamera
}