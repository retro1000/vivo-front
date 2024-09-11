import { IconButton, Tooltip } from "@mui/material";

const TIconButton = ({ sx, key, title, color, size, variant, fun, icon: Icon, ref, fun2, name, disabled }) => {
    return(
        disabled?
            <span key={key} ref={ref}>
                <IconButton
                    sx={{cursor: 'pointer', ...sx}}
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
            </span> :
            <Tooltip key={key} title={title} ref={ref}>
                <IconButton
                    sx={{cursor: 'pointer', ...sx}}
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
    )
}

export default TIconButton