# json-to-web

A Node.js application that converts JSON configuration files into web files (HTML, CSS, JS).

## 📚 Documentation

All documentation files are organized in the `docs/` folder. See [docs/INDEX.md](INDEX.md) for a complete list.

## Installation

No dependencies required! Just make sure you have Node.js installed.

## Project Structure

```
json-to-web/
├── src/
│   └── generator.js      # Main generator logic
├── examples/
│   └── input.json        # Example JSON input
├── output-web/           # Generated web application (auto-created)
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
├── index.js              # Entry point
├── package.json
└── README.md
```

## Usage

1. **Using the example file**: The project includes an example `input.json` in the `examples/` folder.

2. **With custom input**: Place your `input.json` in the examples folder or pass a path:

```bash
npm start                           # Uses examples/input.json
node index.js examples/myfile.json  # Uses custom file
```

3. **Output**: The application generates a proper web application structure in `output-web/`:
   ```
   output-web/
   ├── index.html       # Main HTML file
   ├── css/
   │   └── style.css    # Styles
   └── js/
       └── script.js    # JavaScript
   ```

## Input JSON Format

### Basic Structure

```json
{
  "title": "Page Title",
  "styles": {
    "backgroundColor": "lightblue",
    "color": "black"
  },
  "body": [
    { "type": "header", "value": "Welcome" },
    { "type": "paragraph", "value": "Some text" },
    { "type": "button", "label": "Click Me", "onClick": "alert('Hello!')" }
  ]
}
```

### Supported Element Types

#### 1. Header
```json
{ "type": "header", "value": "Your Heading Text" }
```
Generates: `<h1>Your Heading Text</h1>`

#### 2. Paragraph
```json
{ "type": "paragraph", "value": "Your paragraph text" }
```
Generates: `<p>Your paragraph text</p>`

#### 3. Button
```json
{ "type": "button", "label": "Button Text", "onClick": "alert('clicked')" }
```
Generates: `<button onclick="alert('clicked')">Button Text</button>`

#### 4. Image
```json
{ "type": "image", "src": "path/to/image.jpg", "alt": "Image description" }
```
Generates: `<img src="path/to/image.jpg" alt="Image description">`

#### 5. List
```json
{ "type": "list", "items": ["Item 1", "Item 2"], "ordered": false }
```
Generates: `<ul><li>Item 1</li><li>Item 2</li></ul>`

#### 6. Div
```json
{ "type": "div", "className": "my-class", "text": "Div content" }
```
Generates: `<div class="my-class">Div content</div>`

#### 7. Textbox/Input
```json
{ "type": "textbox", "name": "username", "placeholder": "Enter username", "required": true }
```
or
```json
{ "type": "input", "type": "email", "name": "email", "placeholder": "Enter email" }
```
Generates: `<input type="text" name="username" placeholder="Enter username" required>`

**Available properties:**
- `name` - Input name attribute
- `placeholder` - Placeholder text
- `type` - Input type (text, email, password, number, etc.)
- `defaultValue` - Initial value
- `required` - Makes field required

#### 8. Textarea
```json
{ "type": "textarea", "name": "comment", "placeholder": "Enter your comment", "rows": 4, "cols": 50 }
```
Generates: `<textarea name="comment" placeholder="Enter your comment" rows="4" cols="50"></textarea>`

**Available properties:**
- `name` - Textarea name attribute
- `placeholder` - Placeholder text
- `rows` - Number of visible rows
- `cols` - Number of visible columns
- `value` - Initial text content

### Global Styles

The `styles` object accepts any CSS property in camelCase format:

```json
{
  "styles": {
    "backgroundColor": "lightblue",
    "color": "black",
    "fontFamily": "Arial, sans-serif",
    "padding": "20px"
  }
}
```

These styles are automatically applied to the `<body>` element.

## How It Works

1. **Reading Input**: The application reads `input.json` from the workspace directory.
2. **Parsing**: JSON is parsed and validated.
3. **HTML Generation**: Body elements are converted to HTML tags with proper escaping and wrapped in a container.
4. **CSS Generation**: Global styles are extracted and formatted as CSS with a flexbox layout for alignment.
5. **JavaScript Generation**: Event handlers (like `onClick`) are stored in `script.js`.
6. **Output**: Three properly formatted files are generated in the `output-web` folder.

### Order and Alignment

- **Order**: Elements maintain the exact order as specified in the JSON `body` array
- **Container**: All elements are wrapped in a `.container` div with centered alignment
- **Flexbox Layout**: Uses CSS flexbox with `flex-direction: column` to maintain vertical order
- **Max Width**: Content is constrained to 800px maximum width and centered on the page
- **Consistent Spacing**: All elements have uniform 10px margin for clean spacing

## Example Output

Running `npm start` will:
- Read `input.json` from examples folder
- Create `output-web` folder structure (if it doesn't exist)
- Generate `index.html` in `output-web/`
- Generate `css/style.css` with styles
- Generate `js/script.js` with JavaScript handlers
- Display folder structure and success message

## Future Enhancements

- Support for more element types (tables, forms, etc.)
- Custom CSS class generation
- Advanced JavaScript event handling
- Data binding support
- Component composition

