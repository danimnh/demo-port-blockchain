import PkrAddTrxFields from "../../Form_Models/PkrAddTrxModels.js";
const {
  formPkrFields: {
    usernamePenerima,
    alamatPengirim,
    alamatPenerima,
    kuantitas,
    harga,
    umurBenih,
    umurPanen,
    lamaPenyimpanan,
    varietas,
    hargaBenih,
  },
} = PkrAddTrxFields;

export default {
  [usernamePenerima.name]: "",
  [alamatPengirim.name]: "",
  [alamatPenerima.name]: "",
  [kuantitas.name]: "",
  [harga.name]: "",
  [umurBenih.name]: "",
  [umurPanen.name]: "",
  [lamaPenyimpanan.name]: "",
  [varietas.name]: "",
  [hargaBenih.name]: "",
};
