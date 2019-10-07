<template>
  <q-page>
    <div class="row justify-center q-ma-md" v-for="(pic, idx) in pics" :key="idx">
      <div class="col">
        <q-card>
          <q-img spinner-color="white" :src="pic" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { EventBus } from "../services/event-bus";
import cordovaCamera from "../services/cordova-camera";
import cloudStorage from "../services/cloud-storage";

export default {
  name: "PageIndex",
  data() {
    return {
      pics: []
    };
  },
  mounted() {
    EventBus.$off("takePicture");
    EventBus.$on("takePicture", this.uploadImageFromCamera);
  },
  methods: {
    removeBase64Prefix(base64Str) {
      return base64Str.substr(base64Str.indexOf(",") + 1);
    },

    async uploadImageFromCamera() {
      const base64 = await cordovaCamera.getBase64FromCamera();
      const imageData = this.removeBase64Prefix(base64);
      const storageId = new Date().getTime().toString();
      const uploadedPic = await cloudStorage.uploadBase64(imageData, storageId);
      this.pics.push(uploadedPic);
    }
  }
};
</script>
