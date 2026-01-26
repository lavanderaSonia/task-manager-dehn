# Task Manager
CRUD app to manage tasks

## Commands

### Development
```bash
npm run dev
```
Starts the development server with hot module replacement. The app will be available at `http://localhost:5173`

### Testing
```bash
npm run test
```
Runs the test suite using Vitest in watch mode. Tests cover all application layers:
- Repository layer (data persistence)
- Service layer (business logic)
- ViewModel layer (state management)

### Test Coverage
```bash
npm run test:coverage
```
Generates test coverage report showing which parts of the code are tested. Results are saved in the `coverage/` directory.

### Build
```bash
npm run build
```
Builds the application for production. Output is generated in the `dist/` directory.

## Technical decisions
### Architecture: N-Layers + MVVM

The application uses a N-Layers architecture that make easier maintenance and testing:

#### Key Benefits

- **Scalability**: Switch from localStorage to API without changing components
- **Testability**: Use mock repositories for testing
- **Maintainability**: Each layer has its responsibility
- **Decoupling**: Upper layers don't depend on lower layers

### The Layers

```
┌─────────────────────────────────┐
│   View                          │
│   Vue Components                │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│   ViewModel                     │
│   useTaskViewModel              │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│   Service                       │
│   TaskService                   │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│   Repository                    │
│   ITaskRepository               │
└─────────────────────────────────┘
```

### Design Patterns Used

#### 1. **Dependency Injection**
The `TaskService` receives the repository interface as a constructor parameter, not instantiating it internally. This allows:
- Easy testing with mock repositories
- Runtime flexibility to switch implementations
- Loose coupling between layers

#### 2. **Repository Pattern**
`ITaskRepository` defines a contract for data access. Implementations can be localStorage, API, database, etc. without affecting higher layers.

#### 3. **Composable Pattern (Vue 3)**
`useTaskViewModel` is a reusable composition function that:
- Encapsulates state and logic
- Manages loading states and errors
- Can be shared across multiple components

### Error Handling Strategy

Each layer has proper error handling:
- **View Layer**: Displays error messages to users
- **ViewModel**: Catches errors and sets error state
- **Service**: Delegates to repository
- **Repository**: Handles data access errors

### Type Safety with TypeScript

- Strong typing across all layers (`Task` interface, async return types)
- Prevents runtime errors at compile time
- Interfaces for abstraction (`ITaskRepository`)
- Partial types for updates (`Partial<Task>`)

### Configuration Management

The `src/config/` folder centralizes all constants and configuration:

- **messages.ts**: Error and info messages in one place (easy to update or translate)
- **storage-keys.ts**: localStorage keys to avoid magic strings
- **ui-labels.ts**: UI text labels for consistency
- **routes.ts**: Route definitions

**Benefits**:
- No magic strings scattered across the code
- Easy maintenance - change once, works everywhere
- Make easier and faster the internationalization (i18n)
- Single source of truth for app constants

### Component Extraction & Reusability

Components follow a clear separation of concerns:

- **Reusable components** (`Button`, `Form`, `Table`): Single responsibility, props-based configuration, easy to test
- **Generic components**: Table component uses Vue 3 generics (`<T extends object>`) for type safety
- **View-Component separation**: Views handle routing and page logic, components focus on presentation
- **Single slot pattern**: Form component uses slots for flexible content

**Benefits**:
- Components testable in isolation
- No UI code duplication
- Consistent styling across the app
- Easy to maintain and extend

### Testing Strategy

Integration tests cover all layers:

- **Repository Layer**: Data persistence to localStorage
- **Service Layer**: Business logic (CRUD operations)
- **ViewModel Layer**: State management and error handling

Tests use Vitest and validate the full stack with mock repositories when needed. Each layer tested independently but also as integrated workflow.

#### Switching from localStorage to API

You only need to change one line:

```typescript
// localStorage
const defaultRepository = new LocalStorageTaskRepository();

// API
const defaultRepository = new ApiTaskRepository();

export const taskService = new TaskService(defaultRepository);
```

Components and ViewModels remain unchanged.

### Why async/await for localStorage?

localStorage is fast (synchronous), but this app uses `async/await` everywhere. Why?

So the code works the same with localStorage or an API. If we use synchronous code initially, we'd have to rewrite everything when adding an API. Using async from the start keeps the code flexible.

**In practice**:
- **localStorage**: Data is ready instantly, but we treat it as if it takes time
- **API**: Data takes time to arrive over the network
- **The code**: Works the same in both cases

That’s why we should build flexible code from the start, with future scalability in mind. 

