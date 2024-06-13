import React, {useEffect, useState} from 'react';
import { TextField, RadioGroup, FormControlLabel, Radio, CircularProgress, Box } from '@mui/material';

interface IDSelectionProps {
    loading: boolean;
    error: string | null;
    item: { type: string; id: string } | null;
    onChange: (data: { type: string; id: string }) => void;
}

const IDSelection: React.FC<IDSelectionProps> = ({loading, error, item, onChange = () => {} }) => {
    const [type, setType] = useState(item?.type || 'deliveryId');
    const [id, setId] = useState(item?.id || '');
    const [errorValidation, setErrorValidation] = useState('');


    function isUUID(str: string) {
        return /^(?:[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89AB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$/.test(str);
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
    };

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
        setErrorValidation('');
    };

    const handleBlur = () => {
        if (type === 'deliveryId' && !/^\d+$/.test(id)) {
            setErrorValidation('DeliveryId must be numeric');
        } else if (type === 'deliveryOrderId' && !isUUID(id)) {
            setErrorValidation('DeliveryOrderId must be a valid UUID');
        } else {
            setErrorValidation('');
            onChange({ type, id });
        }
    };

    return (
        <div>
            <RadioGroup row value={type} onChange={handleTypeChange}>
                <FormControlLabel
                    value="deliveryId"
                    control={<Radio />}
                    label="DeliveryId"
                />
                <FormControlLabel
                    value="deliveryOrderId"
                    control={<Radio />}
                    label="DeliveryOrderId"
                />
            </RadioGroup>
            <Box sx={{
                display: 'inline-block',
                position: 'relative'
            }}>
                <TextField
                    label={type}
                    value={id}
                    onChange={handleIdChange}
                    onBlur={handleBlur}
                    error={!!errorValidation || !!error}
                    helperText={errorValidation || error}
                />
                {loading && <CircularProgress sx={{ position: 'absolute', top: 10, right: 'calc(50% - 20px)' }} />}
            </Box>
        </div>
    );
};

export default IDSelection;
