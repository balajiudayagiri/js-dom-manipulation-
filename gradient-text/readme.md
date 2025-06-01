# Gradient Text

A gradient text effect with hover animation. This effect makes text appear with a smooth, vibrant gradient that transitions on hover. It's perfect for adding attention-grabbing headlines or decorative text to a website.

## 🌟 Features

- Text with a conic-gradient background.
- Smooth hover animation that changes the gradient's size and position.
- Pure CSS implementation.

## 🛠️ Technologies Used

- HTML5
- CSS3

## 🚀 Setup and Usage

1.  **Ensure you have the files:**
    Place the following files in the same directory:

    - `index.html`
    - `style.css`

2.  **Open `index.html` in your web browser.**

## 📂 File Structure

```
.
├── index.html       # The main HTML structure for the gradient text
└── style.css        # CSS styles for the gradient and hover animation
```

## 💡 How It Works

- **`index.html`**: Provides a simple `<h1>` element with the class `gradient-text`.
- **`style.css`**:
  - Sets the text color to transparent.
  - Applies a `conic-gradient` as the `background` of the text.
  - Uses `background-clip: text` to make the gradient visible only through the text.
  - Defines `@keyframes` for `expand` and `expand-rev` to animate the `background-size` and `background-position` on hover and when the hover ends.
