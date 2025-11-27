import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function RegisterPage() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Register Page</Text>
            <Button title="Back to Login" onPress={() => router.back()} />
        </View>
    );
}
