# 📝 To-Do App

A real-time To-Do list application built with **ASP.NET Core** and **React**, featuring user authentication, SignalR-based live updates, and task management functionalities.

## 🚀 Features

- 🔐 User registration and login using ASP.NET Identity
- 📝 Create, update, and delete tasks
- 🔄 Real-time updates powered by SignalR
- 💾 Database integration with Entity Framework Core
- 🎯 Modular architecture with a clean separation of concerns

## 🛠 Technologies Used

- **Backend**: ASP.NET Core, SignalR, Entity Framework Core
- **Authentication**: ASP.NET Identity
- **Frontend**: React, Axios, Bootstrap (or any styling used)
- **Database**: SQL Server

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js](https://nodejs.org/) (v14 or later)
- SQL Server

### Clone the Repository
    
```bash
git clone https://github.com/DilmurodDeveloper/To-Do-App.git
cd To-Do-App
```

### Backend Setup

1. Navigate to the backend project:
   ```bash
   cd ToDoApp.Server
  
2. Configure the ``appsettings.json`` file with your SQL Server connection string.

3. Run database migrations:
   ```bash
   dotnet ef database update
      
4. Start the backend server:
   ```bash
   dotnet run
   
### Frontend Setup
1. Navigate to the React frontend project:
    ```bash
    cd ../ToDoApp.Client
    
2. Install dependencies:
    ```bash
    npm install
    
3. Start the frontend:
    ```bash
    npm start

4. Open your browser at http://localhost:3000

## 🧪 Running Tests
1. Navigate to the test project:
   ```
   cd ../ToDoApp.Tests.Unit
2. Run the tests:
   ```
   dotnet test
   
## 📸 Screenshots

### 🏠 Home Page
<img src="https://github.com/user-attachments/assets/c7f3b227-c32f-42e4-8ba3-3a04e8b31f02" width="400"/>

---

### 🔐 Auth Pages
<img src="https://github.com/user-attachments/assets/f61ec75c-d4d2-4695-8a81-f37484469f1b" width="400"/> <img src="https://github.com/user-attachments/assets/55355c03-b624-475c-bec7-5c91c9ad671a" width="400"/>

---

### 👤 User Dashboard
<img src="https://github.com/user-attachments/assets/34a4b24f-bcfa-422b-a9f1-53e9a6af3a07" width="400"/> <img src="https://github.com/user-attachments/assets/c918373b-9ab6-4fec-8c56-eeb247eb62f9" width="400"/>

---

### 🛠️ Admin Dashboard
<img src="https://github.com/user-attachments/assets/a01780a7-e1c9-491a-99c3-398122fff6fe" width="400"/> <img src="https://github.com/user-attachments/assets/f0bbdf7f-3f25-49e6-b9cc-294a12503d4a" width="400"/>


## ⚙️ CI/CD with GitHub Actions
### GitHub Actions is configured to:
- Restore dependencies
- Build the solution
- Run unit tests
It triggers on push and pull request events on the master/main branch.

## 📄 License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for details.

## 👤 Author

**[DilmurodDeveloper](https://github.com/DilmurodDeveloper)**
