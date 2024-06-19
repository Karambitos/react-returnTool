import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Annotation from './Annotation';

// Mock function for onAnnotationChange
const mockOnAnnotationChange = jest.fn();

describe('Annotation component', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset mock function calls after each test
    });

    test('Renders component', () => {

        render(
            <Annotation
                sku={'SKU123'}
                annotationInit={''}
                onAnnotationChange={mockOnAnnotationChange}
            />
        );

        // Verify that the Annotation TextField is in the document
        expect(screen.getByTestId('test-annotation')).toBeInTheDocument();

    });

    test('Renders component with initial annotation', () => {
        const sku = 'SKU123';
        const initialAnnotation = 'Initial annotation';

        render(
            <Annotation
                sku={sku}
                annotationInit={initialAnnotation}
                onAnnotationChange={mockOnAnnotationChange}
            />
        );

        // Verify initial annotation value
        expect(screen.getByText(/Initial annotation/)).toBeInTheDocument();

    });

    test('Renders component changing annotation', async () => {
        const sku = 'SKU123';
        const initialAnnotation = 'Initial annotation';

        render(
            <Annotation
                sku={sku}
                annotationInit={initialAnnotation}
                onAnnotationChange={mockOnAnnotationChange}
            />
        );

        // Verify that the Annotation TextField is in the document
        const annotationTextField = screen.getByLabelText('Annotation');
        expect(annotationTextField).toBeInTheDocument();

        // Simulate changing the annotation
        const newAnnotation = 'Updated annotation';
        await userEvent.clear(annotationTextField); // Clear existing text (optional)
        await userEvent.type(annotationTextField, newAnnotation);

        // Check if onAnnotationChange was called with the correct parameters after typing is complete
        expect(mockOnAnnotationChange).toHaveBeenCalledTimes(newAnnotation.length + 1);
        expect(mockOnAnnotationChange).toHaveBeenCalledWith(sku, newAnnotation);
    });
});
