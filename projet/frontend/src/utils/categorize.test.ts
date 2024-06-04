import { expect, it, describe } from 'vitest'
import { isLogement, isRevenus, isAlimentation, cleanLabel, isWordInLabel } from './categorize';

describe('Categorize', () => {

  describe('Logement', () => {
    it('should be true for -700€ "xxx Loyer xxx"', () => {
      const result = isLogement(-700, 'xxx Loyer xxx');
      expect(result).toBe(true);
    });

    it('should be true for -1150€ "xxx Crédit xxx"', () => {
      const result = isLogement(-1150, 'xxx Crédit xxx');
      expect(result).toBe(true);
    });

    it('should be false for 1150€ "xxx Crédit xxx"', () => {
      const result = isLogement(1150, 'xxx Crédit xxx');
      expect(result).toBe(false);
    });

    it('should be false for -10€', () => {
      const result = isLogement(-10);
      expect(result).toBe(false);
    });

    it('should be false for -10€ xxx Loyer xxx', () => {
      const result = isLogement(-10, 'xxx Loyer xxx');
      expect(result).toBe(false);
    });

    it('should be false for -350€ xxx Loyer xxx', () => {
      const result = isLogement(-350, 'xxx Loyer xxx');
      expect(result).toBe(false);
    });

    it('should be false for -1300€ xxx Loyer xxx', () => {
      const result = isLogement(-1300, 'xxx Loyer xxx');
      expect(result).toBe(false);
    });
  });

  describe('Revenus', () => {
    
    it('should be false for 1000€', () => {
      const result = isRevenus(1000);
      expect(result).toBe(false);
    });

    it('should be false for 1300€', () => {
      const result = isRevenus(1300);
      expect(result).toBe(false);
    });

    it('should be true for 1301€', () => {
      const result = isRevenus(1301);
      expect(result).toBe(true);
    });

  });

  describe('Alimentation', () => {

    it('should be true for -10€ "xxx Auchan xxx"', () => {
      const result = isAlimentation(-10, 'xxx Auchan xxx');
      expect(result).toBe(true);
    });

    it('should be false for 10€ "xxx Auchan xxx"', () => {
      const result = isAlimentation(10, 'xxx Auchan xxx');
      expect(result).toBe(false);
    });

  });

});

describe('Categorize utilities', () => {

  describe('Label cleaning', () => {

    it('should remove accents', () => {
      const result = cleanLabel('éàù');
      expect(result).toBe('eau');
    });

    it('should convert to lowercase', () => {
      const result = cleanLabel('ÉÀÙ');
      expect(result).toBe('eau');
    });

  });

  describe('Find word in label', () => {
    
    it('should be true for "xxx MotCompliqué xxx" and "MotCompliqué"', () => {
      const result = isWordInLabel('xxx MotCompliqué xxx', ['MotCompliqué']);
      expect(result).toBe(true);
    });

    it('should be true for "xxx MotCompliqué xxx" and "motcomplique"', () => {
      const result = isWordInLabel('xxx MotCompliqué xxx', ['motcomplique']);
      expect(result).toBe(true);
    });

    it('should be false for "xxx motcomplique xxx" and "MotCompliqué"', () => {
      const result = isWordInLabel('xxx motcomplique xxx', ['MotCompliqué']);
      expect(result).toBe(false);
    });

    it('should be true for "MotCompliqué xxx xxxxx" and "MotCompliqué"', () => {
      const result = isWordInLabel('MotCompliqué xxx xxxxx', ['MotCompliqué']);
      expect(result).toBe(true);
    });

    it('should be true for "xxx xxxxx MotCompliqué" and "MotCompliqué"', () => {
      const result = isWordInLabel('xxx xxxxx MotCompliqué', ['MotCompliqué']);
      expect(result).toBe(true);
    });

    it('should be true for "MotCompliqué" and "MotCompliqué"', () => {
      const result = isWordInLabel('MotCompliqué', ['MotCompliqué']);
      expect(result).toBe(true);
    });

  });

});