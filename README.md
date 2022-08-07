# Library
##### A simple CRUD made with Node.js, Express and Vue! It enables users to keep track of the books they are reading, as well as see what other users have!

##### This is the Frontend repository for Library. A separate repository is available 👉🏼[here](https://github.com/yushisalvador/libraryapp-backend).
# Table of Contents
* [General Info](#library)
* [Technologies](#technologies)
* [Setup](#setup)

## Technologies
- Vue 3.2
- Axios

## Setup
* Clone the repository by running the following on your terminal.
```
git clone https://github.com/yushisalvador/libraryapp-frontend.git
cd libraryapp-frontend
```

* Run ``` npm install ``` in the root directory to install all the needed dependencies.

* In the root directory, create an ``` env.local ``` file, and set the following environment variable.

```
VUE_APP_API_URL=https://little-world-of-books.herokuapp.com/
```
* Run ``` npm run serve ``` to start the development server

* Open ``` localhost:8080/login``` to view the project.

* You can use the following account to try the project out without signing up!
```
username: brandon
password: password
```

## Features 
* Authentication
* Display all books in the database

 When authenticated: 
* Add books
* Edit date finished for books to log if user finishes reading the book.
* Delete book

## To-do
* Write tests
* Improve UI 

