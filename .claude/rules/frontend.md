---

## applyTo: "**/*.{tsx,ts,jsx,js,css,scss,html}"

# Frontend Development Guidelines: Agasaja ERP

## 1. Purpose and Design Philosophy

Agasaja ERP is a professional, general-purpose ERP system designed for business productivity, clarity, and long-term maintainability.

All frontend work must follow a consistent visual philosophy:

- **Professional and sober:** The interface should look like a mature business application, not a consumer social app.

- **Minimalist and functional:** Every visual element must serve a purpose. Avoid unnecessary decoration and visual clutter.

- **Compact and space-efficient:** Maximize the space available for business data, tables, forms, filters, and operational workflows.

- **Consistent:** All screens must feel like parts of the same application, sharing common layout rules, colors, typography, spacing, and interaction patterns.

- **Responsive:** The interface must adapt naturally to desktop computers, tablets, and mobile devices.

- **Accessible:** Provide readable typography, sufficient color contrast, keyboard accessibility, and clear interactive states.

- **Maintainable:** Prefer reusable components, centralized design tokens, and existing project conventions over duplicated implementations.

The application must prioritize usability and information density over decorative styling.

## 2. Color Palette and Visual Identity

The primary visual identity must be built around **turquoise blue and harmonious complementary colors**.

Use a restrained, coordinated palette suitable for a professional ERP system.

Suggested palette:

- **Primary turquoise:** `#0F8B8D`

- **Primary dark:** `#115E63`

- **Primary light:** `#DDF4F1`

- **Accent blue:** `#2563A6`

- **Page background:** `#F5F8FA`

- **Surface background:** `#FFFFFF`

- **Primary text:** `#243746`

- **Secondary text:** `#647786`

- **Borders and dividers:** `#DCE5EA`

- **Success:** `#27835B`

- **Warning:** `#B7791F`

- **Error:** `#C24141`

- **Information:** `#2563A6`

These values are initial design references, not permission to introduce a separate palette on every screen. Refine them if necessary to fit the existing application, but preserve a coherent turquoise-centered identity.

Color rules:

- Use turquoise for primary actions, selected navigation items, active indicators, and other important interactive elements.

- Use darker turquoise tones for emphasis and readable text on appropriate backgrounds.

- Use white and subtle neutral backgrounds to maintain a clean, professional appearance.

- Use accent blue sparingly to complement the primary color.

- Reserve success, warning, error, and information colors for their semantic purposes.

- Ensure sufficient contrast between text, backgrounds, borders, and interactive states.

- Do not communicate status through color alone. Include text, icons, or other appropriate indicators.

- Avoid excessive gradients, highly saturated backgrounds, and too many competing accent colors.

- Do not use color merely for decoration when it does not improve comprehension or usability.

## 3. Layout and Information Density

The overall layout must be compact, predictable, and suitable for frequent use throughout a working day.

- Avoid unnecessarily large headers, oversized titles, excessive whitespace, and oversized padding.

- Use consistent spacing and alignment throughout the application.

- Keep page titles, breadcrumbs, action buttons, filters, and content areas organized into clear visual hierarchies.

- Prefer simple rectangular surfaces with subtle borders over numerous floating cards.

- Use small, restrained corner radii. Avoid excessively rounded cards, buttons, panels, and navigation containers.

- Avoid heavy shadows, decorative borders, and unnecessary nested containers.

- Use cards only when grouping information into separate visual units genuinely improves comprehension.

- Prefer well-organized tables, lists, forms, and compact summaries for data-intensive workflows.

- Allow data tables and operational content to use the available screen width efficiently.

- Prevent unintended horizontal scrolling of the overall page. If a particular table or component genuinely requires horizontal scrolling, contain it within that component.

The result should feel structured and lightweight without looking bare or unfinished.

## 4. Navigation Menu and Responsive Layout

The navigation menu is a fundamental part of the application. Its behavior must be consistent and explicitly responsive.

### 4.1 Desktop and wide screens

On wide screens, the navigation menu must occupy a dedicated vertical column on the left side of the application.

- The main content area must shift to the right when the sidebar is visible.

- The sidebar and main content must participate in the page layout. The sidebar must not overlap the dashboard or the current screen.

- When the sidebar is collapsed, the main content must reclaim the available horizontal space.

- Keep the sidebar compact and avoid wasting width on oversized padding or decorative containers.

- Organize navigation items into clearly identifiable categories with their corresponding submenus.

