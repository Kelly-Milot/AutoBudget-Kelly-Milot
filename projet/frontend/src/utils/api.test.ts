import { MockInstance, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import movementsData from '../assets/data.json';
import { addMovement, getMovements } from "./api";
import { Movement } from "../@types/Movement";

describe('Api', () => {
    let mockFetch: MockInstance;

    beforeEach(() => {
        mockFetch = vi.spyOn(globalThis, 'fetch');
    })

    afterEach(() => {
        mockFetch.mockRestore();
    })

    describe('Get movements', () => {
        
        it('should return a list of movements', async () => {
            // Arrange
            mockFetch.mockResolvedValue(new Response(JSON.stringify(movementsData)));
    
            // Act
            const movements = await getMovements();
    
            // Assert
            expect(mockFetch).toHaveBeenCalled();
            expect(movements).toEqual(movementsData);
        })
    
        it('should handle an API error if response not ok', () => {
            // Arrange
            mockFetch.mockResolvedValue(new Response(null, {status: 500}));
    
            // Act
            const promise = getMovements();
    
            // Assert
            expect(promise).rejects.toThrow('API Error');
        })
    
        it('should handle an API errors', async () => {
            // Arrange
            mockFetch.mockRejectedValue(new Error());
    
            // Act
            const promise = getMovements();
    
            // Assert
            expect(promise).rejects.toThrow('API Error');
        })

    })

    describe('Add movement', () => {

        const partialMovement: Partial<Movement> = {
            date: '2024-06-05',
            label: 'New movement',
            amount: -100,
            category: "Autres"
        }

        const movement: Movement = {
            id: 1,
            date: '2024-06-05',
            label: 'New movement',
            amount: -100,
            category: "Autres"
        }

        it('should return a new movement', async () => {
            // Arrange
            mockFetch.mockResolvedValue(new Response(JSON.stringify(movement)));

            // Act
            const result = await addMovement(partialMovement);

            // Assert
            expect(mockFetch).toHaveBeenCalled();
            expect(result).toEqual(movement);
        })

        it('should handle an API error if response not ok', () => {
            // Arrange
            mockFetch.mockResolvedValue(new Response(null, {status: 500}));
    
            // Act
            const promise = addMovement(partialMovement);
    
            // Assert
            expect(promise).rejects.toThrow('API Error');
        })

        it('should handle an API errors', async () => {
            // Arrange
            mockFetch.mockRejectedValue(new Error());
    
            // Act
            const promise = addMovement(partialMovement);
    
            // Assert
            expect(promise).rejects.toThrow('API Error');
        })

    })

})