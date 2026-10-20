import AsyncStorage from "@react-native-async-storage/async-storage";

const MEDICINE_KEY = "medicines";

export const saveMedicine = async (medicine: any) => {
  try {
    const data = await AsyncStorage.getItem(MEDICINE_KEY);

    const medicines = data ? JSON.parse(data) : [];

    const newMedicine = {
      ...medicine,
      id: Date.now().toString(),
      status: "Pending",
    };

    medicines.push(newMedicine);

    await AsyncStorage.setItem(
      MEDICINE_KEY,
      JSON.stringify(medicines)
    );

    return newMedicine;
  } catch (error) {
    console.log("Save medicine error:", error);
    throw error;
  }
};

export const getMedicines = async () => {
  try {
    const data = await AsyncStorage.getItem(MEDICINE_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Get medicines error:", error);
    return [];
  }
};

export const updateMedicine = async (
  id: string,
  updates: any
) => {
  try {
    const medicines = await getMedicines();

    const updatedMedicines = medicines.map(
      (medicine: any) =>
        medicine.id === id
          ? {
              ...medicine,
              ...updates,
            }
          : medicine
    );

    await AsyncStorage.setItem(
      MEDICINE_KEY,
      JSON.stringify(updatedMedicines)
    );

    return updatedMedicines;
  } catch (error) {
    console.log("Update medicine error:", error);
    throw error;
  }
};

export const deleteMedicine = async (id: string) => {
  try {
    const medicines = await getMedicines();

    const updatedMedicines = medicines.filter(
      (medicine: any) => medicine.id !== id
    );

    await AsyncStorage.setItem(
      MEDICINE_KEY,
      JSON.stringify(updatedMedicines)
    );

    return updatedMedicines;
  } catch (error) {
    console.log("Delete medicine error:", error);
    throw error;
  }
};