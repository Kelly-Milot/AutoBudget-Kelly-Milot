import { Movement } from "../@types/Movement";

export const CATEGORIES = ['Charges', 'Revenus', 'Alimentation', 'Loisirs', 'Logement', 'Autres'];

type AnalyseByCategory = {
  amount: number;
  percent: number;
  elements: number;
};
type AnalyseByMonth = {
  [category: string]: AnalyseByCategory
}
type Analyse = {
  [date: string]: AnalyseByMonth
}


const getMovementsByMonth = (movements: Array<Movement>, month: string): Array<Movement> => {
  return movements.filter((movement: Movement) => movement.date.slice(0, 7) === month);
}

const getAnalyseByCategory = (movements: Array<Movement>, category: string): AnalyseByCategory => {
  const totalIn = movements
    .filter((m: Movement) => m.amount > 0)
    .reduce((acc: number, movement: Movement) => acc + movement.amount, 0);
  const totalOut = movements
    .filter((m: Movement) => m.amount < 0)
    .reduce((acc: number, movement: Movement) => acc + movement.amount, 0);
  
  const movementsCategory = movements.filter((movement: Movement) => movement.category === category);
  const amount = movementsCategory.reduce((acc: number, movement: Movement) => acc + movement.amount, 0);
  let percent = 0;

  if ( amount > 0 ) {
    percent = Math.round((amount / totalIn) * 100);
  }
  else if ( amount < 0 ) {
    percent = Math.round((amount / totalOut) * 100);
  }

  return {
    amount: amount,
    percent: percent,
    elements: movementsCategory.length
  };
};

export const getAnalyse = (movements: Array<Movement>): Analyse => {
  const result: { [date: string]: AnalyseByMonth } = {};

  const months = [...new Set(
    movements.map((movement: Movement) => movement.date.slice(0, 7))
  )];

  months.forEach((month: string) => {
    const movementsByMonth = getMovementsByMonth(movements, month);

    CATEGORIES.forEach((category: string) => {
      result[month] = result[month] || {};
      result[month][category] = getAnalyseByCategory(movementsByMonth, category);
    });
  });

  return result;
}
