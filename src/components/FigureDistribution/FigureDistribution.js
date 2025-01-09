import { Divider, FormControl, FormHelperText, Grid2, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useState } from "react";

const FigureDistribution = ({ label, id, distributors, distributorDisabled = false, currency, sendDataToParent }) => {
    // State to manage the selected option
    const [selectedOption, setSelectedOption] = useState('');
    // State to manage the basePrice input
    const [basePriceValue, setBasePriceValue] = useState('');

    const handleSelectChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        if (fieldValue === "") {
            sendDataToParent(id, null); // no JSON object is sent to parent
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

    const handleChange = (event) => {
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
    }

    return (
        <>
            <Grid2 size={12}>
                <Divider>{label}</Divider>
            </Grid2>
            <Grid2 size={4}>
                <FormControl size="small" disabled={distributorDisabled} fullWidth variant="outlined">
                    <InputLabel id="distributor-label">Distributor</InputLabel>
                    <Select
                        labelId="distributor-label"
                        label="Distributor"
                        name="distributor"
                        value={selectedOption}
                        onChange={handleSelectChange}
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
            <Grid2 size={4}>
                <FormControl size="small" fullWidth>
                    <InputLabel htmlFor="basePrice-label">Base Price</InputLabel>
                    <OutlinedInput
                        id="basePrice-label"
                        startAdornment={<InputAdornment position="start">{currency}</InputAdornment>}
                        label="Base Price"
                        name="basePrice"
                        value={basePriceValue}
                        onChange={handleChange}
                    />
                </FormControl>
            </Grid2>
            <Grid2 size={4}>

            </Grid2>
            <Grid2 size={4}>

            </Grid2>
            <Grid2 size={4}>

            </Grid2>
            <Grid2 size={4}>

            </Grid2>
        </>
    );
};

export default FigureDistribution;