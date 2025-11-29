import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TodoItem({ item, toggleTodo, deleteTodo }: any) {
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>Category: {item.category}</Text>
            <Text style={styles.date}>
                Due: {new Date(item.due_date).toLocaleDateString()}
            </Text>
            <Text style={styles.completed}>
                Completed: {item.completed ? "✔ Yes" : "✘ No"}
            </Text>

            <View style={styles.buttonRow}>
                <TouchableOpacity
                    onPress={() => toggleTodo(item.id)}
                    style={[
                        styles.button,
                        { backgroundColor: "#fdd835" }
                    ]}
                >
                    <Ionicons name="pencil" size={20} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteTodo(item.id)} style={[styles.button, { backgroundColor: "#e53935" }]}>
                    <Ionicons name="trash" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 3,
    },
    title: { fontSize: 18, fontWeight: "bold" },
    category: { marginTop: 4, color: "#555" },
    date: { marginTop: 4 },
    completed: { marginTop: 4, fontWeight: "600" },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    button: {
        flex: 1,
        padding: 8,
        borderRadius: 6,
        alignItems: "center",
        marginHorizontal: 4,
    },
});
