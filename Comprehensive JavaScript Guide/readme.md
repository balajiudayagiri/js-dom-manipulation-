# Comprehensive JavaScript Guide

This guide covers over 30 essential JavaScript concepts, common interview questions, and best practices. Each topic includes detailed explanations, illustrative code snippets, and relevant notes to solidify your understanding.

## 1. Understanding `var`, `let`, and `const`

**Explanation:** These keywords declare variables in JavaScript, but they differ significantly in their scope, hoisting behavior, and mutability.

* **`var`**:
    * **Function-scoped**: Variables declared with `var` are accessible throughout the entire function in which they are declared, regardless of block boundaries (like `if` statements or `for` loops).
    * **Hoisted**: `var` declarations are hoisted to the top of their function or global scope, meaning you can reference them before their actual declaration in the code. However, only the declaration is hoisted, not the initialization (`undefined` will be the value).
    * **Can be redeclared and reassigned**: You can declare a `var` variable with the same name multiple times in the same scope, and you can change its value.

* **`let`**:
    * **Block-scoped**: Variables declared with `let` are limited to the block (e.g., `if` block, `for` loop, or any `{}` curly braces) in which they are defined.
    * **Hoisted (but in Temporal Dead Zone - TDZ)**: `let` declarations are hoisted to the top of their block, but they cannot be accessed before their initialization. Attempting to do so will result in a `ReferenceError`. This period is known as the Temporal Dead Zone.
    * **Can be reassigned but not redeclared**: You can change the value of a `let` variable, but you cannot declare another `let` variable with the same name in the same scope.

* **`const`**:
    * **Block-scoped**: Similar to `let`, `const` variables are block-scoped.
    * **Hoisted (but in Temporal Dead Zone - TDZ)**: Like `let`, `const` declarations are hoisted but are in the Temporal Dead Zone until initialized.
    * **Cannot be reassigned or redeclared**: Once a `const` variable is assigned a value, it cannot be changed. Also, you cannot redeclare a `const` variable in the same scope.
    * **Important Note for Objects/Arrays**: While the `const` variable itself cannot be reassigned to a new value, the *contents* (properties of objects or elements of arrays) it refers to *can* be modified. `const` only ensures that the *reference* itself remains constant.

**Best Practice:**
Use `const` by default for values that won’t change. Use `let` when reassignment is necessary. **Avoid `var`** to prevent common pitfalls related to scoping and hoisting.

**Code Snippet:**

```javascript
// --- var example ---
function varExample() {
  var x = 10;
  if (true) {
    var x = 20; // Redeclares x in the same function scope
    console.log("Inside if (var x):", x); // 20
  }
  console.log("Outside if (var x):", x); // 20
}
varExample();

console.log(varA); // undefined (hoisted)
var varA = 100;


// --- let example ---
function letExample() {
  let y = 10;
  if (true) {
    let y = 20; // Declares a new 'y' variable, block-scoped to the if-block
    console.log("Inside if (let y):", y); // 20
  }
  console.log("Outside if (let y):", y); // 10
}
letExample();

// console.log(letB); // ReferenceError: Cannot access 'letB' before initialization (TDZ)
let letB = 200;


// --- const example ---
function constExample() {
  const z = 10;
  // z = 20; // TypeError: Assignment to constant variable.
  console.log("const z:", z); // 10

  const obj = { name: "initial" };
  obj.name = "changed"; // Allowed: modifying the content of the object
  console.log("const obj:", obj.name); // changed

  // obj = { name: "new" }; // TypeError: Assignment to constant variable.
}
constExample();
```

---

## 2. Hoisting in JavaScript

**Explanation:**
Hoisting is JavaScript’s default behavior of moving declarations to the "top" of their current scope during the compilation phase, before code execution. This means you can use variables and functions before you've explicitly declared them in your code.

* **`var` declarations**: Are hoisted to the top of their function or global scope and are initialized with `undefined`.
* **`let` and `const` declarations**: Are also hoisted, but they are placed into a **Temporal Dead Zone (TDZ)**. This means they are not accessible before their actual declaration in the code. Attempting to access them in the TDZ will result in a `ReferenceError`.
* **Function declarations**: Are fully hoisted, meaning both the function's name and its definition are moved to the top, so you can call them before they are declared.
* **Function expressions**: (e.g., `const myFunction = function() { ... }` or arrow functions) are treated like variable declarations (`let` or `const`) and are subject to the TDZ.

**Code Snippet:**

```javascript
// 1. var hoisting
console.log(varVariable); // undefined (declaration hoisted, initialization stays)
var varVariable = 5;
console.log(varVariable); // 5

// 2. let and const hoisting (Temporal Dead Zone)
// console.log(letVariable); // ReferenceError: Cannot access 'letVariable' before initialization
let letVariable = 10;

// console.log(constVariable); // ReferenceError: Cannot access 'constVariable' before initialization
const constVariable = 20;

// 3. Function declaration hoisting
myFunction(); // "Hello from function declaration!"

function myFunction() {
  console.log("Hello from function declaration!");
}

// 4. Function expression hoisting (treated like var/let/const)
// myOtherFunction(); // TypeError: myOtherFunction is not a function (if using var)
// myOtherFunction(); // ReferenceError: Cannot access 'myOtherFunction' before initialization (if using let/const)
const myOtherFunction = function() {
  console.log("Hello from function expression!");
};
myOtherFunction(); // This works now
```

---

## 3. Closures in JavaScript

**Explanation:**
A closure is a powerful and fundamental concept in JavaScript. It refers to a function that **remembers and retains access to its lexical (surrounding) scope**, even when that outer function has finished executing and its execution context has been popped off the call stack.

This means a closure "closes over" the variables from its parent scope.

**Key characteristics:**
* A function `A` defined inside another function `B`.
* Function `A` refers to variables declared in `B`.
* Function `B` returns function `A`.
* When `B` finishes executing, its local variables would normally be garbage-collected. However, because `A` (the closure) still references them, they persist in memory.

**Code Snippet:**

```javascript
function outer() {
  let count = 0; // 'count' is in the lexical scope of 'inner'

  return function inner() { // 'inner' is the closure
    count++; // 'inner' accesses 'count' from its outer scope
    console.log(count);
  };
}

const increment1 = outer(); // 'increment1' is now the 'inner' function returned by the first call to 'outer'
increment1(); // Output: 1 (count for this closure instance)
increment1(); // Output: 2

const increment2 = outer(); // 'increment2' is a new 'inner' function from a second call to 'outer',
                            // creating a *new* lexical environment and a *new* 'count' variable.
increment2(); // Output: 1 (count for this new closure instance)
increment1(); // Output: 3 (the first closure's count continues to increment)
```

---

## 4. Event Bubbling vs. Event Capturing

**Explanation:**
When an event occurs on an HTML element, it doesn't just happen on that element. It propagates through the DOM tree. The two main phases of this propagation are Event Capturing and Event Bubbling.

* **Event Bubbling (default)**:
    * The event starts at the **target element** (where the event actually occurred).
    * It then "bubbles up" through its parent elements, grandparent elements, and so on, all the way to the `document` object.
    * Event handlers for the same event type are triggered on each element in the bubbling path.
    * This is the default behavior for most DOM events.

* **Event Capturing (trickle down)**:
    * The event starts from the **root of the DOM tree** (`window` or `document`).
    * It then "captures down" (travels down) through the intermediate parent elements until it reaches the actual target element.
    * Event handlers in the capturing phase are triggered first, before the bubbling phase.
    * You explicitly enable capturing by passing `true` as the third argument to `addEventListener()`.

**Analogy:**
Imagine dropping a pebble (`event`) into a pond (`DOM`).
* **Capturing:** The ripples start at the edge of the pond and move inwards towards where the pebble hits.
* **Bubbling:** The ripples start where the pebble hits and move outwards to the edge of the pond.

**Code Snippet:**

```html
<div id="grandparent" style="padding: 20px; background: lightblue;">
  Grandparent
  <div id="parent" style="padding: 20px; background: lightgreen;">
    Parent
    <button id="child">Child Button</button>
  </div>
</div>

<script>
  const grandparent = document.getElementById('grandparent');
  const parent = document.getElementById('parent');
  const child = document.getElementById('child');

  // Capturing Phase listeners (third argument is true)
  grandparent.addEventListener('click', () => console.log('Grandparent (Capturing)'), true);
  parent.addEventListener('click', () => console.log('Parent (Capturing)'), true);
  child.addEventListener('click', () => console.log('Child (Capturing)'), true); // Will still trigger, but it's the target

  // Bubbling Phase listeners (third argument is false or omitted)
  grandparent.addEventListener('click', () => console.log('Grandparent (Bubbling)'), false);
  parent.addEventListener('click', () => console.log('Parent (Bubbling)'), false);
  child.addEventListener('click', () => console.log('Child (Bubbling)'), false); // This is the actual target

  // When 'Child Button' is clicked, the console output order will be:
  // Grandparent (Capturing)
  // Parent (Capturing)
  // Child (Capturing) - (This is the target, so it fires in both phases if registered)
  // Child (Bubbling)
  // Parent (Bubbling)
  // Grandparent (Bubbling)
</script>
```

---

## 5. `this` Keyword in JavaScript

**Explanation:**
The `this` keyword is one of the most frequently misunderstood concepts in JavaScript. Its value is **dynamic** and depends entirely on **how a function is called (its execution context)**, not where it is defined.

**Common Scenarios for `this`:**

1.  **Global Context (outside any function):** In a browser, `this` refers to the `window` object. In Node.js, it refers to the `global` object or `module.exports` depending on the context.
2.  **Method Call (function as an object property):** When a function is called as a method of an object (`obj.method()`), `this` refers to the **object itself** (`obj`).
3.  **Simple Function Call (non-method):** When a function is called as a standalone function (not a method of an object), `this` typically refers to the **global object** (`window` in browsers, `undefined` in strict mode). In strict mode, `this` remains `undefined` if not explicitly set.
4.  **Constructor Call (using `new`):** When a function is called with the `new` keyword (`new MyObject()`), `this` refers to the **newly created instance** of the object.
5.  **Explicit Binding (`call`, `apply`, `bind`):** You can explicitly set the value of `this` using these methods (see section 8).
6.  **Arrow Functions (`=>`):** Arrow functions do **not have their own `this` context**. Instead, `this` inside an arrow function is lexically scoped; it refers to the `this` value of the *enclosing execution context* where the arrow function was defined. This makes them predictable.

**Code Snippet:**

```javascript
// 1. Global context
console.log(this === window); // true (in browser)

// 2. Method Call
const person = {
  name: "Alice",
  greet: function() {
    console.log(`Hello, ${this.name}`);
  }
};
person.greet(); // Output: "Hello, Alice" (`this` refers to `person`)

// 3. Simple Function Call (non-strict mode in browser)
const greetFunction = person.greet;
greetFunction(); // Output: "Hello, " (this.name is `window.name` which is empty or undefined)
                // In strict mode: TypeError: Cannot read properties of undefined (reading 'name')

// 4. Constructor Call
function Car(make) {
  this.make = make;
}
const myCar = new Car("Honda");
console.log(myCar.make); // Output: "Honda" (`this` refers to `myCar`)

// 5. Arrow Function
const anotherPerson = {
  name: "Bob",
  sayHi: function() {
    const innerArrow = () => {
      console.log(`Hi, ${this.name}`); // `this` is lexically bound to `sayHi`'s `this` (which is `anotherPerson`)
    };
    innerArrow();
  },
  sayHelloArrow: () => {
    // `this` here refers to the `this` of the global scope (window in browser)
    console.log(`Hello, ${this.name}`);
  }
};
anotherPerson.sayHi(); // Output: "Hi, Bob"
anotherPerson.sayHelloArrow(); // Output: "Hello, " (window.name)
```

---

## 6. JavaScript Asynchronous Programming (Callbacks, Promises, and async/await)

**Explanation:**
JavaScript is single-threaded, meaning it executes code sequentially. However, to handle long-running operations (like network requests, file I/O) without blocking the main thread, it uses asynchronous programming.

* **Callbacks:**
    * Functions passed as arguments to other functions, to be executed later (after an asynchronous operation completes).
    * **Pros**: Simple for basic async operations.
    * **Cons**: Can lead to "Callback Hell" or "Pyramid of Doom" for nested asynchronous operations, making code hard to read and maintain.

* **Promises:**
    * Objects that represent the eventual completion (or failure) of an asynchronous operation and its resulting value.
    * They provide a more structured and manageable way to handle async code than callbacks, solving "callback hell."
    * A Promise can be in one of three states:
        * **Pending**: Initial state, neither fulfilled nor rejected.
        * **Fulfilled (Resolved)**: Meaning the operation completed successfully.
        * **Rejected**: Meaning the operation failed.
    * Methods: `.then()` (for resolved), `.catch()` (for rejected), `.finally()` (always executes).

