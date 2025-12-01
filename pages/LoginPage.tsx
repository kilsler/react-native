import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const api_url = process.env.EXPO_PUBLIC_API_URL;

    const login = async () => {
        try {
            const res = await fetch(`${api_url}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Login failed');

            await SecureStore.setItemAsync('token', data.token);

            router.replace('/protected/tabs/todo');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.title}>Login</Text>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    value={form.email}
                    onChangeText={(v) => setForm({ ...form, email: v })}
                />

                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                    value={form.password}
                    onChangeText={(v) => setForm({ ...form, password: v })}
                />

                <Button title="Login" onPress={login} />

                <View style={{ height: 20 }} />

                <Button
                    title="Go to Register"
                    onPress={() => router.push('/register')}
                    color="#555"

                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    box: {
        width: '100%',
        maxWidth: 350,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
    },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },
    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
});
