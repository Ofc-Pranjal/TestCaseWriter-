const applyDiscount = require('./applyDiscount');

describe('applyDiscount', () => {
  
  describe('Error Cases', () => {
    test('TC01: Negative price throws "Invalid price" error', () => {
      expect(() => {
        applyDiscount(-10, 'regular', 'SAVE10');
      }).toThrow('Invalid price');
    });

    test('TC12: Boundary price: barely negative throws error', () => {
      expect(() => {
        applyDiscount(-0.01, 'regular', 'SAVE10');
      }).toThrow('Invalid price');
    });
  });

  describe('Edge Case Prices', () => {
    test('TC02: Price of zero returns 0', () => {
      expect(applyDiscount(0, 'vip', 'SAVE20')).toBe(0);
    });

    test('TC13: Boundary price: barely positive returns correct value', () => {
      // 0.01 * (1 - 0.20) = 0.008, Math.round(0.8) / 100 = 0.01
      expect(applyDiscount(0.01, 'vip', 'SAVE20')).toBe(0.01);
    });

    test('TC16: Very large price boundary check', () => {
      // 1000000.05 * 0.8 = 800000.04
      expect(applyDiscount(1000000.05, 'vip', 'SAVE20')).toBe(800000.04);
    });
  });

  describe('Customer Type and Coupon Combinations (Normal Cases)', () => {
    
    // VIP Customer tests (base discount: 15%)
    describe('VIP Customer (base 15% discount)', () => {
      test('TC03: VIP customer with SAVE20 coupon (max of 15% and 20% is 20% discount)', () => {
        expect(applyDiscount(100, 'vip', 'SAVE20')).toBe(80);
      });

      test('TC04: VIP customer with SAVE10 coupon (max of 15% and 10% is 15% discount)', () => {
        expect(applyDiscount(100, 'vip', 'SAVE10')).toBe(85);
      });

      test('TC05: VIP customer with no/invalid coupon (15% discount)', () => {
        expect(applyDiscount(100, 'vip', 'INVALID')).toBe(85);
      });
    });

    // Regular Customer tests (base discount: 5%)
    describe('Regular Customer (base 5% discount)', () => {
      test('TC06: Regular customer with SAVE20 coupon (max of 5% and 20% is 20% discount)', () => {
        expect(applyDiscount(100, 'regular', 'SAVE20')).toBe(80);
      });

      test('TC07: Regular customer with SAVE10 coupon (max of 5% and 10% is 10% discount)', () => {
        expect(applyDiscount(100, 'regular', 'SAVE10')).toBe(90);
      });

      test('TC08: Regular customer with no/invalid coupon (5% discount)', () => {
        expect(applyDiscount(100, 'regular', 'INVALID')).toBe(95);
      });
    });

    // Other/Guest Customer tests (base discount: 0%)
    describe('Guest/Other Customer (base 0% discount)', () => {
      test('TC09: Guest customer with SAVE20 coupon (max of 0% and 20% is 20% discount)', () => {
        expect(applyDiscount(100, 'other', 'SAVE20')).toBe(80);
      });

      test('TC10: Guest customer with SAVE10 coupon (max of 0% and 10% is 10% discount)', () => {
        expect(applyDiscount(100, 'other', 'SAVE10')).toBe(90);
      });

      test('TC11: Guest customer with no/invalid coupon (0% discount)', () => {
        expect(applyDiscount(100, 'other', 'INVALID')).toBe(100);
      });
    });
  });

  describe('Rounding and Parameter Edge Cases', () => {
    test('TC14: Rounding behavior: check half-up rounding precision (rounds 2.975 to 2.98)', () => {
      // 3.50 * (1 - 0.15) = 2.975 -> Math.round(297.5) / 100 = 2.98
      expect(applyDiscount(3.50, 'vip', 'SAVE10')).toBe(2.98);
    });

    test('TC15: Missing/undefined customerType and couponCode (0 discount)', () => {
      expect(applyDiscount(100)).toBe(100);
      expect(applyDiscount(100, undefined, undefined)).toBe(100);
    });
  });
});
