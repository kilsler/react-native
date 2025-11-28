import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function TodoItem({ item, onPress }: any) {
    return (
        <TouchableOpacity onPress={() => onPress(item)} style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>Category: {item.category}</Text>
            <Text style={styles.date}>
                Due: {new Date(item.due_date).toLocaleDateString()}
            </Text>
            <Text style={styles.completed}>
                Completed: {item.completed ? "✔ Yes" : "✘ No"}
            </Text>
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
});
