import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function RoleScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}

      <Text style={styles.logo}>🏥</Text>

      {/* Heading */}

      <Text style={styles.title}>Choose Your Role</Text>

      <Text style={styles.subtitle}>
        Select how you want to continue
      </Text>

      {/* Doctor Card */}

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => router.push("/doctor-register")}
      >
        <Text style={styles.icon}>👨‍⚕️</Text>

        <Text style={styles.cardTitle}>Doctor</Text>

        <Text style={styles.cardText}>
          Register and manage patients
        </Text>
      </TouchableOpacity>

      {/* Patient Card */}

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => router.push("/patient-register")}
      >
        <Text style={styles.icon}>🧑</Text>

        <Text style={styles.cardTitle}>Patient</Text>

        <Text style={styles.cardText}>
          Track medicines and appointments
        </Text>
      </TouchableOpacity>

      {/* Back Button */}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push("/")}
      >
        <Text style={styles.backButton}>
          ← Back to Login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#071226",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  logo: {
    fontSize: 70,
    marginBottom: 15,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 35,
  },

  card: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#16253B",
    padding: 25,
    borderRadius: 25,
    marginBottom: 20,

    boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
  },

  icon: {
    fontSize: 50,
    marginBottom: 10,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  cardText: {
    color: "#94A3B8",
    fontSize: 16,
    marginTop: 5,
    lineHeight: 22,
  },

  backButton: {
    color: "#60A5FA",
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
    fontWeight: "600",
  },
});