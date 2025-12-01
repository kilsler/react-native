import TodoItem from "@/shared/api/ui/TodoItem";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
interface Todo {
    id: number;
    title: string;
    completed: number;
    category: string;
    due_date: string;
}

export default function TodoListPage() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const api_url = process.env.EXPO_PUBLIC_API_URL;

    const fetchTodos = async () => {
        try {
            const token = await SecureStore.getItemAsync("token");

            const res = await fetch(`${api_url}/api/todo`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.message);

            setTodos(json.data.data);
        } catch (err) {
            setError("Error loading todos");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={{ color: "red" }}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TodoItem item={item} />
                )}
                contentContainerStyle={{ padding: 15 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
