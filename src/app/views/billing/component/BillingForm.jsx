import React from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  Autocomplete,
} from "@mui/material";
import { SearchSelectAdd } from "app/components";
import { useState } from "react";
import { useEffect } from "react";
import { useAxios } from "app/hooks/useAxios";
import { Controller } from "react-hook-form";

const samples = [{ districtName: "Colombo", cities: ["Colombo-01"] }];

const BillingForm = ({
  orderDetails,
  setOrderDetails,
  clearErrors,
  control,
  errors,
}) => {
  const [districts, setDistricts] = useState(samples);

  const { apiNonAuth } = useAxios();

  useEffect(() => {
    const getDistrictList = async () => {
      await apiNonAuth("/delivery-service/districts", {
        customData: { silentError: true },
      })
        .then((response) => {
          if (response.status === 200 && response.data) {
            setDistricts(response.data);
          }
        })
        .catch((error) => {})
        .finally(() => {});
    };

    getDistrictList();
  }, []);

  return (
    <form>
      <Grid container sx={{ maxWidth: "680px" }} spacing={2} mb={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Customer Details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                fullWidth
                required
                variant="outlined"
                autoComplete="given-name"
                placeholder="Enter your first name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("firstName");
                  setOrderDetails(e, e.target.value);
                }}
              />
            )}
          />
        </Grid>

        {/* Last Name */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                fullWidth
                required
                variant="outlined"
                autoComplete="family-name"
                placeholder="Enter your last name"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("lastName");
                  setOrderDetails(e, e.target.value);
                }}
              />
            )}
          />
        </Grid>

        {/* Shipping Address */}
        <Grid item xs={12}>
          <Controller
            name="shippingAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Shipping Address"
                fullWidth
                required
                variant="outlined"
                autoComplete="shipping address-line1"
                placeholder="Enter your shipping address"
                error={!!errors.shippingAddress}
                helperText={errors.shippingAddress?.message}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("shippingAddress");
                  setOrderDetails(e, e.target.value);
                }}
              />
            )}
          />
        </Grid>

        {/* Billing Address */}
        <Grid item xs={12}>
          <Controller
            name="billingAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Billing Address"
                fullWidth
                required
                variant="outlined"
                autoComplete="billing address-line1"
                placeholder="Enter your billing address"
                error={!!errors.billingAddress}
                helperText={errors.billingAddress?.message}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("billingAddress");
                  setOrderDetails(e, e.target.value);
                }}
              />
            )}
          />
        </Grid>

        {/* District (Autocomplete) */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="district"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={districts.map((d) => d.districtName)}
                value={orderDetails.district || null}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                  clearErrors("district");
                  setOrderDetails({ target: { name: "district" } }, newValue);
                }}
                onBlur={(event, newValue) => {
                  field.onChange(orderDetails.district);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="District"
                    fullWidth
                    required
                    variant="outlined"
                    placeholder="Select the shipping district"
                    error={!!errors.district}
                    helperText={errors.district?.message}
                  />
                )}
              />
            )}
          />
        </Grid>

        {/* City (Autocomplete) */}
        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={
                  districts && orderDetails?.district
                    ? districts.find(
                        (d) => d.districtName === orderDetails?.district
                      )?.cities || []
                    : []
                }
                value={orderDetails.city || null}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                  clearErrors("city");
                  setOrderDetails({ target: { name: "city" } }, newValue);
                }}
                onBlur={(event, newValue) => {
                  field.onChange(orderDetails.city);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Town/City"
                    fullWidth
                    required
                    variant="outlined"
                    placeholder="Select the nearest city/town"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="contactNos"
            control={control}
            render={({ field }) => (
              <SearchSelectAdd
                {...field}
                key={`select-free-solo-contactNos`}
                id={`select-free-solo-contactNos`}
                options={orderDetails?.otherContactNos}
                value={orderDetails.contactNos || []}
                onChange={(e, newValue) => {
                  field.onChange(newValue); // React Hook Form update
                  clearErrors("contactNos"); // Clear validation errors
                  setOrderDetails({ target: { name: "contactNos" } }, newValue); // Update state
                }}
                onBlur={(event, newValue) => {
                  field.onChange(orderDetails.contactNos);
                }}
                multi={true}
                label={"Contact numbers"}
                placeholder={
                  "Type the contact number and tap ↵ or select one from options"
                }
                name={"contactNos"}
                fullWidth={true}
                required={true}
                error={!!errors.contactNos}
                helperText={errors.contactNos?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="emailAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email Address"
                fullWidth
                required
                variant="outlined"
                autoComplete="email"
                placeholder="Enter your email address"
                error={!!errors.emailAddress}
                helperText={errors.emailAddress?.message}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("emailAddress");
                  setOrderDetails(e, e.target.value);
                }}
              />
            )}
          />
        </Grid>

        {/* Order Notes */}
        <Grid item xs={12}>
          <Controller
            name="orderNotes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Order Notes"
                fullWidth
                variant="outlined"
                placeholder="Enter any order notes"
                multiline
                rows={5}
                error={!!errors.orderNotes}
                helperText={errors.orderNotes?.message}
                onChange={(e) => {
                  field.onChange(e);
                  clearErrors("orderNotes");
                  setOrderDetails(e, e.target.value);
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="primary" name="saveInfo" value="yes" />}
            label="Save this information for faster check-out next time"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default BillingForm;
