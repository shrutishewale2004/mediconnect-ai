from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base
from models import Doctor, Patient, Medicine
from schemas import (
    DoctorCreate,
    PatientCreate,
    MedicineCreate,
    LoginRequest,
)


app = FastAPI(
    title="MediConnect AI API",
    description="Backend API for MediConnect AI",
    version="1.0.0"
)


# --------------------------------------------------
# CORS
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8081",
        "http://127.0.0.1:8081",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# CREATE DATABASE TABLES
# --------------------------------------------------

Base.metadata.create_all(bind=engine)


# --------------------------------------------------
# DATABASE CONNECTION
# --------------------------------------------------

def get_db():
    from database import SessionLocal

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# --------------------------------------------------
# HOME
# --------------------------------------------------

@app.get("/")
def home():
    return {
        "message": "Welcome to MediConnect AI",
        "status": "Backend is running successfully"
    }


# --------------------------------------------------
# DOCTOR REGISTRATION
# --------------------------------------------------

@app.post("/doctor")
def create_doctor(
    doctor: DoctorCreate,
    db: Session = Depends(get_db)
):
    existing_doctor = (
        db.query(Doctor)
        .filter(Doctor.username == doctor.username)
        .first()
    )

    if existing_doctor:
        return {
            "success": False,
            "message": "Username already exists."
        }

    new_doctor = Doctor(
        full_name=doctor.full_name,
        username=doctor.username,
        phone=doctor.phone,
        hospital=doctor.hospital,
        specialization=doctor.specialization,
        password=doctor.password
    )

    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)

    return {
        "success": True,
        "message": "Doctor registered successfully.",
        "doctor": {
            "id": new_doctor.id,
            "full_name": new_doctor.full_name,
            "username": new_doctor.username,
            "phone": new_doctor.phone,
            "hospital": new_doctor.hospital,
            "specialization": new_doctor.specialization
        }
    }


# --------------------------------------------------
# PATIENT REGISTRATION
# --------------------------------------------------

@app.post("/patient")
def create_patient(
    patient: PatientCreate,
    db: Session = Depends(get_db)
):
    existing_patient = (
        db.query(Patient)
        .filter(Patient.username == patient.username)
        .first()
    )

    if existing_patient:
        return {
            "success": False,
            "message": "Username already exists."
        }

    new_patient = Patient(
        full_name=patient.full_name,
        username=patient.username,
        phone=patient.phone,
        age=patient.age,
        blood_group=patient.blood_group,
        disease=patient.disease,
        emergency_contact=patient.emergency_contact,
        password=patient.password
    )

    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    return {
        "success": True,
        "message": "Patient registered successfully.",
        "patient": {
            "id": new_patient.id,
            "full_name": new_patient.full_name,
            "username": new_patient.username,
            "phone": new_patient.phone,
            "age": new_patient.age,
            "blood_group": new_patient.blood_group,
            "disease": new_patient.disease,
            "emergency_contact": new_patient.emergency_contact
        }
    }


# --------------------------------------------------
# LOGIN
# --------------------------------------------------

@app.post("/login")
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    # Check doctor
    doctor = (
        db.query(Doctor)
        .filter(Doctor.username == login_data.username)
        .first()
    )

    if doctor and doctor.password == login_data.password:
        return {
            "success": True,
            "message": "Doctor login successful.",
            "user": {
                "id": doctor.id,
                "username": doctor.username,
                "name": doctor.full_name,
                "role": "doctor",
                "phone": doctor.phone,
                "hospital": doctor.hospital,
                "specialization": doctor.specialization
            }
        }

    # Check patient
    patient = (
        db.query(Patient)
        .filter(Patient.username == login_data.username)
        .first()
    )

    if patient and patient.password == login_data.password:
        return {
            "success": True,
            "message": "Patient login successful.",
            "user": {
                "id": patient.id,
                "username": patient.username,
                "name": patient.full_name,
                "role": "patient",
                "phone": patient.phone,
                "age": patient.age,
                "blood_group": patient.blood_group,
                "disease": patient.disease,
                "emergency_contact": patient.emergency_contact
            }
        }

    return {
        "success": False,
        "message": "Invalid username or password."
    }


# --------------------------------------------------
# MEDICINE
# --------------------------------------------------

@app.post("/medicine")
def create_medicine(
    medicine: MedicineCreate,
    db: Session = Depends(get_db)
):
    new_medicine = Medicine(
        medicine_name=medicine.medicine_name,
        dosage=medicine.dosage,
        time=medicine.time
    )

    db.add(new_medicine)
    db.commit()
    db.refresh(new_medicine)

    return {
        "success": True,
        "message": "Medicine added successfully.",
        "medicine": {
            "id": new_medicine.id,
            "medicine_name": new_medicine.medicine_name,
            "dosage": new_medicine.dosage,
            "time": new_medicine.time
        }
    }


# --------------------------------------------------
# GET ALL DOCTORS
# --------------------------------------------------

@app.get("/doctors")
def get_doctors(db: Session = Depends(get_db)):
    doctors = db.query(Doctor).all()

    return {
        "success": True,
        "doctors": [
            {
                "id": doctor.id,
                "full_name": doctor.full_name,
                "username": doctor.username,
                "phone": doctor.phone,
                "hospital": doctor.hospital,
                "specialization": doctor.specialization
            }
            for doctor in doctors
        ]
    }


# --------------------------------------------------
# GET ALL PATIENTS
# --------------------------------------------------

@app.get("/patients")
def get_patients(db: Session = Depends(get_db)):
    patients = db.query(Patient).all()

    return {
        "success": True,
        "patients": [
            {
                "id": patient.id,
                "full_name": patient.full_name,
                "username": patient.username,
                "phone": patient.phone,
                "age": patient.age,
                "blood_group": patient.blood_group,
                "disease": patient.disease,
                "emergency_contact": patient.emergency_contact
            }
            for patient in patients
        ]
    }