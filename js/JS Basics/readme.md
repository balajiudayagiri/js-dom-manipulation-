# JavaScript Basics: A Visual Guide with Mermaid Diagrams

JavaScript is a versatile language powering the web. Understanding its fundamental concepts is essential for any developer. Below you'll find explanations of key JavaScript features alongside Mermaid diagrams that visually explain the flow and structure.

---

## 1. Variables: `var`, `let`, and `const`

### `var` (Function Scoped, Hoisted)

* Function scoped and hoisted.
* Can be redeclared and updated anywhere in the function.

```javascript
function showVarScope() {
    console.log(myVar); // undefined (hoisted)
    var myVar = "I am function-scoped";

    if (true) {
        var myVar = "Changed and redeclared!";
        console.log(myVar); // "Changed and redeclared!"
    }
    console.log(myVar); // "Changed and redeclared!"
}
showVarScope();
```

```mermaid
graph TD
    A[Global Scope] --> B["function showVarScope()"]
    B --> C["var myVar = 'I am function-scoped'"]
    C --> D["console.log(myVar) before init → undefined"]
    B --> E["if true block"]
    E --> F["var myVar changed and redeclared"]
    F --> G["console.log(myVar) inside block"]
    E --> H["End of if block"]
    H --> I["console.log(myVar) outside block"]

    subgraph FuncScope
        C
        F
        G
        I
    end

```

---

### `let` and `const` (Block Scoped, Modern)

* Block scoped, cannot be accessed before declaration (Temporal Dead Zone).
* `let` can be reassigned, `const` cannot.

```javascript
function showLetConstScope() {
    let myLet = "Block scoped let";
    const myConst = "Constant value";

    if (true) {
        let myLet = "New let in block";
        const myConst = "New const in block";
        console.log(myLet, myConst); // inside block
    }

    console.log(myLet, myConst); // outside block
}
showLetConstScope();
```

```mermaid
graph TD
    A[Global Scope] --> B{"function showLetConstScope()"}
    B --> C["let myLet = 'Block scoped let'"]
    B --> D["const myConst = Constant value"]
    B --> E{"if (true) block"}
    E --> F["let myLet = 'New let in block'"]
    E --> G["const myConst = 'New const in block'"]
    F --> H["console.log(myLet, myConst) inside block"]
    E --> I["End block"]
    I --> J["console.log(myLet, myConst) outside block"]

    subgraph FuncScope ["showLetConstScope() Scope"]
        C
        D
        J
    end

    subgraph BlockScope [if block Scope]
        F
        G
        H
    end
```

---

## 2. Data Types in JavaScript

* **Primitive:** String, Number, Boolean, null, undefined, Symbol, BigInt.
* **Non-Primitive:** Objects (including Arrays and Functions).

```javascript
let name = "Alice";      // String
let age = 25;            // Number
let isStudent = true;    // Boolean
let nothing = null;      // null
let notAssigned;         // undefined
const id = Symbol("id"); // Symbol
const bigNum = 12345678901234567890n; // BigInt

let person = { name: "Bob", age: 30 }; // Object
let colors = ["Red", "Green"];          // Array
function greet() { console.log("Hi!"); } // Function
```

```mermaid
graph LR
    A[JavaScript Data Types] --> B(Primitive)
    B --> B1[String]
    B --> B2[Number]
    B --> B3[Boolean]
    B --> B4[null]
    B --> B5[undefined]
    B --> B6[Symbol]
    B --> B7[BigInt]

    A --> C(Non-Primitive)
    C --> C1[Object]
    C1 --> C1a[Plain Objects]
    C1 --> C1b[Arrays]
    C1 --> C1c[Functions]
```

---

## 3. Operators

* **Arithmetic:** `+`, `-`, `*`, `/`, `%`, `**`
* **Assignment:** `=`, `+=`, `-=`, etc.
* **Comparison:** `==`, `===`, `!=`, `!==`, `<`, `>`
* **Logical:** `&&`, `||`, `!`
* **Ternary:** `condition ? expr1 : expr2`

```javascript
let x = 5;
x += 10; // 15
console.log(x > 10); // true
console.log(x === "15"); // false (strict)
let result = (x > 10) ? "Greater" : "Smaller";
console.log(result); // "Greater"
```



---

## 4. Conditionals

### `if` / `else if` / `else`

```javascript
let score = 85;
if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B"); // Runs here
} else {
    console.log("Grade: F");
}
```

```mermaid
graph TD
    A[Start] --> B{score >= 90?}
    B -- Yes --> C[Grade: A]
    B -- No --> D{score >= 80?}
    D -- Yes --> E[Grade: B]
    D -- No --> F[Grade: F]
    C --> G[End]
    E --> G
    F --> G
```

---

### `switch`

```javascript
let fruit = "apple";
switch (fruit) {
    case "banana":
        console.log("Banana");
        break;
    case "apple":
        console.log("Apple"); // Runs here
        break;
    default:
        console.log("Unknown fruit");
}
```

```mermaid
graph TD
    A[Start] --> B[Evaluate expression]
    B --> C{Case: banana?}
    C -- Yes --> D[Print Banana]
    D --> E[Break]
    C -- No --> F{Case: apple?}
    F -- Yes --> G[Print Apple]
    G --> E
    F -- No --> H[Default Case]
    H --> E
    E --> I[End]
```

---

## 5. Loops

### `for` Loop

```javascript
for (let i = 0; i < 3; i++) {
    console.log(i);
}
```

```mermaid
graph TD
    A[Start] --> B[Initialize i=0]
    B --> C{i < 3?}
    C -- Yes --> D[Execute Body]
    D --> E[Increment i]
    E --> C
    C -- No --> F[End]
```

---

### `while` Loop

```javascript
let count = 3;
while (count > 0) {
    console.log(count);
    count--;
}
```

```mermaid
graph TD
    A[Start] --> B{count > 0?}
    B -- Yes --> C[Execute Body]
    C --> D[Decrement count]
    D --> B
    B -- No --> E[End]
```

---

### `do...while` Loop

```javascript
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 0);
```

---

### `for...of` Loop (Iterables)

```javascript
const fruits = ["apple", "banana"];
for (const fruit of fruits) {
    console.log(fruit);
}
```

```mermaid
graph TD
    A[Start] --> B[Get Iterable]
    B --> C{More elements?}
    C -- Yes --> D[Get next value]
    D --> E[Execute Body]
    E --> C
    C -- No --> F[End]
```

---

### `for...in` Loop (Object Properties)

```javascript
const car = { make: "Toyota", model: "Camry" };
for (const key in car) {
    console.log(`${key}: ${car[key]}`);
}
```

```mermaid
graph TD
    A[Start] --> B[Get Object]
    B --> C{More enumerable properties?}
    C -- Yes --> D[Get next key]
    D --> E[Execute Body]
    E --> C
    C -- No --> F[End]
```

---

### `forEach` (Array Method)

```javascript
[10, 20, 30].forEach((num, idx) => {
    console.log(`Index ${idx}: ${num}`);
});
```

```mermaid
graph TD
    A[Start] --> B[Get Array]
    B --> C[Define Callback]
    C --> D{For each element}
    D --> E[Invoke Callback]
    E --> D
    D --> F[End]
```
