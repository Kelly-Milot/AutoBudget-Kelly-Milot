import { describe, expect, it } from "vitest";
import movementsData from '../assets/data.json';
import { CATEGORIES, getExpensesPrediction, getSavingCapacityPrediction } from "./prediction";

describe('Prediction', () => {

    describe('Expenses', () => {

        it('should return all categories as key', () => {
            const result = getExpensesPrediction(movementsData, '2024-01');
            const keys = Object.keys(result);

            expect(keys.length).toBe(5);
            expect(keys).toEqual(CATEGORIES);
        })

        it('should return prediction for 2023-12', () => {
            const result = getExpensesPrediction(movementsData, '2023-12');

            expect(result).toEqual({
                Charges: -115,
                Alimentation: -65,
                Loisirs: -105,
                Logement: -500,
                Autres: -38
            })
        })

        it('should return prediction for 2023-03', () => {
            const result = getExpensesPrediction(movementsData, '2023-03');

            expect(result).toEqual({
                Charges: 0,
                Alimentation: -35,
                Loisirs: -55,
                Logement: -250,
                Autres: -16
            })
        })

        it('should return prediction for 2020-01', () => {
            const result = getExpensesPrediction(movementsData, '2020-01');

            expect(result).toEqual({
                Charges: 0,
                Alimentation: 0,
                Loisirs: 0,
                Logement: 0,
                Autres: 0
            })
        })

    })

    describe('Saving capacity', () => {

        it('should return saving capacity prediction for 2023-12', () => {
            const result = getSavingCapacityPrediction(movementsData, '2023-12');
            expect(result).toBe(806);
        })

        it('should return saving capacity prediction for 2023-04', () => {
            const result = getSavingCapacityPrediction(movementsData, '2023-04');
            expect(result).toBe(1173);
        })

        it('should return Not enought data for 2023-01', () => {
            expect(() => getSavingCapacityPrediction(movementsData, '2023-01'))
                .toThrow('Not enought data');
        })

        it('should return Not enought data for 2020-01', () => {
            expect(() => getSavingCapacityPrediction(movementsData, '2020-01'))
                .toThrow('Not enought data');
        })
    })

})