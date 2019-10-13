<template>
  <q-page class>
    <div class="q-pa-md">
      <div class="row justify-center q-ma-md" v-for="(pic, idx) in pics" :key="idx">
        <div class="col">
          <q-card v-if="pic">
            <q-img spinner-color="white" :src="pic.url">
              <div class="spinner-container" v-if="pic.uploading && !pic.failed">
                <q-spinner color="white" size="4em" />
              </div>
              <div class="spinner-container" v-if="pic.failed">
                <q-icon name="cloud_off" style="font-size: 48px;"></q-icon>
              </div>
            </q-img>
            <q-card-actions align="around">
              <q-btn flat round color="red" icon="favorite" @click="notifyNotImplemented()" />
              <q-btn flat round color="teal" icon="bookmark" @click="notifyNotImplemented()" />
              <q-btn
                flat
                round
                color="primary"
                icon="delete"
                @click="deletePic(idx)"
                :disable="pic.uploading"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

</style>

<script>
import store from "../services/store";
import { EventBus } from "../services/event-bus";
import imageUploader from "../services/image-uploader";

export default {
  name: "PageIndex",
  data() {
    return {
      state: store.state
    };
  },
  mounted() {
    EventBus.$off("takePicture");
    EventBus.$on("takePicture", this.uploadImageFromCamera);
  },
  computed: {
    pics() {
      return this.state.pics;
    }
  },
  methods: {
    notifyNotImplemented() {
      this.$q.notify({ message: "Not implemented yet :/" });
    },
    async deletePic(idx) {
      try {
        await store.deletePic(idx);
        this.$q.notify({ message: "Picture deleted." });
      } catch (err) {
        console.error(err);
        this.$q.notify({ message: "Delete failed. Check log." });
      }
    },
    async uploadImageFromCamera() {
      try {
        imageUploader.uploadImageFromCamera();
      } catch (err) {
        console.error("Uploading failed");
        console.dir(err);
        store.updatePicFailed(localPic);
        this.$q.notify({ message: "Uploading failed. Check log." });
      }
    }
  }
};
</script>
