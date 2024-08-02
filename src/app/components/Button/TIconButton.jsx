import { IconButton, Tooltip } from "@mui/material";

const TIconButton = ({ key, title, color, size, variant, fun, icon: Icon }) => {
    return(
        <Tooltip key={key} title={title}>
            <IconButton
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