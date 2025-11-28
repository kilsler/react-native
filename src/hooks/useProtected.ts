import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export function useProtected() {
    const [allowed, setAllowed] = useState<boolean | null>(null);

    useEffect(() => {
        const check = async () => {
            const token = await SecureStore.getItemAsync('token');

            if (!token) {
                router.replace('/login');
                setAllowed(false);
                return;
            }

            setAllowed(true);
        };

        check();
    }, []);

    return { allowed };
}
