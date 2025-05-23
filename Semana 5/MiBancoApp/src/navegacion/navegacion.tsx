import React from 'react'; 
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { NavigationContainer } from '@react-navigation/native'; 

import Inicio from '../pantallas/inicio'; 
import Transferencias from '../pantallas/transferencia'; 
import Historial from '../pantallas/historial'; 

const Tab = createBottomTabNavigator(); 

const Navegacion = () => { 
return ( 
<NavigationContainer> 
<Tab.Navigator> 
<Tab.Screen name="Inicio" component={Inicio} /> 
<Tab.Screen name="Transferencias" component={Transferencias} /> 
<Tab.Screen name="Historial" component={Historial} /> 
</Tab.Navigator> 
</NavigationContainer> 
); 
}; 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
});

export default Navegacion; 