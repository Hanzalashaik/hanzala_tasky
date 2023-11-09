<h1>Hanzala's Tasky</h1>

### About the Project 
Hanzala's Tasky is a Node.js backend project for a simple task management application. It utilizes the File System (fs) module to store and manage user data and tasks.

![Image](https://github.com/Hanzalashaik/hanzala_tasky/blob/main/images/home.png "Image")


#### The application provides various operations to efficiently manage tasks. Below are the available operations:

1.<b>Exit</b></br>
    Terminate the application.

2.<b>Register</b></br>
    Register a new user account.

3.<b>Login</b><br>
    Log in to an existing user account.

4.<b>Create Task</b></br>
    Add a new task to the user's task list.

5.<b>Get All Task</b></br>
    Retrieve a list of all tasks associated with the user.

6.<b>Update Task</b></br>
    Modify details of an existing task.

7.<b>Delete Task</b></br>
    Remove a specific task from the user's task list.

8.<b>Delete All Task</b></r>
    Clear all tasks from the user's task list.

9.<b>Delete Account</b></br>
    Delete the user account along with all associated tasks.

10.<b>Forgot Password</b></br>
    Reset the user's password in case it is forgotten.

<b><i>Note</i></b>: 
<h1>Backend Details</h1>

### File System (fs) Module:

The project utilizes the Node.js File System (fs) module to persistently store user data and tasks.


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

```

### Additional Notes

This is a backend project, and it focuses on managing tasks with a simple command-line interface.
Feel free to customize and extend the project according to your requirements.
Ensure to handle errors and edge cases for a robust application.
Happy task managing!.