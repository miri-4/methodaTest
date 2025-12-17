# CSS Architecture Documentation

## Overview
ה-CSS חולק לקבצים מאורגנים לפי קומפוננטות וחלקים, מה שעושה את זה קל להבין ותחזוקה.

## File Structure

```
src/
├── index.css                          # Global styles ו-reset
├── App.css                            # Main import file (combines all)
└── components/
    ├── Header/
    │   └── Header.css                 # Header סטיילים
    ├── Footer/
    │   └── Footer.css                 # Footer סטיילים
    ├── StatusPanel/
    │   └── StatusPanel.css            # Badges וסטטוס-ספציפיים
    ├── TransitionPanel/
    │   └── TransitionPanel.css        # Transition flow סטיילים
    ├── Panels.css                     # Shared panel container styles
    ├── Cards.css                      # Shared item cards styles
    └── Forms.css                      # Shared form elements styles
```

## File Descriptions

### index.css (Global Foundation)
- Reset וגלובל סטיילים
- Body וroot styling
- Custom scrollbar

### App.css (Central Hub)
```css
@import './index.css';
@import './components/Header/Header.css';
@import './components/Footer/Footer.css';
@import './components/Panels.css';
@import './components/Cards.css';
@import './components/Forms.css';
@import './components/StatusPanel/StatusPanel.css';
@import './components/TransitionPanel/TransitionPanel.css';
```
**קובץ זה בודד מחבר את כל ה-CSS!**

### components/Header/Header.css
- `.app-header` - כותרת עליונה
- `.app-title` - הכותרת הגדולה
- `.app-subtitle` - תיאור קטן

### components/Footer/Footer.css
- `.app-footer` - container בתחתית
- `.reset-btn` - כפתור Reset

### components/Panels.css (Shared Infrastructure)
- `.main-container` - Grid layout (2 עמודות)
- `.panel` - base panel styling
- `.panel-header` - headers כחול/סגול
- `.panel-icon` - aicons עם gradients
- `.panel-content` - תוכן עם scrolling
- Responsive media queries

### components/Cards.css (Shared Item Display)
- `.item-card` - card styling
- `.item-card-content` - flexbox layout
- `.item-info` - text content area
- `.item-actions` - delete button area
- `.delete-btn` - delete button styling

### components/Forms.css (Shared Input Elements)
- `.form-section` - form container
- `.form-label` - labels
- `.form-input` / `.form-select` - inputs ו-selects
- `.form-submit` - submit buttons
- `.alert-box` - warning message box

### components/StatusPanel/StatusPanel.css (Status-Specific)
- `.status-badge` - default blue badge
- `.status-badge.initial` - ⚡ green (התחלה)
- `.status-badge.final` - ✓ purple (סיום)
- `.status-badge.orphan` - ⚠ orange (יתום)

### components/TransitionPanel/TransitionPanel.css (Transition-Specific)
- `.transition-flow` - flex container לזרימה
- `.transition-status` - pill-shaped status boxes
- `.transition-arrow` - purple arrow בין סטטוסים

## Color Scheme

### Base Colors
- **Primary (Blue)**: `#3b82f6` - Statuses
- **Secondary (Purple)**: `#a855f7` - Transitions
- **Background**: `#0f172a` to `#1e293b` - Dark gradient
- **Text**: `#e2e8f0` - Light text
- **Accents**: Green, Orange, Purple

### Status Badges
- **Initial**: Green (#4ade80)
- **Final**: Purple (#d8b4fe)
- **Orphan**: Orange (#fb923c)

## Media Queries

### Desktop (> 1024px)
- 2-column grid layout

### Tablet (≤ 1024px)
- 1-column stack layout
- Border changes

### Mobile (≤ 640px)
- Reduced padding
- Smaller icons
- Smaller fonts
- Compact card design

## How Styles Work Together

```
App.css (imports all)
  ↓
index.css (global foundation)
  ↓
Header.css + Footer.css (top & bottom)
  ↓
Panels.css (layout skeleton)
  ↓
Cards.css (item containers)
  ↓
Forms.css (input elements)
  ↓
StatusPanel.css + TransitionPanel.css (specific colors)
```

## Best Practices

✅ **קל להוסיף סטיילים** - כל קומפוננטה יודעת איפה הסטיילים שלה
✅ **קל לשנות עיצוב** - אם רוצים לשנות צבע, יודעים בדיוק היכן
✅ **אין עימותים** - class names מוניקיים לכל קומפוננטה
✅ **קל להבין** - הסטרוקטורה עוקבת את קומפוננטות React

## Maintenance Guide

### כשרוצים לעדכן סטיילים:

1. **לעדכן Header** → עדכן `components/Header/Header.css`
2. **לעדכן Statuses** → עדכן `components/StatusPanel/StatusPanel.css`
3. **לעדכן צורות טפסים** → עדכן `components/Forms.css`
4. **לעדכן layout** → עדכן `components/Panels.css`
5. **סטיילים גלובליים** → עדכן `index.css`

### Import Tree
כל קובץ CSS קיים בעצמאות, אבל `App.css` מחבר את כולם בסדר נכון:
1. Global foundation (index.css)
2. Layout (Panels.css)
3. Components (Header, Footer)
4. Elements (Cards, Forms)
5. Specific (StatusPanel, TransitionPanel)