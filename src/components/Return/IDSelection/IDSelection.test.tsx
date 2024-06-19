import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IDSelection from './IDSelection';

describe('IDSelection component', () => {
    test('Renders component', () => {
        render(
            <IDSelection
                loading={false}
                error={null}
                item={{ type: 'deliveryId', id: '' }}
                onChange={() => {}}
            />
        );

        // Verify that the IDSelection element is in the document
        expect(screen.getByTestId('test-id-selection')).toBeInTheDocument();
    });

    test('Handles type change correctly', async () => {
        render(<IDSelection
            loading={false}
            error={null}
            item={{ type: 'deliveryId', id: '' }}
            onChange={() => {}}
        />);

        // Assuming DeliveryId radio button is selected by default
        const deliveryIdRadio = screen.getByTestId('test-radio-delivery-id').querySelector('input[type="radio"]') as HTMLInputElement | null;
        const deliveryOrderIdRadio = screen.getByTestId('test-radio-delivery-order-id').querySelector('input[type="radio"]') as HTMLInputElement | null;

        // Ensure that the elements are not null
        if (!deliveryIdRadio || !deliveryOrderIdRadio) {
            throw new Error('Radio buttons not found');
        }

        expect(deliveryIdRadio).toBeChecked();
        expect(deliveryOrderIdRadio).not.toBeChecked();

        // Simulate selecting DeliveryOrderId radio button
        await userEvent.click(deliveryOrderIdRadio);

        // Now check if DeliveryOrderId radio button is checked
        expect(deliveryIdRadio).not.toBeChecked();
        expect(deliveryOrderIdRadio).toBeChecked();
    });

    test('Handles ID change correctly', async () => {
        render(
            <IDSelection
                loading={false}
                error={null}
                item={{ type: 'deliveryId', id: '' }}
                onChange={() => {}}
            />
        );

        const inputID = screen.getByTestId('test-input-id').querySelector('input[type="text"]') as HTMLInputElement | null;

        // Ensure that the elements are not null
        if (!inputID) {
            throw new Error('Radio buttons not found');
        }

        // Change the ID input value
        await userEvent.type(inputID, '123456');

        // Verify if the ID has changed
        expect(inputID.value).toBe('123456');
    });

    test('Handles error validation for DeliveryId', async () => {
        render(
            <IDSelection
                loading={false}
                error={null}
                item={{ type: 'deliveryId', id: '' }}
                onChange={() => {}}
            />
        );

        // Assuming DeliveryId radio button is selected by default
        const deliveryIdRadio = screen.getByTestId('test-radio-delivery-id').querySelector('input[type="radio"]') as HTMLInputElement | null;
        const inputID = screen.getByTestId('test-input-id').querySelector('input[type="text"]') as HTMLInputElement | null;

        // Ensure that the elements are not null
        if (!deliveryIdRadio || !inputID) {
            throw new Error('Radio buttons not found');
        }

        expect(deliveryIdRadio).toBeChecked();

        // Change the ID input to a non-numeric value
        await userEvent.type(inputID, 'abc123');

        // Error message should appear
        expect(screen.getByText(/DeliveryId must be numeric/)).toBeInTheDocument();
    });

    test('Handles error validation for DeliveryOrderId', async () => {
        render(
            <IDSelection
                loading={false}
                error={null}
                item={{ type: 'deliveryOrderId', id: '' }}
                onChange={() => {}}
            />
        );

        // Assuming DeliveryId radio button is selected by default
        const deliveryOrderIdRadio = screen.getByTestId('test-radio-delivery-order-id').querySelector('input[type="radio"]') as HTMLInputElement | null;
        const inputID = screen.getByTestId('test-input-id').querySelector('input[type="text"]') as HTMLInputElement | null;

        // Ensure that the elements are not null
        if (!inputID || !deliveryOrderIdRadio) {
            throw new Error('Radio buttons not found');
        }

        // Simulate selecting DeliveryOrderId radio button
        await userEvent.click(deliveryOrderIdRadio);


        // Now check if DeliveryOrderId radio button is checked
        expect(deliveryOrderIdRadio).toBeChecked();

        // Change the ID input to an invalid UUID
        await userEvent.type(inputID, '123456');

        // Error message should appear
        expect(screen.getByText(/DeliveryOrderId must be a valid UUID/)).toBeInTheDocument();
    });

    test('Shows loading indicator when loading is true', () => {
        render(
            <IDSelection
                loading={true}
                error={null}
                item={{ type: 'deliveryId', id: '' }}
                onChange={() => {}}
            />
        );

        // Loading indicator should be present
        expect(screen.getByTestId('test-loading-indicator')).toBeInTheDocument();
    });
});
