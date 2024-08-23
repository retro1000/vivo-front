import { IconButton, Tooltip } from "@mui/material";

const TIconButton = ({ key, title, color, size, variant, fun, icon: Icon, ref, fun2 }) => {
    return(
        <Tooltip key={key} title={title} ref={ref}>
            <IconButton
                color={color}
                variant={variant}
                size={size}
                onClick={fun}
                onMouseDown={fun2}
            >
                <Icon />
            </IconButton>
        </Tooltip>
    )
}

export default TIconButton