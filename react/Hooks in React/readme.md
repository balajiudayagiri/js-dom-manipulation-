# **Hooks in React**

Hooks are one of the most important features introduced in React 16.8, enabling developers to use state and other React features in functional components. Before hooks, React state management and lifecycle methods were only available in class components. With the introduction of hooks, React provided a more elegant and functional approach to managing state, side effects, context, and more.

This guide will cover the core **React hooks**, their usage, and how they improve component reusability and readability.

---

## **Types of React Hooks**

React provides several built-in hooks, each designed to solve specific tasks. Let’s break down the most commonly used hooks and understand how they work:

1. **useState**
2. **useEffect**
3. **useContext**
4. **useReducer**
5. **useRef**
6. **useMemo**
7. **useCallback**
8. **Custom Hooks**

---

## **1. useState Hook**

### **What is `useState`?**

`useState` is a hook that allows you to add state to functional components. Before hooks, state could only be used in class components. `useState` provides an easier, functional way to manage state.

### **Syntax:**

```jsx
const [state, setState] = useState(initialState);
```

* `state`: The current state value.
* `setState`: The function to update the state.
* `initialState`: The initial state value (can be a primitive, array, object, etc.).

### **Example:**

```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;
```

### **When to Use:**

* **Local state management**: For managing simple state like form inputs, counters, toggles, etc.

---

## **2. useEffect Hook**

### **What is `useEffect`?**

`useEffect` is a hook used to perform side effects in functional components. Side effects can include data fetching, subscriptions, DOM manipulations, or any action that doesn't directly involve rendering the UI.

### **Syntax:**

```jsx
useEffect(() => {
  // Code to run
}, [dependencies]);
```

* The first argument is a **callback function** that runs after the render is committed to the screen.
* The second argument is the **dependencies array**. If provided, `useEffect` only runs when one of the values in the array changes. If omitted, the effect runs after every render.

### **Example:**

```jsx
import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty array ensures this effect runs once after the first render

  return <p>Timer: {seconds}s</p>;
};

export default Timer;
```

### **When to Use:**

* **Side effects**: For handling data fetching, DOM manipulations, or setting up and cleaning up timers, intervals, etc.
* **Dependency management**: To run effects based on state or props changes.

---

## **3. useContext Hook**

### **What is `useContext`?**

`useContext` is a hook used to access the value of a **Context** directly in a functional component. Context allows you to pass data deeply through the component tree without having to pass props manually at every level.

### **Syntax:**

```jsx
const value = useContext(MyContext);
```

### **Example:**

```jsx
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemedComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <p>The current theme is {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <ThemedComponent />
  </ThemeProvider>
);

export default App;
```

### **When to Use:**

* **Context-based state management**: Use `useContext` for global state management where data needs to be shared across multiple components.

---

## **4. useReducer Hook**

### **What is `useReducer`?**

`useReducer` is used for state management in more complex scenarios, especially when state depends on multiple values or when the next state depends on the previous one. It’s often used as an alternative to `useState` when managing more intricate states.

### **Syntax:**

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

* `reducer`: A function that returns the next state based on the current state and action.
* `dispatch`: A function used to dispatch actions to the reducer.

### **Example:**

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
};

export default Counter;
```

### **When to Use:**

* **Complex state logic**: When state changes depend on previous state, or when managing large, nested state structures.

---

## **5. useRef Hook**

### **What is `useRef`?**

`useRef` is used to persist values across renders without causing re-renders. It is primarily used to reference DOM elements or store mutable values that don’t cause re-rendering when they change.

### **Syntax:**

```jsx
const myRef = useRef(initialValue);
```

* `myRef`: A reference object.
* `initialValue`: The initial value of the reference object.

### **Example:**

```jsx
import React, { useRef } from 'react';

const FocusInput = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
};

export default FocusInput;
```

### **When to Use:**

* **Referencing DOM elements**: Useful for managing focus, text selection, or media playback.
* **Storing mutable values**: When you need to store values that persist across renders but don’t require re-renders.

---

## **6. useMemo Hook**

### **What is `useMemo`?**

`useMemo` is used to **memoize** expensive calculations, ensuring that the calculation is only re-executed when the dependencies change. This helps in optimizing performance by preventing unnecessary recalculations.

### **Syntax:**

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

### **Example:**

```jsx
import React, { useMemo, useState } from 'react';

const ExpensiveComputation = ({ a, b }) => {
  const computeExpensiveValue = (a, b) => {
    console.log('Computing expensive value');
    return a + b;
  };

  const result = useMemo(() => computeExpensiveValue(a, b), [a, b]);

  return <div>{result}</div>;
};

const App = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  return (
    <div>
      <ExpensiveComputation a={a} b={b} />
      <button onClick={() => setA(a + 1)}>Increment A</button>
      <button onClick={() => setB(b + 1)}>Increment B</button>
    </div>
  );
};

export default App;
```

### **When to Use:**

* **Expensive calculations**: When calculations are expensive and need to be cached to improve performance.

---

## **7. useCallback Hook**

### **What is `useCallback`?**

`useCallback` is used to **memoize functions** so that they don’t get re-created on each render unless necessary. This is useful when passing callbacks to child components that depend on reference equality.

### **Syntax:**

```jsx
const memoizedCallback = useCallback(() => { /* function body */ }, [dependencies]);
```

### **Example:**

```jsx
import React, { useState, useCallback } from 'react';

const Button = ({ onClick }) => {
  console.log('Button rendered');
  return <button onClick={onClick}>Click Me</button>;
};

const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={handleClick} />
    </div>
  );
};

export default App;
```

### **When to Use:**

* **Avoid re-creating functions**: Use `useCallback` when passing functions to child components to avoid unnecessary re-renders.

---

## **8. Custom Hooks**

### **What is a Custom Hook?**

Custom hooks allow you to **extract and reuse logic** across multiple components. They are JavaScript functions that call other hooks inside them.

### **Example:**

```jsx
import { useState, useEffect } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    };
    
    fetchData();
  }, [url]);

  return data;
};

const MyComponent = () => {
  const data = useFetchData('https://jsonplaceholder.typicode.com/posts');

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
};
```

### **When to Use:**

* **Reusing logic**: When you need to share stateful logic across multiple components, custom hooks can encapsulate the logic for reuse.

---

## **Conclusion**

React hooks provide a more **elegant** and **functional** approach to managing state, handling side effects, and reusing logic in functional components. With hooks like `useState`, `useEffect`, and `useContext`, React allows you to build complex applications with cleaner and more maintainable code.

By leveraging **memoization**, **custom hooks**, and **optimized rendering techniques**, React developers can create high-performance applications with less boilerplate code and more flexibility.
