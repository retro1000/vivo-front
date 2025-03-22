import React from 'react';
import { useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom';

import { CircularProgress, Checkbox, MenuItem, InputLabel, Select, FormControl, Stack, Box, styled, Tabs, Tab, Typography, TextField, Button, Grid, Icon } from "@mui/material";
import { LoadingButton } from '@mui/lab';

import { ReactQuillEditior, FileUpload, MultiFileUpload, FormDialog, Breadcrumb, SimpleCard, CustomExpansionPanel, SearchableSelectMultiple, CustomVariationExpansionPanel, RuleGenerator } from "app/components";
// import { CustomExpansionPanel } from "app/components";

import { useNotistack } from 'app/hooks/useNotistack';
import { useBase64 } from 'app/hooks/useBase64';
import { useAxios } from 'app/hooks/useAxios';

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
  }
}));

const CreateDiscount = ({ update, id }) => {

    return (
        <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Product", path: "/Product/list" }, { name: `${update?'Update':'Create'}` }]} />
        </Box>

        <Stack spacing={3}>
          <Grid sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}} gap={'1.5em'}>
            <SimpleCard sx={{width: '75%'}} title="Create Discount">
              <RuleGenerator />
            </SimpleCard>
            
          </Grid>
          <Grid sx={{display: 'flex', gap: '0.5em', justifyContent: 'flex-end', flexWrap: 'wrap', width: '100%', top: '5em'}}>
            <Button color="primary" variant="outlined">Cancel</Button>
            <Button color="primary" variant="outlined">Preview</Button>
            <Button sx={{width: '100px'}} variant="contained" color="primary" startIcon={<Icon sx={{fontSize: '0.75em'}}>publish</Icon>}>Publish</Button>
            {/* <Button sx={{width: '100px'}} variant="contained" color="primary" startIcon={<Icon sx={{fontSize: '0.75em'}}>publish</Icon>} disabled={updateVariableAttributeList.length === 0} onClick={upsertProduct}>Publish</Button> */}
          </Grid>
        </Stack>
        </Container>
    );
}

export default CreateDiscount;