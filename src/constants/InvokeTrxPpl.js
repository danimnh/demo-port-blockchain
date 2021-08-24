import axios from "axios";

const InvokeTrxPpl = async (values, fcnName) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  console.log(values);
  let prevID = values.prevID;
  delete values["prevID"];

  let arrayValue = JSON.stringify(values);

  let newArgs = [arrayValue, prevID];

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
    args: newArgs,
  };
  console.log(body.args);
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

export default InvokeTrxPpl;
