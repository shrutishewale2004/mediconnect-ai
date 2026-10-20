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

import { router } from "expo-router";

import {
  saveMedicine,
  getMedicines,
  updateMedicine,
  deleteMedicine,
} from "./data/medicineStorage";

export default function MedicineReminder() {
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [schedule, setSchedule] = useState("");

  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load medicines
  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    try {
      const data = await getMedicines();
      setMedicines(data);
    } catch (error) {
      console.log("Load medicines error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Ask Chrome for notification permission
  const requestNotificationPermission = async () => {
    if (
      typeof window === "undefined" ||
      !("Notification" in window)
    ) {
      alert(
        "⚠️ Browser notifications are not supported."
      );
      return false;
    }

    if (Notification.permission === "granted") {
      return true;
    }

    if (Notification.permission === "denied") {
      alert(
        "❌ Notifications are blocked in Chrome. Please allow notifications for this site."
      );
      return false;
    }

    const permission =
      await Notification.requestPermission();

    if (permission !== "granted") {
      alert(
        "❌ Notification permission was not granted."
      );
      return false;
    }

    return true;
  };

  // Test browser notification
  const sendTestNotification = async () => {
  if (typeof window === "undefined") {
    alert("❌ This is not running on Web.");
    return;
  }

  if (!("Notification" in window)) {
    alert("❌ This browser does not support notifications.");
    return;
  }

  console.log(
    "Current notification permission:",
    Notification.permission
  );

  if (Notification.permission === "default") {
    const permission =
      await Notification.requestPermission();

    console.log("Permission result:", permission);

    if (permission !== "granted") {
      alert(
        "❌ Notification permission was not granted."
      );
      return;
    }
  }

  if (Notification.permission === "denied") {
    alert(
      "❌ Chrome has blocked notifications for this site. Allow notifications in Chrome site settings."
    );
    return;
  }

  try {
    const notification = new Notification(
      "💊 MediConnect AI",
      {
        body:
          "🔔 Test notification is working successfully!",
      }
    );

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    console.log("✅ Notification created successfully.");

    alert(
      "✅ Notification sent! Check your Chrome notification area."
    );
  } catch (error) {
    console.error(
      "Notification error:",
      error
    );

    alert(
      "❌ Chrome notification failed. Check the browser console."
    );
  }
};

  // Add medicine
  const addMedicine = async () => {
    if (
      medicineName.trim() === "" ||
      dosage.trim() === "" ||
      schedule.trim() === ""
    ) {
      alert("❌ Please fill all fields.");
      return;
    }

    try {
      const medicine = {
        medicineName: medicineName.trim(),
        dosage,
        schedule,
      };

      const savedMedicine =
        await saveMedicine(medicine);

      setMedicines((previous) => [
        ...previous,
        savedMedicine,
      ]);

      await sendTestNotification(
        medicine.medicineName,
        medicine.dosage
      );

      setMedicineName("");
      setDosage("");
      setSchedule("");
    } catch (error) {
      console.log("Save medicine error:", error);

      alert("❌ Failed to save medicine.");
    }
  };

  // Mark as taken
  const markTaken = async (id: string) => {
    try {
      const updated = await updateMedicine(id, {
        status: "Taken",
      });

      setMedicines(updated);

      alert("✅ Medicine marked as taken!");
    } catch (error) {
      alert("❌ Unable to update medicine.");
    }
  };

  // Delete medicine
  const removeMedicine = async (id: string) => {
    try {
      const updated = await deleteMedicine(id);

      setMedicines(updated);

      alert("🗑 Medicine reminder deleted.");
    } catch (error) {
      alert("❌ Unable to delete medicine.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.logo}>💊</Text>

        <Text style={styles.title}>
          Medicine Reminder
        </Text>

        <Text style={styles.subtitle}>
          Never miss your medicine
        </Text>

        <View style={styles.wrapper}>

          {/* LEFT PANEL */}

          <View style={styles.card}>
            <Text style={styles.heading}>
              ➕ Add Medicine
            </Text>

            <Text style={styles.label}>
              Medicine Name
            </Text>

            <TextInput
              placeholder="Example: Paracetamol"
              placeholderTextColor="#94A3B8"
              value={medicineName}
              onChangeText={setMedicineName}
              style={styles.input}
            />

            <Text style={styles.label}>
              Dosage
            </Text>

            <select
              value={dosage}
              onChange={(e) =>
                setDosage(e.target.value)
              }
              style={styles.select}
            >
              <option value="">
                💊 Select Dosage
              </option>

              <option value="1 Tablet">
                1 Tablet
              </option>

              <option value="2 Tablets">
                2 Tablets
              </option>

              <option value="1 Capsule">
                1 Capsule
              </option>

              <option value="2 Capsules">
                2 Capsules
              </option>

              <option value="5 ml Syrup">
                5 ml Syrup
              </option>

              <option value="10 ml Syrup">
                10 ml Syrup
              </option>

              <option value="1 Injection">
                1 Injection
              </option>
            </select>

            <Text style={styles.label}>
              Schedule
            </Text>

            <select
              value={schedule}
              onChange={(e) =>
                setSchedule(e.target.value)
              }
              style={styles.select}
            >
              <option value="">
                🕒 Select Schedule
              </option>

              <option value="Morning">
                Morning 🌅
              </option>

              <option value="Before Breakfast">
                Before Breakfast
              </option>

              <option value="After Breakfast">
                After Breakfast
              </option>

              <option value="Afternoon">
                Afternoon ☀️
              </option>

              <option value="Before Lunch">
                Before Lunch
              </option>

              <option value="After Lunch">
                After Lunch
              </option>

              <option value="Evening">
                Evening 🌆
              </option>

              <option value="Before Dinner">
                Before Dinner
              </option>

              <option value="After Dinner">
                After Dinner
              </option>

              <option value="Night">
                Night 🌙
              </option>
            </select>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={addMedicine}
            >
              <Text style={styles.buttonText}>
                ➕ Add Reminder
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.testButton}
              activeOpacity={0.8}
              onPress={() =>
                sendTestNotification(
                  "Test Medicine",
                  "1 Tablet"
                )
              }
            >
              <Text style={styles.testButtonText}>
                🔔 Test Notification
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={() => router.back()}
            >
              <Text style={styles.backText}>
                ← Back to Dashboard
              </Text>
            </TouchableOpacity>
          </View>

          {/* RIGHT PANEL */}

          <View style={styles.sideBar}>
            <View style={styles.sideHeader}>
              <View>
                <Text style={styles.heading}>
                  📋 Today's Medicines
                </Text>

                <Text style={styles.smallText}>
                  Your saved medicine reminders
                </Text>
              </View>

              <View style={styles.countBadge}>
                <Text style={styles.countText}>
                  {medicines.length}
                </Text>
              </View>
            </View>

            {loading ? (
              <Text style={styles.empty}>
                Loading medicines...
              </Text>
            ) : medicines.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyIcon}>
                  💊
                </Text>

                <Text style={styles.emptyTitle}>
                  No medicines added
                </Text>

                <Text style={styles.empty}>
                  Add your first medicine reminder
                  from the form.
                </Text>
              </View>
            ) : (
              medicines.map((item) => (
                <View
                  key={item.id}
                  style={styles.medicineCard}
                >
                  <View style={styles.medicineHeader}>
                    <View style={styles.medicineIcon}>
                      <Text>💊</Text>
                    </View>

                    <View
                      style={styles.medicineTitleArea}
                    >
                      <Text style={styles.name}>
                        {item.medicineName}
                      </Text>

                      <Text style={styles.info}>
                        📦 {item.dosage}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.scheduleBox}>
                    <Text style={styles.scheduleText}>
                      🕒 {item.schedule}
                    </Text>
                  </View>

                  <View style={styles.statusRow}>
                    <Text
                      style={[
                        styles.status,
                        {
                          color:
                            item.status === "Taken"
                              ? "#22C55E"
                              : "#FACC15",
                        },
                      ]}
                    >
                      {item.status === "Taken"
                        ? "🟢 Taken"
                        : "🟡 Pending"}
                    </Text>
                  </View>

                  {item.status === "Pending" && (
                    <TouchableOpacity
                      style={styles.completeButton}
                      activeOpacity={0.8}
                      onPress={() =>
                        markTaken(item.id)
                      }
                    >
                      <Text
                        style={styles.completeText}
                      >
                        ✓ Mark as Taken
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={styles.deleteButton}
                    activeOpacity={0.8}
                    onPress={() =>
                      removeMedicine(item.id)
                    }
                  >
                    <Text style={styles.deleteText}>
                      🗑 Delete Reminder
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
    padding: 30,
    alignItems: "center",
  },

  logo: {
    fontSize: 80,
    marginTop: 10,
    marginBottom: 8,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
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
    borderRadius: 30,
    padding: 30,
    minHeight: 600,
  },

  sideBar: {
    flex: 1,
    backgroundColor: "#16253B",
    borderRadius: 30,
    padding: 30,
    minHeight: 600,
  },

  heading: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 6,
  },

  label: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 4,
  },

  input: {
    width: "100%",
    height: 60,
    backgroundColor: "#24364F",
    color: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 18,
    marginBottom: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#334155",
    outlineStyle: "none",
  },

  select: {
    width: "100%",
    height: 60,
    backgroundColor: "#24364F",
    color: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#334155",
    paddingHorizontal: 18,
    marginBottom: 18,
    fontSize: 16,
  },

  button: {
    width: "100%",
    height: 60,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  testButton: {
    width: "100%",
    height: 55,
    backgroundColor: "#334155",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  testButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  backButton: {
    marginTop: 20,
    alignItems: "center",
  },

  backText: {
    color: "#60A5FA",
    fontSize: 16,
    fontWeight: "600",
  },

  sideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  smallText: {
    color: "#64748B",
    fontSize: 13,
    marginTop: 3,
  },

  countBadge: {
    minWidth: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
  },

  countText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  medicineCard: {
    backgroundColor: "#24364F",
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#334155",
  },

  medicineHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  medicineIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#16253B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  medicineTitleArea: {
    flex: 1,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 5,
  },

  info: {
    color: "#CBD5E1",
    fontSize: 14,
  },

  scheduleBox: {
    backgroundColor: "#16253B",
    borderRadius: 12,
    padding: 12,
    marginTop: 15,
  },

  scheduleText: {
    color: "#CBD5E1",
    fontSize: 14,
  },

  statusRow: {
    marginTop: 12,
  },

  status: {
    fontSize: 15,
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
    fontSize: 15,
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
    fontSize: 15,
  },

  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 70,
  },

  emptyIcon: {
    fontSize: 50,
    marginBottom: 12,
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  empty: {
    color: "#94A3B8",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});