from pydantic import BaseModel


# --------------------------------------------------
# DOCTOR
# --------------------------------------------------

class DoctorCreate(BaseModel):
    full_name: str
    username: str
    phone: str
    hospital: str
    specialization: str
    password: str


# --------------------------------------------------
# PATIENT
# --------------------------------------------------

class PatientCreate(BaseModel):
    full_name: str
    username: str
    phone: str
    age: int
    blood_group: str
    disease: str
    emergency_contact: str
    password: str


# --------------------------------------------------
# MEDICINE
# --------------------------------------------------

class MedicineCreate(BaseModel):
    medicine_name: str
    dosage: str
    time: str


# --------------------------------------------------
# LOGIN
# --------------------------------------------------

class LoginRequest(BaseModel):
    username: str
    password: str


# --------------------------------------------------
# APPOINTMENT
# --------------------------------------------------

class AppointmentCreate(BaseModel):
    patient_name: str
    doctor_name: str
    date: str
    time: str
    reason: str