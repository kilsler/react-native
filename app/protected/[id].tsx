import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function EditTodoPage() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Edit Todo ID: {id}</Text>
            <Button title="Back to Todos" onPress={() => router.push('/protected/tabs/todo')} />
        </View>
    );
}
