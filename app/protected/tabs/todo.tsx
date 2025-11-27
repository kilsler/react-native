import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function TodoPage() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Todo Page</Text>
            <Button title="Create New Todo" onPress={() => router.push('/protected/tabs/new-todo')} />
            <Button title="Edit Todo 1" onPress={() => router.push('/protected/1')} />
        </View>
    );
}
