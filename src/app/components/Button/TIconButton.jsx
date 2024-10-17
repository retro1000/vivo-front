import { IconButton, Tooltip } from "@mui/material";
import React, { forwardRef } from "react";

const TIconButton = forwardRef(({ sx, key, title, color, size, variant, fun, icon: Icon, fun2 }, ref) => {
  return (
    <Tooltip key={key} title={title}>
      <IconButton
        ref={ref}  // Use the ref passed by forwardRef here
        onClick={fun}
        color={color}
        size={size}
        variant={variant}
        sx={sx}
      >
        <Icon />
      </IconButton>
    </Tooltip>
  );
});

export default TIconButton;
