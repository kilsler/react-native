import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Button } from 'react-native';

export default function LogoutButton() {
    const logout = async () => {
        await SecureStore.deleteItemAsync('token');
        router.replace('/login');
    };

    return <Button title="Logout" onPress={logout} />;
}