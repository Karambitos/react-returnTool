import React from 'react';
import { MenuItem, FormControl, InputLabel } from '@mui/material';
import Select ,{SelectChangeEvent} from "@mui/material/Select";

interface LogisticianSelectionProps {
    value: string;
    onChange: (event: SelectChangeEvent) => void;
}

const LogisticianSelection: React.FC<LogisticianSelectionProps> = ({ value, onChange }) => (

    <FormControl fullWidth>
        <InputLabel>Logistician</InputLabel>
        <Select value={value} onChange={onChange}>
            <MenuItem value="Finecom">Finecom</MenuItem>
            <MenuItem value="Best Solutions">Best Solutions</MenuItem>
            <MenuItem value="Self Service">Self Service</MenuItem>
        </Select>
    </FormControl>
);

export default LogisticianSelection;
