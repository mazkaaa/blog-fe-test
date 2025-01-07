# Blog Frontend Test

This is a frontend application for a blog, built with Next.js, React, and TypeScript. It includes features for creating, editing, deleting, and listing blog posts. The application also includes authentication and authorization using tokens.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (version 7 or higher)

### Installation

1.  Clone the repository:
    git clone https://github.com/mazkaaa/blog-fe-test.git
    cd blog-fe-test

2.  Install dependencies:
    npm install

3.  Create a .env.local file based on .env.examples and set the necessary environment variables.

### Running the Development Server

    npm run dev

Open http://localhost:3000 with your browser to see the result.

### Running Tests

To run Cypress tests:

    npm run test

### Building for Production

    npm run build

### Linting and Formatting

To lint the code:

    npm run lint

To format the code:

    npm run format

## CI/CD Pipeline

The project includes a CI/CD pipeline configured with GitHub Actions. The pipeline runs linting and tests on every push to the main branch and on pull requests.

## License

This project is licensed under the MIT License.

## Live URL

The live application can be accessed at: https://blog-fe-test.vercel.app

