import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import React, { forwardRef } from "react";

const TIconButton = forwardRef(
  (
    {
      sx,
      key,
      title,
      color,
      size,
      variant,
      fun,
      icon: Icon,
      fun2,
      name,
      disabled,
      loading = false, // New loading prop
    },
    ref
  ) => {
    return disabled || loading ? (
      <span key={key} ref={ref}>
        <IconButton
          sx={{
            cursor: loading ? "wait" : "not-allowed",
            position: "relative",
            ...sx,
          }}
          color={color}
          variant={variant}
          size={size}
          onClick={!loading ? fun : undefined} // Prevent click during loading
          onMouseDown={!loading ? fun2 : undefined}
          name={name}
          disabled={true}
        >
          {loading ? (
            <CircularProgress
              size={21}
              sx={{
                color: color === "primary" ? "blue" : "grey",
                // position: "absolute",
                // top: "50%",
                // left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ) : (
            <Icon />
          )}
        </IconButton>
      </span>
    ) : (
      <Tooltip key={key} title={title} ref={ref}>
        <IconButton
          ref={ref}
          sx={{ cursor: "pointer", ...sx }}
          color={color}
          variant={variant}
          size={size}
          onClick={fun}
          onMouseDown={fun2}
          name={name}
          disabled={disabled}
        >
          <Icon />
        </IconButton>
      </Tooltip>
    );
  }
);

export default TIconButton;