- Use consistent indentation, spacing, icons, and typography to communicate navigation hierarchy.

- Clearly distinguish the active page, expanded categories, and hover or focus states.

- Keep the application header and navigation controls aligned with the overall layout.

- Avoid leaving a large, empty area below a hamburger or close button when the navigation menu is expanded.

The navigation structure may take inspiration from the compact, practical left-hand navigation used by tools such as phpMyAdmin, while maintaining Agasaja ERP's own visual identity.

### 4.2 Mobile and narrow screens

On narrow screens, the navigation menu must change its layout behavior.

**The navigation menu must appear above the current screen in normal document flow, pushing the dashboard or page content downward.**

- When opened, the menu must occupy the available content width and appear before the dashboard or current page.

- The dashboard or page content must move downward naturally, rather than being covered by an overlay.

- When closed, the menu must release its vertical space and allow the content to move upward.

- Do not implement the mobile menu as a fixed or absolutely positioned overlay that covers the current screen.

- Avoid a permanent desktop-style sidebar that consumes a large portion of a mobile screen.

- Keep the menu toggle accessible and easy to identify.

- When expanded, show a clear way to close or collapse the menu without leaving redundant controls or empty space.

- Keep navigation categories and submenu items readable and easy to tap.

- Ensure that opening or closing the menu does not create unintended horizontal overflow.

### 4.3 Responsive implementation

Use the project's existing responsive layout approach and styling conventions.

- Choose appropriate breakpoints based on when the layout stops being comfortable, rather than relying blindly on device-specific labels.

- Use a dedicated responsive layout or component structure when necessary to achieve the required desktop and mobile behavior.

- Ensure that the menu's width, visibility, document flow, and interaction states remain synchronized.

- Preserve the current page state and navigation context when opening or closing the menu.

- Test the layout at intermediate widths as well as common desktop and mobile sizes.

- Do not solve a layout problem with arbitrary margins, hardcoded offsets, or empty spacer elements.

The required behavior is based on available viewport width, not on a particular device model.

## 5. Navigation Styling and Interaction

The navigation menu must be functional first and decorative second.

- Use a compact, readable hierarchy for categories, submenu items, and section labels.

- Use icons consistently and only when they help users identify destinations or actions.

- Use subtle background changes, accent colors, or indicators for selected items.

- Avoid large rounded navigation panels that consume excessive space.

- Keep the menu visually integrated with the rest of the application.

- Use consistent hover, focus, active, expanded, and disabled states.

- Ensure interactive elements provide clear feedback.

- Preserve existing navigation routes, permissions, and business logic unless a change is explicitly requested.

- Do not remove or rename menu items merely to simplify the visual design.

## 6. Typography and Icons

Typography must support efficient reading of business information.

- Use the existing project font unless there is a compelling reason to change it.

- Establish a consistent type scale for page titles, section headings, labels, body text, table content, and supporting information.

- Prefer readable, moderate font sizes and restrained font weights.

- Avoid excessively large headings and decorative typography.

- Maintain consistent line heights and alignment.

- Use the icon library already present in the project.

- Do not introduce a new icon library when the existing one can meet the requirement.

- Keep icon sizes, stroke weights, and alignment consistent.

- Avoid using emoji as substitutes for professional interface icons.

## 7. Forms, Tables, and Business Data

Forms and data-heavy screens must prioritize clarity, accuracy, and efficient operation.

- Use consistent label placement, input heights, spacing, validation messages, and action buttons.

- Group related fields logically.

- Clearly distinguish required fields, optional fields, errors, warnings, and read-only values.

- Keep primary and secondary actions visually distinguishable.

- Avoid excessive whitespace between form fields or sections.

- Make tables readable with clear column headings, consistent alignment, appropriate row spacing, and visible relationships between data.

- Use alignment appropriate to the data type. For example, numeric values should be easy to compare.

- Ensure filters, pagination, sorting, search, and table actions remain usable on smaller screens.

- Do not sacrifice essential business information merely to make a screen appear simpler.

- Preserve existing validation rules, calculations, data flows, and business behavior when modifying presentation.

## 8. Cards, Buttons, and Other Components

All components must follow the same restrained design language.

- Use modest corner radii and subtle borders.

- Use consistent button heights, padding, typography, and icon placement.

- Reserve strong visual emphasis for primary actions.

- Keep secondary actions visually quieter.

