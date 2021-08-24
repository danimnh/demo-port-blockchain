import axios from "axios";

const getUserAlamat = async (username) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    params: {
      fcn: "GetBawangForQuery",
      peers: ["peer0.penangkar.example.com"],
      chaincodeName: "bawangmerah_cc",
      channelName: "mychannel",
      args:
        '["' +
        '{\\"selector\\":{\\"username\\":\\"' +
        username +
        '\\"}}' +
        '"]',
    },
  };
  try {
    const resp = await axios.get(
      "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
      config
    );
    if (resp.data.result[0].Record.alamatLahan !== "")
      return resp.data.result[0].Record.alamatLahan;
    else return resp.data.result[0].Record.alamatToko;
  } catch (err) {
    console.log(err);
  }
};

export default getUserAlamat;
