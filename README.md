# MediConnect AI 🏥

A smart healthcare platform designed to connect doctors and patients through a mobile application.

## ✨ Features

- User login and role selection
- Doctor registration
- Patient registration
- Doctor and patient dashboards
- Appointment management
- Medicine management
- Local data storage

## 🛠️ Technology Stack

### Frontend
- React Native
- Expo
- TypeScript
- JavaScript

### Backend
- Python
- FastAPI
- SQLite

## 📁 Project Structure

```text
mediconnect-ai/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   └── schemas.py
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── hooks/
│   ├── package.json
│   └── app.json
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shrutishewale2004/mediconnect-ai.git
cd mediconnect-ai
```

### 2. Run the frontend

```bash
cd frontend
npm install
npx expo start
```

Follow the Expo terminal instructions to open the app on your device or emulator.

### 3. Run the backend

Open a separate terminal from the project root:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the backend dependencies:

```powershell
pip install fastapi uvicorn sqlalchemy
```

Start the API server:

```powershell
uvicorn main:app --reload
```

If your project uses additional Python packages, install them as well. The backend commands assume that `main.py` exposes an `app` object.

## 🔐 Security Note

Do not commit passwords, API keys, environment secrets, or real patient information. Use environment variables for sensitive configuration.

## 👩‍💻 Author

**Shruti Shewale**

GitHub: [@shrutishewale2004](https://github.com/shrutishewale2004)

---

*This project is under development.*
