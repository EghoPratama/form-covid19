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
  >
    <template v-slot:append>
      <q-icon size="xs" color="brown" name="cloud_upload" />
    </template>
  </q-file>
</template>

<script>
export default {
  props: ["hint", "file"],

  data() {
    return {
      file_photo: null,
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
  },

  watch: {
    file_photo: {
      immediate: true,
      deep: true,
      handler(file_photo) {
        this.$emit('fill-photo', file_photo);
      }
    },
  },
}
</script>

<style>
</style>
