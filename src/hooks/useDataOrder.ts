import { useEffect, useState } from 'react';
import axios from 'axios';
import { IOrderInfo, IShippedItem } from '../types';

interface IDataOrder {
    loading: boolean;
    error: string | null;
    order: IOrderInfo | null;
}

const BASE_URL = 'https://666c0f8e49dbc5d7145c6eb1.mockapi.io/api/v1';

const useDataOrder = ({ type, id }: { type: string; id: string }): IDataOrder => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [order, setOrder] = useState<IOrderInfo | null>(null);

    // Function to fetch order by deliveryId or deliveryOrderId
    const fetchData = async (paramType: string, paramValue: string) => {
        try {
            setLoading(true);
            setError(null);
            let response;
            if (paramType === 'deliveryId') {
                response = await axios.get(`${BASE_URL}/orders?deliveryId=${paramValue}`);
            } else {
                response = await axios.get(`${BASE_URL}/orders?deliveryOrderId=${paramValue}`);
            }
            if (response.data.length > 0) {
                setOrder(response.data[0]);
            } else {
                setError('No data found');
            }
        } catch (error) {
            // @ts-ignore
            console.error('Error:', error.message);
            setError('Order not found');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (type && id) {
            fetchData(type, id);
        }
    }, [type, id]);

    return {
        loading,
        error,
        order,
    };
};

export default useDataOrder;
