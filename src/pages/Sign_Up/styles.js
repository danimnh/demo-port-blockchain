import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "justify-content": "flex-start",
    "align-items": "center",
    height: "100%",
  },
  button: {
    width: "130px",
    margin: 10,
  },
  center: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  containerStep: {
    backgroundColor: "#fafafa",
  },
}));

export default useStyles;
