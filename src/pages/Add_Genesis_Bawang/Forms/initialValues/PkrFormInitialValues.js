import PkrAddTrxFields from "../../Form_Models/PkrAddTrxModels.js";
const {
  formPkrFields: {
    varietas,
    kuantitasBenihKg,
    hargaBenihPerKg,
    umurBenih,
    umurPanen,
  },
} = PkrAddTrxFields;

export default {
  [varietas.name]: "",
  [kuantitasBenihKg.name]: "",
  [hargaBenihPerKg.name]: Number,
  [umurBenih.name]: "",
  [umurPanen.name]: "",
};
