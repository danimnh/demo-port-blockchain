import checkoutFormModel from "./checkoutFormModel";
const {
  formField: {
    name,
    username,
    password,
    noHP,
    ttl,
    noKK,
    noNPWP,
    nik,
    orgName,
    luasLahanHa,
    alamatToko,
    alamatLahan,
    kelompokTani,
  },
} = checkoutFormModel;

export default {
  [name.name]: "",
  [username.name]: "",
  [password.name]: "",
  [noHP.name]: "",
  [ttl.name]: "",
  [noKK.name]: "",
  [noNPWP.name]: "",
  [nik.name]: "",
  [orgName.name]: "",
  [luasLahanHa.name]: "",
  [alamatToko.name]: "",
  [alamatLahan.name]: "",
  [kelompokTani.name]: "",
};
