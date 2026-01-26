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