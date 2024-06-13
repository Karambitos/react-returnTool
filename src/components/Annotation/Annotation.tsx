import React, {useState} from 'react';
import { TextField, Button } from '@mui/material';
import {IShippedItem} from "../../types";

interface AnnotationProps {
    sku: string;
    value: string;
    onAnnotationChange: (sku: string, annotation: string) => void;
}

const Annotation: React.FC<AnnotationProps> = ({ sku, value,  onAnnotationChange }) => {
    const [annotation, setAnnotation] = useState(value);
    // console.log(items.find((i) => i.sku === sku))
    return (
        <div>
            <TextField
                label="Annotation"
                value={annotation}
                onChange={(e) => {
                    setAnnotation(e.target.value);
                    onAnnotationChange(sku, e.target.value);
                }}
                multiline
                rows={4}
                variant="outlined"
                fullWidth
            />
        </div>
    )
};

export default Annotation;
