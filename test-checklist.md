# Test Case Checklist

This checklist covers normal cases, edge cases, error cases, and rounding boundaries for `applyDiscount(price, customerType, couponCode)`.

| Test ID | Category | Description | Input `price` | Input `customerType` | Input `couponCode` | Expected Outcome |
|---|---|---|---|---|---|---|
| **TC01** | Error | Negative price throws "Invalid price" error | `-10` | `'regular'` | `'SAVE10'` | Throws `Error('Invalid price')` |
| **TC02** | Edge | Price of zero returns 0 | `0` | `'vip'` | `'SAVE20'` | `0` |
| **TC03** | Normal | VIP customer with SAVE20 coupon (max of 0.15 and 0.20 is 0.20) | `100` | `'vip'` | `'SAVE20'` | `80` |
| **TC04** | Normal | VIP customer with SAVE10 coupon (max of 0.15 and 0.10 is 0.15) | `100` | `'vip'` | `'SAVE10'` | `85` |
| **TC05** | Normal | VIP customer with no/invalid coupon (default 0.15 discount) | `100` | `'vip'` | `'INVALID'` | `85` |
| **TC06** | Normal | Regular customer with SAVE20 coupon (max of 0.05 and 0.20 is 0.20) | `100` | `'regular'` | `'SAVE20'` | `80` |
| **TC07** | Normal | Regular customer with SAVE10 coupon (max of 0.05 and 0.10 is 0.10) | `100` | `'regular'` | `'SAVE10'` | `90` |
| **TC08** | Normal | Regular customer with no/invalid coupon (default 0.05 discount) | `100` | `'regular'` | `'INVALID'` | `95` |
| **TC09** | Normal | Guest/other customer with SAVE20 coupon (max of 0 and 0.20 is 0.20) | `100` | `'other'` | `'SAVE20'` | `80` |
| **TC10** | Normal | Guest/other customer with SAVE10 coupon (max of 0 and 0.10 is 0.10) | `100` | `'other'` | `'SAVE10'` | `90` |
| **TC11** | Normal | Guest/other customer with no/invalid coupon (0 discount) | `100` | `'other'` | `'INVALID'` | `100` |
| **TC12** | Edge | Boundary price: barely negative throws error | `-0.01` | `'regular'` | `'SAVE10'` | Throws `Error('Invalid price')` |
| **TC13** | Edge | Boundary price: barely positive returns correct value | `0.01` | `'vip'` | `'SAVE20'` | `0.01` (rounds 0.008) |
| **TC14** | Edge | Rounding behavior: check half-up rounding precision (e.g. *.5 matches) | `3.50` | `'vip'` | `'SAVE10'` | `2.98` (rounds 2.975) |
| **TC15** | Edge | Missing/undefined customerType and couponCode (0 discount) | `100` | `undefined` | `undefined` | `100` |
| **TC16** | Edge | Very large price boundary check | `1000000.05` | `'vip'` | `'SAVE20'` | `800000.04` |
