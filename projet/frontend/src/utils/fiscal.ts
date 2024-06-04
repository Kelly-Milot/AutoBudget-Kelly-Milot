import { Movement } from "../@types/Movement";

const CAT_REVENUS = 'Revenus';

export const filterMovements = (movements: Array<Movement>): Array<Movement> => {
    return movements.filter((movement: Movement) => movement.category === CAT_REVENUS);
}

export const getByYear = (movements: Array<Movement>, year: number): Array<Movement> => {
    return filterMovements(movements)
        .filter((movement: Movement) => movement.date.slice(0, 4) === year.toString());
}

export const getAmountByYear = (movements: Array<Movement>, year: number): number => {
    return getByYear(movements, year)
        .reduce((acc: number, movement: Movement) => acc + movement.amount, 0);
}