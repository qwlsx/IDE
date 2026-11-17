# Task List

A simple web application for managing study tasks.

## Problem description

Students can forget their study tasks when they have several subjects. It is useful to keep all tasks in one simple list and see which tasks are already completed.

## Project goal

The goal of this project is to create a simple task list application. Users can add study tasks, mark them as completed, and delete tasks they no longer need. The tasks are saved in a database and remain available after the application is restarted.

## Features

- Add a new task.
- View all saved tasks.
- Mark a task as completed or incomplete.
- Delete a task.
- Save tasks in an SQLite database.

## Technologies

- HTML creates the page structure.
- CSS controls the appearance of the page.
- JavaScript handles user actions and communicates with the server.
- Node.js and Express run the web server.
- SQLite stores the tasks.

## Database

The application uses one table named `tasks`.

| Field | Type | Description |
| --- | --- | --- |
| `id` | INTEGER | Unique task number |
| `text` | TEXT | Task description |
| `completed` | INTEGER | Completion status: 0 or 1 |

## How to run the project

1. Install Node.js 22.5 or newer.
2. Open a terminal in the project folder.
3. Install the dependencies:

   ```sh
   npm install
   ```

4. Start the application:

   ```sh
   npm start
   ```

5. Open `http://localhost:3000` in a browser.

## User guide

### Add a task

Enter the task description in the text field and click **Add task**. The new task will appear in the list and will be saved in the database.

### Complete a task

Click **Complete** next to a task. The task text will be crossed out. Click **Undo** to mark it as incomplete again.

### Delete a task

Click **Delete** next to a task. The task will be removed from the list and the database.

## Project structure

```text
task-list/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
└── README.md
```

The `database.db` file is created automatically when the application starts.

