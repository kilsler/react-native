import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function LoginPage() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login Page</Text>
            <Button title="Go to Register" onPress={() => router.push('/register')} />
            <Button title="Go to Protected (Todo)" onPress={() => router.replace('/protected/tabs/todo')} />
        </View>
    );
}
