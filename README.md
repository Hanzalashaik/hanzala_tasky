<h1>Hanzala's Tasky</h1>

### About the Project 
Hanzala's Tasky is a Node.js backend project for a simple task management application. It utilizes the File System (fs) module to store and manage user data and tasks.

![Image](https://github.com/Hanzalashaik/hanzala_tasky/blob/main/images/home.png "Image")


#### The application provides various operations to efficiently manage tasks. Below are the available operations:

1.Exit
    Terminate the application.

2.Register
    Register a new user account.
![Image](https://github.com/Hanzalashaik/hanzala_tasky/blob/main/images/Register.png"Image")

3.Login
    Log in to an existing user account.
![Image](https://github.com/Hanzalashaik/hanzala_tasky/blob/main/images/login.png"Image")

4.Create Task
    Add a new task to the user's task list.
![Image](https://github.com/Hanzalashaik/hanzala_tasky/blob/main/images/create%20task.png"Image")

5.Get All Task
    Retrieve a list of all tasks associated with the user.

6.Update Task
    Modify details of an existing task.

7.Delete Task
    Remove a specific task from the user's task list.

8.Delete All Task
    Clear all tasks from the user's task list.

9.Delete Account
    Delete the user account along with all associated tasks.

10.Forgot Password
    Reset the user's password in case it is forgotten.

<b><i>Note</i></b>: It is a Complete Backend Application using Node.js.


## To Install and Test
```bash
git clone git@github.com:Hanzalashaik/hanzala_tasky.git
cd hanzala_tasky
npm install
npm start
```

### Install dependencies for the basic setup: </h4>

### Dev Dependencies 
```bash
npm i -D nodemon 
```

### Dependencies 
```bash
npm i config
```

<h4> Integrate a new script </h4>

- Add "type" : "module"
- Change "script" :{ "dev": "nodemon app.js"}

```bash
{
  "name": "Book-Store-API",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "type" : "module",
  "scripts": {
    "dev": "nodemon app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^2.0.15"
  },
  "dependencies": {
    "express": "^4.17.3"
  }
}
```
### Why the Script inside package.json ??
The script makes sure that the development server restarts automatically when we make changes (thanks to nodemon).

### Now start your server
```bash
nodemon app.js