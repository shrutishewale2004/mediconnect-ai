import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { router } from "expo-router";

import {
  getLoggedInUser,
  logoutUser,
} from "./data/storage";


export default function Dashboard() {

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  // --------------------------------------------------
  // LOAD LOGGED-IN USER
  // --------------------------------------------------

  useEffect(() => {

    const loadUser = async () => {

      try {

        const loggedInUser = await getLoggedInUser();

        console.log("Dashboard user:", loggedInUser);

        if (!loggedInUser) {
          router.replace("/");
          return;
        }

        setUser(loggedInUser);

      } catch (error) {

        console.error(
          "Error loading user:",
          error
        );

        router.replace("/");

      } finally {

        setLoading(false);

      }

    };

    loadUser();

  }, []);


  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  const handleLogout = async () => {

    try {

      await logoutUser();

      router.replace("/");

    } catch (error) {

      console.error(
        "Logout error:",
        error
      );

      router.replace("/");

    }

  };


  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {

    return (
      <SafeAreaView style={styles.loadingContainer}>

        <ActivityIndicator
          size="large"
          color="#2563EB"
        />

        <Text style={styles.loadingText}>
          Loading your dashboard...
        </Text>

      </SafeAreaView>
    );

  }


  // --------------------------------------------------
  // DASHBOARD
  // --------------------------------------------------

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >

        {/* --------------------------------------------------
            HEADER
        -------------------------------------------------- */}

        <View style={styles.header}>

          <Text style={styles.logo}>
            🏥
          </Text>

          <View>

            <Text style={styles.title}>
              MediConnect AI
            </Text>

            <Text style={styles.subtitle}>
              Welcome back 👋
            </Text>

          </View>

        </View>


        {/* --------------------------------------------------
            PROFILE
        -------------------------------------------------- */}

        <View style={styles.profileCard}>

          <Text style={styles.profileIcon}>
            {user?.role === "doctor" ? "👨‍⚕️" : "👤"}
          </Text>


          <View style={styles.profileInfo}>

            <Text style={styles.profileName}>
              {user?.name || "User"}
            </Text>


            <Text style={styles.profileRole}>
              {user?.role === "doctor"
                ? "Doctor"
                : "Patient"}
            </Text>


            {user?.phone && (

              <Text style={styles.profilePhone}>
                📱 {user.phone}
              </Text>

            )}

          </View>

        </View>


        {/* --------------------------------------------------
            FEATURES
        -------------------------------------------------- */}

        <View style={styles.grid}>


          {/* APPOINTMENTS */}

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              router.push("/appointments")
            }
          >

            <Text style={styles.cardIcon}>
              📅
            </Text>

            <Text style={styles.cardTitle}>
              Appointments
            </Text>

            <Text style={styles.cardDescription}>
              Book & manage
            </Text>

          </TouchableOpacity>


          {/* MEDICINES */}

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() =>
              router.push("/medicine")
            }
          >

            <Text style={styles.cardIcon}>
              💊
            </Text>

            <Text style={styles.cardTitle}>
              Medicines
            </Text>

            <Text style={styles.cardDescription}>
              Medicine reminders
            </Text>

          </TouchableOpacity>


          {/* REPORTS */}

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
          >

            <Text style={styles.cardIcon}>
              📊
            </Text>

            <Text style={styles.cardTitle}>
              Reports
            </Text>

            <Text style={styles.cardDescription}>
              Health reports
            </Text>

          </TouchableOpacity>


          {/* AI CHATBOT */}

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
          >

            <Text style={styles.cardIcon}>
              🤖
            </Text>

            <Text style={styles.cardTitle}>
              AI Chatbot
            </Text>

            <Text style={styles.cardDescription}>
              Ask MediConnect AI
            </Text>

          </TouchableOpacity>


          {/* EMERGENCY */}

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
          >

            <Text style={styles.cardIcon}>
              🚑
            </Text>

            <Text style={styles.cardTitle}>
              Emergency
            </Text>

            <Text style={styles.cardDescription}>
              Emergency assistance
            </Text>

          </TouchableOpacity>


          {/* SETTINGS */}

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
          >

            <Text style={styles.cardIcon}>
              ⚙️
            </Text>

            <Text style={styles.cardTitle}>
              Settings
            </Text>

            <Text style={styles.cardDescription}>
              Account settings
            </Text>

          </TouchableOpacity>

        </View>


        {/* --------------------------------------------------
            LOGOUT
        -------------------------------------------------- */}

        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >

          <Text style={styles.logoutText}>
            🚪 Logout
          </Text>

        </TouchableOpacity>


      </ScrollView>

    </SafeAreaView>

  );

}


// --------------------------------------------------
// STYLES
// --------------------------------------------------

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#071226",
  },


  loadingContainer: {
    flex: 1,
    backgroundColor: "#071226",
    justifyContent: "center",
    alignItems: "center",
  },


  loadingText: {
    color: "#94A3B8",
    marginTop: 15,
    fontSize: 16,
  },


  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },


  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },


  logo: {
    fontSize: 45,
    marginRight: 12,
  },


  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },


  subtitle: {
    color: "#94A3B8",
    marginTop: 4,
    fontSize: 15,
  },


  // --------------------------------------------------
  // PROFILE
  // --------------------------------------------------

  profileCard: {
    backgroundColor: "#16253B",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,

    boxShadow:
      "0px 8px 20px rgba(0,0,0,0.25)",
  },


  profileIcon: {
    fontSize: 50,
    marginRight: 15,
  },


  profileInfo: {
    flex: 1,
  },


  profileName: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },


  profileRole: {
    color: "#60A5FA",
    marginTop: 4,
    fontSize: 15,
    fontWeight: "600",
  },


  profilePhone: {
    color: "#94A3B8",
    marginTop: 5,
    fontSize: 14,
  },


  // --------------------------------------------------
  // GRID
  // --------------------------------------------------

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },


  card: {
    width: "48%",
    backgroundColor: "#16253B",
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",

    boxShadow:
      "0px 8px 20px rgba(0,0,0,0.25)",
  },


  cardIcon: {
    fontSize: 35,
    marginBottom: 10,
  },


  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },


  cardDescription: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 6,
    textAlign: "center",
  },


  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  logoutButton: {
    backgroundColor: "#DC2626",
    padding: 18,
    borderRadius: 18,
    marginTop: 20,
    marginBottom: 20,
  },


  logoutText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

});