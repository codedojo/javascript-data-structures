// infix 5 + 2
// postfix 5 2 +

// 5 + 6 * 7 - 1
// 5 6 7 * + 1 -

/**
 * for token
 *   if token is integer
 *     push token
 *   else if token is operator
 *     pop right-side value
 *     pop left-side value
 *     evaluate operator
 *     push result
*/

import Stack from '../stack.js';

function calculatePostfix(exp) {
    const values = [];

    for (const token of exp.split(' ')) {
        if (!isNaN(token)) {
            values.push(Number(token));
        } else {
            const rhs = values.pop();
            const lhs = values.pop();

            switch (token) {
                case '+':
                    values.push(lhs + rhs);
                    break;
                case '-':
                    values.push(lhs - rhs);
                    break;
                case '*':
                    values.push(lhs * rhs);
                    break;
                case '/':
                    values.push(lhs / rhs);
                    break;
                case '%':
                    values.push(lhs % rhs);
                    break;
                default:
                    throw new Error(`Unrecognized token ${token}`);
            }

            console.log(values);
        }
    }

    return values.pop();
}