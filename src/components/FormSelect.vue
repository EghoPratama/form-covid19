<template>
  <q-select
    v-model="select_model"
    :options="value == 'province'
                ? opt_province
                : value == 'regency'
                  ? opt_regency
                  : value == 'district'
                    ? opt_district
                    : value == 'village'
                      ? opt_village
                      : value == 'gender'
                        ? opt_gender
                        : ''"
    use-input
    fill-input
    hide-selected
    label-color="primary"
    dense
    outlined
    class="q-mt-xs"
    :label="label_name"
    :rules="[(val) => (val && val.length > 0) || val || 'Pilih dulu ya']"
    @update:model-value="setSelectValue"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">Tidak ada hasil</q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["model_select", "label_name", "value"],

  data() {
    return {
      select_model: null,
    }
  },

  methods: {
    setSelectValue() {
      if (this.value == "gender") {
        this.$emit("form-select", {
          id: this.select_model.id,
          label: this.select_model.label,
          value: this.select_model.value,
          type: "gender",
        });
      } else if (this.value == "province") {
        this.$emit("form-select", {
          id: this.select_model.id,
          label: this.select_model.label,
          type: "province",
        });
      } else if (this.value == "regency") {
        this.$emit("form-select", {
          id: this.select_model.id,
          label: this.select_model.label,
          type: "regency",
        });
      } else if (this.value == "district") {
        this.$emit("form-select", {
          id: this.select_model.id,
          label: this.select_model.label,
          type: "district",
        });
      } else if (this.value == "village") {
        this.$emit("form-select", {
          id: this.select_model.id,
          label: this.select_model.label,
          type: "village",
        });
      }
    }
  },

  computed: {
    ...mapGetters({
      opt_province: "example/setProvince",
      opt_regency: "example/setRegency",
      opt_district: "example/setDistrict",
      opt_village: "example/setVillage",
      opt_gender: "example/setGender",
    })
  },

  watch: {
    model_select: {
      immediate: true,
      deep: true,
      handler(model_select) {
        this.select_model = model_select;
      }
    }
  }
}
</script>

<style>
</style>
