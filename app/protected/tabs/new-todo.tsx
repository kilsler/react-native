import { useRouter } from 'expo-router';
import CreateTodoPage from "../../../pages/CreateTodoPage";

export default function NewTodoPage() {
    const router = useRouter();

    return (
        <CreateTodoPage />
    );
}
