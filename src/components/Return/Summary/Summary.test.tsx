import React from 'react';
import { render, screen } from '@testing-library/react'
import Summary from './Summary';
import { IOrderInfo } from "../../../types";

const mockSummary: IOrderInfo = {
    logistician: 'John Doe',
    warehouse: 'Warehouse A',
    deliveryInfo: {
        type: 'deliveryId',
        id: '9623862100000'
    },
    shippedItems: [
        { sku: 'SKU123', quantity: 2, reason: 'OutOfStock', annotation: 'Test annotation 1' },
        { sku: 'SKU456', quantity: 1, reason: 'OutOfStock', annotation: 'Test annotation 2' }
    ]
};

describe('Summary component', () => {
    test('Renders component', () => {
        render(<Summary summary={mockSummary}/>);

        // Verify that the summary element is in the document
        expect(screen.getByTestId('test-summary')).toBeInTheDocument();

        // Verify that the logistician's name is rendered correctly
        expect(screen.getByText(/Logistician:/)).toBeInTheDocument();
        expect(screen.getByText(/John Doe/)).toBeInTheDocument();

        // Verify that the Warehouse is rendered correctly
        expect(screen.getByText(/Warehouse:/)).toBeInTheDocument();
        expect(screen.getByText(/Warehouse A/)).toBeInTheDocument();

        // Verify that the SKU is rendered correctly
        expect(screen.getByText(/SKU123/)).toBeInTheDocument();
        expect(screen.getByText(/SKU456/)).toBeInTheDocument();

        // Verify that the annotation is rendered correctly
        expect(screen.getByText(/Test annotation 1/)).toBeInTheDocument();
        expect(screen.getByText(/Test annotation 2/)).toBeInTheDocument();
    })
});

