import React from 'react';
import {render, screen} from '@testing-library/react';
import LogisticianSelection from "./LogisticianSelection";


const delay = async (time: number) => new Promise((resolve) => setTimeout(resolve, time));
describe('LogisticianSelection component', () => {
    test('Renders component', () => {
        render(
            <LogisticianSelection
                value=''
                onChange={() => {}}
            />
        );

        // Verify that the IDSelection element is in the document
        expect(screen.getByTestId('test-logistic-selection')).toBeInTheDocument();
    });

    test('Renders with initial value', () => {
        render(
            <LogisticianSelection
                value="Finecom"
                onChange={() => {}}
            />
        );

        const select = screen.getByTestId('test-logistic-selection-select').querySelector('input') as HTMLInputElement | null;

        if (!select) {
            throw new Error('Select input not found');
        }

        // Verify that the select element has the correct initial value
        expect(select).toHaveValue('Finecom');
    });
});
