import * as firebase from "firebase/app";
import 'firebase/storage';
import firebaseConfig from './firebase-config';

async function uploadBase64(imageData, storageId) {
    return new Promise((resolve, reject) => {
        let uploadTask = firebase.storage().ref().child(storageId).putString(imageData, "base64");
        uploadTask.on(
            "state_changed",
            function (snapshot) {},
            function (error) {
                reject(error)
            },
            function () {
                uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(function (downloadURL) {
                        resolve(downloadURL);
                    });
            }
        );
    });
}

function initialize() {
    firebase.initializeApp(firebaseConfig.firebase) 
}

export default {
    uploadBase64,
    initialize
}