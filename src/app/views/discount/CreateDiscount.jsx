import React from "react";
import { useState } from "react";
import { TextField, Autocomplete, Grid, Button, Icon, Typography, Paper } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Breadcrumb, RuleGenerator, SimpleCard } from "app/components";
import { styled } from "@mui/system";
import { useEffect } from "react";
import { useAxios } from "app/hooks/useAxios";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

// Validation Schema
const validationSchema = Yup.object().shape({
  discountName: Yup.string()
    .required("Discount name is required")
    .min(10, "Discount name must be at least 10 characters long")
    .max(500, "Discount name cannot exceed 500 characters"),

  discountCategory: Yup.string().required("Discount category is required"),

  discountType: Yup.string().required("Discount type is required"),

  discountStartTime: Yup.date()
    .nullable() // Allow null as a valid state
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    ) // Transform empty string to null
    .when("discountType", {
    is: "TIME_BOUND",
    then: (schema) =>
      schema
        .required("Start time is required for time-bound discounts")
        .typeError("Start time must be a valid date and time")
        .min(
          new Date(), // March 22, 2025, or current date
          "Start time must be in the future"
        ),
    otherwise: (schema) => schema.nullable(),
  }),

  discountEndTime: Yup.date()
    .nullable() // Allow null as a valid state
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    ) // Transform empty string to null
    .when("discountType", {
    is: "TIME_BOUND",
    then: (schema) =>
      schema
        .required("End time is required for time-bound discounts")
        .typeError("End time must be a valid date and time")
        .min(
          Yup.ref("discountStartTime"),
          "End time must be later than start time"
        )
        .min(new Date(), "End time must be in the future"),
    otherwise: (schema) => schema.nullable(),
  }),

  recurringCycle: Yup.string()
    .matches(
      /^\d+\s+(minutes?|hours?|days?|weeks?|months?|years?)$/i,
      "Recurring cycle must be a number followed by 'minute', 'hour', 'day', 'week', 'month', or 'year' (e.g., '1 hour or 2 hours')"
    )
    .test(
      "non-negative",
      "Recurring cycle number cannot be negative",
      (value) => {
        if (!value || value==='') return true; // Optional field
        const [number] = value.split(" ");
        return parseInt(number, 10) >= 0;
      }
    ),

  discountRule: Yup.string()
    .required("Discount rule is required")
    .min(1, "Discount rule must be at least 1 character long"),

  discountAmountType: Yup.string().required("Discount amount type is required"),
});

// Sample options (replace with your actual data)
const discountCategories = [
  { value: "GENERAL", name: "General" },
  { value: "SEASONAL", name: "Seasonal" },
  { value: "PROMOTIONAL", name: "Promotional" },
  { value: "PRODUCT_LEVEL", name: "Product-level" },
];

const discountTypes = [
  { value: "TIME_BOUND", name: "Time Bound" },
  { value: "PERMANENT", name: "Permanent" },
  { value: "RECURRING", name: "Recurring" },
];

const discountAmountTypes = [
  { value: "percentage", name: "Percentage" },
  { value: "fixed", name: "Fixed" },
];

