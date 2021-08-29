import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import { TextField } from "@material-ui/core";

import InputAdornment from "@material-ui/core/InputAdornment";
export default function InputField(props) {
  const {
    // errorText,
    ...rest
  } = props;
  const [field, meta] = useField(props);

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }

  return (
    <>
      <TextField
        type="number"
        variant="outlined"
        autoComplete="off"
        error={meta.touched && meta.error && true}
        helperText={_renderHelperText()}
        InputProps={{
          endAdornment: <InputAdornment position="end">ton</InputAdornment>,
        }}
        {...field}
        {...rest}
      />
    </>
  );
}
