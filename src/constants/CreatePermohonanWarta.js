import axios from "axios";

const CreatePermohonanWarta = async (values, fcnName) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  let prevID = values.prevID;
  delete values["prevID"];

  let arrayValue = [JSON.stringify(values)];
  let newArgs = [arrayValue, prevID];
  let body = {
    fcn: fcnName,
    peers: [
      "peer0.penangkar.example.com",
      "peer0.petani.example.com",
      "peer0.pengumpul.example.com",
      "peer0.pedagang.example.com",
    ],
    chaincodeName: "bcport_cc",
    channelName: "mychannel",
    args: newArgs,
  };
  try {
    console.log("values to be send");
    console.log(body);

    const respBM = await axios.post(
      "/sc/channels/mychannel/chaincodes/bcport_cc",
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

export default CreatePermohonanWarta;
