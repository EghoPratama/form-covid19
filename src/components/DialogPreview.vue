<template>
  <q-dialog v-model="dialog_prev" persistent full-height>
    <q-card class="column full-height" style="width: 600px">
      <q-card-section>
        <div class="text-h6 text-center">Data Permohonan Bantuan Covid19</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 65vh" class="scroll">
        <p class="text-subtitle2 q-mb-sm">
          Nama :
          <span class="text-weight-regular">{{ saved_data.name }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">
          Nomor KTP :
          <span class="text-weight-regular">{{ saved_data.id }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">
          Nomor Kartu Keluarga :
          <span class="text-weight-regular">{{ saved_data.fam_id }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">Foto KTP :</p>
        <q-img :src="saved_data.id_photo" style="max-width: 300px; height: 150px;" fit="contain"></q-img>

        <p class="text-subtitle2 q-mb-sm">Foto Kartu Keluarga :</p>
        <q-img
          :src="saved_data.fam_id_photo"
          style="max-width: 300px; height: 150px;"
          fit="contain"
        ></q-img>

        <p class="text-subtitle2 q-mb-sm">
          Umur :
          <span class="text-weight-regular">{{ saved_data.age }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">
          Jenis Kelamin :
          <span class="text-weight-regular">{{ saved_data.gender }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">
          Provinsi :
          <span class="text-weight-regular">{{ saved_data.province }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">
          Kabupaten / Kota :
          <span class="text-weight-regular">{{ saved_data.regency }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">
          Kecamatan :
          <span class="text-weight-regular">{{ saved_data.district }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">
          Kelurahan / Desa :
          <span class="text-weight-regular">{{ saved_data.village }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">
          Alamat :
          <span class="text-weight-regular">{{ saved_data.address }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">
          RT :
          <span class="text-weight-regular">{{ saved_data.rt }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">
          RW :
          <span class="text-weight-regular">{{ saved_data.rw }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">
          Penghasilan Sebelum Pandemi :
          <span
            class="text-weight-regular"
          >{{ formatPrice(saved_data.income_before) }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">
          Penghasilan Setelan Pandemi :
          <span
            class="text-weight-regular"
          >{{ formatPrice(saved_data.income_after) }}</span>
        </p>

        <p class="text-subtitle2 q-mb-sm">
          Alasan Membutuhkan Bantuan :
          <span class="text-weight-regular">{{ saved_data.reason }}</span>
        </p>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-toggle
          v-model="accept_term"
          label="Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut."
        />
        <div class="text-center q-mt-sm">
          <q-btn label="Periksa Kembali" no-caps color="negative" @click="cancelDialog()" />
          <q-btn
            label="Kirimkan"
            color="positive"
            class="q-ml-xs"
            no-caps
            :loading="load_submit"
            @click="submitData()"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ["dialog", "data_saved"],

  data() {
    return {
      dialog_prev: false,
      accept_term: false,
      load_submit: false,
      saved_data: {},
    }
  },

  methods: {
    cancelDialog() {
      this.dialog_prev = false;
      this.$emit("dialog-prev", false);
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return "Rp" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    submitData() {
      if (!this.accept_term) {
        this.$q.notify({
          type: "negative",
          position: "top",
          message: `Kamu harus menyetujui pernyataan diatas!`,
        });
      } else {
        let num;
        this.load_submit = true;

        setTimeout(() => {
          num = Math.random();
          this.load_submit = false;
          this.dialog_prev = false;
          this.$emit("dialog-prev", false);
          this.accept_term = false;
        }, 1500);

        if (0.2 < num < 0.8) {
          this.$q.notify({
            type: "positive",
            position: "top",
            message: `Proses Pengiriman Data Berhasil`,
          });
          this.$router.go(0);
        } else {
          this.$q.notify({
            type: "negative",
            position: "top",
            message: `Proses Pengiriman Data Gagal`,
          });
        }
      }
    }
  },

  watch: {
    dialog: function (val) {
      this.dialog_prev = val;
    },

    data_saved: {
      immediate: true,
      deep: true,
      handler(data_saved) {
        this.saved_data = data_saved;
      }
    }
  }
}
</script>

<style>
</style>
