import { useState } from 'react';
import { Stack, Box, Radio, FormControlLabel, RadioGroup, Grid, FormLabel, FormControl } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { FileUpload, NumberFormatField } from '..';

export default function FormDialog({ open, title, setOpen, message, fields, setVariations}) {

    const [values, setValues] = useState({});


  const handleClose = () => {
    setOpen(false);
    setValues({})
  }

  const handleSubmit = () => {
    setVariations(values);
    setOpen(false);
    setValues({})
  }

  const textFields = [].concat(fields.filter(field=>(['number', 'text', 'email'].includes(field.type))))
  const radios = [].concat(fields.filter(field=>(field.type==='radio')))
  const files = [].concat(fields.filter(field=>(field.type==='file')))
  let index = 0;

  return (
    <Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>

        <DialogContent>
          <DialogContentText sx={{marginBottom: '1.2em'}}>
            {message ? message : ''}
          </DialogContentText>
          <Stack sx={{display: 'flex', alignItems: 'flex-start'}}>
          {
            (
                (Array.isArray(fields) && fields.length>0) ? (
                  <>
                  {files.map(field=>(
                    <FileUpload close={true} id={`${field.id}-input-${index++}`} sx={{marginBottom: '1.9em', marginLeft: '-6px'}} required={false} file={values[field.id]?values[field.id]:''} setFile={(val) => {const updatedValues = {...values,[field.id]: val};setValues(updatedValues)}}/>
                  ))}
                  {<Grid container gap={'1.3em'} flexWrap="wrap" alignItems="center" justifyContent={"flex-start"} spacing={1}>
                    {
                      textFields.map(field=>(
                        // <TextField
                        //         autoFocus
                        //         id={`${field.id}-radio-input-${index}`}
                        //         type={field.type}
                        //         value={values[field.id]?values[field.id]:''}
                        //         label={field.label}
                        //         placeholder={field.placeholder}
                        //         inputProps={{ 'aria-label': `${field.label}-${index++}` }}
                        //         onChange={(event) => {const updatedValues = {...values, [field.id]: event.target.value};setValues(updatedValues)}}
                        //         />

                                <NumberFormatField
                                  inputProps={{
                                    id:`${field.id}-input-${index}`,
                                    placeholder:`${field.placeholder}`,
                                    label:`${field.label}`,
                                    type:"number",
                                    inputProps:{ 'aria-label': `${field.id}-input-${index}`, step:'any', inputMode: 'decimal' }
                                  }}
                                  label={field.label}
                                  allowNegative={false}
                                  decimalScale={3}
                                  fixedDecimalScale={false}
                                  value={values[field.id]?values[field.id]:''}
                                  // error={props.variationErrors[item.identifier]?.unitCost!==undefined}
                                  // helperText={props.variationErrors[item.identifier]?.unitCost}
                                  onChange={(event) => {const updatedValues = {...values, [field.id]: event.target.value};setValues(updatedValues)}}
                              />
                      ))
                    }
                  </Grid>}
                    {
                      radios.map(field=>(
                        <FormControl sx={{marginTop: '1.7em'}}>
                                <FormLabel id={`${field.id}-radio-input-${index}`}>{field.label}</FormLabel>
                                <RadioGroup
                                    aria-labelledby={`${field.id}-radio-input-${index++}`}
                                    name="radio-buttons-group"
                                    row
                                    defaultValue={field.options[0].value}
                                    value={values[field.id]?values[field.id]:'ALLOWED_ALL'}
                                    onChange={(event, val) => {const updatedValues = {...values,[field.id]: val};setValues(updatedValues)}}
                                    >
                                    {
                                        field.options.map(option=>(
                                            <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                      ))
                    } 
                    </>   
                    )  : ('')
            )
          }
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
