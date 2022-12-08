import { InputLabel, MenuItem, FormControl } from "@mui/material";
import Select from "@mui/material/Select";

export default ({ reference, id, label, value, options }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>Type</InputLabel>
      <Select
        labelId={id}
        label={label ?? id}
        inputRef={reference}
        defaultValue={value ?? options?.[0]?.id}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