* **`async`/`await`:**
    * Syntactic sugar built on top of Promises, introduced in ES2017.
    * Makes asynchronous code look and behave more like synchronous code, improving readability and maintainability.
    * **`async` function**: A function declared with `async` always returns a Promise.
    * **`await` operator**: Can only be used inside an `async` function. It pauses the execution of the `async` function until the Promise it's waiting for settles (resolves or rejects). If the Promise resolves, `await` returns its resolved value. If it rejects, `await` throws an error, which can be caught with `try...catch`.

**Code Snippet (Callbacks):**

```javascript
function getData(callback) {
  setTimeout(() => {
    const data = "Fetched data!";
    callback(data);
  }, 1000);
}

getData(function(data) {
  console.log("Callback:", data); // Output: "Callback: Fetched data!" after 1 second
});
```

**Code Snippet (Promises):**

```javascript
const fetchDataPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true; // Simulate success or failure
      if (success) {
        resolve("Data successfully fetched!");
      } else {
        reject("Failed to fetch data.");
      }
    }, 1500);
  });
};

fetchDataPromise()
  .then(result => {
    console.log("Promise Resolved:", result); // Output: "Promise Resolved: Data successfully fetched!"
  })
  .catch(error => {
    console.error("Promise Rejected:", error);
  })
  .finally(() => {
    console.log("Promise finished.");
  });

// Chaining promises
fetchDataPromise()
  .then(data => {
    console.log("First chain:", data);
    return "Processed " + data;
  })
  .then(processedData => {
    console.log("Second chain:", processedData);
  })
  .catch(err => {
    console.error("Chain error:", err);
  });
```

**Code Snippet (`async`/`await`):**

```javascript
async function fetchDataAsync() {
  try {
    console.log("Fetching data...");
    const response = await new Promise(resolve => setTimeout(() => resolve({ message: "Async data" }), 2000));
    // Or a real fetch call:
    // const response = await fetch("https://api.example.com/data");
    // const data = await response.json();

    console.log("Async/await:", response.message);
  } catch (error) {
    console.error("Async/await Error:", error);
  } finally {
    console.log("Async/await function finished.");
  }
}

fetchDataAsync();
```

---

## 7. JavaScript Prototypal Inheritance

**Explanation:**
Unlike class-based inheritance in languages like Java or C++, JavaScript uses **Prototypal Inheritance**. This means that objects inherit properties and methods directly from other objects (their prototypes).

* Every JavaScript object has an internal property called `[[Prototype]]` (exposed as `__proto__` in many environments, but it's best to use `Object.getPrototypeOf()` or `obj.prototype` for constructors).
* When you try to access a property or method on an object, if it's not found directly on the object, JavaScript will look up its prototype chain until it finds the property or reaches the end of the chain (`null`).
* **Constructor functions** (`function Animal() {}`) have a `prototype` property that points to the object that will serve as the prototype for instances created with `new`.
* **`Object.create()`**: A method that allows you to create a new object with a specified prototype object.

**Code Snippet:**

```javascript
// 1. Using Constructor Functions and prototype
function Animal(name) {
  this.name = name;
}

// Add a method to the Animal's prototype.
// All instances created with 'new Animal()' will inherit this method.
Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound.`);
};

Animal.prototype.eat = function() {
    console.log(`${this.name} is eating.`);
};

const dog = new Animal('Dog');
dog.speak(); // Output: "Dog makes a sound."
dog.eat();   // Output: "Dog is eating."

console.log(dog.__proto__ === Animal.prototype); // true

// You can extend the prototype chain further
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor to inherit name
  this.breed = breed;
}

// Inherit Animal's prototype methods (e.g., speak, eat)
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Set the constructor back to Dog

// Add a Dog-specific method
Dog.prototype.bark = function() {
  console.log(`${this.name} (${this.breed}) barks loudly!`);
};

const myDog = new Dog('Buddy', 'Golden Retriever');
myDog.speak(); // Output: "Buddy makes a sound." (inherited from Animal.prototype)
myDog.bark();  // Output: "Buddy (Golden Retriever) barks loudly!"

// 2. Using Object.create() for direct prototypal linking
const animalPrototype = {
  sound: 'generic sound',
  makeSound: function() {
    console.log(this.sound);
  }
};

const lion = Object.create(animalPrototype);
lion.sound = 'Roar'; // 'lion' now has its own 'sound' property
lion.makeSound(); // Output: "Roar"

const sheep = Object.create(animalPrototype);
sheep.makeSound(); // Output: "generic sound" (inherited from animalPrototype)
```

---

## 8. `bind()`, `call()`, and `apply()`

**Explanation:**
These three methods are fundamental for explicitly controlling the `this` context of a function. They are available on all JavaScript functions.

* **`call()`**:
    * **Immediately invokes** the function.
    * Allows you to set the `this` value explicitly.
    * Arguments are passed **individually** after the `this` context.
    * Syntax: `func.call(thisArg, arg1, arg2, ...)`

* **`apply()`**:
    * **Immediately invokes** the function.
    * Allows you to set the `this` value explicitly.
    * Arguments are passed as a **single array (or array-like object)**.
    * Syntax: `func.apply(thisArg, [argsArray])`
    * Useful when you have arguments as an array or need to dynamically determine arguments.

* **`bind()`**:
    * **Does NOT immediately invoke** the function.
    * Returns a **new function** with the `this` context permanently bound to a specified value.
    * Arguments can be provided either when `bind()` is called (partial application) or when the new bound function is eventually invoked.
    * Syntax: `const newFunc = func.bind(thisArg, arg1, arg2, ...)`
    * Useful for event handlers or when passing functions as callbacks where the `this` context might otherwise be lost.

**Code Snippet:**

```javascript
const person = {
  name: "Alice",
  age: 30
};

function greet(greeting, punctuation) {
  console.log(`${greeting}, my name is ${this.name}. I am ${this.age} ${punctuation}`);
}

// --- call() example ---
console.log("--- call() ---");
greet.call(person, "Hello", "!"); // Output: "Hello, my name is Alice. I am 30 !"
// Immediately invokes 'greet' with 'person' as 'this'

const anotherPerson = { name: "Bob", age: 25 };
greet.call(anotherPerson, "Hi", "."); // Output: "Hi, my name is Bob. I am 25 ."


// --- apply() example ---
console.log("--- apply() ---");
const args = ["Hey", "!!!"];
greet.apply(person, args); // Output: "Hey, my name is Alice. I am 30 !!!"
// Immediately invokes 'greet' with 'person' as 'this', arguments passed as an array

// Example: Finding max in an array using apply
const numbers = [10, 20, 5, 30, 15];
const maxNumber = Math.max.apply(null, numbers); // 'null' for 'this' because Math.max doesn't use 'this'
console.log("Max number:", maxNumber); // Output: 30


// --- bind() example ---
console.log("--- bind() ---");
const greetAlice = greet.bind(person, "Greetings"); // Returns a new function with 'this' bound to 'person' and first arg 'Greetings'
greetAlice("!"); // Output: "Greetings, my name is Alice. I am 30 !" (second arg passed now)

const greetBob = greet.bind(anotherPerson); // Returns a new function with 'this' bound to 'anotherPerson'
greetBob("Hello", "."); // Output: "Hello, my name is Bob. I am 25 ." (both args passed now)

// Common use case for bind: Event listeners
const button = {
    text: 'Click Me',
    clickHandler: function() {
        console.log(`${this.text} was clicked!`);
    }
};

// If not bound, 'this' inside clickHandler would be the button DOM element
// document.getElementById('myButton').addEventListener('click', button.clickHandler); // 'this' would be the DOM element

// Bound version:
// document.getElementById('myButton').addEventListener('click', button.clickHandler.bind(button));
// When clicked, it would correctly log "Click Me was clicked!"
```

---

## 9. `setTimeout()` vs `setInterval()`

**Explanation:**
Both `setTimeout()` and `setInterval()` are methods provided by the browser (or Node.js runtime) for executing code asynchronously after a delay. They are part of the `Window` or `global` object.

* **`setTimeout(callback, delay)`**:
    * Executes a `callback` function **once** after a specified `delay` (in milliseconds).
    * Returns a unique `timeoutID` that can be used with `clearTimeout()` to cancel the execution before it happens.
    * The `delay` is the *minimum* delay; the actual execution might be slightly longer due to the event loop.

* **`setInterval(callback, delay)`**:
    * Repeatedly executes a `callback` function at a specified `delay` (in milliseconds) **intervals**.
    * Returns a unique `intervalID` that can be used with `clearInterval()` to stop the repeating execution.
    * The interval is not guaranteed to be exact; execution might drift over time if the callback function takes longer to execute than the `delay`.

**Important Considerations:**
* **Accuracy:** Neither `setTimeout` nor `setInterval` guarantees exact timing. The `delay` specifies the *minimum* time before the callback is placed in the event queue. Other tasks on the event loop can cause actual execution to be delayed.
* **Resource Management:** For `setInterval`, it's crucial to always clear the interval using `clearInterval()` when it's no longer needed (e.g., when a component unmounts in React, or when a specific condition is met) to prevent memory leaks and unnecessary processing.

**Code Snippet:**

```javascript
// --- setTimeout() example ---
console.log("Starting setTimeout...");
setTimeout(() => {
  console.log("Executed once after 2 seconds.");
}, 2000); // Waits for 2000 milliseconds (2 seconds)
console.log("setTimeout has been scheduled.");


// --- clearTimeout() example ---
const timeoutId = setTimeout(() => {
  console.log("This message will not be displayed.");
}, 3000); // Scheduled for 3 seconds

console.log("Attempting to clear timeout...");
clearTimeout(timeoutId); // Clears the scheduled timeout
console.log("Timeout cleared.");


// --- setInterval() example ---
let count = 0;
console.log("Starting setInterval...");
const intervalId = setInterval(() => {
  count++;
  console.log(`Interval count: ${count}`);
  if (count === 3) {
    clearInterval(intervalId); // Stop the interval after 3 iterations
    console.log("Interval stopped.");
  }
}, 1000); // Executes every 1000 milliseconds (1 second)
```

---

## 10. Debouncing and Throttling in JavaScript

**Explanation:**
Debouncing and Throttling are performance optimization techniques used to control the rate at which a function is executed, especially when dealing with events that fire rapidly (e.g., window resizing, scrolling, typing in a search input).

* **Debouncing:**
    * **Concept**: Ensures that a function is executed only **after a specified delay has passed since the last time it was invoked**. If the function is called again within that delay, the timer is reset, and the function execution is postponed.
    * **Analogy**: "Wait until the user stops typing for X milliseconds before performing a search." Or "Don't fire the resize event handler until the user has finished resizing the window."
    * **Purpose**: Prevents excessive function calls for continuous events, especially when the final state is what matters.

* **Throttling:**
    * **Concept**: Ensures that a function is executed at most **once within a specified time interval**, regardless of how many times it's invoked.
    * **Analogy**: "Fire this function at most once every X milliseconds." Or "Take a picture every 5 seconds, even if motion is detected more frequently."
    * **Purpose**: Ensures a steady rate of execution for continuous events, providing regular updates without overwhelming the system.

**Code Snippet (Debouncing):**

```javascript
// Basic Debounce Utility (can be found in libraries like Lodash)
const debounce = (func, delay) => {
  let timeoutId; // This variable persists across calls to the returned function
  return function(...args) { // Returns a new function (closure)
    const context = this;
    clearTimeout(timeoutId); // Clear the previous timer
    timeoutId = setTimeout(() => {
      func.apply(context, args); // Execute the original function after delay
    }, delay);
  };
};

// Example Usage: Search input
const searchInput = document.getElementById('search-input'); // Assume this element exists in HTML

