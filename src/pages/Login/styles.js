import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  button: {
    width: "300px",
    marginBottom: 10,
  },
  headline: {
    marginBottom: 20,
  },
}));

export default useStyles;
