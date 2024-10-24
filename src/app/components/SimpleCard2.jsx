const { Grid, Card, CardContent, Typography } = require("@mui/material")

const SimpleCard2 = ({ title, children, sx, cardFullSize }) => {

    return (
        <Grid item xs={12} sx={sx}>
            <Card sx={{width: cardFullSize?'100%':'max-content'}}>
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