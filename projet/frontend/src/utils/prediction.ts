import { Movement } from "../@types/Movement";
import { Analyse, AnalyseByMonth, getAnalyse } from "./analyse";

export const CATEGORIES = ['Charges', 'Alimentation', 'Loisirs', 'Logement', 'Autres'];

const getLastMonths = (yearMonth: string, number: number): Array<string> => {
    const lastMonths: Array<string> = [];

    const year: number = parseInt(yearMonth.slice(0, 4));
    const month: number = parseInt(yearMonth.slice(5, 7));

    for (let index = 0; index < number + 1; index++) {
        if (month - index <= 0) {
            lastMonths.push(`${year - 1}-${12 - (index - month) < 10 ? '0' + (12 - (index - month)) : 12 - (index - month)}`)
        } else {
            lastMonths.push(`${year}-${month - index < 10 ? '0' + (month - index) : month - index}`);
        }
    }

    return lastMonths.slice(1);
}

const getFilteredAnalyse = (analyse: Analyse, months: Array<string>): Array<AnalyseByMonth> => {
    const filteredAnalyse: Array<AnalyseByMonth> = [];

    months.forEach((month: string) => {
        if (analyse[month]) filteredAnalyse.push(analyse[month]);
    })

    return filteredAnalyse;
}

const averageCategory = (analyse: Array<AnalyseByMonth>, category: string): number => {
    const sum = analyse.reduce((acc, item) => acc + item[category].amount, 0);
    return sum === 0 ? 0 : Math.round(sum / analyse.length);
}

export const getExpensesPrediction = (movements: Array<Movement>, yearMonth: string, monthRequired: number = 0): { [category: string]: number }|false => {
    const filteredAnalyse = getFilteredAnalyse(
        getAnalyse(movements),
        getLastMonths(yearMonth, 6)
    )

    if (filteredAnalyse.length < monthRequired) {
        return false;
    }

    const prediction: { [category: string]: number } = {};
    CATEGORIES.forEach((category: string) => {
        prediction[category] = averageCategory(filteredAnalyse, category);
    })

    return prediction;
}

export const getSavingCapacityPrediction = (movements: Array<Movement>, yearMonth: string): number => {
    const filteredAnalyse = getFilteredAnalyse(
        getAnalyse(movements),
        getLastMonths(yearMonth, 12)
    )

    const averageIncome = averageCategory(filteredAnalyse, 'Revenus');
    const expensesPrediction = getExpensesPrediction(movements, yearMonth, 3);
    if (!expensesPrediction) {
        throw new Error('Not enought data');
    }

    const averageExpenses = Object.values(expensesPrediction)
        .reduce((acc, item) => acc + item, 0);

    return averageIncome + averageExpenses;
}