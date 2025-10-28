# Logo Implementation Guide

## ✅ Current Implementation

### SVG Logo Created
A simple blue logo with "C" letter has been embedded as SVG directly in the HTML.

---

## 🎨 How to Replace the Logo

### Option 1: Replace SVG with Your PNG Logo (Recommended)

1. **Create your logo file** (200x200px or 300x300px PNG)
2. **Save it** as `logo.png` in the `output-web/` folder
3. **Update HTML** to use the image instead of SVG:

```html
<!-- Replace this: -->
<div class="logo-svg">
  <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <rect width="60" height="60" rx="12" fill="#007bff"/>
    <text x="30" y="38" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">C</text>
  </svg>
</div>

<!-- With this: -->
<div class="logo-svg">
  <img src="logo.png" alt="CADP Logo" class="logo-image">
</div>
```

4. **Add CSS**:
```css
.logo-image {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### Option 2: Use External Logo URL

If your logo is hosted online:

```html
<div class="logo-svg">
  <img src="https://your-domain.com/logo.png" alt="CADP Logo" class="logo-image">
</div>
```

### Option 3: Update SVG Logo

Edit the SVG in the HTML to match your brand:
- Change the color: `fill="#007bff"` (blue)
- Change the letter: `<text>` content
- Change the shape: `<rect>` or use different SVG shapes

---

## 📁 Files Using Logo

Currently, the logo appears in:
- `output-web/index.html` - Landing page
- `output-web/login.html` - Login page

---

## 🎯 For Each Application

Since you mentioned "for each application it should be changed":

### Create an Images Folder
```
output-web/
  images/
    logo.png (or logo.svg)
```

### Use Consistent Path
```html
<img src="images/logo.png" alt="CADP Logo">
```

### Different Logos Per App
If you need different logos for different applications:
```
output-web/
  images/
    logo-cadp.png
    logo-app1.png
    logo-app2.png
```

Then reference the appropriate logo in each application's HTML.

---

## 💡 Design Tips

### Logo Size
- Recommended: 200x200px or 300x300px (will be scaled to 60x60px in display)
- Minimum: 120x120px for sharp display on retina screens
- Format: PNG with transparent background (for professional look)

### Colors
Current theme uses:
- Primary: `#007bff` (blue)
- Text: `#212529` (dark gray)
- Background: `#f5f5f5` (light gray)

Match your logo colors to this theme.

### Branding
Consider including:
- Company name: "Cavin"
- Initials: "CADP"
- Icon or graphic element
- Tagline if space allows

---

## 📝 SVG vs PNG

**SVG (Current):**
- ✅ Vector (scales perfectly)
- ✅ Small file size
- ✅ Can be edited in HTML
- ❌ Limited design complexity

**PNG (Recommended):**
- ✅ High quality photos/graphics
- ✅ Professional design tools support
- ✅ Richer colors and details
- ❌ Larger file size
- ❌ Fixed size (needs multiple sizes for different screens)

---

## 🔄 Quick Update Guide

To update the logo across all pages:

1. Save new logo as `logo.png` in `output-web/` folder
2. Find all `<svg>` blocks with logo in HTML files
3. Replace with: `<img src="logo.png" alt="CADP Logo" class="logo-image">`
4. Add CSS for `.logo-image` (shown above)

Or create a shared logo include and reference it.

---

## 🎨 Current Logo Design

The embedded SVG creates a:
- Blue rounded square (12px border radius)
- White "C" letter centered
- Drop shadow for depth
- 60x60px display size

Change this to match your brand identity!

