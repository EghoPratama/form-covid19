<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-dark">
        <q-card flat class="bg-dark my-card-login">
          <q-card-section>
            <p class="text-h5 text-white text-center">Form Permohonan Bantuan Pandemi Covid-19</p>

            <q-form @submit="saveData()">
              <q-card flat class="q-mt-md card-form">
                <q-card-section>
                  <FormInputText
                    :model_data="name_model"
                    :label_name="'Nama'"
                    :value="'name_model'"
                    @model-data="modelData"
                  />

                  <FormInputNumber
                    :model_num="id_model"
                    :label_name="'NIK'"
                    :value="'id_model'"
                    @model-num="modelNum"
                  />

                  <FormInputNumber
                    :model_num="fam_id_model"
                    :label_name="'Nomor Kartu Keluarga'"
                    :value="'fam_id_model'"
                    @model-num="modelNum"
                  />

                  <FormFile
                    :photo_file="id_photo"
                    :hint="'Foto KTP'"
                    :value="'id_photo'"
                    @fill-photo="fillPhoto"
                  />

                  <FormFile
                    :photo_file="fam_id_photo"
                    :hint="'Foto Kartu Keluarga'"
                    :value="'fam_id_photo'"
                    @fill-photo="fillPhoto"
                  />

                  <FormInputNumber
                    :model_num="age_model"
                    :label_name="'Umur'"
                    :value="'age_model'"
                    @model-num="modelNum"
                  />

                  <FormSelect
                    :model_select="gender_model"
                    :label_name="'Jenis Kelamin'"
                    :value="'gender'"
                    @form-select="formSelect"
                  />

                  <FormSelect
                    :model_select="province_model"
                    :label_name="'Provinsi'"
                    :value="'province'"
                    @form-select="formSelect"
                  />

                  <FormSelect
                    :model_select="regency_model"
                    :label_name="'Kabupaten / Kota'"
                    :value="'regency'"
                    @form-select="formSelect"
                  />

                  <FormSelect
                    :model_select="district_model"
                    :label_name="'Kecamatan'"
                    :value="'district'"
                    @form-select="formSelect"
                  />

                  <FormSelect
                    :model_select="village_model"
                    :label_name="'Kelurahan / Desa'"
                    :value="'village'"
                    @form-select="formSelect"
                  />

                  <FormInputText
                    :model_data="address_model"
                    :label_name="'Alamat'"
                    :value="'address_model'"
                    @model-data="modelData"
                  />

                  <FormInputText
                    :model_data="rt_model"
                    :label_name="'RT'"
                    :value="'rt_model'"
                    @model-data="modelData"
                  />

                  <FormInputText
                    :model_data="rw_model"
                    :label_name="'RW'"
                    :value="'rw_model'"
                    @model-data="modelData"
                  />

                  <FormInputNumber
                    :model_num="income_before"
                    :label_name="'Penghasilan Sebelum Pandemi'"
                    :value="'income_before'"
                    @model-num="modelNum"
                  />

                  <FormInputNumber
                    :model_num="income_after"
                    :label_name="'Penghasilan Setelah Pandemi'"
                    :value="'income_after'"
                    @model-num="modelNum"
                  />

                  <p
                    class="text-subtitle2 text-primary text-weight-regular"
                  >Alasan Membutuhkan Bantuan</p>
                  <q-option-group
                    :options="reason_option"
                    label="Notifications"
                    type="radio"
                    v-model="reason_model"
                    class="text-caption"
                  />

                  <FormInputText
                    v-if="reason_model == 'lainnya'"
                    :model_data="another_reason"
                    :label_name="'Lainnya'"
                    :value="'another_reason'"
                    @model-data="modelData"
                  />

                  <div class="text-center">
                    <q-btn
                      class="q-mt-sm"
                      color="positive"
                      label="Simpan"
                      no-caps
                      style="width:150px;max-width:100%;"
                      type="submit"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </q-form>
          </q-card-section>
        </q-card>

        <DialogPreview
          :dialog="dialog_preview"
          :data_saved="data_saved"
          @dialog-prev="dialogPrev"
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import FormSelect from "../components/FormSelect.vue";
import FormInputText from "../components/FormInputText.vue";
import FormInputNumber from "../components/FormInputNumber.vue";
import FormFile from "../components/FormFile.vue";
import DialogPreview from "../components/DialogPreview.vue";
export default {
  name: 'name-box',
  components: {
    FormSelect,
    FormInputText,
    FormInputNumber,
    FormFile,
    DialogPreview,
  },

  data() {
    return {
      name_model: '',
      id_model: null,
      fam_id_model: null,

      id_photo: null,
      id_photo_url: '',
      fam_id_photo: null,
      fam_id_photo_url: '',

      gender_model: '',
      province_model: '',
      regency_model: '',
      district_model: '',
      village_model: '',

      address_model: '',
      rt_model: '',
      rw_model: '',

      income_before: null,
      income_after: null,
      age_model: null,

      another_reason: '',
      reason_model: '',
      reason_option: [
        {
          label: "Kehilangan pekerjaan",
          value: "Kehilangan pekerjaan",
          color: "green",
          size: "25px",
        },
        {
          label: "Kepala keluarga terdampak atau korban Covid-19",
          value: "Kepala keluarga terdampak atau korban Covid-19",
          color: "green",
          size: "25px",
        },
        {
          label: "Tergolong fakir/miskin semenjak sebelum Covid-19",
          value: "Tergolong fakir/miskin semenjak sebelum Covid-19",
          color: "green",
          size: "25px",
        },
        {
          label: "Lainnya (jelaskan secara detail)",
          value: "lainnya",
          color: "green",
          size: "25px",
        },
      ],

      dialog_preview: false,
      data_saved: null,
    }
  },

  methods: {
    ...mapActions({
      get_province: "example/getProvince",
      get_regency: "example/getRegency",
      get_district: "example/getDistrict",
      get_village: "example/getVillage",
    }),

    dialogPrev(e) {
      this.dialog_preview = e;
    },

    fillPhoto(e) {
      if (e.value == "id_photo") {
        this.id_photo = e.data;
        this.id_photo_url = e.url;
      } else if (e.value == "fam_id_photo") {
        this.fam_id_photo = e.data;
        this.fam_id_photo_url = e.url;
      }
    },

    modelData(e) {
      if (e.value == "name_model") {
        this.name_model = e.data;
      } else if (e.value == "address_model") {
        this.address_model = e.data;
      } else if (e.value == "rt_model") {
        this.rt_model = e.data;
      } else if (e.value == "rw_model") {
        this.rw_model = e.data;
      } else if (e.value == "another_reason") {
        this.another_reason = e.data;
      }
    },

    modelNum(e) {
      if (e.value == "id_model") {
        this.id_model = e.data;
      } else if (e.value == "fam_id_model") {
        this.fam_id_model = e.data;
      } else if (e.value == "age_model") {
        this.age_model = e.data;
      } else if (e.value == "income_before") {
        this.income_before = e.data;
      } else if (e.value == "income_after") {
        this.income_after = e.data;
      }
    },

    formSelect(e) {
      if (e.type == "gender") {
        this.gender_model = {
          id: e.id,
          label: e.label,
        }
      } else if (e.type == "province") {
        this.province_model = {
          id: e.id,
          label: e.label,
        }

        this.regency_model = "";
        this.get_regency(e.id);
      } else if (e.type == "regency") {
        this.regency_model = {
          id: e.id,
          label: e.label,
        }

        this.district_model = "";
        this.get_district(e.id);
      } else if (e.type == "district") {
        this.district_model = {
          id: e.id,
          label: e.label,
        }

        this.village_model = "";
        this.get_village(e.id);
      } else if (e.type == "village") {
        this.village_model = {
          id: e.id,
          label: e.label,
        }
      }
    },

    saveData() {
      this.data_saved = {
        name: this.name_model,
        id: this.id_model,
        fam_id: this.fam_id_model,
        id_photo: this.id_photo_url,
        fam_id_photo: this.fam_id_photo_url,
        age: this.age_model,
        gender: this.gender_model ? this.gender_model.label : '',
        province: this.province_model ? this.province_model.label : '',
        regency: this.regency_model ? this.regency_model.label : '',
        district: this.district_model ? this.district_model.label : '',
        village: this.village_model ? this.village_model.label : '',
        address: this.address_model,
        rt: this.rt_model,
        rw: this.rw_model,
        income_before: this.income_before,
        income_after: this.income_after,
        reason: this.reason_model == 'lainnya' ? this.another_reason : this.reason_model,
      };

      this.dialog_preview = true;
    }
  },

  created() {
    this.get_province();
  }
}
</script>

<style>
.my-card-login {
  width: 100%;
  max-width: 600px;
}

.card-form {
  background: #ffffff;
  border-radius: 10px;
}
</style>
