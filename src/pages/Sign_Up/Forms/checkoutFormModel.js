export default {
  formId: "SignUpForm",
  formField: {
    nama: {
      name: "nama",
      label: "Nama",
      requiredErrorMsg: "Masukkan Nama Lengkap.",
    },
    username: {
      name: "username",
      label: "Username",
      requiredErrorMsg: "Masukkan Username.",
    },
    password: {
      name: "password",
      label: "Password",
      requiredErrorMsg: "Password harus lebih dari 6 karakter.",
    },
    noHP: {
      name: "noHP",
      label: "Nomor Handphone",
      requiredErrorMsg: "Masukkan Nomor HP Lengkap.",
      invalidErrorMsg: "Masukkan Nomor HP yang valid.",
    },
    ttl: {
      name: "ttl",
      label: "Tanggal Lahir (Hari/Bulan/Tahun)",
      requiredErrorMsg: "Masukkan Tanggal yang valid (DD/MM/YY).",
    },
    noKK: {
      name: "noKK",
      label: "Nomor Kartu Keluarga",
      requiredErrorMsg: "Masukkan Nomor Kartu Keluarga.",
      invalidErrorMsg: "Nomor Kartu Keluarga umumnya terdiri dari 10-16 digit.",
    },
    noNPWP: {
      name: "noNPWP",
      label: "Nomor NPWP",
      requiredErrorMsg: "Masukkan Nomor NPWP.",
      invalidErrorMsg: "Nomor NPWP umumnya terdiri dari 15 digit.",
    },
    nik: {
      name: "nik",
      label: "Nomor Induk Kependudukan",
      requiredErrorMsg: "Masukkan NIK.",
      invalidErrorMsg: "NIK umumnya terdiri dari 16 digit.",
    },
    orgName: {
      name: "orgName",
      label: "orgName",
      requiredErrorMsg: "orgName is required",
    },
    luasLahanHa: {
      name: "luasLahanHa",
      label: "Luas Lahan (dalam Hektar)",
      requiredErrorMsg: "Masukkan Luas Lahan (dalam Hektar)",
    },
    alamatToko: {
      name: "alamatToko",
      label: "Alamat Toko",
      requiredErrorMsg: "Masukkan Alamat Toko",
    },
    alamatLahan: {
      name: "alamatLahan",
      label: "Alamat Lahan",
      requiredErrorMsg: "Masukkan Alamat Lahan",
    },
    kelompokTani: {
      name: "kelompokTani",
      label: "Kelompok Tani",
      requiredErrorMsg: "Masukkan Nama Kelompok Tani",
    },
  },
};
