import { TextField, FormControl } from "@mui/material";

export default ({ reference, id, label, type, value, noMargin }) => {  
  return (
    <FormControl sx={{ mx: 'auto', my: noMargin ? 0 : 2 }} fullWidth>
      <TextField
        id={id}
        label={label ?? id}
        multiline={type === 'textarea'}
        rows={type === 'textarea' ? 4 : 1}
        type={type}
        variant="outlined"
        inputRef={reference}
        defaultValue={value}
      />
    </FormControl>
  );
};
