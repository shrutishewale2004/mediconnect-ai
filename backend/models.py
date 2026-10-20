from sqlalchemy import Column, Integer, String
from database import Base


# --------------------------------------------------
# DOCTOR
# --------------------------------------------------

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    username = Column(String, unique=True, nullable=False, index=True)
    phone = Column(String, nullable=False)
    hospital = Column(String, nullable=False)
    specialization = Column(String, nullable=False)
    password = Column(String, nullable=False)


# --------------------------------------------------
# PATIENT
# --------------------------------------------------

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    username = Column(String, unique=True, nullable=False, index=True)
    phone = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    blood_group = Column(String, nullable=False)
    disease = Column(String, nullable=False)
    emergency_contact = Column(String, nullable=False)
    password = Column(String, nullable=False)


# --------------------------------------------------
# MEDICINE
# --------------------------------------------------

class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)
    medicine_name = Column(String, nullable=False)
    dosage = Column(String, nullable=False)
    time = Column(String, nullable=False)


# --------------------------------------------------
# APPOINTMENT
# --------------------------------------------------

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)

    patient_name = Column(
        String,
        nullable=False
    )

    doctor_name = Column(
        String,
        nullable=False
    )

    date = Column(
        String,
        nullable=False
    )

    time = Column(
        String,
        nullable=False
    )

    reason = Column(
        String,
        nullable=False
    )

    status = Column(
        String,
        nullable=False,
        default="Pending"
    )