import { Alert, Platform } from 'react-native';
import { BLEService } from '../ble/BleManager';

export const handleScan = async () => {
  console.log('Verificando Bluetooth...');

  if (Platform.OS === 'android') {
    try {
      await BLEService.manager.enable();
      console.log('Bluetooth habilitado');
    } catch (error) {
      console.error('No se pudo habilitar Bluetooth automáticamente:', error);
      Alert.alert('Error', 'No se pudo habilitar Bluetooth. Actívalo manualmente en Configuración.');
      return;
    }
  }

  BLEService.manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.error('Error al escanear:', error);
      Alert.alert('Error', 'Falló el escaneo de dispositivos.');
      return;
    }

    if (device) {
      console.log(`Dispositivo encontrado: ${device.name || 'Sin nombre'} - ${device.id}`);
    }
  });

  // Detener escaneo automáticamente después de 10 segundos
  setTimeout(() => {
    BLEService.manager.stopDeviceScan();
    console.log('Escaneo detenido automáticamente');
  }, 10000);
};