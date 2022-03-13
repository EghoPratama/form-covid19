<template>
  <q-input
    v-model="data_model"
    :label="label_name"
    color="primary"
    label-color="primary"
    dense
    class="q-mt-sm"
    outlined
    :rules="[
      (val) => !!val || 'Isi Dulu ya ..',
      (val) => val.length < 255 || 'Maksimal 255 karakter'
    ]"
  >
    <template v-slot:append>
      <q-icon size="xs" color="brown" name="edit" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: ["model_data", "label_name", "value"],

  data() {
    return {
      data_model: "",
    }
  },

  watch: {
    model_data: {
      immediate: true,
      deep: true,
      handler(model_data) {
        this.data_model = model_data;
      },
    },

    data_model: {
      immediate: true,
      deep: true,
      handler(data_model) {
        this.$emit("model-data", { data: data_model, value: this.value });
      },
    },
  }
}
</script>

<style>
</style>
