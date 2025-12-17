# Project Structure Documentation

## Overview
הפרויקט חולק לקומפוננטות מאורגנות בצורה ברורה וקלה לתחזוקה, כולל TypeScript, Components, Services, ו-CSS נפרדים.

## Directory Structure

```
src/
├── types/
│   └── index.ts              # הגדרות TypeScript interfaces
├── services/
│   └── api.ts                # API calls לשרת (axios)
├── utils/
│   └── statusUtils.ts        # פונקציות עזר לחישובים
├── hooks/
│   └── useConfigManager.ts   # Custom hook לניהול state
├── components/
│   ├── Header/
│   │   ├── Header.tsx        # כותרת עליונה
│   │   └── Header.css        # Header סטיילים
│   ├── Footer/
│   │   ├── Footer.tsx        # כפתור Reset בתחתית
│   │   └── Footer.css        # Footer סטיילים
│   ├── StatusPanel/
│   │   ├── StatusPanel.tsx          # פנל ראשי (שמאל)
│   │   ├── StatusList.tsx           # רשימת סטטוסים
│   │   ├── StatusCard.tsx           # כרטיס סטטוס בודד
│   │   ├── AddStatusForm.tsx        # טופס הוספת סטטוס
│   │   ├── InitialStatusSelector.tsx # בחירת סטטוס התחלה
│   │   └── StatusPanel.css          # Status-specific סטיילים
│   ├── TransitionPanel/
│   │   ├── TransitionPanel.tsx       # פנל ראשי (ימין)
│   │   ├── TransitionList.tsx        # רשימת מעברים
│   │   ├── TransitionCard.tsx        # כרטיס מעבר בודד
│   │   ├── AddTransitionForm.tsx     # טופס הוספת מעבר
│   │   └── TransitionPanel.css       # Transition-specific סטיילים
│   ├── Panels.css                   # Shared panel container styles
│   ├── Cards.css                    # Shared item cards styles
│   └── Forms.css                    # Shared form elements styles
├── App.tsx                    # הקומפוננטה הראשית (קטנה וברורה!)
├── App.css                    # CSS central hub (imports all)
└── index.css                  # Global styles
```

## Architecture Overview

### 1. Types Layer (`types/`)
מכיל את כל ה-TypeScript interfaces:
- `Status` - סטטוס בודד
- `Transition` - מעבר בודד
- `StatusInfo` - סטטוס עם metadata (Initial, Final, Orphan)
- `Configuration` - התצורה הכוללת

### 2. Services Layer (`services/`)
API calls ו-HTTP communication:
- `configService` - fetch/reset configuration
- `statusService` - CRUD operations על סטטוסים
- `transitionService` - CRUD operations על מעברים

### 3. Utils Layer (`utils/`)
פונקציות עזר טהורות:
- `getReachableStatuses()` - BFS למציאת סטטוסים accessible
- `getStatusInfo()` - הוספת metadata לסטטוסים
- `statusNameExists()` / `transitionNameExists()` - בדיקות כפילוי
- `getRelatedTransitions()` - מציאת מעברים קשורים

### 4. Hooks Layer (`hooks/`)
Custom React hooks:
- `useConfigManager()` - מנהל כל ה-state וה-logic
  - Manages config state
  - API calls handling
  - Validation logic
  - Error handling

### 5. Components Layer (`components/`)
React קומפוננטות UI:

**Header Component**
- Simple title + subtitle display
- Minimal logic

**Footer Component**
- Reset button
- Confirmation dialog

**Status Panel** (שמאל - כחול)
- StatusPanel - קומפוננטה ראשית
- StatusList - רשימה ריקה/מלאה
- StatusCard - כרטיס עם badges ודלט
- AddStatusForm - טופס להוספה
- InitialStatusSelector - dropdown

**Transition Panel** (ימין - סגול)
- TransitionPanel - קומפוננטה ראשית
- TransitionList - רשימה ריקה/מלאה
- TransitionCard - כרטיס עם flow מציג
- AddTransitionForm - טופס עם 3 selectים

### 6. Styling Layer (`*.css`)
CSS מאורגן לפי קומפוננטות:

**Global**
- `index.css` - Reset וגלובל styles
- `App.css` - Central hub שמחבר את הכל

**Shared**
- `Panels.css` - Layout infrastructure (grid, panels)
- `Cards.css` - Item card styling (hover, shadows)
- `Forms.css` - Form elements (inputs, buttons, alerts)

**Component-Specific**
- `Header/Header.css` - Title styling
- `Footer/Footer.css` - Button styling
- `StatusPanel/StatusPanel.css` - Badges (Initial, Final, Orphan)
- `TransitionPanel/TransitionPanel.css` - Flow visualization

