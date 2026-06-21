import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { getPendingSyncItems } from '../../sync';
import { Cloud, CloudOff, CloudSync, AlertCircle } from 'lucide-react-native';

export const SyncIndicator = () => {
    const netInfo = useNetInfo();
    const [pendingCount, setPendingCount] = useState(0);
    const [syncing, setSyncing] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const checkQueue = async () => {
            try {
                const items = await getPendingSyncItems();
                setPendingCount(items.length);
                const hasErrors = items.some(i => i.status === 'ERROR');
                setError(hasErrors);
            } catch (e) {
                console.error(e);
            }
        };

        checkQueue();
        const interval = setInterval(checkQueue, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!netInfo.isConnected) {
        return (
            <View style={[styles.container, styles.offline]}>
                <CloudOff color="#fff" size={16} />
                <Text style={styles.text}>Sin conexión</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.error]}>
                <AlertCircle color="#fff" size={16} />
                <Text style={styles.text}>Error de sincronización</Text>
            </View>
        );
    }

    if (pendingCount > 0) {
        return (
            <View style={[styles.container, styles.pending]}>
                <CloudSync color="#fff" size={16} />
                <Text style={styles.text}>{pendingCount} pendientes</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, styles.synced]}>
            <Cloud color="#fff" size={16} />
            <Text style={styles.text}>Sincronizado</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    text: {
        color: '#fff',
        marginLeft: 6,
        fontSize: 12,
        fontWeight: 'bold',
    },
    offline: {
        backgroundColor: '#6b7280',
    },
    synced: {
        backgroundColor: '#10b981',
    },
    pending: {
        backgroundColor: '#f59e0b',
    },
    error: {
        backgroundColor: '#ef4444',
    }
});
