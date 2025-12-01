import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const categories = [
    { id: 1, label: "Работа" },
    { id: 2, label: "Учёба" },
    { id: 3, label: "Личное" },
    { id: 4, label: "Покупки" },
];

export default function CategoryRadio({
    selected,
    onSelect,
}: {
    selected: number | null;
    onSelect: (id: number) => void;
}) {
    return (
        <View>
            <Text style={{ marginBottom: 5 }}>Category</Text>
            {categories.map((cat) => (
                <TouchableOpacity
                    key={cat.id}
                    style={styles.radioContainer}
                    onPress={() => onSelect(cat.id)}
                >
                    <View style={styles.outerCircle}>
                        {selected === cat.id && <View style={styles.innerCircle} />}
                    </View>
                    <Text style={styles.label}>{cat.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    outerCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#555",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },
    innerCircle: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: "#555",
    },
    label: { fontSize: 16 },
});
