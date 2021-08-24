import * as Yup from "yup";

import checkoutFormModel from "./checkoutFormModel";
const {
  formField: {
    nama,
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

export default [
  Yup.object().shape({
    [nama.name]: Yup.string()
      .min(5, `${nama.requiredErrorMsg}`)
      .required(`${nama.requiredErrorMsg}`),
    [username.name]: Yup.string().required(`${username.requiredErrorMsg}`),
    [password.name]: Yup.string()
      .required(`${password.requiredErrorMsg}`)
      .min(6, `${password.requiredErrorMsg}`),
    [noHP.name]: Yup.string()
      .matches(/^[0-9]+$/, `${noHP.invalidErrorMsg}`)
      .min(10, `${noHP.invalidErrorMsg}`)
      .max(13, `${noHP.invalidErrorMsg}`)
      .required(`${noHP.requiredErrorMsg}`),
    [ttl.name]: Yup.date()
      .typeError(`${ttl.requiredErrorMsg}`)
      .required(`${ttl.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [noKK.name]: Yup.string()
      .min(10, `${noKK.invalidErrorMsg}`)
      .max(17, `${noKK.invalidErrorMsg}`)
      .required(`${noKK.requiredErrorMsg}`),
    [noNPWP.name]: Yup.string()
      .min(15, `${noNPWP.invalidErrorMsg}`)
      .required(`${noNPWP.requiredErrorMsg}`),
    [nik.name]: Yup.string()
      .min(16, `${nik.invalidErrorMsg}`)
      .required(`${nik.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [orgName.name]: Yup.string().required(`${orgName.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [luasLahanHa.name]: Yup.string().required(
      `${luasLahanHa.requiredErrorMsg}`
    ),
    [alamatLahan.name]: Yup.string().required(
      `${alamatLahan.requiredErrorMsg}`
    ),
    [kelompokTani.name]: Yup.string().required(
      `${kelompokTani.requiredErrorMsg}`
    ),
  }),
  Yup.object().shape({
    [alamatToko.name]: Yup.string().required(`${alamatToko.requiredErrorMsg}`),
  }),
];
