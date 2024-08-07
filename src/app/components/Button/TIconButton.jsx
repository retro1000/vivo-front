import { IconButton, Tooltip } from "@mui/material";

const TIconButton = ({ sx, key, title, color, size, variant, fun, icon: Icon }) => {
    return(
        <Tooltip key={key} title={title}>
            <IconButton
                sx={sx}
                color={color}
                variant={variant}
                size={size}
                onClick={fun}
            >
                <Icon />
            </IconButton>
        </Tooltip>
    )
}

export default TIconButton