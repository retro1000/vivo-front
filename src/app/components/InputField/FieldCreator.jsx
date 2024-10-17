import { Box, FormControlLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { FileUpload, MuiTable, NumberFormatField, SearchableSelectMultiple, SearchSelectAdd } from "..";
import PhoneInput from "react-phone-input-2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

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

const FieldCreator = ({ fields, submit }) => {
    return(
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
            {createFormFields(fields)}
        </Box>
    )
}

export default FieldCreator;