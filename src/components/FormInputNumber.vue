<template>
  <q-input
    v-model="num_model"
    :label="label_name"
    color="primary"
    label-color="primary"
    dense
    outlined
    type="number"
    :rules="value == 'age_model' ? rules_age : rules_num"
  ></q-input>
</template>

<script>
export default {
  props: ["model_num", "label_name", "value"],

  data() {
    return {
      num_model: "",

      rules_num: [
        (val) => !!val || 'Isi Dulu ya ..',
      ],

      rules_age: [
        (val) => !!val || 'Isi Dulu ya ..',
        (val) => val >= 25 || 'Umur harus lebih atau sama dengan 25 tahun',
      ],
    }
  },

  watch: {
    model_num: {
      immediate: true,
      deep: true,
      handler(model_num) {
        this.num_model = model_num;
      },
    },

    num_model: {
      immediate: true,
      deep: true,
      handler(num_model) {
        this.$emit("model-num", { data: num_model, value: this.value });
      },
    },
  }
}
</script>

<style>
</style>
