import axios from "axios";

const fetchDokumenByID = async (id) => {
  try {
    let config = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("token"),
      },
      params: {
        peer: "peer0.penangkar.example.com",
        fcn: "GetDokumenByID",
        args: '["' + id + '"]',
      },
    };
    console.log(config.params.args);
    const resp = await axios.get(
      "/sc/channels/mychannel/chaincodes/bcport_cc",
      config
    );
    return resp.data.result;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default fetchDokumenByID;
