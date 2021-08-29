import PermohonanFormFields from "../../Form_Models/PermohonanModel.js";
const {
  permohonanFields: { trayek, wartaType, noRPK },
} = PermohonanFormFields;

export default {
  [trayek.name]: "",
  [wartaType.name]: "",
  [noRPK.name]: "",
};
