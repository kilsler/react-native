import { router } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function RegisterPage() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [success, setSuccess] = useState<string>("");
    const api_url = process.env.EXPO_PUBLIC_API_URL;

    const validate = () => {
        let temp: any = {};

        if (!form.username.trim()) temp.username = "Username is required";
        else if (form.username.length < 2) temp.username = "Username must be at least 2 characters";
        else if (form.username.length > 50) temp.username = "Username cannot exceed 50 characters";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) temp.email = "Invalid email";

        if (form.password.length < 6) temp.password = "Password must be at least 6 characters";
        else if (!/\d/.test(form.password)) temp.password = "Password must include at least one number";
        else if (!/[A-Z]/.test(form.password)) temp.password = "Password must have at least one uppercase letter";

        setErrors(temp);
        return Object.keys(temp).length === 0;
    };

    const register = async () => {
        setSuccess("");
        if (!validate()) return;

        try {
            const res = await fetch(`${api_url}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrors({ general: data.message || "Registration failed" });
                return;
            }

            setErrors({});
            setSuccess("User registered successfully!");
        } catch (err: any) {
            setErrors({ general: err.message });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Create Account</Text>

                {errors.general && <Text style={styles.error}>{errors.general}</Text>}
                {success && <Text style={styles.success}>{success}</Text>}

                {!success && (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={form.username}
                            onChangeText={(v) => setForm({ ...form, username: v })}
                        />
                        {errors.username && <Text style={styles.error}>{errors.username}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={form.email}
                            onChangeText={(v) => setForm({ ...form, email: v })}
                            autoCapitalize="none"
                        />
                        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={form.password}
                            onChangeText={(v) => setForm({ ...form, password: v })}
                        />
                        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

                        <Button title="Register" onPress={register} />
                    </>
                )}

                <View style={{ height: 15 }} />

                <Button
                    title="Go to Login"
                    onPress={() => router.replace("/login")}
                    color="#555"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
    box: {
        width: "100%",
        maxWidth: 350,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 3,
    },
    title: { fontSize: 26, marginBottom: 20, fontWeight: "bold", textAlign: "center" },
    input: {
        borderWidth: 1, borderColor: "#ccc", padding: 10,
        borderRadius: 8, marginBottom: 8,
    },
    error: { color: "red", marginBottom: 5 },
    success: { color: "green", marginBottom: 10, fontSize: 16, fontWeight: "600" },
});
