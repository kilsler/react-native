import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";

interface Profile {
    username: string;
    email: string;
    created_at: string;
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProfile = async () => {
        try {
            const token = await SecureStore.getItemAsync("token");
            if (!token) throw new Error("No token found");

            const res = await fetch("http://192.168.0.107:3000/api/auth/profile", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.message || "Failed to fetch profile");

            setProfile(json.data);
        } catch (err: any) {
            setError(err.message || "Error loading profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const logout = async () => {
        await SecureStore.deleteItemAsync("token");
        router.replace("/login");
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading profile...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={{ color: "red" }}>{error}</Text>
            </View>
        );
    }

    if (!profile) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            <Text style={styles.label}>Username:</Text>
            <Text style={styles.value}>{profile.username}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{profile.email}</Text>

            <Text style={styles.label}>Created At:</Text>
            <Text style={styles.value}>
                {new Date(profile.created_at).toLocaleDateString()}
            </Text>

            <View style={{ height: 20 }} />

            <Button title="Logout" onPress={logout} color="#d9534f" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
    label: { fontSize: 16, fontWeight: "600", marginTop: 10 },
    value: { fontSize: 16, color: "#333" },
});
