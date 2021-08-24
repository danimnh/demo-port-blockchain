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
  timeline: {
    marginLeft: "-40px",
    // background: "red",
    // textAlign: "left",
    // height: `calc(100% - ${theme.mixins.toolbar.minHeight + 8}px)`,
  },
  cardTimeline: {
    marginBottom: "20px",
    width: "280px",
    marginTop: "-24px",
  },
  title: {
    fontWeight: "bold",
  },
}));

export default useStyles;
