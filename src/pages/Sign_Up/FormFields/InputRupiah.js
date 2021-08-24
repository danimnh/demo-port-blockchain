import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import { TextField } from "@material-ui/core";
import NumberFormat from "react-number-format";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      allowNegative={false}
      thousandSeparator={"."}
      decimalSeparator={","}
      prefix="Rp. "
    />
  );
}

export default function InputField(props) {
  const [field, meta] = useField(props);
  const [values, setValues] = React.useState({
    numberformat: "",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }
  return (
    <>
      <TextField
        {...props}
        variant="outlined"
        autoComplete="off"
        value={values.numberformat}
        onChange={handleChange}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        fullWidth
        error={meta.touched && meta.error && true}
        helperText={_renderHelperText()}
        {...field}
      />
    </>
  );
}
