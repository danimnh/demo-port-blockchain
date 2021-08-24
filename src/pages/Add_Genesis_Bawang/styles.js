import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    "justify-content": "start",
    "align-items": "start",
    flexDirection: "column",
  },
  button: {
    width: "300px",
    marginBottom: 10,
  },
  confirm: {
    marginTop: 20,
  },
}));

export default useStyles;
