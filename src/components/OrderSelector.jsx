import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';

const OrderSelector = ({ orderBy, orderDirection, setOrderBy, setOrderDirection }) => {
   const styles = StyleSheet.create({
      container: {
         height: 50,
         backgroundColor:"f1f1f1", 
      }
   })
   return (
      <Picker
         style={styles.container}
         selectedValue={`${orderBy}-${orderDirection}`}
         onValueChange={(itemValue) => {
            const [newOrderBy, newOrderDirection] = itemValue.split('-');
            setOrderBy(newOrderBy);
            setOrderDirection(newOrderDirection);
         }}
         mode='dropdown'
      >
         <Picker.Item label="Latest repositories" value="CREATED_AT-DESC" />
         <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE-DESC" />
         <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE-ASC" />
      </Picker>
   );
};

export default OrderSelector;