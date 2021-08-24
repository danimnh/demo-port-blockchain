import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  button: {
    width: "300px",
    marginTop: 10,
  },
  wrapper: {
    display: "flex",
    "user-select": "none",
    "align-items": ({ isSmallScreen }) =>
      isSmallScreen ? "center" : "initial",
    "text-align": "center",
  },
  icon: {
    width: "100%",
    height: "100%",
    color: theme.palette.secondary.main,
  },
  iconBox: {
    width: 50,
    "margin-right": 10,
  },
  title: {
    "font-weight": 100,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  contentHorizontal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    paddingTop: "4px",
    paddingRight: "10px",
    alignSelf: "center",
    height: "42px",
  },
  logoBigger: {
    alignSelf: "center",
    height: "60px",
  },
}));

export default useStyles;