## Data Flow

```
┌─────────────────────────────────────────────┐
│           App.tsx (Main)                    │
└─────────────────────────────────────────────┘
                    ↓
        useConfigManager() Hook
        ├── config state
        ├── loading state
        └── statusInfo derived state
                    ↓
      ┌─────────────┴──────────────┐
      ↓                            ↓
StatusPanel                   TransitionPanel
├── StatusList              ├── TransitionList
├── StatusCard              ├── TransitionCard
├── AddStatusForm           └── AddTransitionForm
└── InitialStatusSelector
```

## State Management

```
useConfigManager Hook
    ↓
    ├── config (from API)
    │   ├── statuses[]
    │   ├── transitions[]
    │   └── initialStatus
    │
    ├── loading (boolean)
    │
    └── Functions:
        ├── fetchConfig() - GET /api/config
        ├── addStatus() - POST /api/statuses
        ├── deleteStatus() - DELETE /api/statuses/:id
        ├── addTransition() - POST /api/transitions
        ├── deleteTransition() - DELETE /api/transitions/:id
        ├── setInitialStatus() - PUT /api/initial-status
        └── resetConfiguration() - POST /api/reset
```

## Component Hierarchy

```
App
├── Header
│   ├── .app-header
│   ├── .app-title
│   └── .app-subtitle
├── main-container (Grid: 2 columns)
│   ├── StatusPanel (Left - Blue)
│   │   ├── panel-header.statuses
│   │   ├── panel-icon (◎)
│   │   └── panel-content
│   │       ├── StatusList
│   │       │   └── StatusCard[] (with badges)
│   │       ├── AddStatusForm
│   │       └── InitialStatusSelector
│   │
│   └── TransitionPanel (Right - Purple)
│       ├── panel-header.transitions
│       ├── panel-icon (→)
│       └── panel-content
│           ├── TransitionList
│           │   └── TransitionCard[] (with flow)
│           └── AddTransitionForm
│
└── Footer
    └── .reset-btn
```

## Benefits של המבנה החדש

✅ **קלות בתחזוקה** - כל קומפוננטה אחראית על דבר אחד
✅ **קלות בעדכון** - קל למצוא את הקובץ הרלוונטי
✅ **Reusability** - קומפוננטות יכולות להשתמש בהן במקומות אחרים
✅ **Type Safety** - TypeScript עוזר למצוא שגיאות בשלב פיתוח
✅ **Unit Testable** - קל לכתוב tests לכל קומפוננטה
✅ **Separation of Concerns** - API, State, Utils והUI מופרדים
✅ **CSS Organized** - כל קומפוננטה יודעת איפה הסטיילים שלה
✅ **Responsive** - Media queries בכל קובץ CSS

## איך להשתמש בזה

### הוספת סטטוס חדש
```
User types in AddStatusForm
  ↓
AddStatusForm calls onAdd()
  ↓
StatusPanel calls onAddStatus()
  ↓
useConfigManager.addStatus()
  ↓
statusService.addStatus() → API POST
  ↓
fetchConfig() → refresh state
  ↓
StatusList re-renders with new status
```

### מחיקת סטטוס (עם מעברים)
```
User clicks delete on StatusCard
  ↓
StatusCard calls onDelete()
  ↓
StatusPanel calls onDeleteStatus()
  ↓
useConfigManager.deleteStatus()
  ↓
getRelatedTransitions() → find all transitions
  ↓
Loop: transitionService.deleteTransition() → API DELETE each
  ↓
statusService.deleteStatus() → API DELETE status
  ↓
fetchConfig() → refresh state
  ↓
Both StatusList and TransitionList re-render
```

## File Sizes & Performance

- **App.tsx**: ~50 lines (clean entry point)
- **useConfigManager.ts**: ~150 lines (all logic)
- **api.ts**: ~50 lines (API calls)
- **statusUtils.ts**: ~70 lines (utilities)
- **Components**: 20-40 lines each (focused)
- **CSS**: Split into 8 files (~100 lines each)
- **Total build size**: ~240KB JavaScript, ~8.8KB CSS (gzipped)

## Documentation Files

- `STRUCTURE.md` - This file (component & code structure)
- `CSS_STRUCTURE.md` - CSS architecture and styling guide

## Getting Started

1. **Understand the Flow**: Read this STRUCTURE.md
2. **Understand Styling**: Read CSS_STRUCTURE.md
3. **Make Changes**:
   - Logic change? Edit `hooks/useConfigManager.ts` or `utils/statusUtils.ts`
   - API change? Edit `services/api.ts`
   - Component change? Edit the relevant component file
   - Styling change? Edit the corresponding CSS file
4. **Test**: `npm run dev` to run locally, `npm run build` to verify build