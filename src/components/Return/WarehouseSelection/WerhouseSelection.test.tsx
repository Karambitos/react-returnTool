import React from 'react';
import {render, screen} from '@testing-library/react';
import WarehouseSelection from "./WarehouseSelection";


const delay = async (time: number) => new Promise((resolve) => setTimeout(resolve, time));
describe('WarehouseSelection component', () => {
    test('Renders component', () => {
        render(
            <WarehouseSelection
                value=''
                onChange={() => {}}
            />
        );

        // Verify that the IDSelection element is in the document
        expect(screen.getByTestId('test-warehouse-selection')).toBeInTheDocument();
    });

    test('Renders with initial value', () => {
        render(
            <WarehouseSelection
                value="Hamburg"
                onChange={() => {}}
            />
        );

        const select = screen.getByTestId('test-warehouse-selection-select').querySelector('input') as HTMLInputElement | null;

        if (!select) {
            throw new Error('Select input not found');
        }

        // Verify that the select element has the correct initial value
        expect(select).toHaveValue('Hamburg');
    });
});
