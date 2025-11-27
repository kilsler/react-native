import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

interface EditTodoPageProps {
    id: string;
}

export default function EditTodoPage({ id }: EditTodoPageProps) {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Edit Todo ID: {id}</Text>

            <Button
                title="Back to Todos"
                onPress={() => router.push('/protected/tabs/todo')}
            />
        </View>
    );
}
