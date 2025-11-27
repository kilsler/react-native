import { useLocalSearchParams } from 'expo-router';
import EditTodoPage from '../../pages/EditTodoPage';

export default function EditTodoRoute() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return <EditTodoPage id={id} />;
}
