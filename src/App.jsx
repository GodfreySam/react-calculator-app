import React from "react";
import "./App.css";
import * as math from "mathjs";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ["/", "*", "-", "+"];
const ids = {
  7: "seven",
  8: "eight",
  9: "nine",
  4: "four",
  5: "five",
  6: "six",
  1: "one",
  2: "two",
  3: "three",
  0: "zero",
  "/": "divide",
  "*": "multiply",
  "-": "subtract",
  "+": "add",
};

// const opsId = {
  
// };

class App extends React.Component {

  state = {
    lastPressed: undefined,
    currentNumber: "0",
    prevNumber: undefined,
    operation: undefined
  }

  handleClick = (e) => {
    const { calc, currentNumber, lastPressed } = this.state;
    const { innerText } = e.target;

    switch (innerText) {
      case "AC": {
        this.setState({
          currentNumber: "0",
          calc: undefined
        })
        break;
      }
      case "=": {
        const evalued = math.evaluate(calc);
        this.setState({
          currentNumber: evalued,
          calc: evalued
        })
        break;
      }
      case ".": {
        const splitted = calc.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];

        if(!last.includes('.')) {
          this.setState({
            calc: calc+'.',
            currentNumber: calc+'.'
          })
        }
        break;
      }
      default: {
        let initDisplay = undefined;
        if(ops.includes(innerText)) {
          if (ops.includes(lastPressed) && innerText !== '-' ) {
            const lastNumberIdx = calc.split('').reverse().findIndex(char => char !== ' ' && nums.includes(+char));
            initDisplay = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
          } else {
            initDisplay = `${calc}  ${innerText} `;
          }
        } else {
          initDisplay =
            (currentNumber === "0") ? innerText : (currentNumber  +   innerText);
        }

        this.setState({
          calc: initDisplay,
          currentNumber: initDisplay
        })
      }
    }
    this.setState({
      lastPressed: innerText
    });
  }

  render() {
    const { currentNumber } = this.state
    return (
      <div className="container">
        <div className="calculator">
          <div id="display" className="calculator__display">
             {currentNumber}
          </div>
          <div className="calculator__keys">
            {ops.map((op) => (
              <button
                className="key--operator"
                key={op}
                onClick={this.handleClick}
                id={ids[op]}
              >
                {op}
              </button>
            ))}

            {nums.map((num) => (
              <button
                className=""
                key={num}
                onClick={this.handleClick}
                id={ids[num]}
              >
                {num}
              </button>
            ))}
            <button
              id="decimal"
              data-action="decimal"
              onClick={this.handleClick}
            >
              .
            </button>
            <button id="clear" className="clear-btn" onClick={this.handleClick}>
              AC
            </button>
            <button
              className="key--equal"
              id="equals"
              onClick={this.handleClick}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default App;