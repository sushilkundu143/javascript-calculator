import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(""); // Stores the current input expression
  const [result, setResult] = useState("0"); // Stores the evaluated result
  const [isEvaluated, setIsEvaluated] = useState(false); // Tracks if the result is already evaluated

  // Handles button clicks for numbers, operators, and decimals
  const onChange = (e) => {
    const text = e.target.innerText; // Get button text (number, operator, or decimal)
  
    if (isEvaluated && !isNaN(text)) {
      setData(text);
      setIsEvaluated(false);
      return;
    }
  
    // If the input is an operator or a decimal
    if (text === "x" || text === "/" || text === "-" || text === "+" || text === ".") {
      // Prevent operator/decimal being the first input
      if (data === "" && text !== ".") return;
  
      const lastChar = data[data.length - 1]; // Get the last character of the current data
  
      // Allow only one decimal in the current number segment
      const segments = data.split(/[-+x/]/); // Split input by operators
      const currentSegment = segments[segments.length - 1]; // Get the current number segment
  
      // Prevent multiple decimals in the current number segment
      if (text === "." && currentSegment.includes(".")) return;
  
      // Special handling for consecutive operators
      if (isNaN(lastChar)) {
        if (text === "-" && lastChar !== "-") {
          // Allow a negative sign after any operator
          setData((prev) => prev + text);
        } else if (text !== "-") {
          // Allow other operators only if the last character is not a negative sign
          if (lastChar === "-" && isNaN(data[data.length - 2])) {
            setData((prev) => prev + text); // Append + after -
          } else {
            setData(data.slice(0, -1) + text); // Replace the last operator
          }
        }
      } else {
        setData((prev) => prev + text); // Append operator or decimal
      }
    } else {
      // Handle numeric input and prevent multiple leading zeros
      if (data === "0" && text === "0") return;
      setData((prev) => (prev === "0" ? text : prev + text)); // Append digits
    }
  
    setIsEvaluated(false); // Reset evaluated flag
  };
  
  // Clears the calculator screen and reset values
  const onClear = () => {
    setData(""); // Clear input
    setResult("0"); // Reset result to 0
  };

  // Helper function to clean up consecutive operators
  const cleanUpExpression = (expression) => {
    // Replace multiple operators (excluding '-') with the last one
    return expression.replace(/([*/+-]){3,}/g, (match) => match.slice(-1));
  };

  // Calculates the result based on the current input expression
  const calculateResult = () => {
    try {
      let expression = data.replace("x", "*"); // Replace "x" with "*" for multiplication

      // Clean up the expression (remove consecutive operators)
      expression = cleanUpExpression(expression);
      console.log(">>> expression ::", expression);

      let evaluated = eval(expression); // Evaluate the expression using JavaScript's eval()

      // Fix decimal precision to 4 places and ensure it's a number
      evaluated = Number(evaluated.toFixed(4));
      setResult(evaluated); // Display result
      setData(evaluated.toString()); // Set result as new input
      setIsEvaluated(true); // Mark as evaluated
    } catch (error) {
      setResult(error); // Handle invalid expressions
    }
  };

  // Updates the display with the current input or result
  useEffect(() => {
    const operators = ["x", "/", "-", "+"];

    // If the input contains no operators, just display the number
    const containsOperator = operators.some((operator) => data.includes(operator));

    if (data.length > 0 && !containsOperator) {
      setResult(data); // Display the number input
    } else if (data.length > 0 && operators.includes(data[data.length - 1])) {
      setResult(data[data.length - 1]); // Display the last operator
    } else if(data.length === 0 || data === 0) {
      setResult("0"); // Default display value
    }
  }, [data]); // Re-run this logic whenever data (input expression) changes

  return (
    <div className="bg-gray-200 h-screen w-full flex items-center justify-center">
      <div className="calculator w-1/3">
        <div className="h-400 shadow-xl bg-white rounded-md p-2">
          <div className="w-full h-10 bg-gray-100 p-2">{data}</div>
          <div className="w-full h-10 bg-gray-100 mb-1 p-2" id="display">
            {result}
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="zero" onClick={onChange}>
              0
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="one" onClick={onChange}>
              1
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="two" onClick={onChange}>
              2
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="three" onClick={onChange}>
              3
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="four" onClick={onChange}>
              4
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="five" onClick={onChange}>
              5
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="six" onClick={onChange}>
              6
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="seven" onClick={onChange}>
              7
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="eight" onClick={onChange}>
              8
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="nine" onClick={onChange}>
              9
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="decimal" onClick={onChange}>
              .
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="clear" onClick={onClear}>
              AC
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="divide" onClick={onChange}>
              /
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="multiply" onClick={onChange}>
              x
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="add" onClick={onChange}>
              +
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg" id="subtract" onClick={onChange}>
              -
            </button>
            <button className="p-4 rounded-lg shadow-md bg-gray-500 hover:bg-gray-600 hover:shadow-lg col-span-2" id="equals" onClick={calculateResult}>
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
