import { Movement } from "../@types/Movement";

export const getMovements = async () => {
    try {
        const response = await fetch('https://autobudget/api/movements');

        if (!response.ok) {
            throw new Error('API Error');
        }

        return await response.json();
    } catch (error) {
        throw new Error('API Error');
    }
}

export const addMovement = async (movement: Partial<Movement>) => {
    try {
        const response = await fetch('https://autobudget/api/movements', {
            method: 'POST',
            body: JSON.stringify(movement)
        });

        if (!response.ok) {
            throw new Error('API Error');
        }

        return await response.json();
    } catch (error) {
        throw new Error('API Error');
    }
}