import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  copyright: {
    "user-select": "none",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    // width: "300px",
    // "justify-content": "space-between",
    // marginTop: "20px",
    // height: `calc(100% - ${theme.mixins.toolbar.minHeight + 8}px)`,
  },
}));

export default useStyles;
