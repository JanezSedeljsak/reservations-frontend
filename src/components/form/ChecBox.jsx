import { Checkbox, FormControl, FormControlLabel } from "@mui/material";

export default ({ reference, id, label, value, disabled }) => {
  return (
    <FormControl sx={{ mx: "auto", my: 2 }}>
      <FormControlLabel
        control={
          <Checkbox
            id={id}
            inputRef={reference}
            defaultChecked={value}
            disabled={disabled}
          />
        }
        label={label ?? id}
      />
    </FormControl>
  );
};
