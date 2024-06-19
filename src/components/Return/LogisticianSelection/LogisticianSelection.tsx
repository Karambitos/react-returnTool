import React from 'react';
import {MenuItem, FormControl, InputLabel, Select, Box} from '@mui/material';
import { SelectChangeEvent } from "@mui/material/Select";

interface LogisticianSelectionProps {
    value: string;
    onChange: (event: SelectChangeEvent) => void;
}

const LogisticianSelection: React.FC<LogisticianSelectionProps> = ({ value, onChange }) => {

    return (
        <Box sx={{  marginTop: 2, marginBottom: 3 }} data-testid="test-logistic-selection">
            <FormControl fullWidth variant="outlined">
                <InputLabel>Logistic Company</InputLabel>
                <Select
                    data-testid="test-logistic-selection-select"
                    value={value}
                    onChange={onChange}
                    label="Logistic Company"
                >
                    <MenuItem value="Finecom">Finecom</MenuItem>
                    <MenuItem value="Best Solutions">Best Solutions</MenuItem>
                    <MenuItem value="Self Service">Self Service</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
};

export default LogisticianSelection;
