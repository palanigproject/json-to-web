# Project Structure

This document describes the folder structure of the `json-to-web` project.

## Directory Layout

```
json-to-web/
├── .gitignore              # Git ignore rules
├── index.js                # Main entry point
├── package.json            # NPM configuration
├── README.md              # Documentation
├── PROJECT_STRUCTURE.md   # This file
│
├── src/                   # Source code
│   └── generator.js       # Core generator logic
│
├── examples/              # Example input files
│   └── input.json        # Sample JSON configuration
│
└── output-web/           # Generated web application (auto-created)
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        └── script.js
```

## Folder Descriptions

### `/` (Root)
- **index.js**: Main application entry point
- **package.json**: NPM package configuration and scripts
- **README.md**: User documentation and usage instructions
- **.gitignore**: Git ignore patterns (excludes node_modules, output-web, etc.)

### `/src`
- **generator.js**: Contains all the core logic:
  - Reading and parsing JSON
  - Generating HTML, CSS, and JavaScript
  - Element type handlers (header, paragraph, button, etc.)
  - HTML escaping and attribute formatting

### `/examples`
- **input.json**: Example configuration file showing all supported element types
- Users can place their own JSON files here
- Can also pass custom file paths via command line

### `/output-web`
- **index.html**: Generated HTML file
- **style.css**: Generated CSS styles
- **script.js**: Generated JavaScript handlers
- This folder is automatically created and populated on run
- **Note**: Excluded from version control (see .gitignore)

## How Files Are Generated

1. User runs `npm start` or `node index.js`
2. `index.js` calls the generator from `src/generator.js`
3. Generator reads `examples/input.json` (or custom path)
4. Generator creates `output-web/` folder if it doesn't exist
5. Generator writes three files to `output-web/`:
   - `index.html` - Structured HTML with container
   - `style.css` - Extracted styles and layout rules
   - `script.js` - JavaScript event handlers

## Element Flow

```
JSON Input (examples/input.json)
        ↓
   Generator Logic (src/generator.js)
        ↓
   Generated Files (output-web/)
```

## Adding New Elements

To add support for new element types:

1. Edit `src/generator.js`
2. Add a new case in the `generateElement()` function
3. Add corresponding CSS rules in `generateCSS()` function
4. Update README.md with documentation
5. Test with a JSON file in `examples/`

## Best Practices

- **Keep source files in `/src`**: All application logic goes here
- **Keep examples in `/examples`**: Input files for testing
- **Never commit `/output-web`**: Generated files should be gitignored
- **Document everything**: Update README when adding features

