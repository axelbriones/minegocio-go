import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { processSyncQueue } from './index';

export const useSyncEngine = () => {
    const netInfo = useNetInfo();

    useEffect(() => {
        if (netInfo.isConnected && netInfo.isInternetReachable) {
            console.log("Network connected, triggering background sync...");
            processSyncQueue();
        }
    }, [netInfo.isConnected, netInfo.isInternetReachable]);
};
