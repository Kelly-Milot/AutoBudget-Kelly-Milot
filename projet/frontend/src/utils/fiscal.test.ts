import { describe, expect, it } from "vitest";
import movementsData from '../assets/data.json';
import { filterMovements, getAmountByYear, getByYear } from "./fiscal";

describe('Fiscal analysis', () => {

    it('should return 15 movements', () => {
        const result = filterMovements(movementsData);
        expect(result.length).toBe(15);
    })

    it('should have only positive amounts', () => {
        const result = filterMovements(movementsData);
        result.forEach(movement => {
            expect(movement.amount).toBeGreaterThan(0);
        })
    })

    it('should have only category Revenus', () => {
        const result = filterMovements(movementsData);
        result.forEach(movement => {
            expect(movement.category).toBe('Revenus');
        })
    })

    it('should return 12 movements for 2023', () => {
        const result = getByYear(movementsData, 2023);
        expect(result.length).toBe(12);
    })

    it('should equals to 1600 for 2024', () => {
        const result = getAmountByYear(movementsData, 2024);
        expect(result).toEqual(1600);
    })

    it('should equals to 19850 for 2024', () => {
        const result = getAmountByYear(movementsData, 2023);
        expect(result).toEqual(19850);
    })

    it('should equals to 0 for 2025', () => {
        const result = getAmountByYear(movementsData, 2025);
        expect(result).toEqual(0);
    })

})