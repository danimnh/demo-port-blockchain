import axios from "axios";

const AddBawangKuantitasByID = async (values, fcnName) => {
  let sendArgs = [values[1], values[0]];
  console.log(sendArgs);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  let body = {
    fcn: fcnName,
    peers: [
      "peer0.penangkar.example.com",
      "peer0.petani.example.com",
      "peer0.pengumpul.example.com",
      "peer0.pedagang.example.com",
    ],
    chaincodeName: "bawangmerah_cc",
    channelName: "mychannel",
    args: sendArgs,
  };
  console.log(body.args);
  try {
    const respBM = await axios.post(
      "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
      body,
      config
    );
    await alert("Transaksi berhasil disimpan");
    return respBM;
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

export default AddBawangKuantitasByID;