const CreateDiscount = ({ update, id }) => {

  const { api } = useAxios(); 
    
  const [discountDetails, setDiscountDetails] = useState({
    discountId: id || "",
    discountName: "",
    discountCategory: "",
    discountType: "",
    discountStartTime: "",
    discountEndTime: "",
    recurringCycle: "",
    discountAmountType: "",
    discountRule: {
      expanded: true,
      anyOrAll: 'Any',
      conditions: [
        { field: '', operator: '', value: '' },
      ],
      actions: [
        { type: '', format: '', value: '' }
      ],
      hasElseIf: false,
      elseIfRules: [],
      hasElse: false,
      elseActions: []
    },
  });

  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {

    const fetchDiscountMetaData = async() => {
        await api.get("", 
          {
            customData: { silentError: true },
          }
        )
            .then(response => {

            })
            .catch(error => {

            })
            .finally(() => {

            })
    }

    fetchDiscountMetaData();

  }, []);

  const {
    control,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(validationSchema),
    defaultValues: discountDetails,
  });

  const discountType = watch("discountType");
  const discountStartTime = watch("discountStartTime");

  // Function to get current datetime in YYYY-MM-DDThh:mm format
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // e.g., "2025-03-22T14:30"
  };

  const onSubmit = (data) => {
    console.log(data);
    // Add your submission logic here (e.g., API call)
  };

  const onClear = () => {
    setDiscountDetails(prev => ({
        ...prev,
        discountName: "",
        discountCategory: "",
        discountType: "",
        discountStartTime: "",
        discountEndTime: "",
        recurringCycle: "",
        discountAmountType: "",
        discountRule: {
          expanded: true,
          anyOrAll: 'Any',
          conditions: [],
          actions: [],
          hasElseIf: false,
          elseIfRules: [],
          hasElse: false,
          elseActions: []
        },
    }));
  };

  return (
    <Container>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: "Discount", path: "/discounts" },
            { name: `${update ? "Update" : "Create"}` },
          ]}
        />
      </div>

      <div>
      {/* <Grid container spacing={3}> */}
          <Grid item xs={12} md={8}>
            <Paper elevation={1}>
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Customer Details
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Discount Name */}
              <Grid item xs={12}>
                <Controller
                  name="discountName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Discount Name"
                      fullWidth
                      required
                      value={discountDetails.discountName} // Updated value binding
                      variant="outlined"
                      placeholder="Enter discount name"
                      error={!!errors.discountName}
                      helperText={errors.discountName?.message}
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrors("discountName");
                        setDiscountDetails((prev) => ({
                          ...prev,
                          discountName: e.target.value,
                        }));
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Discount Category */}
              <Grid item xs={12} sm={4}>
                <Controller
                  name="discountCategory"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      options={discountCategories.map((cat) => cat.name)}
                      value={
                        discountCategories.find(
                          (cat) => cat.value === discountDetails.discountCategory
                        )?.name || null
                      }
                      onChange={(event, newValue) => {
                        const categoryValue = discountCategories.find(
                          (cat) => cat.name === newValue
                        )?.value;
                        field.onChange(categoryValue);
                        clearErrors("discountCategory");
                        setDiscountDetails((prev) => ({
                          ...prev,
                          discountCategory: categoryValue,
                        }));
                      }}
                      onBlur={() => {
                        field.onChange(discountDetails.discountCategory);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Discount Category"
                          fullWidth
                          required
                          variant="outlined"
                          placeholder="Select discount category"
                          error={!!errors.discountCategory}
                          helperText={errors.discountCategory?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {/* Discount Type */}
              <Grid item xs={12} sm={4}>
                <Controller
                  name="discountType"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      options={discountTypes.map((type) => type.name)}
                      value={
                        discountTypes.find(
                          (type) => type.value === discountDetails.discountType
                        )?.name || null
                      }
                      onChange={(event, newValue) => {
                        const typeValue = discountTypes.find(
                          (type) => type.name === newValue
                        )?.value;
                        field.onChange(typeValue);
                        clearErrors("discountType");
                        setDiscountDetails((prev) => ({
                          ...prev,
                          discountType: typeValue,
                        }));
                      }}
                      onBlur={() => {
                        field.onChange(discountDetails.discountType);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Discount Type"
                          fullWidth
                          required
                          variant="outlined"
                          placeholder="Select discount type"
                          error={!!errors.discountType}
                          helperText={errors.discountType?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {/* Discount Amount Type */}
              <Grid item xs={12} sm={4}>
                <Controller
                  name="discountAmountType"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      options={discountAmountTypes.map((type) => type.name)}
                      value={
                        discountAmountTypes.find(
                          (type) => type.value === discountDetails.discountAmountType
                        )?.name || null
                      }
                      onChange={(event, newValue) => {
                        const typeValue = discountAmountTypes.find(
                          (type) => type.name === newValue
                        )?.value;
                        field.onChange(typeValue);
                        clearErrors("discountAmountType");
                        setDiscountDetails((prev) => ({
                          ...prev,
                          discountAmountType: typeValue,
                        }));
                      }}
                      onBlur={() => {
                        field.onChange(discountDetails.discountAmountType);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Discount Amount Type"
                          fullWidth
                          required
                          variant="outlined"
                          placeholder="Select discount amount type"
                          error={!!errors.discountAmountType}
                          helperText={errors.discountAmountType?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              {/* Discount Start Time */}
              <Grid item xs={12} sm={3}>
                <Controller
                  name="discountStartTime"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Start Date and Time"
                      type="datetime-local"
                      fullWidth
                      required={discountType === "TIME_BOUND"}
                      variant="outlined"
                      value={discountDetails.discountStartTime} // Updated value binding
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: getCurrentDateTime() }}
                      error={!!errors.discountStartTime}
                      helperText={errors.discountStartTime?.message}
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrors("discountStartTime");
                        setDiscountDetails((prev) => ({
                          ...prev,
                          discountStartTime: e.target.value,
                        }));
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Discount End Time */}
              <Grid item xs={12} sm={3}>
                <Controller
                  name="discountEndTime"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="End Date and Time"
                      type="datetime-local"
                      fullWidth
                      required={discountType === "TIME_BOUND"}
                      variant="outlined"
                      value={discountDetails.discountEndTime} // Updated value binding
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        min: discountStartTime || getCurrentDateTime(),
                      }}
                      error={!!errors.discountEndTime}
                      helperText={errors.discountEndTime?.message}
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrors("discountEndTime");
                        setDiscountDetails((prev) => ({
                          ...prev,
                          discountEndTime: e.target.value,
                        }));
                      }}
                    />
                  )}
                />
              </Grid>

              {/* Recurring Cycle */}
              <Grid item xs={12}>
                <Controller
                  name="recurringCycle"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Recurring Cycle"
                      fullWidth
                      variant="outlined"
                      value={discountDetails.recurringCycle} // Updated value binding
                      placeholder="e.g., 1 hour or 2 days"
                      error={!!errors.recurringCycle}
                      helperText={errors.recurringCycle?.message}
                      onChange={(e) => {
                        field.onChange(e);
                        clearErrors("recurringCycle");
                        setDiscountDetails((prev) => ({
                          ...prev,
                          recurringCycle: e.target.value,
                        }));
                      }}
                    />
                  )}
                />
              </Grid>

            </Grid>
          </form>
          </Grid>
        </Paper>
        </Grid>
        <SimpleCard title="Discount Rule">
          <RuleGenerator currentRule={discountDetails?.discountRule} discountCategory={discountDetails?.discountCategory}/>
        </SimpleCard>
        <Grid
              sx={{
                display: "flex",
                gap: "0.5em",
                justifyContent: "flex-end",
                flexWrap: "wrap",
                width: "100%",
                marginTop: "1em",
              }}
            >
              <Button color="primary" variant="outlined">
                Cancel
              </Button>
              <Button color="primary" variant="outlined" onClick={onClear}>
                Clear
              </Button>
              <Button
                sx={{ width: "100px" }}
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<Icon sx={{ fontSize: "0.75em" }}>save</Icon>}
              >
                {update ? 'Update' : 'Create'}
              </Button>
            </Grid>      
            {/* </Grid> */}
            </div>
    </Container>
  );
};

export default CreateDiscount;
