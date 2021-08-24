import axios from "axios";

const CreateBenih = async (values, fcnName, username) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  values.usernamePengirim = username;
  let arrayValue = [JSON.stringify(values)];
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
    args: arrayValue,
  };
  console.log(body);
  try {
    const respBM = await axios.post(
      "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
      body,
      config
    );
    if (respBM.data.result.result.txid !== "") {
      return respBM.data.result.result.txid;
    }
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

export default CreateBenih;
