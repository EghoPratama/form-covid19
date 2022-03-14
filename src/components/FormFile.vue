<template>
  <q-file
    v-model="file_photo"
    :label="hint"
    color="primary"
    label-color="primary"
    dense
    outlined
    clearable
    accept=".jpg, image/*"
    max-file-size="2048000"
    @rejected="handleFileUpload"
    :rules="[
      (val) => (val && val.length > 0) || val || 'Please upload file',
    ]"
    @update:model-value="createURLImage"
  >
    <template v-slot:append>
      <q-icon size="xs" color="brown" name="cloud_upload" />
    </template>
  </q-file>
</template>

<script>
export default {
  props: ["hint", "photo_file", "value"],

  data() {
    return {
      file_photo: null,
      url_photo: '',
    };
  },

  methods: {
    handleFileUpload() {
      this.$q.notify({
        type: "negative",
        position: "top",
        message: `Maaf, file tidak lolos validasi (harus berekstensi .jpg/.jpeg/.png dan maksimal ukuran 2MB`,
      });
    },

    createURLImage() {
      if (this.file_photo) {
        this.url_photo = URL.createObjectURL(this.file_photo);
      }
    }
  },

  watch: {
    photo_file: {
      immediate: true,
      deep: true,
      handler(photo_file) {
        this.file_photo = photo_file;
      },
    },

    file_photo: {
      immediate: true,
      deep: true,
      handler(file_photo) {
        this.$emit('fill-photo', { data: file_photo, value: this.value, url: this.url_photo });
      }
    },
  },
}
</script>

<style>
</style>
