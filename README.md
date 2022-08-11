# Guestbook

## Run the project

```
git clone https://github.com/twilsonn/guestbook.git
cd ./guestbook
```

### Backend (requires Java 11)

```
cd ./backend
mvn clean compile exec:java
```

### Frontend (requires Node.js)

```
cd ./frontend
npm install
npm run build
npm run start
```

### default users

| username   | password | is_admin |
|------------|----------|----------|
| admin      | pasword  | TRUE     |
| jane.smith | pasword  | FALSE    |

# Application Task

## Requirements:

Create a guestbook application which consists of two types of users.

```
Guests
Administrator
```

The tool should be developed with OOP/MVC approach. The structure of the database tables should fit to the model/entity classes.

Technologies to use (Please use most recent supported versions available):

- Backend Framework - Java/Spring
- Frontend Framework – Thymeleaf/Bootstrap/React
- Database - Any DB MySQL/MongoDB etc.
- JUnit
- Git

### Guests

- User needs to login in order to write a new entry in the guestbook
- Guestbook entry can be either a single image or a text

### Administrator

- View all the entries posted by all the users
- Approve the entries
- Remove the entries

### Unit tests

- Unit test to test the services/functions

## Summary:

- Write a guestbook application
- A guestbook entry can be an image or text
- Guest users need to login to write an entry
- Administrator can view, edit, approve or delete entries
- Share Github or Bitbucket URL

## API Endpoints

| Endpoint              | Description                                 | Permission Level |
|-----------------------|---------------------------------------------|------------------|
| POST /api/auth/login  | log user in                                 | ALL              |
| GET /api/auth/refresh | refresh auth token                          | ALL              |
| GET /api/post         | get all approved (pending for admins) posts | ALL              |
| POST /api/post        | create a new post                           | USER             |
| DELETE /api/post      | delete a post (if admin)                    | ADMIN            |
| PUT /api/post         | edit a post (if admin)                      | ADMIN            |
| GET /api/post/{id}    | approve a post with ID {id}                 | ADMIN            |
