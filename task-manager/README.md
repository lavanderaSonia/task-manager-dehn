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

