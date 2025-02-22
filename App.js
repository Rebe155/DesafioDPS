import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import Contact from './Contact';
import contactsData from './contacts.json';

const App = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setContacts(contactsData);
  }, []);

  const addContact = () => {
    if (!name || !lastName || !phone) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const newContact = {
      id: Date.now(),
      name,
      lastName,
      phone,
      isFavorite: false,
    };
    setContacts([...contacts, newContact]);
    setName('');
    setLastName('');
    setPhone('');
    setShowForm(false);
  };

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const toggleFavorite = (id) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === id ? { ...contact, isFavorite: !contact.isFavorite } : contact
    );
    setContacts(updatedContacts.sort((a, b) => b.isFavorite - a.isFavorite));
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Administrador de Contactos</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm(!showForm)}
        >
          <Text style={styles.addButtonText}>+ Agregar Contacto</Text>
        </TouchableOpacity>
      </View>

      {/* Formulario */}
      {showForm && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Nuevo Contacto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
          style={styles.input}
          placeholder="Teléfono"
          value={phone}
          onChangeText={(text) => {
            // Filtra solo números y limita a 8 dígitos
            const numericText = text.replace(/[^0-9]/g, '').slice(0, 8);
            setPhone(numericText);
          }}
          keyboardType="numeric"
          />

          <Button title="Agregar" onPress={addContact} color="#E91E63" />
        </View>
      )}

      {/* Lista de Contactos */}
      <Text style={styles.sectionTitle}>Lista de Contactos</Text>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Contact
            contact={item}
            onDelete={deleteContact}
            onToggleFavorite={toggleFavorite}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF0F5',
    padding: 16,
    paddingTop: 40,
  },
  header: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#E91E63',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
});
export default App;
