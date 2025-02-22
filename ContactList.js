// ContactList.js
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Contact from './Contact';

const ContactList = ({ contacts, onDelete, onToggleFavorite }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Contact
            contact={item}
            onDelete={onDelete}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default ContactList;