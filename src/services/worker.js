import cloudStorage from './cloud-storage'

export async function uploadPicture(imageData) {
    let storageId = new Date().getTime().toString();

    let downloadURL = await cloudStorage.uploadBase64(
        imageData,
        storageId
    );

    return {
        storageId,
        downloadURL,
    }
}

export function initFB() {
    cloudStorage.initialize();
}

export async function deletePic(storageId) {
    await cloudStorage.deleteFromStorage(storageId)
}