if (searchInput) {
    const handleSearch = (event) => {
      console.log("Searching for:", event.target.value);
      // In a real app, this would be an API call
    };

    const debouncedSearch = debounce(handleSearch, 500); // Debounce by 500ms

    searchInput.addEventListener('input', debouncedSearch);
}
// If user types "abc", "a" -> timer starts, "b" (within 500ms) -> timer resets, "c" (within 500ms) -> timer resets.
// Only after 500ms of no further typing will the 'handleSearch' function actually execute with the final input.
```

**Code Snippet (Throttling):**

```javascript
// Basic Throttle Utility (can be found in libraries like Lodash)
const throttle = (func, limit) => {
  let inThrottle;
  let lastResult;
  return function(...args) {
    const context = this;
    if (!inThrottle) {
      inThrottle = true;
      lastResult = func.apply(context, args);
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
    return lastResult;
  };
};

// Example Usage: Scroll event
const scrollContainer = document.getElementById('scroll-container'); // Assume this element exists in HTML

if (scrollContainer) {
    const handleScroll = () => {
      console.log("Scrolling at:", scrollContainer.scrollTop);
      // In a real app, you might update UI or lazy load content
    };

    const throttledScroll = throttle(handleScroll, 100); // Throttle to fire every 100ms

    scrollContainer.addEventListener('scroll', throttledScroll);
}
// If user scrolls rapidly, handleScroll will fire at most once every 100ms, not on every pixel scroll event.
```

---

## 11. Shallow vs. Deep Comparison in JavaScript

**Explanation:**
These terms describe how two values (especially objects or arrays) are compared for equality.

* **Shallow Comparison:**
    * Compares the **references** of objects and arrays.
    * For primitive values (numbers, strings, booleans, `null`, `undefined`, `Symbol`, `BigInt`), it compares their actual values.
    * For objects or arrays, it only checks if the two variables point to the **exact same object in memory**. It does *not* recursively check the contents of nested objects or arrays.
    * The `===` operator performs a shallow comparison.

* **Deep Comparison:**
    * Compares the **values of all properties recursively**, including nested objects and arrays.
    * Two objects are considered deeply equal if they have the same properties, and the values of those properties are also deeply equal.
    * JavaScript does **not have a built-in deep comparison operator or function**. You need to implement it manually or use a utility library (e.g., Lodash's `isEqual`).
    * A common, but imperfect, trick for simple objects is to convert them to JSON strings and compare the strings. However, this fails for objects with `undefined` properties, functions, `Symbol`s, or properties with different order.

**Code Snippet:**

```javascript
// --- Shallow Comparison ---

// Primitives: Value comparison
const a = 10;
const b = 10;
console.log("Primitives (10 === 10):", a === b); // true

const str1 = "hello";
const str2 = "hello";
console.log("Strings ('hello' === 'hello'):", str1 === str2); // true

// Objects/Arrays: Reference comparison
const obj1 = { name: "Alice", age: 25 };
const obj2 = { name: "Alice", age: 25 };
console.log("Objects (obj1 === obj2):", obj1 === obj2); // false (different references in memory)

const obj3 = obj1; // obj3 now points to the same object as obj1
console.log("Objects (obj1 === obj3):", obj1 === obj3); // true

const arr1 = [1, { value: 2 }];
const arr2 = [1, { value: 2 }];
console.log("Arrays (arr1 === arr2):", arr1 === arr2); // false (different references)

const arr3 = arr1;
console.log("Arrays (arr1 === arr3):", arr3 === arr1); // true


// --- Deep Comparison ---

// Imperfect JSON.stringify trick (works for simple, serializable objects)
console.log("JSON.stringify (obj1 === obj2):", JSON.stringify(obj1) === JSON.stringify(obj2)); // true

const objWithFunction1 = { a: 1, func: () => {} };
const objWithFunction2 = { a: 1, func: () => {} };
console.log("JSON.stringify (objects with functions):", JSON.stringify(objWithFunction1) === JSON.stringify(objWithFunction2)); // false (functions are not stringified)

// Manual Deep Comparison (simplified example for two objects)
function deepEqual(objA, objB) {
  if (objA === objB) return true; // Shallow equality for primitives or same object reference

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false; // Not objects, or one is null
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false; // Different number of properties

  for (const key of keysA) {
    if (!keysB.includes(key) || !deepEqual(objA[key], objB[key])) {
      return false; // Key not in B, or recursive check fails
    }
  }

  return true;
}

const complexObj1 = {
  name: "User",
  details: { id: 1, active: true },
  hobbies: ["reading", "coding"]
};
const complexObj2 = {
  name: "User",
  details: { id: 1, active: true },
  hobbies: ["reading", "coding"]
};
const complexObj3 = {
  name: "User",
  details: { id: 1, active: false }, // different
  hobbies: ["reading", "coding"]
};

console.log("Deep compare (complexObj1, complexObj2):", deepEqual(complexObj1, complexObj2)); // true
console.log("Deep compare (complexObj1, complexObj3):", deepEqual(complexObj1, complexObj3)); // false

// Note: Libraries like Lodash's isEqual are more robust for deep comparison
// import _ from 'lodash';
// console.log("Lodash isEqual:", _.isEqual(complexObj1, complexObj2));
```

---

## 12. JavaScript Modules (ES6)

**Explanation:**
ES6 (ECMAScript 2015) introduced a native module system to JavaScript, allowing developers to structure code into smaller, reusable files. Modules promote code organization, reusability, and prevent global namespace pollution.

* **`export`**: Used to make variables, functions, classes, or objects available from a module.
    * **Named Exports**: You can export multiple named entities. When importing, you must use the exact names.
    * **Default Export**: You can have only one default export per module. When importing, you can give it any name.
* **`import`**: Used to bring exported entities from other modules into the current file.

**Benefits of Modules:**
* **Modularity**: Breaking down large applications into smaller, manageable pieces.
* **Reusability**: Components/functions can be easily reused across different parts of an application or even different projects.
* **Dependency Management**: Clearly defines what a module needs and what it provides.
* **Namespace Isolation**: Variables and functions within a module are scoped to that module by default and don't pollute the global scope.
* **Lazy Loading**: Modern bundlers can perform "tree-shaking" (removing unused exports) and code-splitting based on modules, improving performance.

**Code Snippet:**

**`utils.js` (Module definition):**
```javascript
// Named export
export const PI = 3.14159;

// Named export function
export function add(a, b) {
  return a + b;
}

// Named export class
export class Calculator {
  multiply(a, b) {
    return a * b;
  }
}

// Default export (can be any valid JS expression: function, class, object, primitive)
const greeting = "Hello from utils!";
export default greeting;

// Note: You can also export at the end:
// export { PI, add, Calculator, greeting as default };
```

**`main.js` (Module consumption):**
```javascript
// Import named exports
import { PI, add, Calculator } from './utils.js';

// Import default export (can be named anything you want, e.g., 'myGreeting')
import myGreeting from './utils.js';

console.log(PI); // Output: 3.14159
console.log(add(5, 3)); // Output: 8

const calc = new Calculator();
console.log(calc.multiply(4, 2)); // Output: 8

console.log(myGreeting); // Output: "Hello from utils!"

// Importing all named exports as a single object
import * as Utils from './utils.js';
console.log(Utils.PI); // Output: 3.14159
```

**How to run Modules (in HTML):**
To use ES6 modules in the browser, you need to add `type="module"` to your script tag:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ES6 Modules</title>
</head>
<body>
    <h1>Check console for output</h1>
    <script type="module" src="main.js"></script>
</body>
</html>
```

---

## 13. Array Methods in JavaScript (`forEach`, `map`, `filter`, `reduce`)

**Explanation:**
JavaScript arrays come with a rich set of built-in methods for iteration, transformation, and aggregation. These methods are higher-order functions, meaning they accept callback functions as arguments. They promote a functional programming style, leading to cleaner and more readable code.

* **`forEach()`**:
    * **Purpose**: Iterates over each element in an array.
    * **Returns**: `undefined` (it doesn't create a new array or return a value).
    * **Use Case**: Primarily for performing side effects (e.g., logging, updating DOM elements, triggering external actions) for each element.
    * **Syntax**: `array.forEach((element, index, array) => { /* ... */ });`

* **`map()`**:
    * **Purpose**: Creates a **new array** by calling a provided callback function on every element in the original array.
    * **Returns**: A new array of the same length as the original, with each element being the result of the callback function.
    * **Use Case**: Transforming elements of an array (e.g., doubling numbers, extracting specific properties from objects).
    * **Syntax**: `array.map((element, index, array) => { /* ... */ });`

* **`filter()`**:
    * **Purpose**: Creates a **new array** containing only the elements from the original array that satisfy a provided test condition (i.e., for which the callback function returns `true`).
    * **Returns**: A new array containing a subset of the original elements.
    * **Use Case**: Selecting specific elements based on criteria (e.g., numbers greater than 10, active users).
    * **Syntax**: `array.filter((element, index, array) => { /* ... */ });`

* **`reduce()`**:
    * **Purpose**: Executes a "reducer" callback function on each element of the array, resulting in a **single output value**.
    * **Returns**: The single accumulated value.
    * **Use Case**: Summing elements, flattening arrays, counting occurrences, grouping data, transforming an array into an object.
    * **Syntax**: `array.reduce((accumulator, currentValue, currentIndex, array) => { /* ... */ }, initialValue);`
        * `accumulator`: The value resulting from the previous callback invocation (or `initialValue` on the first call).
        * `currentValue`: The current element being processed.
        * `initialValue` (optional): A value to use as the first argument to the first call of the `callback`. If not provided, the first element of the array is used as the initial `accumulator`, and `reduce` starts from the second element.

**Code Snippet:**

```javascript
const numbers = [1, 2, 3, 4, 5];
const users = [
  { id: 1, name: "Alice", isActive: true },
  { id: 2, name: "Bob", isActive: false },
  { id: 3, name: "Charlie", isActive: true }
];

// --- forEach() ---
console.log("--- forEach ---");
numbers.forEach((num, index) => {
  console.log(`Number at index ${index}: ${num}`);
});
// Output:
// Number at index 0: 1
// ...
// Number at index 4: 5


// --- map() ---
console.log("\n--- map ---");
const doubledNumbers = numbers.map(num => num * 2);
console.log(doubledNumbers); // Output: [2, 4, 6, 8, 10]

const userNames = users.map(user => user.name.toUpperCase());
console.log(userNames); // Output: ["ALICE", "BOB", "CHARLIE"]


// --- filter() ---
console.log("\n--- filter ---");
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]

const activeUsers = users.filter(user => user.isActive);
console.log(activeUsers);
// Output:
// [
//   { id: 1, name: "Alice", isActive: true },
//   { id: 3, name: "Charlie", isActive: true }
// ]


// --- reduce() ---
console.log("\n--- reduce ---");
const sumOfNumbers = numbers.reduce((accumulator, currentNum) => accumulator + currentNum, 0);
console.log(sumOfNumbers); // Output: 15 (0 + 1 + 2 + 3 + 4 + 5)

const productOfNumbers = numbers.reduce((acc, num) => acc * num, 1);
console.log(productOfNumbers); // Output: 120 (1 * 1 * 2 * 3 * 4 * 5)

// Reduce to an object (e.g., mapping user IDs to names)
const usersById = users.reduce((acc, user) => {
  acc[user.id] = user.name;
  return acc;
}, {});
console.log(usersById); // Output: { '1': 'Alice', '2': 'Bob', '3': 'Charlie' }

// Flatten an array of arrays
const arrayOfArrays = [[1, 2], [3, 4], [5, 6]];
const flattenedArray = arrayOfArrays.reduce((acc, currentArray) => acc.concat(currentArray), []);
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]
```

---

## 14. `typeof`, `instanceof`, and `constructor`

**Explanation:** These three operators/properties are used to determine the type or origin of a JavaScript value or object.

* **`typeof` operator:**
    * Returns a **string** indicating the primitive type of the operand or "object" for non-primitive types (except `null`, which also returns "object" – a historical bug).
    * **Primarily for primitive types:** `string`, `number`, `boolean`, `undefined`, `symbol`, `bigint`.
    * **Limitations:**
        * `typeof null` returns `"object"`.
        * `typeof []` returns `"object"`.
        * `typeof {}` returns `"object"`.
        * `typeof function() {}` returns `"function"` (which is technically an object in JS).
    * It's a good first check for primitives but unreliable for distinguishing between different kinds of objects or arrays.

* **`instanceof` operator:**
    * Tests if an object is an instance of a particular class or constructor function.
    * It checks the object's prototype chain. If the `constructor.prototype` is found anywhere in the object's prototype chain, it returns `true`.
    * **Use Case:** Ideal for checking inheritance relationships or if an object was created by a specific constructor.
    * **Limitations:**
        * Works only with objects.
        * Fails across different JavaScript "realms" (e.g., iframes) because objects from one realm won't share the same global `Array.prototype` as another.

* **`constructor` property:**
    * Every object in JavaScript (except those created with `Object.create(null)`) inherits a `constructor` property from its prototype.
    * This property refers to the **constructor function** that created the instance.
    * **Use Case:** Can be used to check the constructor of an object.
    * **Limitations:**
        * The `constructor` property can be reassigned or overwritten, making it unreliable if not carefully managed.
        * It will return `Object` for objects created using object literal syntax `{}`.

**Code Snippet:**

```javascript
// --- typeof operator ---
console.log("--- typeof ---");
console.log(typeof "Hello");        // "string"
console.log(typeof 123);            // "number"
console.log(typeof true);           // "boolean"
console.log(typeof undefined);      // "undefined"
console.log(typeof Symbol('id'));   // "symbol"
console.log(typeof 10n);            // "bigint"
console.log(typeof {});             // "object"
console.log(typeof []);             // "object"
console.log(typeof null);           // "object" (a long-standing bug)
console.log(typeof function() {});  // "function"


// --- instanceof operator ---
console.log("\n--- instanceof ---");
const arr = [1, 2, 3];
const date = new Date();
const obj = {};
const func = () => {};

console.log(arr instanceof Array);    // true
console.log(date instanceof Date);    // true
console.log(obj instanceof Object);   // true
console.log(func instanceof Function); // true
console.log(arr instanceof Object);   // true (because Array.prototype is also an instance of Object.prototype)
console.log(null instanceof Object);  // false (null is not an object)

// Custom constructor example
function MyClass() {}
const myInstance = new MyClass();
console.log(myInstance instanceof MyClass); // true
console.log(myInstance instanceof Object);  // true


// --- constructor property ---
console.log("\n--- constructor ---");
console.log(arr.constructor === Array);       // true
console.log(date.constructor === Date);       // true
console.log(obj.constructor === Object);      // true
console.log(func.constructor === Function);   // true
console.log(myInstance.constructor === MyClass); // true

// Caution: constructor can be overwritten
function AnotherClass() {}
const anotherInstance = new AnotherClass();
AnotherClass.prototype.constructor = "Not a constructor"; // Overwriting it!
console.log(anotherInstance.constructor); // "Not a constructor" - becomes unreliable
```
**Best Practice for Type Checking:**
* For **primitives**, `typeof` is generally reliable.
* For **arrays**, use `Array.isArray()` (more robust than `instanceof` or `constructor`).
* For **specific objects created by constructors/classes**, `instanceof` is good.
* For **determining if something is a plain object** (not `null`, not an array, etc.), a common pattern is `typeof value === 'object' && value !== null && value.constructor === Object`.
* Avoid relying solely on `constructor` if you're not sure if the prototype chain has been modified.

---

## 15. JavaScript Execution Context and Call Stack

**Explanation:**
These are fundamental concepts that explain how JavaScript code is processed and executed.

* **Execution Context (EC):**
    * An abstract concept that represents the environment in which JavaScript code is evaluated and executed.
    * Whenever JavaScript code runs, it runs inside an execution context.
    * There are two main types of execution contexts:
        1.  **Global Execution Context (GEC):** The default context where code execution begins. There is only one GEC. It creates a global object (`window` in browsers, `global` in Node.js) and `this` is bound to it.
        2.  **Function Execution Context (FEC):** Created whenever a function is called. Each function call gets its own FEC.
    * An execution context has two phases:
        * **Creation Phase:**
            * **Lexical Environment (LE):** A component that holds `Environment Record` (stores variable, function, and argument declarations for the current scope) and a reference to the `outer environment` (lexical parent).
            * **Variable Environment (VE):** In ES5, this was also part of the LE. In ES6+, `let` and `const` declarations are handled by a separate binding in the `Lexical Environment`, while `var` and function declarations are still handled by the `Variable Environment`. This is where hoisting happens.
            * **`this` Binding:** The value of `this` is determined.
        * **Execution Phase:**
            * Variables are assigned their actual values.
            * The code is executed line by line.

* **Call Stack:**
    * A LIFO (Last-In, First-Out) data structure that stores all the execution contexts created during the execution of a JavaScript program.
    * When JavaScript code starts, the Global Execution Context is pushed onto the stack.
    * When a function is called, a new Function Execution Context is created and pushed onto the top of the stack.
    * When a function finishes executing, its execution context is popped off the stack.
    * If the call stack becomes too large (e.g., due to infinite recursion without a base case), it leads to a "Stack Overflow" error.

**Visualizing the Process:**
1.  **Global EC** is pushed onto the Call Stack.
2.  `main()` function is called. Its **FEC** is created and pushed on top of GEC.
3.  `funcA()` is called from `main()`. Its **FEC** is pushed on top of `main()`'s FEC.
4.  `funcB()` is called from `funcA()`. Its **FEC** is pushed on top of `funcA()`'s FEC.
5.  `funcB()` finishes. Its FEC is **popped** off.
6.  `funcA()` finishes. Its FEC is **popped** off.
7.  `main()` finishes. Its FEC is **popped** off.
8.  Global EC is **popped** off when the program finishes.

**Code Snippet:**

```javascript
function thirdFunction() {
  console.log("Inside thirdFunction");
  // Third function's Execution Context is on top of the Call Stack
}

function secondFunction() {
  console.log("Inside secondFunction");
  // Second function's Execution Context is on top, below it is firstFunction's
  thirdFunction(); // Calling thirdFunction creates a new EC
  console.log("Back in secondFunction");
}

function firstFunction() {
  console.log("Inside firstFunction");
  // First function's Execution Context is on top, below it is the Global EC
  secondFunction(); // Calling secondFunction creates a new EC
  console.log("Back in firstFunction");
}

console.log("Global Context start"); // Global Execution Context is active

firstFunction(); // Calling firstFunction creates its EC

console.log("Global Context end"); // Back in Global Execution Context


// Expected console output (representing the call stack flow):
// Global Context start
// Inside firstFunction
// Inside secondFunction
// Inside thirdFunction
// Back in secondFunction
// Back in firstFunction
// Global Context end
```

---

## 16. Closures and Lexical Scoping (Review)

**Explanation:**
This is a reiteration of the concept introduced in section 3, often asked in slightly different phrasing.

* **Lexical Scoping (or Static Scoping):**
    * The core principle that determines how variables are resolved in nested functions.
    * A function's scope (which variables it can access) is determined by **where it is defined (its lexical environment at creation time)**, not where it is called (its execution environment).
    * Inner functions have access to the variables of their outer (parent) functions, and also to global variables.

* **Closure:**
    * A function that **remembers and retains access to its lexical scope** even after its outer function has finished executing.
    * Essentially, when an inner function is returned or passed out of its defining (outer) scope, it carries a "backpack" of its lexical environment with it, allowing it to continue accessing those outer variables.

**Code Snippet:**

```javascript
// Demonstrating Lexical Scoping
const globalVar = "I am global";

function outerFunction() {
  const outerVar = "I am from outer";

  function innerFunction() { // innerFunction's lexical scope includes outerFunction's scope
    const innerVar = "I am from inner";
    console.log(innerVar); // Accessible
    console.log(outerVar); // Accessible due to lexical scoping
    console.log(globalVar); // Accessible due to lexical scoping
  }

  innerFunction();
}
outerFunction();

// console.log(outerVar); // ReferenceError: outerVar is not defined (outerVar is not globally accessible)


// Demonstrating Closure (revisited)
function createCounter() {
  let count = 0; // 'count' is part of createCounter's lexical environment

  return function() { // This inner function is the closure
    count++; // It 'closes over' and modifies 'count'
    console.log(count);
  };
}

const counter1 = createCounter(); // counter1 is the inner function, carrying its own 'count'
counter1(); // 1
counter1(); // 2

const counter2 = createCounter(); // counter2 is a new inner function, with its own independent 'count'
counter2(); // 1
counter1(); // 3 (counter1's count is unaffected by counter2)
```

---

## 17. `JSON.parse()` and `JSON.stringify()`

**Explanation:**
These are built-in global JavaScript functions used for working with JSON (JavaScript Object Notation), a lightweight data-interchange format.

* **`JSON.stringify(value, replacer, space)`:**
    * **Purpose:** Converts a JavaScript value (usually an object or array) into a **JSON string**.
    * **`value`**: The JavaScript value to convert.
    * **`replacer` (optional)**:
        * A function: Used to transform values during stringification.
        * An array of strings: Only the properties with names present in the array will be included in the JSON string.
    * **`space` (optional)**:
        * A string or number: Used to add whitespace to the output JSON string for readability (pretty-printing). If a number, it's the number of spaces; if a string, that string is used as indentation.
    * **Limitations:**
        * Functions (`function() {}`), `Symbol` values, `undefined`, and properties with `undefined` values are either skipped or not included in the JSON output.
        * `BigInt` values throw a `TypeError`.
        * Cyclic references (an object referencing itself or one of its ancestors) will throw a `TypeError`.

* **`JSON.parse(text, reviver)`:**
    * **Purpose:** Converts a **JSON string** into a JavaScript value (usually an object or array).
    * **`text`**: The JSON string to parse.
    * **`reviver` (optional)**: A function that is called for each key/value pair in the object, allowing you to transform values before they are returned. Useful for parsing dates back from strings, for example.
    * **Error Handling:** Throws a `SyntaxError` if the string is not valid JSON.

**Code Snippet:**

```javascript
// --- JSON.stringify() ---
console.log("--- JSON.stringify ---");

const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  isAdmin: false,
  roles: ["admin", "editor"],
  loginCount: undefined, // Will be skipped
  greet: function() { return "Hello"; }, // Will be skipped
  lastLogin: new Date() // Will be converted to ISO string
};

// Basic stringification
const jsonString = JSON.stringify(user);
console.log("Basic stringify:", jsonString);
// Output: {"id":1,"name":"Alice","email":"alice@example.com","isAdmin":false,"roles":["admin","editor"],"lastLogin":"2025-06-06T11:13:02.000Z"} (date will vary)

// Stringify with pretty-printing (2 spaces indentation)
const prettyJson = JSON.stringify(user, null, 2);
console.log("Pretty stringify (2 spaces):\n", prettyJson);
// Output:
// {
//   "id": 1,
//   "name": "Alice",
//   "email": "alice@example.com",
//   "isAdmin": false,
//   "roles": [
//     "admin",
//     "editor"
//   ],
//   "lastLogin": "2025-06-06T11:13:02.000Z"
// }

// Stringify with replacer array (only include specific properties)
const selectedPropsJson = JSON.stringify(user, ["name", "email"]);
console.log("Stringify with replacer array:", selectedPropsJson); // Output: {"name":"Alice","email":"alice@example.com"}

// Stringify with replacer function (e.g., to censor email)
const censoredJson = JSON.stringify(user, (key, value) => {
  if (key === 'email') {
    return 'CENSORED';
  }
  return value;
}, 2);
console.log("Stringify with replacer function:\n", censoredJson);


// --- JSON.parse() ---
console.log("\n--- JSON.parse ---");

const jsonUserData = '{"id":2,"name":"Bob","age":30,"isStudent":true,"courses":["Math","Science"],"registeredDate":"2024-01-15T10:00:00.000Z"}';

const parsedUser = JSON.parse(jsonUserData);
console.log("Parsed user:", parsedUser);
// Output: { id: 2, name: 'Bob', age: 30, isStudent: true, courses: [ 'Math', 'Science' ], registeredDate: '2024-01-15T10:00:00.000Z' }
console.log("Type of registeredDate:", typeof parsedUser.registeredDate); // Output: string (it's still a string!)

// Parse with reviver function (e.g., to convert date strings to Date objects)
const parsedUserWithDate = JSON.parse(jsonUserData, (key, value) => {
  if (key === 'registeredDate') {
    return new Date(value);
  }
  return value;
});
console.log("Parsed user with reviver:", parsedUserWithDate);
console.log("Type of registeredDate with reviver:", typeof parsedUserWithDate.registeredDate); // Output: object
console.log("Is registeredDate a Date object?", parsedUserWithDate.registeredDate instanceof Date); // Output: true
```

---

## 18. `Set` vs `Map` in JavaScript

**Explanation:**
`Set` and `Map` are new built-in object types introduced in ES6 (ES2015) that provide efficient ways to store collections of data.

* **`Set`**:
    * **Purpose**: A collection of **unique values**. Each value can occur only once within a Set.
    * **Keys/Values**: Stores values directly.
    * **Order**: Iterates elements in insertion order.
    * **Uniqueness Check**: Uses `===` (Strict Equality Comparison) for primitive values and checks for object reference equality. `NaN` is considered equal to `NaN` (unlike `NaN === NaN` which is false).
    * **Use Cases**: Removing duplicate items from an array, checking for existence of an item efficiently.
    * **Methods**:
        * `new Set([iterable])`: Creates a new Set.
        * `set.add(value)`: Adds a value.
        * `set.delete(value)`: Removes a value.
        * `set.has(value)`: Checks if a value exists (`true`/`false`).
        * `set.size`: Number of elements.
        * `set.clear()`: Removes all elements.
        * `set.forEach()`, `set.entries()`, `set.keys()`, `set.values()`.

* **`Map`**:
    * **Purpose**: A collection of **key-value pairs**, similar to objects, but with more flexibility for keys.
    * **Keys**: Keys can be of *any data type* (primitives, objects, functions), unlike plain objects where keys are implicitly converted to strings.
    * **Order**: Iterates elements in insertion order.
    * **Use Cases**: When you need a dictionary-like collection where keys are not necessarily strings, or when you need to maintain insertion order of key-value pairs.
    * **Methods**:
        * `new Map([iterable])`: Creates a new Map.
        * `map.set(key, value)`: Adds or updates a key-value pair.
        * `map.get(key)`: Retrieves a value by key.
        * `map.has(key)`: Checks if a key exists (`true`/`false`).
        * `map.delete(key)`: Removes a key-value pair.
        * `map.size`: Number of key-value pairs.
        * `map.clear()`: Removes all key-value pairs.
        * `map.forEach()`, `map.entries()`, `map.keys()`, `map.values()`.

**Comparison with Plain Objects (`{}`):**

| Feature            | `Map`                                      | Plain Object `{}`                           |
| :----------------- | :----------------------------------------- | :------------------------------------------ |
| **Keys** | Can be **any data type** (objects, arrays, functions, primitives) | Keys are **strings** (or Symbols)           |
| **Iteration Order**| Maintains **insertion order** | Order is not guaranteed (before ES2015), though engines mostly preserve it now |
| **Size** | Easily obtained with `.size` property      | Requires `Object.keys().length` or similar  |
| **Performance** | Better performance for frequent additions/removals, especially with many entries | Might be slightly faster for small, static collections |
| **Inheritance** | No default properties from prototype chain | Inherits properties from `Object.prototype` (e.g., `hasOwnProperty`) |

**Code Snippet:**

```javascript
// --- Set Example ---
console.log("--- Set ---");
const mySet = new Set();
mySet.add(1);
mySet.add("hello");
mySet.add(true);
mySet.add(1); // Adding duplicate has no effect
mySet.add({a: 1}); // Object reference unique
mySet.add({a: 1}); // Different object reference, so it's added again

console.log("Initial Set:", mySet); // Set(5) { 1, 'hello', true, { a: 1 }, { a: 1 } }
console.log("Set size:", mySet.size); // 5

console.log("Has 1?", mySet.has(1)); // true
console.log("Has 5?", mySet.has(5)); // false

mySet.delete("hello");
console.log("After deleting 'hello':", mySet); // Set(4) { 1, true, { a: 1 }, { a: 1 } }

// Converting array to Set to remove duplicates
const numbersWithDuplicates = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbersWithDuplicates)];
console.log("Unique numbers from array:", uniqueNumbers); // [1, 2, 3, 4, 5]

// Iterating a Set
console.log("Iterating Set:");
mySet.forEach(value => console.log(value));
for (const value of mySet) {
    // console.log(value); // Alternative iteration
}


// --- Map Example ---
console.log("\n--- Map ---");
const myMap = new Map();

// Keys can be any type
myMap.set("name", "Alice");
myMap.set(1, "one");
myMap.set(true, "booleanKey");
const someObj = { id: 123 };
myMap.set(someObj, "objectAsKey");
myMap.set(null, "nullKey");

console.log("Map size:", myMap.size); // 5

console.log("Value for 'name':", myMap.get("name")); // Alice
console.log("Value for 1:", myMap.get(1)); // one
console.log("Value for someObj:", myMap.get(someObj)); // objectAsKey

console.log("Has 'name'?", myMap.has("name")); // true
console.log("Has 'age'?", myMap.has("age")); // false

myMap.delete(true);
console.log("Map after deleting 'true' key:", myMap); // Map(4) { 'name' => 'Alice', 1 => 'one', { id: 123 } => 'objectAsKey', null => 'nullKey' }

// Iterating a Map
console.log("Iterating Map:");
myMap.forEach((value, key) => console.log(`${key}: ${value}`));
for (const [key, value] of myMap) {
    // console.log(`${key}: ${value}`); // Alternative iteration
}

// Convert Map to Array
const mapToArray = [...myMap];
console.log("Map as Array:", mapToArray);
// Output: [ [ 'name', 'Alice' ], [ 1, 'one' ], [ { id: 123 }, 'objectAsKey' ], [ null, 'nullKey' ] ]
```

---

## 19. `WeakMap` and `WeakSet`

**Explanation:**
`WeakMap` and `WeakSet` are special types of collections introduced in ES6 that hold **weak references** to objects. This means that if the only remaining reference to an object is within a `WeakMap` or `WeakSet`, that object can be garbage collected. This is their primary distinction from `Map` and `Set`, which hold strong references.

* **Weak References**: A reference to an object that does not prevent that object from being garbage collected. If an object is weakly referenced, and no other strong references to it exist, it will be removed from memory.

* **`WeakMap`**:
    * **Purpose**: Stores key-value pairs where keys **must be objects** and are **weakly held**.
    * **Keys**: Only objects can be keys. Primitive values (strings, numbers, symbols, etc.) are *not* allowed as keys.
    * **Weakly Held Keys**: If a key object is garbage collected (because it has no other strong references), its corresponding value in the `WeakMap` is also automatically removed.
    * **Not Iterable**: `WeakMap`s are not enumerable. You cannot iterate over their keys or values (e.g., no `forEach`, `keys()`, `values()`, `entries()`). Their size cannot be determined (`.size` property is absent). This is because the keys might be garbage collected at any time, making iteration unstable.
    * **Use Cases**: Storing private data associated with an object, associating data with DOM elements without creating memory leaks, implementing memoization where parameters might be garbage collected.

* **`WeakSet`**:
    * **Purpose**: Stores a collection of **unique objects** where the objects are **weakly held**.
    * **Values**: Only objects can be stored as values. Primitive values are *not* allowed.
    * **Weakly Held Values**: If an object stored in a `WeakSet` is garbage collected (because it has no other strong references), it is automatically removed from the `WeakSet`.
    * **Not Iterable**: Similar to `WeakMap`, `WeakSet`s are not enumerable. You cannot iterate over their elements or determine their size.
    * **Use Cases**: Tracking objects that have been used, tagging objects (e.g., keeping track of which objects have been "visited" or "processed").

**Key Differences and Why Weak References Matter:**

| Feature            | `Map`                                      | `WeakMap`                                   |
| :----------------- | :----------------------------------------- | :------------------------------------------ |
| **Keys** | Any data type                              | **Objects only** |
| **References** | Strong references to keys                  | **Weak references to keys** |
| **Garbage Collection**| Prevents keys from GC                   | Allows keys to be GC if no strong references |
| **Iteration** | Iterable (`forEach`, `keys()`, `values()`, `entries()`) | **Not Iterable** |
| **Size** | Has `.size` property                       | **No `.size` property** |
| **Methods** | `set`, `get`, `has`, `delete`, `clear`     | `set`, `get`, `has`, `delete` (no `clear`)  |

| Feature            | `Set`                                      | `WeakSet`                                   |
| :----------------- | :----------------------------------------- | :------------------------------------------ |
| **Values** | Any data type                              | **Objects only** |
| **References** | Strong references to values                | **Weak references to values** |
| **Garbage Collection**| Prevents values from GC                 | Allows values to be GC if no strong references |
| **Iteration** | Iterable (`forEach`, `keys()`, `values()`, `entries()`) | **Not Iterable** |
| **Size** | Has `.size` property                       | **No `.size` property** |
| **Methods** | `add`, `delete`, `has`, `clear`            | `add`, `delete`, `has` (no `clear`)         |

**Code Snippet:**

```javascript
// --- WeakMap Example ---
console.log("--- WeakMap ---");

let user1 = { name: "Alice" };
let user2 = { name: "Bob" };

const userRoles = new WeakMap();

userRoles.set(user1, "admin");
userRoles.set(user2, "editor");

console.log(userRoles.has(user1)); // true
console.log(userRoles.get(user2)); // "editor"

// If user1 gets garbage collected (e.g., if there are no other strong references to it)
// then the entry {user1: "admin"} will be automatically removed from userRoles.
user1 = null; // Remove the strong reference to user1

// We cannot verify immediately if user1 is gone from WeakMap because it's not iterable.
// But conceptually, the WeakMap entry associated with the now-null user1 would be eligible for GC.
// console.log(userRoles.size); // ERROR: WeakMaps do not have a .size property

let element = document.createElement('div');
const elementData = new WeakMap();
elementData.set(element, { customId: 123, eventListeners: [] });

// When 'element' is removed from DOM and no other references exist,
// it gets garbage collected, and its entry in 'elementData' also disappears,
// preventing memory leaks.
// element = null; // Simulate element being removed and losing all references


// --- WeakSet Example ---
console.log("\n--- WeakSet ---");

let processedObjects = new WeakSet();
let objA = { data: 1 };
let objB = { data: 2 };
let objC = { data: 3 };

processedObjects.add(objA);
processedObjects.add(objB);

console.log(processedObjects.has(objA)); // true
console.log(processedObjects.has(objC)); // false

processedObjects.delete(objB);
console.log(processedObjects.has(objB)); // false

// If objA gets garbage collected, it's automatically removed from processedObjects.
objA = null; // Remove the strong reference

// console.log(processedObjects.size); // ERROR: WeakSets do not have a .size property
// processedObjects.forEach(...) // ERROR: WeakSets are not iterable
```

---

## 20. JavaScript's `eval()` Function

**Explanation:**
The `eval()` function in JavaScript executes a string of JavaScript code.

* **Purpose:** It takes a string as an argument and evaluates (executes) it as if it were a script block.
* **Return Value:** It returns the value of the last expression evaluated in the string.

**Caution and Dangers:**
**Using `eval()` is highly discouraged and considered a major security risk.**

* **Security Vulnerabilities (Arbitrary Code Execution):** If `eval()` is used to execute code from an untrusted source (e.g., user input or data from a network request), it can lead to **arbitrary code execution**. An attacker could inject malicious code into the string, which `eval()` would then run with the same permissions as your script. This could compromise user data, perform unwanted actions, or even allow cross-site scripting (XSS) attacks.
* **Performance Issues:** `eval()` is generally slower than direct code execution because the JavaScript engine cannot optimize the code string until runtime. It prevents many compiler optimizations.
* **Debugging Difficulty:** Code executed via `eval()` is harder to debug, as it doesn't appear in the source code files.
* **Scope Issues:** In non-strict mode, `eval()` can introduce new variables into the surrounding scope, which can lead to unexpected behavior and variable name collisions. In strict mode, `eval` creates a new lexical environment, preventing this.

**Modern Alternatives:**
In almost all scenarios where you might consider using `eval()`, there are safer and more efficient alternatives:

* **Parsing JSON:** Use `JSON.parse()` for converting JSON strings to JavaScript objects.
* **Accessing object properties dynamically:** Use bracket notation (`obj[propertyName]`) instead of `eval("obj." + propertyName)`.
* **Dynamic function calls:** Use `window[functionName]()` for global functions, or store functions in an object.
* **Template Literals:** For dynamic string creation.
* **WebAssembly or JS JIT Compilers:** For extremely high-performance dynamic code execution in controlled environments.

**Code Snippet:**

```javascript
// --- Basic eval() usage ---
console.log("--- eval() ---");

eval("console.log('Hello from eval!');"); // Output: "Hello from eval!"

const x = 10;
const y = 20;
const result = eval("x + y * 2");
console.log("Eval result:", result); // Output: 50 (10 + 20 * 2)

// Example of potential danger (DO NOT USE IN PRODUCTION)
const userInput = "console.log('User input executed!'); alert('You are hacked!');";
// eval(userInput); // This would execute malicious code if 'userInput' came from an untrusted source!

// Prefer this for dynamic property access
const myObject = { a: 1, b: 2 };
const propName = "a";
console.log("Accessing property dynamically:", myObject[propName]); // Output: 1 (SAFE)
// DON'T do: eval("myObject." + propName); // UNSAFE

// Prefer this for parsing JSON
const jsonString = '{"name": "Bob", "age": 30}';
const data = JSON.parse(jsonString); // SAFE
console.log("Parsed JSON:", data.name); // Output: Bob
// DON'T do: eval('(' + jsonString + ')'); // UNSAFE, slower, and might fail on malformed JSON
```

---

## 21. Spread Operator (`...`) and Rest Parameter (`...`)

**Explanation:**
The three dots (`...`) in JavaScript serve two distinct but related purposes depending on where they are used: the Spread Operator and the Rest Parameter. Both were introduced in ES6.

* **Spread Operator (`...`)**:
    * **Purpose**: Expands an iterable (like an array or a string) or an object into its individual elements or key-value pairs.
    * **Context**: Used in array literals, function calls, and object literals.
    * **Use Cases:**
        * **Copying Arrays/Objects (Shallow Copy):** Creates a new array/object with the elements/properties of an existing one.
        * **Concatenating Arrays:** Combining arrays without using `concat()`.
        * **Adding Elements to Arrays:** Inserting elements at any position.
        * **Passing Arguments to Functions:** Passing an array's elements as individual arguments to a function.
        * **Combining Objects:** Merging properties from multiple objects into a new one.

* **Rest Parameter (`...`)**:
    * **Purpose**: Gathers an indefinite number of arguments into a single array.
    * **Context**: Used only in **function definitions** as the last parameter.
    * **Use Cases:**
        * When a function needs to accept a variable number of arguments.
        * To collect remaining arguments after named parameters have been defined.

**Code Snippet:**

```javascript
// --- Spread Operator Examples ---
console.log("--- Spread Operator (...) ---");

// 1. Spreading Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Copying an array (shallow copy)
const copiedArr = [...arr1];
console.log("Copied array:", copiedArr); // [1, 2, 3]
console.log(copiedArr === arr1); // false (different reference)

// Concatenating arrays
const combinedArr = [...arr1, ...arr2];
console.log("Combined array:", combinedArr); // [1, 2, 3, 4, 5, 6]

// Adding elements to an array
const newArr = [0, ...arr1, 4];
console.log("Array with added elements:", newArr); // [0, 1, 2, 3, 4]

// Passing array elements as function arguments
function sum(a, b, c) {
  return a + b + c;
}
console.log("Sum using spread:", sum(...arr1)); // 6 (sum(1, 2, 3))


// 2. Spreading Objects (ES2018 onwards)
const objA = { x: 1, y: 2 };
const objB = { z: 3 };

// Copying an object (shallow copy)
const copiedObj = { ...objA };
console.log("Copied object:", copiedObj); // { x: 1, y: 2 }
console.log(copiedObj === objA); // false

// Merging objects
const combinedObj = { ...objA, ...objB, w: 4 };
console.log("Combined object:", combinedObj); // { x: 1, y: 2, z: 3, w: 4 }

// Overwriting properties during merge
const defaults = { color: 'red', size: 'medium' };
const userSettings = { size: 'large', type: 'bold' };
const finalSettings = { ...defaults, ...userSettings };
console.log("Merged settings (userSettings overrides defaults):", finalSettings);
// Output: { color: 'red', size: 'large', type: 'bold' }


// --- Rest Parameter Examples ---
console.log("\n--- Rest Parameter (...) ---");

// 1. Collecting arbitrary arguments into an array
function multiply(multiplier, ...numbers) { // 'numbers' is a rest parameter
  console.log("Multiplier:", multiplier);
  console.log("Numbers (rest parameter):", numbers);
  return numbers.map(num => num * multiplier);
}

console.log("Multiplied numbers:", multiply(2, 1, 2, 3, 4));
// Output:
// Multiplier: 2
// Numbers (rest parameter): [1, 2, 3, 4]
// Multiplied numbers: [2, 4, 6, 8]

// 2. Used with array destructuring (less common for "rest")
const [first, second, ...restOfArray] = [10, 20, 30, 40, 50];
console.log("First:", first);         // 10
console.log("Second:", second);       // 20
console.log("Rest of array:", restOfArray); // [30, 40, 50]
```

---

## 22. Template Literals

**Explanation:**
Template Literals (also known as template strings) are a new feature introduced in ES6 (ES2015) that provide an easier and more readable way to create strings in JavaScript. They are enclosed by **backticks (` `)** instead of single or double quotes.

**Key Features:**

* **Multiline Strings:** You can create strings that span multiple lines without needing special escape characters (`\n`). The whitespace and line breaks within the backticks are preserved.
* **String Interpolation:** You can embed expressions (variables, function calls, arithmetic operations, etc.) directly within the string using the syntax **`${expression}`**. The expression's result is automatically converted to a string.
* **Tagged Templates (Advanced):** A more advanced feature where you can use a function to parse the template literal. This allows for custom string construction and advanced operations like sanitization or internationalization.

**Benefits:**

* **Readability:** Makes dynamic string creation much cleaner and easier to read, especially when combining multiple variables or complex expressions.
* **Conciseness:** Reduces the need for string concatenation (`+` operator) and escape characters.

**Code Snippet:**

```javascript
// --- Basic Template Literals ---
console.log("--- Template Literals ---");

const name = "Alice";
const age = 30;
const city = "New York";

// String Interpolation
const greeting = `Hello, my name is ${name} and I am ${age} years old.`;
console.log("Greeting:", greeting); // Output: Hello, my name is Alice and I am 30 years old.

const product = { name: "Laptop", price: 1200 };
const message = `The ${product.name} costs $${product.price * 1.05} (including tax).`;
console.log("Message:", message); // Output: The Laptop costs $1260 (including tax).

// Multiline Strings
const multilineString = `
  This is a string
  that spans
  multiple lines.
  It preserves
  line breaks and indentation.
`;
console.log("Multiline String:\n", multilineString);

// Embedding expressions
const num1 = 10;
const num2 = 5;
console.log(`The sum of ${num1} and ${num2} is ${num1 + num2}.`); // Output: The sum of 10 and 5 is 15.

function getUserStatus(isLoggedIn) {
  return isLoggedIn ? "logged in" : "logged out";
}
console.log(`User status: ${getUserStatus(true)}`); // Output: User status: logged in


// --- Tagged Templates (Advanced) ---
console.log("\n--- Tagged Templates ---");

function highlight(strings, ...values) {
  let str = '';
  strings.forEach((string, i) => {
    str += string;
    if (values[i]) {
      // Example: Highlight values in HTML
      str += `<span style="background-color: yellow;">${values[i]}</span>`;
    }
  });
  return str;
}

const user = "Bob";
const accountBalance = 1500;
const htmlOutput = highlight`User: ${user}, Balance: ${accountBalance} USD`;
console.log("HTML Output (check source for highlighting):\n", htmlOutput);
// Output will be: User: <span style="background-color: yellow;">Bob</span>, Balance: <span style="background-color: yellow;">1500</span> USD
// (This would be rendered correctly in an HTML context)
```

---

## 23. Event Delegation

**Explanation:**
Event Delegation is a technique where you attach a **single event listener to a parent element** instead of attaching individual listeners to multiple child elements. When an event (like a click) occurs on a child element, it bubbles up to the parent, and the single listener on the parent then handles the event.

**How it works:**
1.  An event originates from a target element.
2.  During the **bubbling phase** (default event propagation), the event travels up the DOM tree from the target to its ancestors.
3.  The parent element's event listener intercepts the event.
4.  Inside the event handler on the parent, you use `event.target` (which points to the original element that triggered the event) to identify which specific child element was clicked and then perform actions based on it.

**Benefits of Event Delegation:**

* **Performance Optimization:** Reduces the number of event listeners attached to the DOM, especially beneficial for lists with many items. Fewer listeners mean less memory consumption and potentially faster page load.
* **Dynamic Elements:** Automatically handles events for elements that are added or removed from the DOM dynamically (e.g., items added to a list after an AJAX call). You don't need to reattach listeners.
* **Simplified Code:** Makes your JavaScript cleaner and easier to manage, as you don't need to loop through and attach listeners to each individual element.

**When to use it:**
* When you have a list of similar elements (e.g., table rows, list items) that all need to react to the same type of event.
* When elements are added or removed from the DOM dynamically.

**Code Snippet:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Delegation Example</title>
    <style>
        #myList {
            border: 1px solid #ccc;
            padding: 10px;
            list-style: none;
            cursor: pointer;
        }
        #myList li {
            padding: 8px;
            margin: 5px 0;
            background-color: #f0f0f0;
        }
        #myList li:hover {
            background-color: #e0e0e0;
        }
    </style>
