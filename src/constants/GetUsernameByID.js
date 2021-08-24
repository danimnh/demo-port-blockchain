import axios from "axios";

const GetUsernameByID = async (username, orgName) => {
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
        '\\", \\"orgName\\":\\"' +
        orgName +
        '\\"}}' +
        '"]',
    },
  };

  try {
    const resp = await axios.get(
      "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
      config
    );
    console.log(resp);
    if (resp.data.result.length !== "0") {
      return resp.data.result[0];
    } else return "error";
  } catch (err) {
    console.log(err);
  }
};

export default GetUsernameByID;
