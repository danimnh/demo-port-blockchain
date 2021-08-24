import PtnAddTrxFields from "../../Form_Models/PtnAddTrxModels.js";
const {
  formPtnFields: {
    usernamePenerima,
    kuantitasBawangKg,
    hargaBawangPerKg,
    ukuranUmbi,
    pupuk,
    pestisida,
    kadarAirPersen,
    perlakuan,
    produktivitas,
  },
} = PtnAddTrxFields;

export default {
  [usernamePenerima.name]: "",
  [kuantitasBawangKg.name]: "",
  [hargaBawangPerKg.name]: "",
  [ukuranUmbi.name]: "",
  [pupuk.name]: "",
  [pestisida.name]: "",
  [kadarAirPersen.name]: "",
  [perlakuan.name]: "",
  [produktivitas.name]: "",
};