</head>
<body>
    <h1>Event Delegation Demo</h1>
    <ul id="myList">
        <li data-item-id="1">Item 1</li>
        <li data-item-id="2">Item 2</li>
        <li data-item-id="3">Item 3</li>
        </ul>
    <button id="addItem">Add New Item</button>

    <script>
        const myList = document.getElementById('myList');
        const addItemButton = document.getElementById('addItem');
        let nextItemId = 4;

        // Attach a single event listener to the parent <ul>
        myList.addEventListener('click', function(event) {
            // Check if the clicked element (event.target) matches our desired child elements
            // Using Element.matches() is robust for checking selectors
            if (event.target && event.target.matches('li[data-item-id]')) {
                const itemId = event.target.dataset.itemId;
                console.log(`Clicked on item with ID: ${itemId}, Text: ${event.target.textContent}`);
                event.target.style.backgroundColor = 'lightblue'; // Visual feedback
            }
        });

        // Function to add new items dynamically
        addItemButton.addEventListener('click', () => {
            const newItem = document.createElement('li');
            newItem.textContent = `New Item ${nextItemId}`;
            newItem.dataset.itemId = nextItemId; // Add a data attribute for identification
            myList.appendChild(newItem);
            nextItemId++;
            console.log("New item added. Click it to see event delegation work!");
        });

        // Try adding many items and see the performance benefit
        // for (let i = 0; i < 100; i++) {
        //     const newItem = document.createElement('li');
        //     newItem.textContent = `Fast Item ${i + 1}`;
        //     newItem.dataset.itemId = `auto-${i + 1}`;
        //     myList.appendChild(newItem);
        // }
    </script>
