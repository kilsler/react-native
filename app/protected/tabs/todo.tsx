import { useRouter } from 'expo-router';
import TodoPage from "../../../pages/TodoPage";

export default function Todo() {
    const router = useRouter();

    return (
        <TodoPage />

    );
}


