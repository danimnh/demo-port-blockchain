import axios from "axios";

const fetchAllAssets = async (username, trxType, isConfirmed) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("token"),
      },
      params: {
        peer: "peer0.penangkar.example.com",
        fcn: "GetBawangForQuery",
        args:
          '["' +
          '{\\"selector\\":{\\"username' +
          trxType +
          '\\":\\"' +
          username +
          '\\", \\"isConfirmed\\":' +
          isConfirmed +
          ',\\"kuantitasBawangKg\\":{\\"$gt\\":0}' +
          "}}" +
          '"]',
      },
    };
    console.log(config.params.args);
    const resp = await axios.get(
      "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
      config
    );

    // await setGenesisList(resp.data.result);
    return resp.data.result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default fetchAllAssets;
