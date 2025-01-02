# Simbrella App

## Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Tegadaniel/simbrella-FE-Test.git
   cd simbrella-FE-Test
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the application:**

   ```sh
   npm start
   ```

4. **Run tests:**
   ```sh
   npm test
   ```

Accessing the Hosted Version
To access the hosted version of the application, visit: https://simbrealla-fe-test.netlify.app/

## Approach

This project is a simple financial management application built using Next.js. The application includes the following features:

User Management: Displays user information including name, email, and account balance.
Loan Management: Allows users to view active loans, loan history, and request new loans.
Transaction History: Displays a list of transactions with sorting and filtering options.

## Key Components

Context API: Used for state management across the application. The AppProvider component in AppContext.tsx provides the application state to all components.

API Routes: Mock API routes are defined in the api directory to simulate fetching data from a server.

Styling: Tailwind CSS is used for styling the application. The configuration is defined in tailwind.config.ts and postcss.config.mjs.

Testing: Jest and React Testing Library are used for unit testing components. Test files are located alongside their respective components.

## Directory Structure

app: Contains the main application components and pages.

components: Contains reusable components such as Header, Sidebar, and BreadCrumbs.

api: Contains mock API routes for fetching data.

context: Contains the context provider for state management.

public: Contains static assets such as images.