</body>
</html>
```

---

## 24. Destructuring Arrays and Objects

**Explanation:**
Destructuring assignment is a powerful ES6 (ECMAScript 2015) syntax that allows you to "unpack" values from arrays or properties from objects into distinct variables in a more concise and readable way.

* **Array Destructuring:**
    * Allows you to extract values from arrays into individual variables based on their position (index).
    * Syntax uses square brackets `[]` on the left-hand side of the assignment.
    * You can skip elements, use default values, and capture remaining elements with the rest parameter.

* **Object Destructuring:**
    * Allows you to extract properties from objects into individual variables based on their property names.
    * Syntax uses curly braces `{}` on the left-hand side of the assignment.
    * You can rename variables, use default values, and capture remaining properties with the rest parameter.

**Benefits:**
* **Conciseness:** Reduces boilerplate code compared to accessing properties one by one.
* **Readability:** Makes code easier to understand by immediately seeing which values/properties are being extracted.
* **Flexibility:** Supports default values, renaming, and nested destructuring.

**Code Snippet:**

```javascript
// --- Array Destructuring ---
console.log("--- Array Destructuring ---");

const colors = ["red", "green", "blue", "yellow"];

// Basic destructuring
const [firstColor, secondColor] = colors;
console.log(firstColor);  // "red"
console.log(secondColor); // "green"

