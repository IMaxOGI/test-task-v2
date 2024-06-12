React + TypeScript + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

@vitejs/plugin-react uses Babel for Fast Refresh
@vitejs/plugin-react-swc uses SWC for Fast Refresh
Expanding the ESLint configuration
If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

Configure the top-level parserOptions property like this:
js
Copy code
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
Replace plugin:@typescript-eslint/recommended with plugin:@typescript-eslint/recommended-type-checked or plugin:@typescript-eslint/strict-type-checked
Optionally add plugin:@typescript-eslint/stylistic-type-checked
Install eslint-plugin-react and add plugin:react/recommended & plugin:react/jsx-runtime to the extends list
Authentication Instructions
To log in to the application, you need to use the following credentials:

Username: user
Password: password
Upon successful login, you will be redirected to the home page. If you are already logged in, you will see a "Logout" button instead of the "Login" button.

Make sure to log out by clicking the "Logout" button to end your session.

Project Structure
The project is structured as follows:

src/
components/: Contains reusable UI components.
core/
hooks/: Custom React hooks.
services/: Services for handling business logic and API interactions.
pages/: Page components corresponding to different routes.
routes/: Route definitions and configurations.
Running the Project
To run the project locally, use the following commands:

Install dependencies:
sh
Copy code
npm install
Start the development server:
sh
Copy code
npm run dev
The application will be available at http://localhost:5173.

Building the Project
To create a production build, use the following command:

sh
Copy code
npm run build
The build output will be located in the dist directory.

Testing
To run tests, use the following command:

sh
Copy code
npm run test
Make sure to write tests for all new features and components to ensure the stability and reliability of the application.
