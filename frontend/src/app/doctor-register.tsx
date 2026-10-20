import React, { useState } from "react";
import { router } from "expo-router";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function DoctorRegister() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [hospital, setHospital] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      fullName.trim() === "" ||
      username.trim() === "" ||
      phone.trim() === "" ||
      hospital.trim() === "" ||
      specialization.trim() === "" ||
      password.trim() === ""
    ) {
      alert("❌ Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName.trim(),
          username: username.trim(),
          phone: phone.trim(),
          hospital: hospital.trim(),
          specialization: specialization.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          `❌ Registration failed\n\n${
            data?.detail || "Something went wrong."
          }`
        );
        return;
      }

      console.log("Doctor registration response:", data);

      alert("✅ Doctor registration successful!");

      router.replace("/dashboard");
    } catch (error) {
      console.error("Doctor registration error:", error);

      alert(
        "❌ Cannot connect to the backend.\n\nPlease make sure FastAPI is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.logo}>👨‍⚕️</Text>

        <Text style={styles.title}>Doctor Registration</Text>

        <Text style={styles.subtitle}>
          Create your doctor account
        </Text>

        <View style={styles.card}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#94A3B8"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />

          <TextInput
            placeholder="Username"
            placeholderTextColor="#94A3B8"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />

          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#94A3B8"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />

          <TextInput
            placeholder="Hospital Name"
            placeholderTextColor="#94A3B8"
            value={hospital}
            onChangeText={setHospital}
            style={styles.input}
          />

          <TextInput
            placeholder="Specialization"
            placeholderTextColor="#94A3B8"
            value={specialization}
            onChangeText={setSpecialization}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#94A3B8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <TouchableOpacity
            style={[
              styles.button,
              loading && styles.buttonDisabled,
            ]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.back}>← Back</Text>
          </TouchableOpacity>
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
    marginTop: 30,
    marginBottom: 10,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },

  card: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#16253B",
    borderRadius: 25,
    padding: 25,

    // Web styling
    boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
  },

  input: {
    backgroundColor: "#24364F",
    color: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    fontSize: 16,

    // Web styling
    outlineStyle: "none",
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 18,
    borderRadius: 18,
    marginTop: 10,
    minHeight: 56,
    justifyContent: "center",
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  back: {
    color: "#60A5FA",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },
});