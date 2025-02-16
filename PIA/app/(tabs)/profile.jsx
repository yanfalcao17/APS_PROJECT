import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { logoutAction, fetchUserProfile } from "../(redux)/authSlice";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserProfile()); // Busca os dados ao carregar a tela
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutAction());
    router.push("/auth/login");
  };

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Text style={styles.title}>User Profile</Text>
        {status === "loading" ? (
          <ActivityIndicator size="large" color="#6200ea" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : user ? (
          <>
            <Text style={styles.text}>Email: {user.email}</Text>
            <Text style={styles.text}>Nome: {user.name}</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.text}>No user logged in</Text>
        )}
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginBottom: 16,
  },
});
