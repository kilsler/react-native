import api from '@/shared/api/api';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function RegisterPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            await api.post('/auth/register', form);
            router.push('/login');
        } catch (err) {
            setError('Registration failed');
        }
    };


    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Email"
                value={form.email}
                onChangeText={(v) => setForm({ ...form, email: v })}
                style={{ borderWidth: 1, marginBottom: 10 }}
            />
            <TextInput
                placeholder="Password"
                value={form.password}
                onChangeText={(v) => setForm({ ...form, password: v })}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 10 }}
            />

            <Button title="Login" onPress={handleRegister} />

            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        </View>
    );
}
