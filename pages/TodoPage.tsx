import TodoList from "@/widgets/TodoList";
import { StyleSheet, View } from "react-native";
interface Todo {
    id: number;
    title: string;
    completed: number;
    category: string;
    due_date: string;
}

export default function TodoPage() {

    return (
        <View style={styles.container}>
            <TodoList />
        </View>


    );

}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
