import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import {
  saveAppointment,
  getAppointments,
} from "./data/appointments";

export default function Appointments() {
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const data = await getAppointments();
    setAppointments(data);
  };

  const handleBookAppointment = async () => {
    if (
      doctorName.trim() === "" ||
      date.trim() === "" ||
      time.trim() === ""
    ) {
      alert("❌ Please fill all fields.");
      return;
    }

    const appointment = {
      doctorName,
      date,
      time,
    };

    await saveAppointment(appointment);

    await loadAppointments();

    alert("✅ Appointment booked successfully!");

    setDoctorName("");
    setDate("");
    setTime("");
  };

  const markCompleted = async (index: number) => {
    const updated = [...appointments];

    updated[index].status = "Completed";

    setAppointments(updated);

    await AsyncStorage.setItem(
      "appointments",
      JSON.stringify(updated)
    );
  };

  const deleteAppointment = async (index: number) => {
    const updated = appointments.filter(
      (_, i) => i !== index
    );

    setAppointments(updated);

    await AsyncStorage.setItem(
      "appointments",
      JSON.stringify(updated)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.logo}>📅</Text>

        <Text style={styles.title}>Appointments</Text>

        <Text style={styles.subtitle}>
          Book and manage your appointments
        </Text>

        <View style={styles.wrapper}>
          {/* LEFT SIDE */}

          <View style={styles.card}>
            <Text style={styles.heading}>
              Book Appointment
            </Text>

            <TextInput
              placeholder="Doctor Name"
              placeholderTextColor="#94A3B8"
              value={doctorName}
              onChangeText={setDoctorName}
              style={styles.input}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: "100%",
                height: "58px",
                background: "#24364F",
                color: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #334155",
                padding: "0 20px",
                marginBottom: "18px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{
                width: "100%",
                height: "58px",
                background: "#24364F",
                color: "#FFFFFF",
                borderRadius: "16px",
                border: "1px solid #334155",
                padding: "0 20px",
                marginBottom: "18px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleBookAppointment}
            >
              <Text style={styles.buttonText}>
                Book Appointment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.back()}
            >
              <Text style={styles.back}>
                ← Back
              </Text>
            </TouchableOpacity>
          </View>

          {/* RIGHT SIDE */}

          <View style={styles.sideBar}>
            <Text style={styles.heading}>
              Registered Appointments
            </Text>

            {appointments.length === 0 ? (
              <Text style={styles.empty}>
                No appointments yet.
              </Text>
            ) : (
              appointments.map((item, index) => (
                <View
                  key={index}
                  style={styles.appointmentCard}
                >
                  <Text style={styles.doctor}>
                    👨‍⚕️ {item.doctorName}
                  </Text>

                  <Text style={styles.info}>
                    📅 {item.date}
                  </Text>

                  <Text style={styles.info}>
                    ⏰ {item.time}
                  </Text>

                  <Text
                    style={[
                      styles.status,
                      {
                        color:
                          item.status === "Completed"
                            ? "#22C55E"
                            : "#FACC15",
                      },
                    ]}
                  >
                    {item.status === "Completed"
                      ? "🟢 Completed"
                      : "🟡 Pending"}
                  </Text>

                  {item.status === "Pending" && (
                    <TouchableOpacity
                      style={styles.completeButton}
                      onPress={() =>
                        markCompleted(index)
                      }
                    >
                      <Text
                        style={styles.completeText}
                      >
                        ✓ Complete
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() =>
                      deleteAppointment(index)
                    }
                  >
                    <Text style={styles.deleteText}>
                      🗑 Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071226",
  },

  scrollContainer: {
    padding: 20,
    alignItems: "center",
  },

  logo: {
    fontSize: 70,
    marginTop: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 16,
    marginTop: 8,
    marginBottom: 30,
  },

  wrapper: {
    width: "100%",
    maxWidth: 1200,
    flexDirection: "row",
    gap: 24,
    alignItems: "flex-start",
  },

  card: {
    flex: 1,
    backgroundColor: "#16253B",
    borderRadius: 24,
    padding: 28,
    minHeight: 500,
  },

  sideBar: {
    flex: 1,
    backgroundColor: "#16253B",
    borderRadius: 24,
    padding: 28,
    minHeight: 500,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    width: "100%",
    backgroundColor: "#24364F",
    color: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#334155",
    outlineStyle: "none",
  },

  button: {
    width: "100%",
    backgroundColor: "#2563EB",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  back: {
    color: "#60A5FA",
    textAlign: "center",
    marginTop: 20,
  },

  empty: {
    color: "#94A3B8",
  },

  appointmentCard: {
    backgroundColor: "#24364F",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },

  doctor: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  info: {
    color: "#CBD5E1",
    marginTop: 5,
  },

  status: {
    marginTop: 10,
    fontWeight: "bold",
  },

  completeButton: {
    backgroundColor: "#22C55E",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
  },

  completeText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 10,
  },

  deleteText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});