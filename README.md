# Getting started

## Installation

Clone the repository

    git clone https://github.com/adrianpura/ehrlich-test.git

Switch to the repo folder

    cd ehrlich-test

Install dependencies

    npm install

Copy config file

    cp .env.example .env

## Database

The codebase implements TypeORM with a mySQL database.

---

Create a new mysql database with the name `ehrlich`

Set mysql database settings in .env

    DB_TYPE=mysql
    DB_PORT=3306
    DB_HOST=localhost
    DB_USER=your-mysql-username
    DB_PASS=your-mysql-password
    DB_NAME=ehrlich

Start local mysql server and create new database 'ehrlich'

## NPM scripts

- `npm run build` - creates a build directory with a production build of your app
- `npm run migration:run` - runs migration

# Authentication

This applications uses JSON Web Token (JWT) to handle authentication. The token is passed with each request using the `Authorization` header with `Token` scheme. The JWT authentication middleware handles the validation and authentication of the token. Please check the following sources to learn more about JWT.

---

# Swagger API docs

This example repo uses the NestJS swagger module for API documentation. [Image api Docs](http://localhost:3333/api/)

## Whats in the box?

### Commitizen

[commitizen](https://github.com/commitizen/cz-cli) is a command line utility that makes it easier to create commit messages following the [conventional commit format](https://conventionalcommits.org) specification.

Use `git cz` instead of `git commit` to use commitizen.

[![Add and commit with Commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)

---

### Husky

[Husky](https://github.com/typicode/husky) is a package that helps you create Git hooks easily.

**Configuration folder**: [`.husky`](./.husky/).
