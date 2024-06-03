import { expect, it, describe } from 'vitest'
import movementsData from "../assets/data.json";
import { CATEGORIES, getAnalyse } from './analyse';

describe('Bank analysis', () => {

  it('should return an object with year-month as key', () => {
    const keys = Object.keys(getAnalyse(movementsData));

    expect(keys.length).toBeGreaterThan(0);
    expect(keys[0]).toMatch(/\d{4}-\d{2}$/);
  });

  it('should return all categories as key', () => {
    const result = getAnalyse(movementsData);
    const keys = Object.keys(result['2023-12']);

    expect(keys.length).toBe(6);
    expect(keys).toEqual(CATEGORIES);
  });

  it('should return -230€ for 2023-12 Charges', () => {
    const result = getAnalyse(movementsData);

    expect(result['2023-12']['Charges'].amount).toBe(-230);
  });

  it('should return 25% for 2023-12 Charges', () => {
    const result = getAnalyse(movementsData);

    expect(result['2023-12']['Charges'].percent).toBe(25);
  });

  it('should have 100% for 2023-12 negative movements', () => {
    const result = getAnalyse(movementsData);

    let total = 0;
    Object.values(result['2023-12']).forEach(v => {
      if (v.amount < 0) total += v.percent;
    })

    expect(total).toBe(100);
  });

  it('should have 100% for 2023-12 positiv movements', () => {
    const result = getAnalyse(movementsData);

    let total = 0;
    Object.values(result['2023-12']).forEach(v => {
      if (v.amount > 0) total += v.percent;
    })

    expect(total).toBe(100);
  });

});