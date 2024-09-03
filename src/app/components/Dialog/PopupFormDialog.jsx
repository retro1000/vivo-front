import { useState } from "react";
import {
  styled,
  Stack,
  Box,
  Radio,
  FormControlLabel,
  RadioGroup,
  Grid,
  Select,
  MenuItem,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";

import moment from "moment";

import {
  MuiTable,
  SearchableSelectMultiple,
  FileUpload,
  NumberFormatField,
  SearchSelectAdd,
} from "..";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import AddIcon from "@mui/icons-material/Add";
import MinusIcon from "@mui/icons-material/Remove";
import { useEffect } from "react";

const AccordionRoot = styled("div")(({ theme }) => ({
  width: "100%",
  "& .heading": {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

let f_index = 0;

const createFormFields = (fields, submit) => {
  return fields.map((field, index) => {
    const labelComponent = (
      <div style={{ display: "flex", gap: "0.2em" }}>
        <Typography variant="body2" color="#363636">{field.label}</Typography>
        {field.required ? <Typography color="red">*</Typography> : ""}
      </div>
    );

    switch (field.type) {
      case "text":
      case "email":
      case "password":
        return (
          <Stack
            display="flex"
            gap="0.5em"
            sx={field.sx || { maxWidth: "350px", minWidth: "200px", width: "30%" }}
          >
            {labelComponent}
            <TextField
              value={field.value}
              onChange={(event) => field.setValue(event.target.value)}
              placeholder={field.placeholder}
              type={field.type}
              sx={{ width: "100%", mt: -1 }}
              rows={field.rows || 1}
              multiline={field.rows || false}
            />
          </Stack>
        );
      case "file":
        return (
          <Stack display="flex" gap="0.5em" sx={field.sx}>
            {labelComponent}
            <FileUpload
              close={field.close}
              id={`${field.id}-input-${index}`}
              required={field.required}
              file={field.value || ""}
              setFile={(val) => {
                const updatedValues = { ...field.value, [field.id]: val };
                field.setValue(updatedValues);
              }}
            />
          </Stack>
        );
      case "number":
        return (
          <Stack
            display="flex"
            gap="0.5em"
            sx={field.sx || { maxWidth: "200px", minWidth: "150px", width: "20%" }}
          >
            {labelComponent}
            <NumberFormatField
              inputProps={{
                id: `${field.id}-input-${index}`,
                placeholder: `${field.placeholder}`,
                type: "number",
                inputProps: {
                  "aria-label": `${field.id}-input-${index}`,
                  step: "any",
                  inputMode: "decimal",
                },
              }}
              sx={{mt: -1}}
              allowNegative={field.allowNegative || false}
              decimalScale={field.decimalScale || 3}
              fixedDecimalScale={field.fixedDecimalScale || false}
              value={field.value}
              min={field.min}
              max={field.max}
              onChange={(event) => field.setValue(event.target.value)}
            />
          </Stack>
        );
      case "tel":
        return (
          <Stack
            display="flex"
            gap="0.4em"
            sx={field.sx || { maxWidth: "280px", minWidth: "250px", width: "20%" }}
          >
            {labelComponent}
            <PhoneInput
              containerStyle={field.sx || { maxWidth: "280px", minWidth: "250px", width: "20%" }}
              inputStyle={field.sx || { maxWidth: "280px", minWidth: "250px", width: "20%" }}
              country={"lk"}
              value={field.value}
              onChange={(value) => field.setValue(value)}
              inputComponent={TextField}
              inputProps={{ variant: "outlined" }}
            />
          </Stack>
        );
      case "radio":
        return (
          <Stack display="flex" gap="0.5em" sx={{ marginTop: "1.7em" }}>
            {labelComponent}
            <RadioGroup
              aria-labelledby={`${field.id}-radio-input-${index}`}
              name="radio-buttons-group"
              row
              defaultValue={field.options[0].value}
              onChange={(event, val) => field.setValue(val)}
            >
              {field.options.map((option) => (
                <FormControlLabel
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </Stack>
        );
      case "select":
        return (
          <div style={{ width: `${field.break ? "100%" : "max-content"}` }}>
            <Stack
              display="flex"
              gap="0.5em"
              sx={{ width: "40%", maxWidth: "250px", minWidth: "200px", ...field.sx }}
            >
              {labelComponent}
              <Select
                sx={{mt: -1}}
                key={`select-${field.id}-${index}`}
                id={`select-${field.id}-${index}`}
                value={field.value}
                size="small"
                onChange={(event) => field.setValue(event.target.value)}
              >
                {field.options.map((option) => (
                  <MenuItem value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
            </Stack>
          </div>
        );
      case "multi_select":
        return (
          <Stack display="flex" gap="0.5em" sx={field.sx || { width: "80%" }}>
            {labelComponent}
            <SearchableSelectMultiple
              size={"medium"}
              key={`select-${field.id}-${index}`}
              id={`select-${field.id}-${index}`}
              multiple={field.multi}
              options={field.options}
              setSelectedValues={(val) => field.setValue(val)}
              selectedValues={field.value}
            />
          </Stack>
        );
      case "date":
        return (
          <Stack display="flex" gap="0.5em" sx={field.sx || { width: "30%" }}>
            {labelComponent}
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                key={`select-${field.id}-${index}`}
                id={`select-${field.id}-${index}`}
                value={field.value ? moment(field.value) : null}
                onChange={(val) => field.setValue(moment(val))}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
        );
      case "list":
        return (
          <Stack display="flex" gap="0.5em" sx={field.sx || { width: "100%" }}>
            {labelComponent}
            <MuiTable
              search={false}
              download={false}
              print={false}
              dataTableData={field.value}
              columns={field.col}
              filter={false}
              cols={false}
              pagination={false}
              selectableRows={false}
            />
          </Stack>
        );
      case "free_solo":
        return (
          <Stack display="flex" gap="0.1em" sx={field.sx || { width: "100%" }}>
            {labelComponent}
            <SearchSelectAdd
              key={`select-free-solo-${field.id}-${index}`}
              id={`select-free-solo-${field.id}-${index}`}
              options={field.options}
              value={field.value}
              onChange={(event, val) => field.setValue(val)}
              multi={field.multi}
              placeholder={field.placeholder}
            />
          </Stack>
        );
      default:
        return "";
    }
  });
};


const formMaxHeight = 500;

export default function PopupFormDialog({
  popupSx = "md",
  open,
  titleIcon: TitleIcon,
  title,
  setOpen,
  message,
  fields,
  submitButton,
  reasonCloseOn = false,
  setValues,
  submit
}) {

  const [expand, setExpand] = useState([]);

  useEffect(() => {
    // console.log(fields.map((f, index)=>(index!==0)))
    setExpand(fields.map((f, index) => index === 0));
  }, []);

  const handleClose = (event, reason) => {
    if (
      !reasonCloseOn ||
      (reason !== "backdropClick" && reason !== "escapeKeyDown")
    ) {
      setOpen(false);
      setValues({});
      setExpand([]);
    }
  };

  const handleAccordionClick = (i) => {
    setExpand(expand.map((e, index) => (i === index ? !e : e)));
  };

  const handleSubmit = () => {
    submit();
    setOpen(false);
    setValues({})
  };

  return (
    <Box>
      <Dialog
        sx={{ "& .MuiPaper-root": { borderRadius: "10px" } }}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth={popupSx}
        fullWidth={true}
      >
        <DialogTitle
          id="form-dialog-title"
          sx={{ borderBottom: "1px solid silver" }}
        >
          {TitleIcon ? (
            <Grid
              marginLeft={"-18px"}
              display={"flex"}
              gap={"0.5em"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              {TitleIcon}
              <Typography variant="h6" sx={{ color: "gray" }}>
                {title}
              </Typography>
            </Grid>
          ) : (
            <Typography
              marginLeft={"-18px"}
              variant="h6"
              sx={{ color: "gray" }}
            >
              {title}
            </Typography>
          )}
        </DialogTitle>

        <DialogContent
          fullWidth={true}
          sx={{ overflowY: "scroll", maxHeight: "500px" }}
        >
          {/* <DialogContentText sx={{marginBottom: '1.2em'}}>
            {message ? message : ''}
          </DialogContentText> */}
          <br></br>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              width: "100%",
              flexWrap: "wrap",
            }}
            spacing={3}
            gap={3}
          >
            {fields && fields.length > 0
              ? fields.map((field, index) => (
                  <AccordionRoot key={field.title}>
                    {index === 0 ? "" : <br></br>}
                    <Accordion
                      sx={{ padding: "none", boxShadow: "none" }}
                      defaultExpanded={index === 0}
                    >
                      <AccordionSummary
                        style={{
                          padding: "0",
                          borderBottom: "0.1em solid gray",
                          minHeight: "0",
                          height: "25px",
                          color: "gray",
                          fontSize: "1.1em",
                        }}
                        expandIcon={(() => {
                          return !expand[index] ? (
                            <MinusIcon sx={{ color: "gray" }} />
                          ) : (
                            <AddIcon sx={{ color: "gray" }} />
                          );
                        })()}
                        onClick={() => handleAccordionClick(index)}
                      >
                        {field.title}
                      </AccordionSummary>
                      <br></br>
                      <AccordionDetails sx={{ padding: "0" }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            width: "100%",
                            flexWrap: "wrap",
                            overflowY: "auto"
                          }}
                          spacing={3}
                          gap={3}
                        >
                          {createFormFields(field.inputs)}
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </AccordionRoot>
                ))
              : ""}
            {/* {
              (fields && fields.require && fields.require.length>0) ?
                <>{createFormFields(fields.require)}</> : ''
            }
            {
              (fields && fields.optional && fields.optional.length>0) ?
                <AccordionRoot>
                  <br></br>
                  <Accordion sx={{padding: 'none', boxShadow: 'none'}}>
                    <AccordionSummary style={{padding: '0', borderBottom: '0.1em solid gray', minHeight: '0', height: '25px', color:'gray', fontSize: '1.1em'}} expandIcon={!expand?<MinusIcon sx={{color:'gray'}} />:<AddIcon sx={{color: 'gray'}} />} onClick={handleAccordionClick}>Additional Information</AccordionSummary>
                    <br></br>
                    <AccordionDetails sx={{padding: '0'}}><Box sx={{display: 'flex', alignItems: 'flex-start', width: '100%', flexWrap: 'wrap'}} spacing={3} gap={3}>{createFormFields(fields.optional)}</Box></AccordionDetails>
                  </Accordion>
                </AccordionRoot> : ''
            } */}
          </Box>
        </DialogContent>
        <br></br>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="contained" onClick={handleSubmit} color="primary">
            {submitButton}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
