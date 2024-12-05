# **Forms Backend API**

This project is a simple backend application built with Node.js, Express, and SQLite. It provides endpoints to manage forms, including creating, retrieving, updating, and listing forms.

## **Features**

- Save forms with a title and JSON-formatted data.
- Retrieve a form by its ID.
- Update a form by its ID.
- List all saved forms.

## **Endpoints**

1. **POST** `/api/forms/save`: Save a new form.
2. **GET** `/api/forms/:id`: Retrieve a form by its ID.
3. **PUT** `/api/forms/update/:id`: Update a form by its ID.
4. **GET** `/api/forms/list`: List all forms.

---

## **Installation**

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/devanshtakkar/fiyge-test-backend.git
   cd https://github.com/devanshtakkar/fiyge-test-backend.git
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

---

## **Starting the Server**

1. Start the server using Node.js:
   ```bash
   node index.js
   ```

2. The server will run on `http://localhost:3000` by default.



### **4. List All Forms**
Send a `GET` request to `/api/forms/list` to retrieve all saved forms.

---
## Login Credentials
- **Username**: `user`
- **Password**: `password`

You will need these credentials to log in and access the application.

## **Database**

The application uses an in-memory SQLite database. The forms table has the following structure:

| Column       | Type    | Description                    |
|--------------|---------|--------------------------------|
| `id`         | INTEGER | Primary key, auto-incremented  |
| `form_name`  | TEXT    | The title of the form          |
| `form_data`  | TEXT    | JSON data for the form         |
| `created_at` | TEXT    | Timestamp of creation          |
| `updated_at` | TEXT    | Timestamp of last update       |

---

## **Dependencies**

- [Express](https://expressjs.com/): Web framework for Node.js.
- [SQLite3](https://www.npmjs.com/package/sqlite3): SQLite library for Node.js.
- [Body-Parser](https://www.npmjs.com/package/body-parser): Middleware to parse JSON request bodies.

Install all dependencies by running:
```bash
npm install
```

---

## **License**

This project is licensed under the [MIT License](LICENSE).