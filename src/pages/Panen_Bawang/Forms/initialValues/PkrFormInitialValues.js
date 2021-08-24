import UpdateGenesisFields from "../../Form_Models/UpdateGenesisModels";
const {
  formUpdateFields: {
    kuantitasBawangKg,
    genesisID,
    ukuranUmbi,
    pestisida,
    kadarAirPersen,
    perlakuan,
    produktivitas,
  },
} = UpdateGenesisFields;

export default {
  [kuantitasBawangKg.name]: "",
  [genesisID.name]: "",
  [ukuranUmbi.name]: "",
  [pestisida.name]: "",
  [kadarAirPersen.name]: "",
  [perlakuan.name]: "",
  [produktivitas.name]: "",
};
