import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { getActions as getSWActions } from "store/sw";

import "./global.css";

// axios.defaults.baseURL = "http://35.240.236.209:4000/";
axios.defaults.baseURL = "https://bm-network.rfq.my.id";

// TO-DO : updated defaults
// axios.defaults.baseURL = "https://be-blockchain.herokuapp.com/";

if (!document.ie) {
  // check for ie
  Promise.all([import("react"), import("react-dom"), import("App")]).then(
    ([{ default: React }, { default: ReactDOM }, { default: App }]) => {
      ReactDOM.render(<App />, document.getElementById("root"));
    }
  );

  serviceWorker.register({
    onSuccess: () => getSWActions().handleSuccess(),
    onUpdate: (reg) => getSWActions().handleUpdate(reg),
  });
}
