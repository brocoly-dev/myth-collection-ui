import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const BasicBooleanFiltering = ({ id, label, theWidth = 173, trueValue = "TRUE", falseValue = "FALSE", valueSelected, onChangeFiltering }) => {

    const inputLabelId = `${id}-label`;

    return (
        <FormControl size="small" variant="outlined">
            <InputLabel id={inputLabelId}>{label}</InputLabel>
            <Select
                labelId={inputLabelId}
                label={label}
                sx={{ width: theWidth }}
                value={valueSelected}
                onChange={(event) => { onChangeFiltering(event.target.value); }}
            >
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                <MenuItem value="true">{trueValue}</MenuItem>
                <MenuItem value="false">{falseValue}</MenuItem>
            </Select>
        </FormControl>
    );
};
export default BasicBooleanFiltering;