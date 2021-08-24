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
  title: {
    fontWeight: "bold",
  },
  card: {
    marginTop: 20,
    width: "100%",
  },
  selected: {
    marginTop: 20,
    width: "100%",
    background: "#3f51b5",
    color: "white",
  },
}));

export default useStyles;