// Skipping elements
const [, , thirdColor] = colors; // Skip first two
console.log(thirdColor);  // "blue"

// Using rest parameter to collect remaining elements
const [mainColor, ...otherColors] = colors;
console.log(mainColor);   // "red"
console.log(otherColors); // ["green", "blue", "yellow"]

// Default values (if the array element is undefined)
const [color1, color2, color3, color4, color5 = "purple"] = colors;
console.log(color5);      // "purple" (because colors[4] is undefined)

// Swapping variables (classic use case)
let a = 10;
let b = 20;
[a, b] = [b, a];
console.log(`a: ${a}, b: ${b}`); // a: 20, b: 10

// Destructuring function return values (if function returns an array)
function getCoordinates() {
  return [100, 200];
}
const [x, y] = getCoordinates();
console.log(`X: ${x}, Y: ${y}`); // X: 100, Y: 200


// --- Object Destructuring ---
console.log("\n--- Object Destructuring ---");

const person = {
  firstName: "Alice",
  lastName: "Smith",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Anytown"
  },
  hobbies: ["reading", "hiking"]
};

// Basic destructuring
const { firstName, age } = person;
console.log(firstName); // "Alice"
console.log(age);       // 30

// Renaming properties
const { firstName: fName, lastName: lName } = person;
console.log(fName);     // "Alice"
console.log(lName);     // "Smith"

// Default values (if property does not exist)
const { country = "USA", age: personAge } = person;
console.log(country);   // "USA"
console.log(personAge); // 30

// Nested destructuring
const { address: { city: personCity, street } } = person;
console.log(personCity); // "Anytown"
console.log(street);     // "123 Main St"

