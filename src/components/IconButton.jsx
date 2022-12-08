import { IconButton, Tooltip } from "@mui/material";

export default ({ icon, onClick, tooltip, color }) => {
  return (
    <Tooltip title={tooltip ?? ''}>
      <IconButton color={color ?? 'primary'} component="label" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
