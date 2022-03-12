<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-dark">
        <q-card flat class="bg-dark my-card-login">
          <q-card-section>
            <p class="text-h5 text-white text-center">Form Bantuan Pandemi Covid-19</p>

            <q-form>
              <q-card flat class="q-mt-md card-form">
                <q-card-section>
                  <q-input
                    v-model="name_model"
                    label="Nama"
                    color="primary"
                    label-color="primary"
                    dense
                    class="q-mt-sm"
                    outlined
                    :rules="[
                      (val) => !!val || 'Isi Dulu ya ..',
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon size="xs" color="brown" name="edit" />
                    </template>
                  </q-input>

                  <q-input
                    v-model="id_model"
                    label="NIK"
                    color="primary"
                    label-color="primary"
                    dense
                    outlined
                    type="number"
                    :rules="[
                      (val) => !!val || 'Isi Dulu ya ..',
                    ]"
                  ></q-input>

                  <q-input
                    v-model="fam_id_model"
                    label="Nomor Kartu Keluarga"
                    color="primary"
                    label-color="primary"
                    dense
                    outlined
                    type="number"
                    :rules="[
                      (val) => !!val || 'Isi Dulu ya ..',
                    ]"
                  ></q-input>

                  <q-file
                    v-model="id_photo"
                    label="Foto KTP"
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
                      <q-icon size="xs" color="brown" name="attach_file" />
                    </template>
                  </q-file>

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
                </q-card-section>
              </q-card>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
import FormSelect from "../components/FormSelect.vue";
export default {
  name: 'name-box',
  components: {
    FormSelect
  },

  data() {
    return {
      name_model: '',
      id_model: null,
      fam_id_model: null,

      id_photo: null,
      fam_id_photo: null,

      gender_model: '',
      province_model: '',
      regency_model: '',
      district_model: '',
      village_model: '',
    }
  },

  methods: {
    ...mapActions({
      get_province: "example/getProvince",
      get_regency: "example/getRegency",
      get_district: "example/getDistrict",
      get_village: "example/getVillage",
    }),

    handleFileUpload() {
      this.$q.notify({
        type: "negative",
        position: "top",
        message: `Maaf, file tidak lolos validasi (harus berekstensi .jpg/.jpeg/.png dan maksimal ukuran 2MB`,
      });
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
