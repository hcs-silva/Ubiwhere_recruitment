# SCSS Variables and Mixins Documentation

This document describes the SCSS variables and mixins system used throughout the Earthquake Monitoring Dashboard application.

## File Structure

```
src/scss/
├── _variables.scss      # Design tokens and variables
├── _mixins.scss         # Reusable mixins
├── main.scss           # Global styles and imports
├── DashboardPage.module.scss
├── LoginPage.module.scss
├── Map.module.scss
└── QuakeDetailPage.module.scss
```

## Variables (`_variables.scss`)

### Color Palette

#### Primary Colors

- `$primary-color: #007bff` - Main brand color
- `$primary-hover: #0056b3` - Primary color on hover
- `$danger-color: #dc3545` - Error/danger color
- `$danger-hover: #c82333` - Danger color on hover
- `$success-color: #28a745` - Success color
- `$warning-color: #ffc107` - Warning color

#### Neutral Colors

- `$white: #ffffff` - Pure white
- `$light-gray: #f5f5f5` - Light background
- `$medium-gray: #f0f0f0` - Medium background
- `$border-gray: #ccc` - Border color
- `$text-dark: #333` - Dark text
- `$text-light: #666` - Light text
- `$disabled-gray: #ccc` - Disabled state

#### Background Colors

- `$bg-primary: $light-gray` - Primary background
- `$bg-secondary: $medium-gray` - Secondary background
- `$bg-card: #f9f9f9` - Card background

### Spacing

- `$spacing-xs: 5px` - Extra small spacing
- `$spacing-sm: 10px` - Small spacing
- `$spacing-md: 20px` - Medium spacing
- `$spacing-lg: 30px` - Large spacing
- `$spacing-xl: 40px` - Extra large spacing

### Border Radius

- `$border-radius-sm: 4px` - Small border radius
- `$border-radius-md: 8px` - Medium border radius
- `$border-radius-lg: 25px` - Large border radius

### Typography

#### Font Sizes

- `$font-size-xs: 0.875rem` - Extra small text
- `$font-size-sm: 1rem` - Small text
- `$font-size-md: 1.2rem` - Medium text
- `$font-size-lg: 1.5rem` - Large text
- `$font-size-xl: 2rem` - Extra large text

#### Font Weights

- `$font-weight-normal: normal` - Normal weight
- `$font-weight-bold: bold` - Bold weight

#### Font Family

- `$font-family-primary: Arial, sans-serif` - Primary font

### Layout

- `$container-max-width: 1600px` - Maximum container width
- `$map-height: 600px` - Map height
- `$map-width: 1400px` - Map width
- `$form-width: 700px` - Form width
- `$card-min-width: 300px` - Minimum card width

### Shadows

- `$shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1)` - Small shadow
- `$shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15)` - Medium shadow

### Transitions

- `$transition-fast: 0.2s ease` - Fast transition
- `$transition-normal: 0.3s ease` - Normal transition

### Breakpoints

- `$breakpoint-mobile: 768px` - Mobile breakpoint
- `$breakpoint-tablet: 1024px` - Tablet breakpoint
- `$breakpoint-desktop: 1200px` - Desktop breakpoint

### Z-index

- `$z-index-dropdown: 1000` - Dropdown z-index
- `$z-index-modal: 1050` - Modal z-index
- `$z-index-tooltip: 1100` - Tooltip z-index

## Mixins (`_mixins.scss`)

### Button Mixins

#### `@mixin button-base`

Base button styles with common properties.

#### `@mixin button-primary`

Primary button with blue background and hover effects.

#### `@mixin button-danger`

Danger button with red background and hover effects.

#### `@mixin button-disabled`

Disabled button with gray background and disabled cursor.

### Form Mixins

#### `@mixin input-base`

Base input styles with consistent padding, border, and sizing.

### Layout Mixins

#### `@mixin flex-center`

Centers content using flexbox.

#### `@mixin flex-column-center`

Centers content using flexbox with column direction.

### Card Mixins

#### `@mixin card-base`

Base card styles with background, border radius, shadow, and padding.

### Responsive Mixins

#### `@mixin mobile`

Media query for mobile devices (max-width: 768px).

#### `@mixin tablet`

Media query for tablet devices (768px - 1024px).

#### `@mixin desktop`

Media query for desktop devices (min-width: 1024px).

### Typography Mixins

#### `@mixin heading-large`

Large heading styles with font size and weight.

#### `@mixin heading-medium`

Medium heading styles with font size and weight.

#### `@mixin text-body`

Body text styles with font size, line height, and color.

## Usage Examples

### Using Variables

```scss
.my-component {
    background-color: $primary-color;
    padding: $spacing-md;
    border-radius: $border-radius-sm;
    font-size: $font-size-sm;
}
```

### Using Mixins

```scss
.my-button {
    @include button-primary;
    width: 100%;
}

.my-card {
    @include card-base;
    margin: $spacing-md;
}

.my-form {
    @include flex-column-center;
    
    input {
        @include input-base;
    }
}
```

### Responsive Design

```scss
.my-component {
    width: 100%;
    
    @include mobile {
        width: 95%;
    }
    
    @include desktop {
        width: 50%;
    }
}
```

## Benefits

1. **Consistency**: All components use the same design tokens
2. **Maintainability**: Changes to colors, spacing, etc. are centralized
3. **Reusability**: Mixins reduce code duplication
4. **Scalability**: Easy to add new variables and mixins
5. **Type Safety**: SCSS variables provide compile-time checking

## Best Practices

1. Always use variables instead of hardcoded values
2. Use mixins for repeated patterns
3. Keep variables organized by category
4. Use semantic variable names
5. Document any new variables or mixins added
