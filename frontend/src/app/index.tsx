import React, { useState } from "react";
import { router } from "expo-router";
import { saveLoggedInUser } from "./data/storage";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (
      username.trim() === "" ||
      password.trim() === ""
    ) {
      alert("❌ Enter username and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      console.log("Login response:", data);

      if (!response.ok) {
        alert(
          `❌ Login failed\n\n${
            data?.detail || "Something went wrong."
          }`
        );
        return;
      }

      if (!data.success) {
        alert(`⚠️ ${data.message}`);
        return;
      }

      const user = data.user;

await saveLoggedInUser(user);

alert(`✅ Welcome ${user.name}`);

router.replace("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      alert(
        "❌ Cannot connect to backend.\n\nMake sure FastAPI is running on port 8000."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <View style={styles.header}>
        <Text style={styles.logo}>🏥</Text>

        <Text style={styles.title}>
          MediConnect AI
        </Text>

        <Text style={styles.subtitle}>
          Smart Healthcare Platform
        </Text>
      </View>

      {/* Login Card */}

      <View style={styles.card}>
        <Text style={styles.welcome}>
          Welcome Back 👋
        </Text>

        <Text style={styles.description}>
          Login to continue
        </Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          cursorColor="#2563EB"
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
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>
              Login →
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.forgot}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/role")}
        >
          <Text style={styles.register}>
            Don't have an account? Create Account
          </Text>
        </TouchableOpacity>
      </View>
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

  header: {
    alignItems: "center",
    marginBottom: 35,
  },

  logo: {
    fontSize: 70,
    marginBottom: 10,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 18,
    marginTop: 8,
  },

  card: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#16253B",
    borderRadius: 25,
    padding: 30,
    boxShadow: "0px 8px 25px rgba(0,0,0,0.35)",
  },

  welcome: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },

  description: {
    color: "#94A3B8",
    fontSize: 16,
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#24364F",
    color: "#FFFFFF",
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 20,
    fontSize: 16,
    marginBottom: 18,
    outlineStyle: "none",
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 18,
    borderRadius: 20,
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

  forgot: {
    color: "#60A5FA",
    textAlign: "center",
    marginTop: 18,
    fontSize: 15,
  },

  register: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 25,
    fontSize: 15,
  },
});