function divide(dividend, divisor){
    if(divisor === 0){
        return ("You're trying to divide by zero.")
    }else {
        let result = dividend / divisor;
        return result;
    }
}
console.log(divide(4, 2));
console.log(divide(7, 0));
console.log(divide(100, 5));
console.log(divide(1, 4));

divide();

function divide(dividend, divisor){
    if(divisor === 0){
      return "You're trying to divide by zero."
    }else{
      let result = dividend / divisor;
      return result;
    }
  }

  // a function without a return statement
function add(number1, number2) {
    console.log(number1 + number2);
  }
  let result2 = add(1, 2);
  console.log(result2)
  
  // a function with a return statement
  function multiply(number1, number2) {
    return number1 * number2;
  }
  let result = multiply(3, 5);
  console.log(result);