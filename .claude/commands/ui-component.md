---
description: Create a UI Component in /components
argument-hint: Component name | Component summary
---

## Context

Parse $ARGUMENTS to get the following values:

-[name]: Component name form $ARGUMENTS
-[summary]: Component summary from $ARGUMENTS

## Task

Make a UI component according to the [name] and [summary] provided, following these guidlines:

- Create a production-ready Angular UI component following Angular best practices.
- Reference the [summary] when making the component

## Instructions

Generate a complete, best-practice Angular standalone component with the following structure and rules:

### 1. File Structure
Create these files for the component named `$ARGUMENTS`:
- `src/app/components/<component-name>/<component-name>.component.ts`
- `src/app/components/<component-name>/<component-name>.component.html`
- `src/app/components/<component-name>/<component-name>.component.scss`
- `src/app/components/<component-name>/<component-name>.component.spec.ts`

### 2. Component TypeScript (`*.component.ts`)
Follow these rules strictly:
- Use `standalone: true` (Angular 17+ default)
- Use `signal`-based state management (`signal()`, `computed()`, `effect()`) instead of plain properties
- Use `inject()` function instead of constructor injection
- Use `input()` and `output()` signal-based APIs instead of `@Input()` / `@Output()` decorators
- Use `OnPush` change detection strategy
- Import `CommonModule` or specific directives (`NgIf`, `NgFor`) only if needed
- Use `DestroyRef` with `takeUntilDestroyed()` for subscription cleanup
- Apply strong TypeScript typing — no `any`
- Prefix the selector with `app-`

Example skeleton:
```typescript
import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-$ARGUMENTS',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './$ARGUMENTS.component.html',
  styleUrl: './$ARGUMENTS.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class $ARGUMENTSPascalCaseComponent {
  // Signal-based inputs
  label = input<string>('Default Label');
  disabled = input<boolean>(false);

  // Signal-based outputs
  clicked = output<void>();

  // Internal state
  isActive = signal(false);
  displayText = computed(() => this.isActive() ? 'Active' : this.label());

  onClick(): void {
    if (!this.disabled()) {
      this.isActive.update(v => !v);
      this.clicked.emit();
    }
  }
}
```

### 3. Template (`*.component.html`)
- Use `@if`, `@for`, `@switch` control flow syntax (Angular 17+), NOT `*ngIf` / `*ngFor`
- Bind to signal values with `()` — e.g., `{{ label() }}`
- Keep template logic minimal; delegate to `computed()` signals
- Use semantic HTML elements
- Add ARIA attributes for accessibility (`role`, `aria-label`, `aria-disabled`, etc.)
- Apply host binding via `[attr.*]` or `host` metadata when needed

### 4. Styles (`*.component.scss`)
- Use BEM naming convention for CSS classes
- Define CSS custom properties (variables) for theming
- Use `:host` selector for component-level styles
- Keep specificity low
- No global styles — everything scoped to the component

### 5. Unit Tests (`*.component.spec.ts`)
- Use `TestBed.configureTestingModule` with `imports: [ComponentName]` (standalone)
- Test signal inputs via `fixture.componentRef.setInput('propName', value)`
- Test outputs by subscribing to the `outputRef.subscribe()` or `toSignal()`
- Include tests for:
  - Default rendering
  - Input binding changes
  - User interaction (click, focus)
  - Conditional rendering with `@if`
  - Accessibility attributes
- Use `jest` syntax if a `jest.config.*` file exists, otherwise use Jasmine/Karma

### 6. Barrel Export
If `src/app/components/index.ts` exists, append:
```typescript
export * from './<component-name>/<component-name>.component';
```
If it does not exist, create it.

### 7. Quality Checklist (verify before finishing)
- [ ] No `any` types
- [ ] `OnPush` change detection applied
- [ ] All inputs use `input()` signal API
- [ ] All outputs use `output()` signal API
- [ ] Template uses `@if`/`@for` (not `*ngIf`/`*ngFor`)
- [ ] ARIA attributes present
- [ ] Unit tests cover happy path and edge cases
- [ ] SCSS uses BEM and `:host` scoping
- [ ] Barrel export updated

Generate all files now.

### 8. Review the work

- **Invoke the angular-ui-ux-reviewer subagent** to review your work and implement suggestions where needed
- Iterate on the review process when needed