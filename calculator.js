let buttons = document.querySelectorAll("button");
let p = document.querySelector(".p_calculate");

let divide = document.querySelector("#btn_divide");
let multiply = document.querySelector("#btn_multiply");
let add = document.querySelector("#btn_add");
let subtract = document.querySelector("#btn_subtract");
let equals = document.querySelector("#btn_equals");
let reset = document.querySelector("#btn_reset");

let operations = []; // Масив для чисел і операторів
let currentInput = ""; // Поточний ввід числа

// Додавання числа або крапки до поточного введення
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (!isNaN(value) || value === ".") {
            currentInput += value;
            p.innerText = currentInput;
        }
    });
});

// Обробка оператора
function handleOperator(operator) {
    if (currentInput !== "") {
        operations.push(Number(currentInput)); // Додаємо поточне число
        currentInput = ""; // Очищуємо ввід
    }
    if (operations.length > 0) {
        operations.push(operator); // Додаємо оператор
    }
}

// Події для операторів
divide.addEventListener("click", () => handleOperator("/"));
multiply.addEventListener("click", () => handleOperator("*"));
add.addEventListener("click", () => handleOperator("+"));
subtract.addEventListener("click", () => handleOperator("-"));

// Обчислення результату
equals.addEventListener("click", () => {
    if (currentInput !== "") {
        operations.push(Number(currentInput)); // Додаємо останнє число
        currentInput = ""; // Очищуємо ввід
    }

    // Виконання операцій за пріоритетом
    let result = calculate();
    p.innerText = result;
    operations = [result]; // Зберігаємо результат для подальших обчислень
});

// Скидання калькулятора
reset.addEventListener("click", () => {
    p.innerText = "";
    operations = [];
    currentInput = "";
});

// Функція для обчислення
function calculate() {
    let numbers = [...operations.filter((item) => typeof item === "number")];
    let operators = [...operations.filter((item) => typeof item === "string")];

    // Виконання операцій з пріоритетом: * і /
    while (operators.includes("*") || operators.includes("/")) {
        let index = operators.findIndex((op) => op === "*" || op === "/");
        let result =
            operators[index] === "*"
                ? numbers[index] * numbers[index + 1]
                : numbers[index] / numbers[index + 1];
        numbers.splice(index, 2, result); // Замінюємо два числа результатом
        operators.splice(index, 1); // Видаляємо оператор
    }

    // Виконання операцій: + і -
    while (operators.length > 0) {
        let result =
            operators[0] === "+"
                ? numbers[0] + numbers[1]
                : numbers[0] - numbers[1];
        numbers.splice(0, 2, result); // Замінюємо два числа результатом
        operators.shift(); // Видаляємо оператор
    }

    return numbers[0]; // Повертаємо результат
}