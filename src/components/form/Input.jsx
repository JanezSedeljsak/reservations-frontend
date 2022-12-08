import { TextField, FormControl } from "@mui/material";

export default ({ reference, id, label, type, value }) => {  
  return (
    <FormControl sx={{ mx: 'auto', my: 2 }} fullWidth>
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