- Use destructive styling only for genuinely destructive operations.

- Avoid oversized dashboard cards when compact summaries would communicate the same information.

- Avoid excessive shadows, decorative animations, and unnecessary transitions.

- Use animations only when they clarify a state change or improve usability.

- Ensure loading, empty, success, and error states follow consistent patterns.

## 9. Reusable Components and Design Tokens

Maintain a coherent visual system across the entire application.

- Reuse existing layout components, navigation components, buttons, inputs, tables, and other shared UI components whenever appropriate.

- Centralize reusable color values, spacing scales, typography, border radii, and other design tokens in the project's established styling system.

- Avoid scattering hardcoded color values and arbitrary spacing values throughout individual screens.

- If a reusable component needs improvement, consider whether the improvement should apply consistently across all screens that use it.

- Avoid duplicating components that serve the same purpose.

- Do not create a new styling convention when an existing one can be extended.

- Keep component responsibilities clear and focused.

- Ensure that shared components can support the required responsive behavior without introducing regressions elsewhere.

## 10. React and TypeScript Conventions

Follow the existing project's architecture and coding standards.

- Use React and TypeScript according to the conventions already established in the repository.

- Prefer explicit, meaningful TypeScript types and interfaces.

- Avoid `any` unless there is a clear, justified reason.

- Keep presentation components separate from business logic when appropriate.

- Extract reusable UI patterns into shared components when doing so improves consistency and maintainability.

- Use the project's existing state management, routing, API integration, and form-handling conventions.

- Avoid introducing unnecessary dependencies.

- Do not rewrite working components or change architectural decisions merely to achieve a visual adjustment.

- Preserve existing API contracts, backend integration, permissions, and functional behavior.

- Follow established accessibility and semantic HTML practices.

## 11. Accessibility and Responsive Quality

The interface must remain usable across different input methods and screen sizes.

- Support keyboard navigation and visible focus indicators.

- Use semantic HTML elements and accessible labels.

- Provide accessible names for icon-only buttons.

- Ensure sufficient contrast for text and interactive controls.

- Make touch targets comfortable to use on mobile devices.

- Prevent important controls from becoming clipped or inaccessible.

- Ensure forms, tables, menus, and dialogs behave appropriately on smaller screens.

- Respect reduced-motion preferences when animations are used.

- Do not rely exclusively on hover interactions.

## 12. Implementation Workflow

Before implementing a frontend change:

1. Inspect the existing components, styles, layout, and project conventions relevant to the task.

2. Identify reusable components and design tokens that already exist.

3. Understand the current behavior before changing it.

4. Implement the smallest coherent change that meets the requirement.

5. Verify the result at wide, intermediate, and narrow viewport widths when relevant.

6. Check for layout regressions, horizontal overflow, inconsistent spacing, and accessibility issues.

7. Confirm that existing functionality, routes, data handling, and business rules remain intact.

8. Update relevant documentation when a change establishes or modifies a reusable design convention.

When working on an individual screen, do not invent a separate visual style. Apply the shared Agasaja ERP design system.

If a requirement is ambiguous or conflicts with the existing architecture, inspect the relevant implementation and explain the issue before making a potentially disruptive change.

## 13. Scope Control and Design Consistency

- Implement only the requested feature and the changes necessary to support it.

- Do not modify unrelated screens, business logic, APIs, or database structures.

- Do not introduce a new UI framework or major dependency without justification.

- Do not replace established components with custom implementations unnecessarily.

- Avoid mixing incompatible design patterns.

- Prefer incremental improvements that progressively establish a consistent visual language.

- When a proposed design conflicts with these guidelines, prioritize these guidelines unless the user explicitly approves a different direction.

## 14. Definition of Done

A frontend change is complete when:

- It satisfies the requested functional requirements.

- It follows the turquoise-centered visual identity.

- It maintains the application's professional, minimalist, compact appearance.

- It respects the required responsive layout behavior.

- The navigation menu does not overlap the main content: on wide screens it shifts content horizontally, and on narrow screens it pushes content downward.

- It reuses existing components and design conventions wherever appropriate.

- It remains accessible and avoids unintended overflow.

- It preserves existing business logic and unrelated functionality.

- Its implementation is maintainable and consistent with the rest of Agasaja ERP.

**Core principle:** Agasaja ERP must look and behave like one coherent, thoughtfully designed business application. Every frontend decision should improve clarity, consistency, usability, or efficient use of screen space.
