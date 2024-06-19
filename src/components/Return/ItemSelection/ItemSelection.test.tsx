import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IDSelection from './ItemSelection';
import ItemSelection from "./ItemSelection";


const mockItems = [
    { sku: 'SKU001', quantity: 3, reason: '' },
    { sku: 'SKU002', quantity: 2, reason: ''},
];

const mockShippedItems = [
    { sku: 'SKU001', quantity: 1, reason: 'RO_CR-UNWANTED_ITEM' },
    { sku: 'SKU002', quantity: 0, reason: '' },
];
describe('ItemSelection component', () => {
    test('Renders component with correct initial state', () => {
        render(<ItemSelection
                items={mockItems}
                shippedItem={mockShippedItems}
                onItemSelect={() => {}}
                />);

        // Verify that the ItemSelection element is in the document
        expect(screen.getByTestId('test-item-selection')).toBeInTheDocument();

        // Verify that the component renders
        expect(screen.getByText(/SKU001/)).toBeInTheDocument();
        expect(screen.getByText(/SKU002/)).toBeInTheDocument();

        // Verify initial quantity values
        expect(screen.getByText('No longer needed')).toBeInTheDocument();
    });
});
