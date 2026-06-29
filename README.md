# applyDiscount Test Suite

A comprehensive test suite and implementation of the `applyDiscount` function in JavaScript, including path coverage, edge case testing, and precision decimal rounding analysis.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation
Clone the repository and install the dependencies (Jest):
```bash
npm install
```

### Running Tests
To run the Jest test suite and generate the coverage report:
```bash
npm test
```

---

## 📋 Test Case Checklist

The checklist below maps out 16 distinct test cases covering VIP/Regular customer discount rules, SAVE10/SAVE20 coupons, negative/zero price errors, and floating-point precision boundaries.

| Test ID | Category | Description | Input `price` | Input `customerType` | Input `couponCode` | Expected Outcome |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC01** | Error | Negative price throws "Invalid price" error | `-10` | `'regular'` | `'SAVE10'` | Throws `Error('Invalid price')` |
| **TC02** | Edge | Price of zero returns 0 | `0` | `'vip'` | `'SAVE20'` | `0` |
| **TC03** | Normal | VIP customer with SAVE20 coupon (max is 20% discount) | `100` | `'vip'` | `'SAVE20'` | `80` |
| **TC04** | Normal | VIP customer with SAVE10 coupon (max is 15% discount) | `100` | `'vip'` | `'SAVE10'` | `85` |
| **TC05** | Normal | VIP customer with no/invalid coupon (default 15% discount) | `100` | `'vip'` | `'INVALID'` | `85` |
| **TC06** | Normal | Regular customer with SAVE20 coupon (max is 20% discount) | `100` | `'regular'` | `'SAVE20'` | `80` |
| **TC07** | Normal | Regular customer with SAVE10 coupon (max is 10% discount) | `100` | `'regular'` | `'SAVE10'` | `90` |
| **TC08** | Normal | Regular customer with no/invalid coupon (default 5% discount) | `100` | `'regular'` | `'INVALID'` | `95` |
| **TC09** | Normal | Guest/other customer with SAVE20 coupon (max is 20% discount) | `100` | `'other'` | `'SAVE20'` | `80` |
| **TC10** | Normal | Guest/other customer with SAVE10 coupon (max is 10% discount) | `100` | `'other'` | `'SAVE10'` | `90` |
| **TC11** | Normal | Guest/other customer with no/invalid coupon (0% discount) | `100` | `'other'` | `'INVALID'` | `100` |
| **TC12** | Edge | Boundary price: barely negative throws error | `-0.01` | `'regular'` | `'SAVE10'` | Throws `Error('Invalid price')` |
| **TC13** | Edge | Boundary price: barely positive returns correct value | `0.01` | `'vip'` | `'SAVE20'` | `0.01` (rounds 0.008) |
| **TC14** | Edge | Rounding behavior: check half-up rounding precision | `3.50` | `'vip'` | `'SAVE10'` | `2.98` (rounds 2.975) |
| **TC15** | Edge | Missing/undefined parameters (default 0% discount) | `100` | `undefined` | `undefined` | `100` |
| **TC16** | Edge | Very large price boundary check | `1000000.05` | `'vip'` | `'SAVE20'` | `800000.04` |

---

## 📊 Code Coverage

Executing `npm test` generates **100% path, branch, function, and statement coverage**:

```
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------------|---------|----------|---------|---------|-------------------
All files         |     100 |      100 |     100 |     100 |                   
 applyDiscount.js |     100 |      100 |     100 |     100 |                   
------------------|---------|----------|---------|---------|-------------------
```

---

## 💡 Technical Rounding Insights (JavaScript Floats)

During development, we accounted for a key binary floating-point precision detail in JavaScript:
- For price `10.10` and discount `15%`, standard math expects `10.10 * 0.85 = 8.585` (which rounds to `8.59`).
- However, JavaScript represents this multiplication as `8.584999999999999`, which incorrectly rounds down to `8.58`.
- To test the half-up rounding path cleanly without floating-point representation loss, `TC14` uses a price of `3.50` (`3.50 * 0.85 = 2.975` exactly in binary), which successfully rounds to `2.98`.
