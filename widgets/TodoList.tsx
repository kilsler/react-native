import TodoItem from "@/shared/api/ui/TodoItem";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from "react-native";
interface Todo {
    id: number;
    title: string;
    completed: number;
    category: string;
    due_date: string;
}

export default function TodoList() {
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

            setTodos(json.data);
        } catch (err) {
            setError("Error loading todos");
        }
        setLoading(false);
    };

    useFocusEffect(() => {
        fetchTodos();
    });

    const toggleTodo = async (id: number) => {
        try {
            const token = await SecureStore.getItemAsync("token");
            const res = await fetch(`${api_url}/api/todo/${id}/toggle`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to toggle todo");

            setTodos(todos.map(t => t.id === id ? { ...t, completed: t.completed ? 0 : 1 } : t));
        } catch (err) {
            Alert.alert("Error", "Error toggling todo");
        }
    };

    const deleteTodo = async (id: number) => {
        Alert.alert(
            "Delete Todo",
            "Are you sure you want to delete this todo?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const token = await SecureStore.getItemAsync("token");
                            const res = await fetch(`${api_url}/api/todo/${id}`, {
                                method: "DELETE",
                                headers: { Authorization: `Bearer ${token}` },
                            });
                            if (!res.ok) throw new Error("Failed to delete todo");

                            setTodos(todos.filter(t => t.id !== id));
                        } catch (err) {
                            Alert.alert("Error", "Error deleting todo");
                        }
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
                <Text>Loading todos...</Text>
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
