const { Grid, Card, CardContent, Typography } = require("@mui/material")

const SimpleCard2 = ({ title, children, sx }) => {

    return (
        <Grid item xs={12} sx={sx}>
            <Card>
              <CardContent>
                <Typography variant="h6">{title}</Typography>
                <br></br>
                {children}
              </CardContent>
            </Card>
        </Grid>
    )
}

export default SimpleCard2