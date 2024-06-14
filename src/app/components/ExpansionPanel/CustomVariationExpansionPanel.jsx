import React from 'react';
import { useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, RadioGroup, FormControlLabel, Radio, FormLabel, FormControl, InputLabel, Select, MenuItem, Button, Stack, styled, Grid, IconButton, Icon, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { FileUpload, NumberFormatField } from '..';


const AccordionRoot = styled("div")(({ theme }) => ({
  width: "100%",
  "& .heading": {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function CustomVariationExpansionPanel(props) {
    const selectAll = () => {
        const newList = [...props.list]
        newList.forEach(itm=>{itm.checked=true})
        props.setVariations(newList)
    }

    const selectNone = () => {
        const newList = [...props.list]
        newList.forEach(itm=>{itm.checked=false})
        props.setVariations(newList)
    }

    return (
    <React.Fragment sx={{marginTop: '0.8em'}}>
        {
            (props.list && props.list.length > 0) ? 
                <Grid sx={{display: 'flex', gap: '0.5em'}}>
                    <Button color="primary" variant="outlined" onClick={selectAll}>Select all</Button>
                    <Button color="primary" variant="outlined" onClick={selectNone}>Select none</Button>
                </Grid>
                :
                ''
        }
        <AccordionRoot>
            {
            (props.list && props.list.length > 0) ? (
                props.list.map((item, index) => (
                    <Grid sx={{display: 'flex', gap: '0.8em', alignItems: 'flex-start', marginBottom: '0.5em'}}>
                        <Checkbox checked={item.checked} onClick={(event)=>{const newList = [...props.list]; newList[index].checked = !newList[index].checked;props.setVariations(newList)}}></Checkbox>
                        <Accordion sx={{width: '70%', minWidth: '380px', padding: '0.8em 0.3em'}}>
                            <AccordionSummary
                            id={`panel${index+1}av-header`}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index+1}av-content`}
                            >
                            <Grid container gap={'15%'} alignItems="center" justifyContent={"space-between"} spacing={1}>
                            <Grid sx={{display: 'flex', gap: '0.4em', width: '80%', flexWrap: 'wrap'}}>
                                {
                                    item.variationAttributes.map((variable, varIndex)=>(
                                        <FormControl sx={{width: '30%', maxWidth: '180px', minWidth: '110px'}}>
                                            <InputLabel id={`variation-select-${index}-${varIndex}`}>{props.variables.find(itm => itm.attributeId===variable.attributeId).attributeName}</InputLabel>
                                            <Select
                                                size='small'
                                                key={varIndex}
                                                labelId={`variation-select-${index}-${varIndex}`}
                                                value={variable.attributeVariableId}
                                                label={props.variables.find(itm => itm.attributeId===variable.attributeId).attributeName}
                                                defaultValue={variable.attributeVariableId}
                                                onChange={(event)=>{
                                                    const current = props.list[index]
                                                    if(props.checkFields('variationAttributes', current) && props.checkNonRequiredFields('', current)){
                                                        const updatedList = [...props.updateVariations]
                                                        if(updatedList.length===0 || updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length===0){
                                                            current.variationAttributes[varIndex].attributeVariableId = event.target.value
                                                            updatedList.push(current)
                                                        }else{
                                                            updatedList.find(itm=>itm.variationIdentifier===current.variationIdentifier).variationAttributes[varIndex].attributeVariableId = event.target.value
                                                        }
                                                        props.setUpdateVariations(updatedList)
                                                    }
                                                    const newList = [...props.list];
                                                    newList[index].variationAttributes[varIndex].attributeVariableId = event.target.value;
                                                    props.setVariations(newList)
                                                }}
                                            >
                                                {
                                                    props.variableAttributeList.find(itm=>itm.attributeId===variable.attributeId)
                                                        ?.attributeVariables
                                                        .map(val => <MenuItem value={val.variableId}>{val.variableName}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    ))
                                }
                            </Grid>
                            {props.isDeleteOn ? (
                                <Grid>
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => {
                                    
                                    }}
                                    sx={{ color: '#e80e0e', marginTop: '0.3em'}}
                                >
                                    <Icon sx={{fontSize: '0.75em'}}>delete</Icon>
                                </IconButton>
                                </Grid>) : ''
                            }
                            
                            </Grid>
                            </AccordionSummary>

                            <AccordionDetails>
                                <Stack sx={{display: 'flex', alignItems: 'flex-start'}}>
                                    <FileUpload 
                                        id={`variation-image-input-${index}`}
                                        sx={{marginBottom: '1.9em', marginLeft: '-6px'}}
                                        required={true} file={item.variationImage}
                                        setFile={(val)=>{
                                            const current = props.list[index]
                                                let updatedList = [...props.updateVariations]
                                                if((val==='' || val===undefined) && updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length!==0) updatedList = updatedList.filter(itm=>itm.variationIdentifier!==current.variationIdentifier)
                                                if((val!=='') && props.checkFields('variationImage', current) && props.checkNonRequiredFields('', current)){
                                                    if(updatedList.length===0 || updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length===0){
                                                        current.variationImage = val
                                                        current.state==='create'?updatedList.push(current):updatedList.push({attributeId: current.attributeId, variationIdentifier: current.variationIdentifier, state: current.state, attributeVariables: current.attributeVariables, variationImage: val})
                                                    }else{
                                                        updatedList.find(itm=>itm.variationIdentifier===current.variationIdentifier).variationImage = val
                                                    }
                                                }
                                                props.setUpdateVariations(updatedList)
                                            const newList=[...props.list]; 
                                            newList[index].variationImage=val; 
                                            props.setVariations(newList);
                                        }}
                                    />
                                    <Grid container gap={'1.3em'} flexWrap="wrap" alignItems="center" justifyContent={"flex-start"} spacing={1}>
                                        
                                        <NumberFormatField 
                                            inputProps={{
                                                id:`unit-cost-input-${index}`,
                                                placeholder:"Enter unit cost",
                                                label:"Unit cost",
                                                type:"number",
                                                inputProps:{ 'aria-label': `unit-cost-input-${index}`, step:'any', inputMode: 'decimal' }
                                            }}
                                            label="Unit cost"
                                            allowNegative={false}
                                            decimalScale={3}
                                            fixedDecimalScale={false}
                                            value={item.unitCost}
                                            error={props.variationErrors[item.variationIdentifier]?.unitCost!==undefined}
                                            helperText={props.variationErrors[item.variationIdentifier]?.unitCost}
                                            onChange={(event) => {
                                                const current = props.list[index]
                                                let updatedList = [...props.updateVariations]
                                                if((parseFloat(event.target.value)<=0 || event.target.value==='' || event.target.value===undefined) && updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length!==0) updatedList = updatedList.filter(itm=>itm.variationIdentifier!==current.variationIdentifier)
                                                if((parseFloat(event.target.value)>0 && event.target.value!=='') && event.target.value!==current.unitCost && props.checkFields('unitCost', current) && props.checkNonRequiredFields('', current)){
                                                    if(updatedList.length===0 || updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length===0){
                                                        current.unitCost = event.target.value
                                                        current.state==='create'?updatedList.push(current):updatedList.push({attributeId: current.attributeId, variationIdentifier: current.variationIdentifier, state: current.state, attributeVariables: current.attributeVariables, unitCost: event.target.value})
                                                    }else{
                                                        updatedList.find(itm=>itm.variationIdentifier===current.variationIdentifier).unitCost = event.target.value
                                                    }
                                                }                               
                                                props.setUpdateVariations(updatedList)                 
                                                const newList = [...props.list];
                                                newList[index].unitCost = event.target.value;
                                                props.setVariations(newList);
                                            }}
                                        />
                                        <NumberFormatField 
                                            inputProps={{
                                                id:`unit-price-input-${index}`,
                                                placeholder:"Enter unit price",
                                                label:"Unit price",
                                                type:"number",
                                                inputProps:{ 'aria-label': `unit-cost-input-${index}`, step:'any', inputMode: 'decimal' }
                                            }}
                                            label="Unit Price"
                                            allowNegative={false}
                                            decimalScale={2}
                                            fixedDecimalScale={false}
                                            value={item.unitPrice}
                                            error={props.variationErrors[item.variationIdentifier]?.unitPrice!==undefined}
                                            helperText={props.variationErrors[item.variationIdentifier]?.unitPrice}
                                            onChange={(event) => {
                                                const current = props.list[index]
                                                let updatedList = [...props.updateVariations]
                                                // let errorList = [...props.variationErrors]
                                                if((parseFloat(event.target.value)<=0 || event.target.value==='' || event.target.value===undefined) && updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length!==0) updatedList = updatedList.filter(itm=>itm.variationIdentifier!==current.variationIdentifier)
                                                if((parseFloat(event.target.value)>0 && event.target.value!=='') && props.checkFields('unitPrice', current) && event.target.value!==current.unitPrice && props.checkNonRequiredFields('', current)){
                                                    if(updatedList.length===0 || updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length===0){
                                                        current.unitPrice = event.target.value
                                                        current.state==='create'?updatedList.push(current):updatedList.push({attributeId: current.attributeId, variationIdentifier: current.variationIdentifier, state: current.state, attributeVariables: current.attributeVariables, unitPrice: event.target.value})
                                                    }else{
                                                        updatedList.find(itm=>itm.variationIdentifier===current.variationIdentifier).unitPrice = event.target.value
                                                    }
                                                }
                                                props.setUpdateVariations(updatedList)
                                                const newList = [...props.list];
                                                newList[index].unitPrice = event.target.value;
                                                props.setVariations(newList);
                                            }}
                                        />
                                        <NumberFormatField 
                                            inputProps={{
                                                id:`discount-input-${index}`,
                                                placeholder:"Enter discount",
                                                label:"Discount",
                                                type:"number",
                                                inputProps:{ 'aria-label': `discount-input-${index}`, step:'any', inputMode: 'decimal' }
                                            }}
                                            label="Discount"
                                            allowNegative={false}
                                            decimalScale={2}
                                            fixedDecimalScale={false}
                                            value={item.discount}
                                            error={props.variationErrors[item.variationIdentifier]?.discount!==undefined}
                                            helperText={props.variationErrors[item.variationIdentifier]?.discount}
                                            onChange={(event) => {
                                                const current = props.list[index]
                                                let updatedList = [...props.updateVariations]
                                                if(parseFloat(event.target.value)<0 && updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length!==0) updatedList = updatedList.filter(itm=>itm.variationIdentifier!==current.variationIdentifier)
                                                if((parseFloat(event.target.value)>=0 && event.target.value!=='') && event.target.value!==current.discount && props.checkFields('', current) && props.checkNonRequiredFields('discount', current)){
                                                    if(updatedList.length===0 || updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length===0){
                                                        current.discount = event.target.value
                                                        current.state==='create'?updatedList.push(current):updatedList.push({attributeId: current.attributeId, variationIdentifier: current.variationIdentifier, state: current.state, attributeVariables: current.attributeVariables, discount: event.target.value})
                                                    }else{
                                                        updatedList.find(itm=>itm.variationIdentifier===current.variationIdentifier).discount = event.target.value
                                                    }
                                                }                                           
                                                props.setUpdateVariations(updatedList)     
                                                const newList = [...props.list];
                                                newList[index].discount = event.target.value;
                                                props.setVariations(newList);
                                            }}
                                        />
                                        <TextField
                                            id={`available-stock-amount-input-${index}`}
                                            placeholder="Enter available stock amount"
                                            label="Available stock amount"
                                            type="number"
                                            value={item.availableStockAmount}
                                            error={props.variationErrors[item.variationIdentifier]?.availableStockAmount!==undefined}
                                            helperText={props.variationErrors[item.variationIdentifier]?.availableStockAmount}
                                            onChange={(event) => {
                                                const current = props.list[index]
                                                let updatedList = [...props.updateVariations]
                                                if(parseInt(event.target.value)<0 && updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length!==0) updatedList = updatedList.filter(itm=>itm.variationIdentifier!==current.variationIdentifier)
                                                if((parseInt(event.target.value)>=0 && event.target.value!=='') && event.target.value!==current.availableStockAmount && props.checkFields('', current) && props.checkNonRequiredFields('availableStockAmount', current)){
                                                    if(updatedList.length===0 || updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length===0){
                                                        current.availableStockAmount = event.target.value
                                                        current.state==='create'?updatedList.push(current):updatedList.push({attributeId: current.attributeId, variationIdentifier: current.variationIdentifier, state: current.state, attributeVariables: current.attributeVariables, availableStockAmount: event.target.value})
                                                    }else{
                                                        updatedList.find(itm=>itm.variationIdentifier===current.variationIdentifier).availableStockAmount = event.target.value
                                                    }
                                                }                             
                                                props.setUpdateVariations(updatedList)                   
                                                const newList = [...props.list];
                                                newList[index].availableStockAmount = event.target.value;
                                                props.setVariations(newList);
                                            }}
                                            inputProps={{ 'aria-label': `available-stock-amount-${index}` }}
                                        />
                                        <TextField
                                            id={`pending-stock-amount-input-${index}`}
                                            placeholder="Enter pending stock amount"
                                            label="Pending stock amount"
                                            type="number"
                                            value={item.pendingStockAmount}
                                            error={props.variationErrors[item.variationIdentifier]?.pendingStockAmount!==undefined}
                                            helperText={props.variationErrors[item.variationIdentifier]?.pendingStockAmount}
                                            onChange={(event) => {
                                                const current = props.list[index]
                                                let updatedList = [...props.updateVariations]
                                                if(parseInt(event.target.value)<0 && updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length!==0) updatedList = updatedList.filter(itm=>itm.variationIdentifier!==current.variationIdentifier)
                                                if((parseInt(event.target.value)>=0 && event.target.value!=='') && event.target.value!==current.pendingStockAmount && props.checkFields('', current) && props.checkNonRequiredFields('pendingStockAmount', current)){
                                                    if(updatedList.length===0 || updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length===0){
                                                        current.pendingStockAmount = event.target.value
                                                        current.state==='create'?updatedList.push(current):updatedList.push({attributeId: current.attributeId, variationIdentifier: current.variationIdentifier, state: current.state, attributeVariables: current.attributeVariables, pendingStockAmount: event.target.value})
                                                    }else{
                                                        updatedList.find(itm=>itm.variationIdentifier===current.variationIdentifier).pendingStockAmount = event.target.value
                                                    }
                                                }                                  
                                                props.setUpdateVariations(updatedList)              
                                                const newList = [...props.list];
                                                newList[index].pendingStockAmount = event.target.value;
                                                props.setVariations(newList);
                                            }}
                                            inputProps={{ 'aria-label': `pending-stock-amount-input-${index}` }}
                                        />
                                    </Grid>
                                    <FormControl sx={{marginTop: '1.6em'}}>
                                        <FormLabel id={`backend-order-type-label-${index}`}>Backend order type</FormLabel>
                                        <RadioGroup
                                            aria-labelledby={`backend-order-type-label-${index}`}
                                            defaultValue={item.backendOrderType}
                                            name="radio-buttons-group"
                                            row
                                            value={item.backendOrderType}
                                            error={props.variationErrors[item.variationIdentifier]?.backendOrderType!==undefined}
                                            helperText={props.variationErrors[item.variationIdentifier]?.backendOrderType}
                                            onChange={(event, val) => {
                                                const current = props.list[index]
                                                let updatedList = [...props.updateVariations]
                                                if((event.target.value==='' && event.target.value===undefined) && updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length!==0) updatedList = updatedList.filter(itm=>itm.variationIdentifier!==current.variationIdentifier)
                                                if((event.target.value!=='') && val!==current.backendOrderType && props.checkFields('backendOrderType', current) && props.checkNonRequiredFields('', current)){
                                                    if(updatedList.length===0 || updatedList.filter(itm=>itm.variationIdentifier===current.variationIdentifier).length===0){
                                                        current.backendOrderType = event.target.value
                                                        current.state==='create'?updatedList.push(current):updatedList.push({attributeId: current.attributeId, variationIdentifier: current.variationIdentifier, state: current.state, attributeVariables: current.attributeVariables, backendOrderType: val})
                                                    }else{
                                                        updatedList.find(itm=>itm.variationIdentifier===current.variationIdentifier).backendOrderType = event.target.value
                                                    }
                                                }
                                                props.setUpdateVariations(updatedList)
                                                const newList = [...props.list];
                                                newList[index].backendOrderType = val;
                                                props.setVariations(newList);
                                            }}
                                        >
                                            <FormControlLabel value="NOT_ALLOWED" control={<Radio />} label="Not allowed" />
                                            <FormControlLabel value="ALLOWED_ALL" control={<Radio />} label="Allowed" />
                                            <FormControlLabel value="ALLOWED_ADMIN" control={<Radio />} label="Admin only" />
                                        </RadioGroup>
                                    </FormControl>
                            </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                ))) : ''
            }
        </AccordionRoot>
    </React.Fragment>
  );
}

export default CustomVariationExpansionPanel;
