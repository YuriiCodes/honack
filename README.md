# Honack

## Project description
Honack is a powerful task tracking and payroll calculation tool designed to help teams stay organized and efficient. Honack streamlines project management by offering a user-friendly, drag-and-drop board with three sections: To Do, In Progress, and Done. As tasks are moved from one section to another, their status is automatically updated, so team members always know where a project stands.

With Honack, users can sign up and create or join projects, each of which has iterations and tasks assigned to it. Tasks are assigned a certain number of points, and each project has a team with a base salary for each member. Based on the number of points collected by each member, their salary is either raised or lowered, providing an honest and fair way to calculate payroll.

In the project members tab, Honack provides a variety of visualizations to help users track team efficiency. A bar chart, created using the Recharts library, displays each member's efficiency, while a table provides detailed data on each worker. Users can also export reports into CSV format for further analysis.

Honack was built using a range of cutting-edge tools and technologies, including TypeScript, React, Tailwind, DaisyUI, Zustand, React-Beautiful-DND, JWT Tokens, Nest.js, Recharts, React-CSV, and NX Monorepo & ESLint. The project uses PostgreSQL with Sequelize ORM, and is deployed using Docker Compose. Email notifications are handled by SendGrid email sender.


## How to set up
1. Download the source code & run `npm install`.
2. Spin up the database. You can do it either by running the `docker-compose up` command, or launching any other relational DB of your choice. You then must provide the DB credentials into the .ENV file(see stage 3).
3. Create an `env.stage.{STAGE}` file in the apps/backend folder, then enter the needed for the backend ENV variables there. The backend has .ENVs validation, so you will see all the missing envs if there are any.
4. run `STAGE={STAGE} npx nx serve backend`. If all the envs are there, this command will launch the backend. If any envs are missing - it will show the error & missing envs.
5. run `npx nx serve frontend`. This command will launch the Front-End part.
6. Go to localhost:4200. The app will be launched there.
## Development server

Run `nx serve frontend` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
