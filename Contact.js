import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Contact = React.memo(({ contact, onDelete, onToggleFavorite }) => {
  return (
    <View style={styles.contactContainer}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>
          {contact.name} {contact.lastName}
        </Text>
        <View style={styles.phoneContainer}>
          <Icon name="check" size={16} color="#E91E63" />
          <Text style={styles.contactPhone}>
            {contact.phone ? contact.phone : 'Sin teléfono'}
          </Text>
        </View>
      </View>
      <View style={styles.contactActions}>
        {/* Botón para marcar/desmarcar como favorito */}
        <TouchableOpacity
          style={styles.buttonWithIcon}
          onPress={() => onToggleFavorite(contact.id)}
        >
          <View style={styles.iconButtonContainer}>
            <Icon
              name={contact.isFavorite ? 'star' : 'star-border'}
              size={20}
              color={contact.isFavorite ? '#FF4081' : '#E91E63'}
            />
            <Text style={styles.buttonText}>
              {contact.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Botón para eliminar el contacto */}
        <TouchableOpacity
          style={styles.buttonWithIcon}
          onPress={() => onDelete(contact.id)}
        >
          <View style={styles.iconButtonContainer}>
            <Icon name="delete" size={20} color="#E91E63" />
            <Text style={[styles.buttonText, { color: '#E91E63' }]}>Eliminar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  contactContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfo: {
    marginBottom: 12,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  contactPhone: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  contactActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 12,
  },
  buttonWithIcon: {
    marginLeft: 16,
    padding: 8,
  },
  iconButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#000',
  },
});

export default Contact;
