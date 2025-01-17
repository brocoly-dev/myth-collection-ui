import { useState } from "react";

import { Divider, FormControl, FormControlLabel, FormHelperText, Grid2, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Switch, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { format } from "date-fns";

const FigureDistribution = ({ id, label, distributors, distributorsDisabled = false, priceCurrencySymbol, firstAnnouncementDateLabel, formErrors, sendDataToParent }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [basePriceValue, setBasePriceValue] = useState('');
    const [firstAnnouncementDateValue, setFirstAnnouncementDateValue] = useState(null);
    const [preOrderDateValue, setPreOrderDateValue] = useState(null);
    const [checked, setChecked] = useState(false);
    const [releaseDateValue, setReleaseDateValue] = useState(null);

    const basePriceErrorField = "distribution" + id + "_basePrice";
    const preOrderDateErrorField = "distribution" + id + "_preOrderDate";
    const releaseDateErrorField = "distribution" + id + "_releaseDate";

    const handleDistriibutorSelectOnChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        if (fieldValue === "") {
            sendDataToParent(id, fieldName, null); // no JSON object is sent to parent
        } else {
            const index = fieldValue.indexOf("|");
            const value = fieldValue.substring(0, index);
            const text = fieldValue.substring(index + 1);

            const jsonObject = {
                id: value,
                name: text
            };

            sendDataToParent(id, fieldName, jsonObject);
        }
        setSelectedOption(fieldValue);
    };
    const handleBasePriceOnChange = (event) => {
        const fieldName = event.target.name;
        const inputValue = event.target.value;

        // Allow only numbers and one decimal point
        const validValue = inputValue.replace(/[^0-9.]/g, "");
        const parts = validValue.split(".");

        let value;
        // Ensure only one decimal point
        if (parts.length > 2) {
            value = parts[0] + "." + parts[1];
        } else {
            value = validValue;
        }

        sendDataToParent(id, fieldName, value);

        // Ensure only one decimal point
        if (parts.length > 2) {
            setBasePriceValue(value);
        } else {
            setBasePriceValue(value);
        }
    };

    const handleFirstDateOnChange = (fieldName, fieldValue) => {
        try {
            const formatted = format(fieldValue, 'yyyy-MM-dd');
            sendDataToParent(id, fieldName, formatted);
        } catch (error) {
            sendDataToParent(id, fieldName, null);
        }

        setFirstAnnouncementDateValue(fieldValue);
    };

    const handlePreOrderDateOnChange = (fieldName, fieldValue) => {
        try {
            const formatted = format(fieldValue, 'yyyy-MM-dd');
            sendDataToParent(id, fieldName, formatted);
        } catch (error) {
            sendDataToParent(id, fieldName, null);
        }

        setPreOrderDateValue(fieldValue);
    };

    const handleReleaseDateConfirmationChange = (event) => {
        console.log(event.target.checked);
        setChecked(event.target.checked);
    };

    const handleReleaseDateOnChange = (fieldName, fieldValue) => {
        try {
            const formatted = format(fieldValue, 'yyyy-MM-dd');
            sendDataToParent(id, fieldName, formatted);
        } catch (error) {
            sendDataToParent(id, fieldName, null);
        }

        setReleaseDateValue(fieldValue);
    };

    return (
        <>
            <Grid2 size={12}>
                <Divider>{label}</Divider>
            </Grid2>
            <Grid2 size={6}>
                <FormControl size="small" disabled={distributorsDisabled} fullWidth variant="outlined">
                    <InputLabel id="distributor-label">Distributor</InputLabel>
                    <Select
                        labelId="distributor-label"
                        label="Distributor"
                        name="distributor"
                        value={selectedOption}
                        onChange={handleDistriibutorSelectOnChange}
                    >
                        {/* Render the MenuItem components based on the fetched data */}
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {distributors.map((item) => (
                            <MenuItem key={item.id} value={item.id + '|' + item.name}>
                                {item.name}  {/* Display the item name, adjust to match your object structure */}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Choose an option</FormHelperText>
                </FormControl>
            </Grid2>
            <Grid2 size={6}>
                <FormControl size="small" error={Boolean(formErrors[basePriceErrorField])} fullWidth>
                    <InputLabel htmlFor="basePrice-label">Base Price</InputLabel>
                    <OutlinedInput
                        id="basePrice-label"
                        startAdornment={<InputAdornment position="start">{priceCurrencySymbol}</InputAdornment>}
                        label="Base Price"
                        name="basePrice"
                        value={basePriceValue}
                        onChange={handleBasePriceOnChange}
                    />
                    <FormHelperText>{formErrors[basePriceErrorField]}</FormHelperText>
                </FormControl>
            </Grid2>
            <Grid2 size={4}>
                <DatePicker
                    label={firstAnnouncementDateLabel}
                    value={firstAnnouncementDateValue}
                    views={['year', 'month', 'day']} // Only show year and month views
                    maxDate={dayjs(new Date())}
                    onChange={(newValue) => handleFirstDateOnChange('firstAnnouncementDate', newValue)}
                    textField={(params) => (
                        <TextField
                            {...params}
                            name="firstAnnouncementDate" // Assign a name to the field
                            fullWidth
                        />
                    )}
                />
            </Grid2>
            <Grid2 size={3}>
                <DatePicker
                    label="Preorder Date"
                    value={preOrderDateValue}
                    onChange={(newValue) => handlePreOrderDateOnChange('preOrderDate', newValue)}
                    textField={(params) => (
                        <TextField
                            {...params}
                            name="preOrderDate" // Assign a name to the field
                            fullWidth
                        />
                    )}
                    slotProps={{
                        textField: {
                            error: Boolean(formErrors[preOrderDateErrorField]),
                            helperText: formErrors[preOrderDateErrorField],
                        },
                    }}
                />
            </Grid2>
            <Grid2 size={2}>
                <FormControlLabel
                    control={<Switch checked={checked} onChange={handleReleaseDateConfirmationChange} />}
                    label="Confirm Day?"
                    labelPlacement="end"
                />
            </Grid2>
            <Grid2 size={3}>
                <DatePicker
                    label="Release Date"
                    value={releaseDateValue}
                    views={checked ? ['year', 'month', 'day'] : ['year', 'month']}
                    onChange={(newValue) => handleReleaseDateOnChange('releaseDate', newValue)}
                    textField={(params) => (
                        <TextField
                            {...params}
                            name="releaseDate" // Assign a name to the field
                            fullWidth
                        />
                    )}
                    slotProps={{
                        textField: {
                            error: Boolean(formErrors[releaseDateErrorField]),
                            helperText: formErrors[releaseDateErrorField],
                        },
                    }}
                />
            </Grid2>
        </>
    );
};

export default FigureDistribution;