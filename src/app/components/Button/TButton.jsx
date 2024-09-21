import { LoadingButton } from "@mui/lab";
import { Button, Tooltip } from "@mui/material";

const TButton = ({ key, style, sx, title, label, color, size, variant, startIcon: Icon, fun, fun2, disabled, loading }) => {
    return(
        <Tooltip key={key} title={title}>
            {loading?
                <LoadingButton
                    style={style}
                    sx={sx}
                    color={color}
                    variant={variant}
                    size={size}
                    startIcon={Icon}
                    onClick={fun}
                    onMouseDown={fun2}
                    disabled={disabled}
                    loading={loading}
                >
                    {label}
                </LoadingButton> :
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
            }
        </Tooltip>
    )
}

export default TButton