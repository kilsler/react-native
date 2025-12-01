import CategoryRadio from "@/components/ui/CategoryRadio"; // вставь компонент радио из предыдущего примера
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Alert, Button, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

interface TodoForm {
    title: string;
    category_id: number | null;
    due_date: string;
    completed?: boolean;
}

export default function CreateTodoPage() {
    const api_url = process.env.EXPO_PUBLIC_API_URL;
    const [form, setForm] = useState<TodoForm>({
        title: "",
        category_id: null,
        due_date: "",
        completed: false,
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const validate = () => {
        const temp: any = {};

        if (!form.title.trim()) temp.title = "Title is required";
        else if (form.title.length > 255) temp.title = "Title cannot exceed 255 chars";

        if (!form.category_id) temp.category_id = "Category is required";

        if (!form.due_date) temp.due_date = "Due date is required";
        else if (isNaN(Date.parse(form.due_date)))
            temp.due_date = "Due date must be a valid date (YYYY-MM-DD)";

        setErrors(temp);
        return Object.keys(temp).length === 0;
    };


    const onChangeDate = (event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === "ios");
        if (selectedDate) {
            setDueDate(selectedDate);
            setForm({ ...form, due_date: selectedDate.toISOString().split("T")[0] });
        }
    };

    const createTodo = async () => {
        if (!validate()) return;

        try {
            const token = await SecureStore.getItemAsync("token");
            if (!token) throw new Error("No token found");

            const res = await fetch(`${api_url}api/todo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: form.title,
                    category_id: form.category_id,
                    due_date: form.due_date,
                    completed: form.completed,
                }),
            });

            const json = await res.json();
            if (!res.ok) throw new Error(json.message || "Failed to create todo");

            Alert.alert("Success", "Todo created successfully");
            router.replace("/protected/tabs/todo");
        } catch (err: any) {
            Alert.alert("Error", err.message || "Something went wrong");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create New Todo</Text>

            <TextInput
                style={styles.input}
                placeholder="Title"
                value={form.title}
                onChangeText={(v) => setForm({ ...form, title: v })}
            />
            {errors.title && <Text style={styles.error}>{errors.title}</Text>}

            <CategoryRadio
                selected={form.category_id}
                onSelect={(id) => setForm({ ...form, category_id: id })}
            />
            {errors.category_id && <Text style={styles.error}>{errors.category_id}</Text>}

            <Button
                title={dueDate ? dueDate.toDateString() : "Select Due Date"}
                onPress={() => setShowDatePicker(true)}
            />

            {showDatePicker && (
                <DateTimePicker
                    value={dueDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}

            {errors.due_date && <Text style={styles.error}>{errors.due_date}</Text>}

            <View style={{ height: 20 }} />

            <Button title="Create Todo" onPress={createTodo} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f5f5f5",
        flexGrow: 1,
    },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    error: { color: "red", marginBottom: 5 },
});
