import { Button, Tooltip } from "@mui/material";

const TButton = ({ key, style, sx, title, label, color, size, variant, startIcon: Icon, fun, fun2, disabled }) => {
    return(
        <Tooltip key={key} title={title}>
            <Button
                style={style}
                sx={sx}
                color={color}
                variant={variant}
                size={size}
                startIcon={Icon}
                onClick={fun}
                onMouseDown={fun2}
                disabled={disabled}
            >
                {label}
            </Button>
        </Tooltip>
    )
}

export default TButton