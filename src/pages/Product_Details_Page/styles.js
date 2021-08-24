import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    "justify-content": "start",
    "align-items": "start",
    flexDirection: "column",
  },
  rowDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContainer: {
    width: "100%",
    overflow: "visible",
    marginTop: "20px",
  },
}));

export default useStyles;
