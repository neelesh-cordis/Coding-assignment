
# Express Typescript REST APi Coding Assignment
Rest Api using Express and Typescript that handles GET/POST/PUT/DELETE Http requests for A simple Task Management Tool.

| Methods	| Urls	| Actions
| -------- | ------- | ------- |
| GET | api/tasks | get all tasks
| GET | api/tasks/:id | get Task by id
| GET | api/tasks?assignedTo=[assignedTo] | get all tasks by assignee
| GET | api/tasks?category=[category] | get all tasks by category
| POST | api/tasks | add new Task
| PUT | api/tasks/:id | update Task by id
| DELETE | api/tasks/:id | remove Task by id
| POST | api/users/register | Register new user
| POST | api/users/login | Authenticate user 


## Project setup
```
npm install
npm i -g sqlite3
npx sequelize-cli db:migrate
```

### Run
```
npm run start
```

### Test
```
npm run test-dev
```
