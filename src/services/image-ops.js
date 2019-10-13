
import loadImage from 'blueimp-load-image'

const base64JpegPrefix = "data:image/jpeg;base64,";

function removeBase64Prefix(base64Str) {
    return base64Str.substr(base64Str.indexOf(",") + 1);
}

function addBase64Prefix(imageData) {
    return base64JpegPrefix + imageData
}

async function generateThumbnail(imageData, maxWidth) {
    return new Promise(async resolve => {
        let url = base64JpegPrefix + imageData
        let res = await fetch(url)
        let blob = await res.blob()

        loadImage(
            blob,
            (canvas) => {
                let dataURL = canvas.toDataURL('image/jpeg');
                resolve(removeBase64Prefix(dataURL));
            }, {
                maxWidth: maxWidth,
                canvas: true
            }
        );
    });
}


export default {
    removeBase64Prefix,
    generateThumbnail,
    addBase64Prefix,
};
