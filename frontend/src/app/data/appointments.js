import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveAppointment = async (appointment) => {
  const data = await AsyncStorage.getItem("appointments");

  const appointments = data ? JSON.parse(data) : [];

  appointments.push({
    ...appointment,
    status: "Pending",
  });

  await AsyncStorage.setItem(
    "appointments",
    JSON.stringify(appointments)
  );
};

export const getAppointments = async () => {
  const data = await AsyncStorage.getItem("appointments");

  return data ? JSON.parse(data) : [];
};

export const updateAppointments = async (appointments) => {
  await AsyncStorage.setItem(
    "appointments",
    JSON.stringify(appointments)
  );
};