import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function NewTodoPage() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Create New Todo</Text>
            <Button title="Back to Todos" onPress={() => router.back()} />
        </View>
    );
}
