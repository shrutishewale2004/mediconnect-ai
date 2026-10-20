import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

export default function PatientRegister() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [disease, setDisease] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      fullName.trim() === "" ||
      username.trim() === "" ||
      phone.trim() === "" ||
      age.trim() === "" ||
      bloodGroup.trim() === "" ||
      disease.trim() === "" ||
      emergencyContact.trim() === "" ||
      password.trim() === ""
    ) {
      alert("❌ Please fill all fields.");
      return;
    }

    const ageNumber = Number(age);

    if (isNaN(ageNumber) || ageNumber <= 0) {
      alert("❌ Please enter a valid age.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/patient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName.trim(),
            username: username.trim(),
            phone: phone.trim(),
            age: ageNumber,
            blood_group: bloodGroup.trim(),
            disease: disease.trim(),
            emergency_contact: emergencyContact.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      console.log("Patient registration response:", data);

      if (!response.ok) {
        alert(
          `❌ Registration failed\n\n${
            data?.detail || "Something went wrong."
          }`
        );
        return;
      }

      if (data.success === false) {
        alert(`❌ ${data.message}`);
        return;
      }

      alert("✅ Patient registration successful!");

      router.replace("/dashboard");
    } catch (error) {
      console.error("Patient registration error:", error);

      alert(
        "❌ Cannot connect to backend.\n\nMake sure FastAPI is running on port 8000."
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
        <Text style={styles.logo}>🧑‍⚕️</Text>

        <Text style={styles.title}>Patient Registration</Text>

        <Text style={styles.subtitle}>
          Create your patient account
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
            placeholder="Age"
            placeholderTextColor="#94A3B8"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
            style={styles.input}
          />

          <TextInput
            placeholder="Blood Group"
            placeholderTextColor="#94A3B8"
            value={bloodGroup}
            onChangeText={setBloodGroup}
            style={styles.input}
          />

          <TextInput
            placeholder="Disease (Diabetes, BP, etc.)"
            placeholderTextColor="#94A3B8"
            value={disease}
            onChangeText={setDisease}
            style={styles.input}
          />

          <TextInput
            placeholder="Emergency Contact"
            placeholderTextColor="#94A3B8"
            keyboardType="phone-pad"
            value={emergencyContact}
            onChangeText={setEmergencyContact}
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
            activeOpacity={0.8}
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

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={styles.backButton}>
              ← Back
            </Text>
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
    marginTop: 20,
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
    marginTop: 8,
    marginBottom: 30,
    textAlign: "center",
  },

  card: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#16253B",
    borderRadius: 25,
    padding: 25,
    boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
  },

  input: {
    backgroundColor: "#24364F",
    color: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    fontSize: 16,
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

  backButton: {
    color: "#60A5FA",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },
});