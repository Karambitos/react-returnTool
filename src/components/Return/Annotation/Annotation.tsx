import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';

interface AnnotationProps {
    sku: string;
    annotationInit: string;
    onAnnotationChange: (sku: string, annotation: string) => void;
}

const Annotation: React.FC<AnnotationProps> = ({ sku, annotationInit, onAnnotationChange }) => {
    const [annotation, setAnnotation] = useState(annotationInit);

    useEffect(() => {
        setAnnotation(annotationInit);
    }, [annotationInit]);

    const handleAnnotationChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = e.target.value;
        setAnnotation(value);
        onAnnotationChange(sku, value);
    };

    return (
        <TextField
            label="Annotation"
            value={annotation}
            onChange={handleAnnotationChange}
            multiline
            rows={4}
            variant="outlined"
            fullWidth
        />
    );
};

export default Annotation;
