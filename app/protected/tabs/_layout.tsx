import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: true }}>
            <Tabs.Screen
                name="todo"
                options={{
                    title: 'Todo',
                    tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="new-todo"
                options={{
                    title: 'New Todo',
                    tabBarIcon: ({ color, size }) => <Ionicons name="add" color={color} size={size} />,
                }}
            />
        </Tabs>
    );
}
