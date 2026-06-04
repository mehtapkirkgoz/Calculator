# Calculator App

A simple calculator application built with HTML, CSS, and JavaScript.

## Features

* Basic arithmetic operations:

  * Addition
  * Subtraction
  * Multiplication
  * Division
* Decimal number support
* Clear current entry
* Clear all entries
* Backspace support
* Percentage calculation
* Square root calculation
* Square power calculation
* Inverse calculation
* Error handling for invalid operations
* Keyboard support
* Repeated equals operation support

## Technologies Used

* HTML
* CSS
* JavaScript

## How It Works

The calculator takes input from both button clicks and keyboard events.
Numbers and operators are stored in variables, then calculated using JavaScript functions.

The main calculation logic is handled by the `operate()` function.
It receives two numbers and an operator, then returns the calculated result.

## Keyboard Controls

| Key            | Action            |
| -------------- | ----------------- |
| `0-9`          | Enter numbers     |
| `+`            | Addition          |
| `-`            | Subtraction       |
| `*`            | Multiplication    |
| `/`            | Division          |
| `.`            | Decimal point     |
| `Enter` or `=` | Calculate result  |
| `Backspace`    | Delete last digit |
| `Escape`       | Clear all         |
| `%`            | Percentage        |

## Error Handling

The calculator shows an error when an invalid operation is performed.

Examples:

* Dividing by zero
* Taking the inverse of zero
* Taking the square root of a negative number

## Project Structure

```text
project-folder/
│
├── index.html
├── style.css
└── script.js
```

## How to Use

1. Open the project folder.
2. Open `index.html` in a browser.
3. Use the calculator by clicking the buttons or using the keyboard.

## JavaScript Functions

Some important functions in the project:

* `appendNumber()`
  Adds numbers to the display.

* `appendDecimal()`
  Adds a decimal point.

* `chooseOperator()`
  Selects the current operator.

* `equals()`
  Calculates and displays the result.

* `clearAll()`
  Resets the whole calculator.

* `clearCurrent()`
  Clears only the current value.

* `backspace()`
  Deletes the last entered character.

* `percent()`
  Converts the current value to percentage.

* `inverse()`
  Calculates the inverse of the current value.

* `sqrt()`
  Calculates the square root of the current value.

* `power()`
  Squares the current value.

## Author

Created as a JavaScript calculator project.
