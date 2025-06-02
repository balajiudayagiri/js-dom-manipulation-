# 📘 JavaScript Variables: `var`, `let`, and `const` (with Mermaid Diagrams)

---

## 🔁 Variable Lifecycle & Scope Flow

### 🔹 Function vs Block Scope

```mermaid
graph TD
  A[Global Scope] --> B[Function]
  B --> C[if Block]
  C -->|var| D[var: visible in Function]
  C -->|let| E[let: visible only in Block]
  C -->|const| F[const: visible only in Block]
```

🔍 **Explanation**:

* `var` is **function-scoped**: available inside the entire function.
* `let` & `const` are **block-scoped**: available only within `{}` where declared.

---

## ⏫ Hoisting Visualization

```mermaid
sequenceDiagram
  participant JS Engine
  participant Code

  JS Engine->>Code: Parse Code
  JS Engine->>Memory: Hoist var (initialized to undefined)
  JS Engine->>Memory: Hoist let/const (TDZ, not initialized)
  Code->>Memory: Execute and assign values
```

🔍 **Explanation**:

* `var` is **hoisted and initialized** with `undefined`.
* `let` and `const` are **hoisted but not initialized**, which leads to **TDZ errors**.

---

## 📦 TDZ (Temporal Dead Zone)

```mermaid
gantt
    dateFormat  X
    title TDZ Example (let/const)

    section Scope Timeline
    TDZ :a1, 0, 30
    Initialization :a2, 30, 70
```

🔍 **Explanation**:

* Between entering scope and initialization, the variable is in a **TDZ**.
* Accessing it in this zone causes `ReferenceError`.

---

## ♻️ Reassignment & Mutability

```mermaid
graph TD
  A[var x = 1] -->|Redeclare OK| A2[var x = 2]
  B[let y = 1] -->|Reassign OK| B2[y = 2]
  B -->|Redeclare ❌| B3[SyntaxError]
  C[const z = 1] -->|Reassign ❌| C2[TypeError]
  C -->|Redeclare ❌| C3[SyntaxError]
```

🔍 **Explanation**:

* `var` allows redeclaration.
* `let` allows reassignment but not redeclaration.
* `const` allows neither.

---

## 🧪 Closure Bug with `var` in Loops

```mermaid
sequenceDiagram
  participant Loop (i)
  participant Timer
  participant Console

  Loop->>Timer: setTimeout(() => console.log(i))
  Timer-->>Console: Logs 3, 3, 3 (after loop ends)
```

🔍 **Fix** with `let`:

* Each loop iteration gets its **own scope** for `let i`.

---

## 🧾 Summary Table

```mermaid
classDiagram
  class Var {
    +Function Scope
    +Hoisted (undefined)
    +Redeclarable
    +Reassignable
  }

  class Let {
    +Block Scope
    +Hoisted (TDZ)
    -Redeclarable
    +Reassignable
  }

  class Const {
    +Block Scope
    +Hoisted (TDZ)
    -Redeclarable
    -Reassignable
    +Mutable (objects)
  }

  Var <|-- Let
  Let <|-- Const
```

---

## ✅ Best Practice Flow

```mermaid
flowchart TD
    A[Start] --> B{Is the value going to change?}
    B -- No --> C[Use const]
    B -- Yes --> D[Use let]
    C --> E[Declare variable safely]
    D --> E
```
