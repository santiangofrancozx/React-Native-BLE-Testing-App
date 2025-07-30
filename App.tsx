import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View, Alert, Platform } from 'react-native';
import { requestBluetoothPermission } from './ble/BlePermissionManager';
import { handleScan } from './ble/HandleScanBLE';

export default function App() {
  useEffect(() => {
    const checkPermissions = async () => {
      const granted = await requestBluetoothPermission();
      if (!granted) {
        Alert.alert(
          'Permisos requeridos',
          'Esta app necesita permisos de Bluetooth para funcionar correctamente.'
        );
      }
    };

    checkPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dispositivos BLE</Text>
      <Button title="Escanear Dispositivos" onPress={handleScan} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});