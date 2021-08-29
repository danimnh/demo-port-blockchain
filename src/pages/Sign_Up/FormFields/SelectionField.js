import React from "react";
// import { at } from "lodash";
import { useField } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

export default function InputField(props) {
  const {
    // errorText,
    ...rest
  } = props;
  const [field] = useField(props);

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-age-native-simple">Jenis Warta</InputLabel>
      <Select
        defaultValue=""
        // autoComplete="off"
        // variant="outlined"
        // error={meta.touched && meta.error && true}
        // helperText={_renderHelperText()}
        // style={{ minWidth: 320 }}
        {...field}
        {...rest}
      >
        <MenuItem value="Kedatangan">Kedatangan</MenuItem>
        <MenuItem value="Keberangkatan">Keberangkatan</MenuItem>
      </Select>
    </FormControl>
  );
}