// Using rest parameter to collect remaining properties
const { firstName: nameOnly, ...restOfPerson } = person;
console.log(nameOnly);     // "Alice"
console.log(restOfPerson); // { lastName: "Smith", age: 30, address: {...}, hobbies: [...] }

// Destructuring in function parameters
function printUserDetails({ firstName, lastName, age, address: { city } }) {
  console.log(`Name: ${firstName} ${lastName}, Age: ${age}, City: ${city}`);
}
printUserDetails(person); // Output: Name: Alice Smith, Age: 30, City: Anytown

// Destructuring with default parameters for function
function getConfig({ user = "Guest", theme = "light" } = {}) { // {} default for function call if no args
  console.log(`User: ${user}, Theme: ${theme}`);
}
getConfig();             // User: Guest, Theme: light
getConfig({ user: "Admin" }); // User: Admin, Theme: light
```

---

## 25. `Symbol` in JavaScript

**Explanation:**
`Symbol` is a **primitive data type** introduced in ES6 (ES2015). Its primary purpose is to create **unique identifiers** for object properties.

* **Uniqueness**: Every `Symbol()` call generates a new, unique symbol value. Even if two symbols are created with the same description, they are not equal. This guarantees that a Symbol property added to an object won't accidentally clash with another property (including those from libraries or future JavaScript versions).
* **Immutability**: Once created, a Symbol value cannot be changed.
* **Not Enumerable by Default**: Symbol properties are not enumerable by default when using `for...in` loops or `Object.keys()`, `Object.values()`, `Object.entries()`. They are intentionally designed to be "hidden" for typical iteration, making them suitable for metadata or private-like properties.
* **Accessibility**: You can access Symbol properties directly if you have a reference to the Symbol itself (`obj[mySymbol]`), or by using `Object.getOwnPropertySymbols()`.

**Use Cases:**
* **Unique Object Property Keys:** Preventing name clashes when adding properties to objects, especially for "private" or internal properties that shouldn't be easily iterated or overwritten.
* **Constants:** Defining unique, non-colliding constants.
* **Well-Known Symbols:** JavaScript itself uses Symbols internally for certain behaviors (e.g., `Symbol.iterator`, `Symbol.hasInstance`, `Symbol.toStringTag`). These are globally recognized Symbols that expose certain internal language operations.

**Code Snippet:**

```javascript
// --- Creating Symbols ---
console.log("--- Symbol ---");

const id1 = Symbol('id'); // 'id' is a description, not the value itself
const id2 = Symbol('id');

console.log(id1);         // Symbol(id)
console.log(id2);         // Symbol(id)
console.log(id1 === id2); // false (Symbols are unique, even with same description)

const myUniqueKey = Symbol();


// --- Using Symbols as Object Properties ---
const user = {
  name: "Alice",
  age: 30
};

// Add a Symbol property
user[myUniqueKey] = "This is a unique user identifier";
user[id1] = "Another unique ID for Alice";

console.log(user.name);         // Alice (normal property)
console.log(user[myUniqueKey]); // This is a unique user identifier (access using bracket notation)
console.log(user[id1]);         // Another unique ID for Alice


// --- Symbols are not enumerable by default ---
console.log("\n--- Symbol Enumeration ---");
for (let key in user) {
  console.log(key); // Only 'name' and 'age' will be logged
}
console.log(Object.keys(user));   // ["name", "age"]
console.log(Object.values(user)); // ["Alice", 30]
console.log(JSON.stringify(user)); // {"name":"Alice","age":30} (Symbol properties are ignored by JSON.stringify)


// --- Retrieving Symbol properties ---
// Use Object.getOwnPropertySymbols() to get an array of Symbol properties
const symbolKeys = Object.getOwnPropertySymbols(user);
console.log(symbolKeys);      // [Symbol(), Symbol(id)]

console.log(user[symbolKeys[0]]); // This is a unique user identifier
console.log(user[symbolKeys[1]]); // Another unique ID for Alice


// --- Symbol.for() and Symbol.keyFor() (Global Symbol Registry) ---
// For when you want to create a Symbol that can be shared across multiple files/modules.
// Symbol.for() checks a global registry first.
console.log("\n--- Global Symbol Registry ---");

const globalId1 = Symbol.for('app.id'); // Creates or retrieves a Symbol named 'app.id'
const globalId2 = Symbol.for('app.id'); // Retrieves the same Symbol from the registry

console.log(globalId1 === globalId2); // true (they are the same Symbol)

// Symbol.keyFor() retrieves the description from the global registry
console.log(Symbol.keyFor(globalId1)); // "app.id"
console.log(Symbol.keyFor(id1));       // undefined (because id1 was not created with Symbol.for)
```

---

## 26. Generator Functions in JavaScript

**Explanation:**
Generator functions are a special type of function in JavaScript that can be paused and resumed, allowing them to yield multiple values over time rather than returning a single value and exiting. They are defined using the `function*` syntax.

* **`function*`**: Declares a generator function.
* **`yield` keyword**:
    * Used inside a generator function to pause its execution and return a value.
    * When a `yield` expression is encountered, the generator's execution is paused, and the value of the expression is returned to the caller.
    * The generator's state (including local variables) is preserved.
    * When the generator's `next()` method is called again, execution resumes from where it was last paused.
* **Generator Object (Iterator)**:
    * When a generator function is called, it does not execute immediately. Instead, it returns a **generator object** (which is an iterator).
    * This generator object has a `next()` method.
    * Calling `next()` on the generator object resumes the generator function's execution until the next `yield` or `return` statement is encountered.
    * The `next()` method returns an object of the form `{ value: any, done: boolean }`.
        * `value`: The value yielded by the `yield` expression.
        * `done`: `true` if the generator has finished executing (no more `yield`s or a `return` has been reached), `false` otherwise.
* **Infinite Sequences**: Generators are ideal for creating infinite sequences of data, as values are generated lazily (on demand) rather than all at once.

**Use Cases:**
* **Iterators**: Implementing custom iterators for complex data structures.
* **Asynchronous Flow Control**: Can be used with libraries like `co` (though `async/await` is now more common) to manage asynchronous operations in a synchronous-looking way.
* **Lazy Computation**: Generating values only when they are needed, saving memory and processing time for large or infinite sequences.
* **State Machines**: Implementing finite state machines.

**Code Snippet:**

```javascript
// --- Basic Generator Function ---
console.log("--- Generator Functions ---");

function* simpleGenerator() {
  console.log('Step 1: Yielding 1');
  yield 1; // Pause and return 1

  console.log('Step 2: Yielding 2');
  yield 2; // Pause and return 2

  console.log('Step 3: Yielding 3');
  yield 3; // Pause and return 3

  console.log('Step 4: Done');
  // No more yield statements, next call to .next() will have done: true
}

// Call the generator function to get a generator object (iterator)
const gen = simpleGenerator();

console.log(gen.next()); // Output: { value: 1, done: false } (Step 1 log appears)
console.log(gen.next()); // Output: { value: 2, done: false } (Step 2 log appears)
console.log(gen.next()); // Output: { value: 3, done: false } (Step 3 log appears)
console.log(gen.next()); // Output: { value: undefined, done: true } (Step 4 log appears)
console.log(gen.next()); // Output: { value: undefined, done: true } (no more execution)


// --- Generator for Infinite Sequence (e.g., ID generator) ---
function* idGenerator() {
  let id = 0;
  while (true) { // Infinite loop, but doesn't block thanks to yield
    yield id++;
  }
}

const generateId = idGenerator();
console.log("\nID Generator:");
console.log(generateId.next().value); // 0
console.log(generateId.next().value); // 1
console.log(generateId.next().value); // 2
console.log(generateId.next().value); // 3


// --- Passing values into a Generator ---
function* respondToInput() {
  console.log("Generator started. Waiting for first input...");
  const firstInput = yield "What's your name?"; // Yields prompt, receives first input

  console.log(`Hello, ${firstInput}. What's your favorite color?`);
  const secondInput = yield "What's your favorite color?"; // Yields prompt, receives second input

  return `Thanks for telling me your color, ${secondInput}.`;
}

const responder = respondToInput();
console.log("\nResponding to Input:");
console.log(responder.next());        // { value: "What's your name?", done: false }
console.log(responder.next("Alice")); // { value: "What's your favorite color?", done: false }
console.log(responder.next("Blue"));  // { value: "Thanks for telling me your color, Blue.", done: true }
```

---

## 27. JavaScript `new` Keyword

**Explanation:**
The `new` keyword is used to create an instance of a user-defined object type or a built-in object type that has a constructor function. When the `new` keyword is used before a function call, it performs the following four steps:

1.  **Creates a new, empty object:** A brand new plain JavaScript object is created in memory.
2.  **Links to Prototype:** The new object's `[[Prototype]]` (i.e., `__proto__`) is set to the `prototype` property of the constructor function. This establishes the inheritance chain.
3.  **Binds `this`:** The `this` context within the constructor function is bound to the newly created object. So, any properties assigned to `this` inside the constructor will become properties of the new object.
4.  **Returns the Object:**
    * If the constructor function does not explicitly return an object, `new` will implicitly return the newly created `this` object.
    * If the constructor function *does* explicitly return an object (and it's a non-primitive value), that object will be returned instead of the newly created `this` object. If it explicitly returns a primitive, that primitive is ignored, and the `this` object is still returned.

**Constructor Function:**
A constructor function is a regular JavaScript function that is designed to be called with the `new` keyword. By convention, constructor functions are named with an initial capital letter (PascalCase).

**Code Snippet:**

```javascript
// --- Example 1: Basic Constructor Function ---
console.log("--- new Keyword ---");

function Person(name, age) {
  // Step 3: 'this' is bound to the new empty object
  this.name = name;
  this.age = age;
  this.greet = function() { // Method created on each instance
    console.log(`Hello, my name is ${this.name}.`);
  };
}

// Step 1: New empty object is created
// Step 2: Its prototype is linked to Person.prototype
// Step 4: The new object (this) is implicitly returned
const person1 = new Person("Alice", 30);

console.log(person1.name);     // "Alice"
console.log(person1.age);      // 30
person1.greet();               // "Hello, my name is Alice."

const person2 = new Person("Bob", 25);
person2.greet();               // "Hello, my name is Bob."

console.log(person1 instanceof Person); // true
console.log(person1.constructor === Person); // true
console.log(person1.__proto__ === Person.prototype); // true


// --- Example 2: Methods on Prototype for efficiency ---
// It's generally better to put methods on the constructor's prototype
// so they are shared among all instances, saving memory.
function Animal(species) {
  this.species = species;
}

Animal.prototype.makeSound = function() {
  console.log(`The ${this.species} makes a sound.`);
};

const lion = new Animal("Lion");
lion.makeSound(); // The Lion makes a sound.
const tiger = new Animal("Tiger");
tiger.makeSound(); // The Tiger makes a sound.

console.log(lion.makeSound === tiger.makeSound); // true (same function reference)


// --- Example 3: Constructor returning an object ---
function SpecialObjectCreator() {
  this.propertyA = "default A"; // This property will be on the 'this' object

  // If a non-primitive object is returned explicitly,
  // that object replaces the 'this' object created by 'new'.
  return { propertyB: "special B" };
}

const specialInstance = new SpecialObjectCreator();
console.log("\nSpecial Instance:");
console.log(specialInstance.propertyA); // undefined (the 'this' object was discarded)
console.log(specialInstance.propertyB); // special B (the returned object)


// --- Example 4: Constructor returning a primitive (ignored) ---
function PrimitiveReturnConstructor() {
  this.value = "original";
  return 123; // Primitive return is ignored
}

const primitiveInstance = new PrimitiveReturnConstructor();
console.log("\nPrimitive Return Instance:");
console.log(primitiveInstance.value); // original (the 'this' object is returned)
```

---

## 28. `WeakMap` vs `Map` (Review)

**Explanation:**
This section is a review of the comparison table and key concepts from section 19, focusing on the differences.

| Feature            | `Map`                                      | `WeakMap`                                   |
| :----------------- | :----------------------------------------- | :------------------------------------------ |
| **Keys** | Can be **any data type** (primitives, objects, functions) | **Must be objects only** (no primitives)    |
| **References to Keys** | Holds **strong references** to its keys. This means a key object will not be garbage collected as long as it's a key in a `Map`. | Holds **weak references** to its keys. If an object used as a key in a `WeakMap` has no other strong references pointing to it, it can be garbage collected. |
| **Garbage Collection**| Prevents keys from being garbage collected if they are in the Map. | **Allows keys to be garbage collected** if no other strong references exist. This is the primary use case. |
| **Iteration** | **Iterable** (`forEach`, `keys()`, `values()`, `entries()`). Order is guaranteed (insertion order). | **Not Iterable**. Cannot loop over keys/values, cannot get `.size`. This is due to keys possibly disappearing at any time because of GC. |
| **Size Property** | Has a `.size` property.                    | **Does not have a `.size` property**.       |
| **Primary Use Cases** | General key-value data storage, when you need keys other than strings, or need to maintain insertion order. | Associating data with objects without preventing those objects from being garbage collected (e.g., private data for DOM elements, memoization caches for function arguments that are objects). |

**Code Snippet:**

```javascript
// --- WeakMap vs Map Demonstration ---
console.log("--- WeakMap vs Map ---");

