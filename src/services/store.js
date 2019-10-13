import worker from "workerize-loader!./worker.js";

var store = {
    debug: true,
    state: {
        pics: [],
        uploading: false
    },
    initWorker() {
        this.state.workerInstance = worker();
        this.state.workerInstance.initFB();
    },
    async loadPictures() {
        if (this.debug) console.log("loadPictures triggered")
        let picsJson = await localStorage.getItem("pics");
        if (!picsJson) this.state.pics = [];
        else this.state.pics = JSON.parse(picsJson);
        this.state.pics = this.state.pics.filter(pic => !pic.uploading)
    },
    async addPic(pic) {
        if (this.debug) console.log("addPic triggered with", pic)

        pic.failed = false;
        this.state.pics.splice(0, 0, pic);
        localStorage.setItem("pics", JSON.stringify(this.state.pics));
    },
    async deletePic(idx) {
        if (this.debug) console.log("deletePic triggered with", idx)

        this.state.pics[idx].uploading = true;

        if (this.state.pics[idx].storageId) {
            await this.state.workerInstance.deletePic(this.state.pics[idx].storageId)
        }
        this.state.pics.splice(idx, 1);
        localStorage.setItem("pics", JSON.stringify(this.state.pics));
    },
    async updatePicUploaded(oldPic, newPic) {
        if (this.debug) console.log("updatePicUploaded triggered with", oldPic, newPic)

        oldPic.uploading = false
        oldPic.url = newPic.downloadURL
        oldPic.storageId = newPic.storageId
        oldPic.width = newPic.width
        oldPic.height = newPic.height

        localStorage.setItem("pics", JSON.stringify(this.state.pics));
    },
    async updatePicFailed(pic) {
        if (this.debug) console.log("updatePicFailed triggered with", pic)

        pic.failed = true
    },
}

export default {
    ...store
}