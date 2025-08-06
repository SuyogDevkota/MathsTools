import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);
  const [isScientific, setIsScientific] = useState(false);

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      addToHistory(`${currentValue} ${operation} ${inputValue} = ${newValue}`);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '^':
        return Math.pow(firstValue, secondValue);
      default:
        return secondValue;
    }
  };

  const addToHistory = (calculation) => {
    setHistory(prev => [calculation, ...prev.slice(0, 9)]);
  };

  const scientificFunction = (func) => {
    const value = parseFloat(display);
    let result;

    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'square':
        result = value * value;
        break;
      case 'cube':
        result = value * value * value;
        break;
      case 'factorial':
        result = factorial(value);
        break;
      case 'inverse':
        result = 1 / value;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    addToHistory(`${func}(${value}) = ${result}`);
  };

  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const useHistoryItem = (calculation) => {
    const result = calculation.split('=')[1].trim();
    setDisplay(result);
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-header">
          <h2>Mathematics Calculator</h2>
          <button 
            className={`mode-toggle ${isScientific ? 'active' : ''}`}
            onClick={() => setIsScientific(!isScientific)}
          >
            {isScientific ? 'Basic' : 'Scientific'}
          </button>
        </div>

        <div className="display-container">
          <div className="display">{display}</div>
          <div className="operation-display">{operation}</div>
        </div>

        <div className="calculator-body">
          <div className="calculator-main">
            <div className="button-grid">
              {/* Scientific Functions */}
              {isScientific && (
                <>
                  <button className="function-btn" onClick={() => scientificFunction('sin')}>sin</button>
                  <button className="function-btn" onClick={() => scientificFunction('cos')}>cos</button>
                  <button className="function-btn" onClick={() => scientificFunction('tan')}>tan</button>
                  <button className="function-btn" onClick={() => scientificFunction('log')}>log</button>
                  <button className="function-btn" onClick={() => scientificFunction('ln')}>ln</button>
                  <button className="function-btn" onClick={() => scientificFunction('sqrt')}>√</button>
                  <button className="function-btn" onClick={() => scientificFunction('square')}>x²</button>
                  <button className="function-btn" onClick={() => scientificFunction('cube')}>x³</button>
                  <button className="function-btn" onClick={() => scientificFunction('factorial')}>x!</button>
                  <button className="function-btn" onClick={() => scientificFunction('inverse')}>1/x</button>
                </>
              )}

              {/* Basic Calculator */}
              <button className="clear-btn" onClick={clearAll}>AC</button>
              <button className="operator-btn" onClick={() => performOperation('÷')}>÷</button>
              <button className="operator-btn" onClick={() => performOperation('×')}>×</button>
              
              <button className="digit-btn" onClick={() => inputDigit(7)}>7</button>
              <button className="digit-btn" onClick={() => inputDigit(8)}>8</button>
              <button className="digit-btn" onClick={() => inputDigit(9)}>9</button>
              <button className="operator-btn" onClick={() => performOperation('-')}>-</button>
              
              <button className="digit-btn" onClick={() => inputDigit(4)}>4</button>
              <button className="digit-btn" onClick={() => inputDigit(5)}>5</button>
              <button className="digit-btn" onClick={() => inputDigit(6)}>6</button>
              <button className="operator-btn" onClick={() => performOperation('+')}>+</button>
              
              <button className="digit-btn" onClick={() => inputDigit(1)}>1</button>
              <button className="digit-btn" onClick={() => inputDigit(2)}>2</button>
              <button className="digit-btn" onClick={() => inputDigit(3)}>3</button>
              <button className="equals-btn" onClick={() => performOperation('=')}>=</button>
              
              <button className="digit-btn zero" onClick={() => inputDigit(0)}>0</button>
              <button className="digit-btn" onClick={inputDecimal}>.</button>
              {isScientific && (
                <button className="operator-btn" onClick={() => performOperation('^')}>^</button>
              )}
            </div>
          </div>

          <div className="calculator-sidebar">
            <div className="history-section">
              <div className="history-header">
                <h3>History</h3>
                <button className="clear-history-btn" onClick={clearHistory}>Clear</button>
              </div>
              <div className="history-list">
                {history.map((calculation, index) => (
                  <div 
                    key={index} 
                    className="history-item"
                    onClick={() => useHistoryItem(calculation)}
                  >
                    {calculation}
                  </div>
                ))}
                {history.length === 0 && (
                  <div className="no-history">No calculations yet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator; 