// Case 1: Object as key
let objKey1 = { id: 1 };
let objKey2 = { id: 2 };

const strongMap = new Map();
const weakMap = new WeakMap();

strongMap.set(objKey1, "Value for objKey1 in strongMap");
weakMap.set(objKey2, "Value for objKey2 in weakMap");

console.log("StrongMap has objKey1:", strongMap.has(objKey1)); // true
console.log("WeakMap has objKey2:", weakMap.has(objKey2));   // true

// Remove the strong reference to objKey1 and objKey2
objKey1 = null;
objKey2 = null;

// The garbage collector might run at any time.
// strongMap will still hold its reference to the original {id: 1} object.
// weakMap will eventually release its reference to the original {id: 2} object.

// You can still access strongMap because it's iterable:
console.log("StrongMap after nulling reference:", strongMap);
// Map(1) { { id: 1 } => 'Value for objKey1 in strongMap' } (still holds it)

// WeakMap is not iterable, so we can't easily inspect its contents,
// but we can test for existence if we happen to have a *new* object that matches the reference (which won't be the case here).
// We cannot confirm GC just by printing, as GC is non-deterministic.
// But conceptually, the WeakMap entry will be removed when the object is GC'd.
// console.log(weakMap.has(objKey2)); // false (if GC ran and collected)

// Case 2: Primitive as key
// strongMap.set("stringKey", "Value for stringKey");
// weakMap.set("stringKey", "Value for stringKey"); // TypeError: Invalid value used as weak map key

// Iteration difference
const iterableMap = new Map([[1, 'one'], [2, 'two']]);
iterableMap.forEach((val, key) => console.log(`Map: ${key} = ${val}`));
// for (const [key, val] of iterableMap) { /* ... */ }

const nonIterableWeakMap = new WeakMap();
// nonIterableWeakMap.forEach(...) // Error
// for (const [key, val] of nonIterableWeakMap) { /* ... */ } // Error
```

---

## 29. `find()`, `some()`, `every()` Array Methods

**Explanation:**
These are powerful higher-order array methods in JavaScript that allow for efficient searching and checking of conditions within arrays. They all take a callback function as an argument.

* **`find(callbackFn, thisArg)`:**
    * **Purpose:** Returns the **first element** in the array that satisfies the provided testing function.
    * **Returns:** The value of the first element that passes the test. If no elements satisfy the test, it returns `undefined`.
    * **Behavior:** Stops iterating as soon as the first matching element is found.
    * **Use Cases:** Finding a specific item, or the first item that matches a condition.

* **`some(callbackFn, thisArg)`:**
    * **Purpose:** Checks if **at least one** element in the array satisfies the provided testing function.
    * **Returns:** `true` if the callback function returns a truthy value for *any* array element; otherwise, `false`.
    * **Behavior:** Stops iterating as soon as the first element that satisfies the condition is found.
    * **Use Cases:** Checking for the existence of at least one item that meets criteria, verifying if a list is not empty or contains active users.

* **`every(callbackFn, thisArg)`:**
    * **Purpose:** Checks if **all** elements in the array satisfy the provided testing function.
    * **Returns:** `true` if the callback function returns a truthy value for *every* array element; otherwise, `false`.
    * **Behavior:** Stops iterating as soon as the first element that *does not* satisfy the condition is found.
    * **Use Cases:** Validating if all items meet certain criteria, checking if all form fields are valid.

**Callback Function Arguments (for all three methods):**
The `callbackFn` passed to these methods typically accepts three arguments:
1.  `element`: The current element being processed in the array.
2.  `index` (optional): The index of the current element.
3.  `array` (optional): The array `find`, `some`, or `every` was called upon.

**Code Snippet:**

```javascript
const numbers = [10, 25, 30, 15, 40, 5];
const users = [
  { id: 1, name: "Alice", age: 28, isActive: true },
  { id: 2, name: "Bob", age: 35, isActive: false },
  { id: 3, name: "Charlie", age: 22, isActive: true },
  { id: 4, name: "David", age: 40, isActive: false }
];

// --- find() Example ---
console.log("--- find() ---");

// Find the first number greater than 20
const foundNumber = numbers.find(num => num > 20);
console.log("First number > 20:", foundNumber); // Output: 25

// Find a user by ID
const userWithId3 = users.find(user => user.id === 3);
console.log("User with ID 3:", userWithId3); // Output: { id: 3, name: "Charlie", age: 22, isActive: true }

// Find an active user older than 30
const activeUserOlderThan30 = users.find(user => user.isActive && user.age > 30);
console.log("Active user older than 30:", activeUserOlderThan30); // Output: null (no such user)


// --- some() Example ---
console.log("\n--- some() ---");

// Check if any number is greater than 30
const anyGreaterThan30 = numbers.some(num => num > 30);
console.log("Are any numbers > 30?", anyGreaterThan30); // Output: true (because 40 exists)

// Check if any user is active
const anyActiveUser = users.some(user => user.isActive);
console.log("Are any users active?", anyActiveUser); // Output: true

// Check if any user is a teenager
const anyTeenager = users.some(user => user.age >= 13 && user.age <= 19);
console.log("Are any users teenagers?", anyTeenager); // Output: false


// --- every() Example ---
console.log("\n--- every() ---");

// Check if all numbers are greater than 5
const allGreaterThan5 = numbers.every(num => num > 5);
console.log("Are all numbers > 5?", allGreaterThan5); // Output: false (because 5 is not > 5)

// Check if all numbers are positive
const allPositive = numbers.every(num => num > 0);
console.log("Are all numbers positive?", allPositive); // Output: true

// Check if all users are older than 20
const allUsersOlderThan20 = users.every(user => user.age > 20);
console.log("Are all users older than 20?", allUsersOlderThan20); // Output: true

// Check if all users are active
const allUsersActive = users.every(user => user.isActive);
console.log("Are all users active?", allUsersActive); // Output: false (Bob and David are not active)
```

---

## 30. Handling Forms in JavaScript

**Explanation:**
Handling forms involves capturing user input, managing its state, validating it, and submitting it. In plain JavaScript, this typically involves listening to DOM events and directly manipulating the DOM.

**Key Concepts:**

1.  **Accessing Form Elements:**
    * `document.getElementById()`
    * `document.querySelector()` / `document.querySelectorAll()`
    * `event.target` (in event listeners)
    * `form.elements` (a collection of all controls in a form)

2.  **Getting/Setting Input Values:**
    * `inputElement.value` (for text, number, password, textarea, select)
    * `checkboxElement.checked` (for checkboxes)
    * `radioElement.checked` (for radio buttons)

3.  **Event Listeners:**
    * **`input` event:** Fires immediately when the value of an `<input>`, `<select>`, or `<textarea>` element changes. Useful for real-time validation or character counting.
    * **`change` event:** Fires when the value of an element has been committed (e.g., input loses focus, select option is chosen). For checkboxes/radio buttons, it fires immediately on click.
    * **`submit` event:** Fires when a form is submitted. This is the primary event to handle form data. Remember to call `event.preventDefault()` to stop the default browser behavior (which is usually a page reload).

4.  **Form Validation:**
    * **Client-Side Validation:** Performed in the browser *before* submission.
        * **HTML5 Validation:** Use attributes like `required`, `minlength`, `maxlength`, `type="email"`, `pattern`, `min`, `max`. The browser handles basic checks and provides built-in UI (e.g., "Please fill out this field").
        * **JavaScript Validation:** Implement custom logic to check input values against specific rules.
    * **Server-Side Validation:** Always necessary as client-side validation can be bypassed.

**Code Snippet (Basic Form Handling):**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Form Handling</title>
    <style>
        form { margin: 20px; padding: 20px; border: 1px solid #ccc; max-width: 400px; }
        div { margin-bottom: 10px; }
        label { display: block; margin-bottom: 5px; }
        input[type="text"], input[type="email"], textarea, select {
            width: calc(100% - 10px);
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .error-message { color: red; font-size: 0.9em; margin-top: 5px; }
        button { padding: 10px 15px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background-color: #0056b3; }
    </style>
</head>
<body>
    <h1>User Registration Form</h1>

    <form id="registrationForm">
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required minlength="3">
            <div id="usernameError" class="error-message"></div>
        </div>
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <div id="emailError" class="error-message"></div>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required minlength="6">
            <div id="passwordError" class="error-message"></div>
        </div>
        <div>
            <label for="country">Country:</label>
            <select id="country" name="country" required>
                <option value="">--Select Country--</option>
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
                <option value="uk">UK</option>
            </select>
            <div id="countryError" class="error-message"></div>
        </div>
        <div>
            <label>
                <input type="checkbox" id="terms" name="terms" required>
                I agree to the terms and conditions
            </label>
            <div id="termsError" class="error-message"></div>
        </div>
        <button type="submit">Register</button>
    </form>

    <div id="formOutput" style="margin: 20px; padding: 10px; background-color: #e9ecef; border-radius: 4px;">
        <h3>Form Data Submitted:</h3>
        <pre id="outputContent"></pre>
    </div>

    <script>
        const form = document.getElementById('registrationForm');
        const usernameInput = document.getElementById('username');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const countrySelect = document.getElementById('country');
        const termsCheckbox = document.getElementById('terms');

        const usernameError = document.getElementById('usernameError');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const countryError = document.getElementById('countryError');
        const termsError = document.getElementById('termsError');

        const outputContent = document.getElementById('outputContent');

        // --- Validation Logic ---
        function validateUsername() {
            if (usernameInput.value.length < 3) {
                usernameError.textContent = "Username must be at least 3 characters long.";
                return false;
            }
            usernameError.textContent = "";
            return true;
        }

        function validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailError.textContent = "Please enter a valid email address.";
                return false;
            }
            emailError.textContent = "";
            return true;
        }

        function validatePassword() {
            if (passwordInput.value.length < 6) {
                passwordError.textContent = "Password must be at least 6 characters long.";
                return false;
            }
            passwordError.textContent = "";
            return true;
        }

        function validateCountry() {
            if (countrySelect.value === "") {
                countryError.textContent = "Please select a country.";
                return false;
            }
            countryError.textContent = "";
            return true;
        }

        function validateTerms() {
            if (!termsCheckbox.checked) {
                termsError.textContent = "You must agree to the terms and conditions.";
                return false;
            }
            termsError.textContent = "";
            return true;
        }

        function validateForm() {
            const isUsernameValid = validateUsername();
            const isEmailValid = validateEmail();
            const isPasswordValid = validatePassword();
            const isCountryValid = validateCountry();
            const areTermsAccepted = validateTerms();

            // Return true only if all validations pass
            return isUsernameValid && isEmailValid && isPasswordValid && isCountryValid && areTermsAccepted;
        }

        // --- Event Listeners ---

        // Real-time validation on input
        usernameInput.addEventListener('input', validateUsername);
        emailInput.addEventListener('input', validateEmail);
        passwordInput.addEventListener('input', validatePassword);

        // Validation on change (for select and checkbox)
        countrySelect.addEventListener('change', validateCountry);
        termsCheckbox.addEventListener('change', validateTerms);


        // Form submission handler
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission (page reload)

            if (validateForm()) {
                // If form is valid, collect data
                const formData = {
                    username: usernameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value, // In real apps, hash passwords before sending!
                    country: countrySelect.value,
                    termsAccepted: termsCheckbox.checked
                };

                outputContent.textContent = JSON.stringify(formData, null, 2);
                console.log("Form data submitted:", formData);

                // In a real application, you would send this data to a server
                // e.g., fetch('/api/register', { method: 'POST', body: JSON.stringify(formData) });

                alert("Registration successful!");
                form.reset(); // Clear the form after successful submission
                // Clear errors manually after reset if they were displayed
                usernameError.textContent = "";
                emailError.textContent = "";
                passwordError.textContent = "";
                countryError.textContent = "";
                termsError.textContent = "";

            } else {
                console.log("Form has validation errors.");
                alert("Please correct the errors in the form.");
            }
        });
    </script>
</body>
</html>
```

---
