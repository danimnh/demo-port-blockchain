import axios from "axios";

const fetchAllGenesisUnconverted = async (props) => {
  console.log(props);
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
          '{\\"selector\\":{\\"usernamePenerima\\":\\"' +
          props +
          '\\", \\"isConfirmed\\":true, \\"kuantitasBawangKg\\":0, \\"isEmpty\\":false}}' +
          '"]',
      },
    };
    const resp = await axios.get(
      "/sc/channels/mychannel/chaincodes/bawangmerah_cc",
      config
    );

    return resp.data.result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default fetchAllGenesisUnconverted;
