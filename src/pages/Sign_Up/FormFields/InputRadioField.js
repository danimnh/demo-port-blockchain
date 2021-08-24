import React from "react";
import { at } from "lodash";
import { useField } from "formik";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";

export default function InputRadioField(props) {
  const {
    // errorText,
    ...rest
  } = props;
  const [field, meta] = useField(props);
  const [value] = React.useState("");

  function _renderHelperText() {
    const [touched, error] = at(meta, "touched", "error");
    if (touched && error) {
      return error;
    }
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{props.title}</FormLabel>
      <RadioGroup
        aria-label="memberType"
        name="memberType"
        value={value}
        {...field}
        {...rest}
        helpertext={_renderHelperText()}
      >
        <FormControlLabel
          value={props.values[0]}
          control={<Radio />}
          label={props.values[0]}
        />
        <FormControlLabel
          value={props.values[1]}
          control={<Radio />}
          label={props.values[1]}
        />
        <FormControlLabel
          value={props.values[2]}
          control={<Radio />}
          label={props.values[2]}
        />
      </RadioGroup>
    </FormControl>
  );
}
