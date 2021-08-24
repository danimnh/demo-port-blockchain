import PplAddTrxFields from "../../Form_Models/PplAddTrxModels.js";
const {
  formPplFields: {
    usernamePenerima,
    kuantitasBawangKg,
    hargaBawangPerKg,
    teknikSorting,
    metodePengemasan,
  },
} = PplAddTrxFields;

export default {
  [usernamePenerima.name]: "",
  [kuantitasBawangKg.name]: "",
  [hargaBawangPerKg.name]: "",
  [teknikSorting.name]: "",
  [metodePengemasan.name]: "",
};
