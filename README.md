# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Authentication Instructions

To log in to the application, you need to use the following credentials:

- **Username**: `user`
- **Password**: `password`

Upon successful login, you will be redirected to the home page. If you are already logged in, you will see a "Logout" button instead of the "Login" button.

Make sure to log out by clicking the "Logout" button to end your session.

## Project Structure

The project is structured as follows:

- `src/`
  - `components/`: Contains reusable UI components.
  - `core/`
    - `hooks/`: Custom React hooks.
    - `services/`: Services for handling business logic and API interactions.
  - `pages/`: Page components corresponding to different routes.
  - `routes/`: Route definitions and configurations.

## Running the Project

To run the project locally, use the following commands:

1. Install dependencies:
   ```sh
   npm install

2. Start the development server:
   ```sh
   npm run dev

The application will be available at http://localhost:5173.

## Building the Project

To create a production build, use the following command:
```sh
npm run build
