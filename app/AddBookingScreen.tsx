import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Platform, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
// import { RootStackParamList } from '../App'; // Adjust the import path as needed
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Checkbox from 'expo-checkbox';
// import { Booking } from '../interfaces/types';
// import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

/* type AddBookingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddBooking'>;
type AddBookingScreenRouteProp = RouteProp<RootStackParamList, 'AddBooking'>; */

// type Props = {
//   navigation: AddBookingScreenNavigationProp;
//   route: AddBookingScreenRouteProp;
// };

type Booking = {
  id: string;
  client: string;
  date: string;
  service: string;
  jobInfo: string;
  price: string;
  consentForm: string | null;
  selectedDate: Date;
  selectedTime: Date;
  selectedServices: string[];
  dogInfo: { type: string; name: string };
};

const AddBookingScreen = () => {
  const date = "06/03/1995";
  // const { date, fromHome, booking } = route.params;
  // const [isEditMode, setIsEditMode] = useState(!booking);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking>({
    id: '',
    client: '',
    date: date,
    service: '',
    jobInfo: '',
    price: '',
    consentForm: null,
    selectedDate: new Date(date),
    selectedTime: new Date(),
    selectedServices: [],
    dogInfo: { type: '', name: '' },
  });

  const dummyClients = [
    { name: 'Client 1', dogType: 'Bulldog', dogName: 'Buddy' },
    { name: 'Client 2', dogType: 'Labrador', dogName: 'Max' },
    { name: 'Client 3', dogType: 'Poodle', dogName: 'Bella' },
  ];
  const dummyServices = ['Service 1', 'Service 2', 'Service 3', 'Service 4', 'Service 5'];

  const handleDateChange = (selectedDate: Date) => {
    if (currentBooking) {
      setCurrentBooking({ ...currentBooking, selectedDate });
    }
    setShowDatePicker(false);
  };

  const handleTimeChange = (selectedTime: Date) => {
    if (currentBooking) {
      setCurrentBooking({ ...currentBooking, selectedTime });
    }
    setShowTimePicker(false);
  };

  const pickImage = async () => {
    // if (isEditMode) {
    //   let result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.All,
    //     allowsEditing: true,
    //     aspect: [4, 3],
    //     quality: 1,
    //   });

    //   if (!result.canceled) {
    //     if (result.assets && result.assets.length > 0) {
    //       console.log(result.assets[0].uri);
    //     }
    //   }
    // }
  };

  const handleSaveBooking = () => {
    console.log('Booking saved', currentBooking);
    // Implement save functionality here
  };

  const handleServiceChange = (service: string) => {
    if (currentBooking) {
      let updatedServices = [...currentBooking.selectedServices];
      if (updatedServices.includes(service)) {
        updatedServices = updatedServices.filter(s => s !== service);
        setCurrentBooking({ ...currentBooking, jobInfo: currentBooking.jobInfo.replace(service, '').trim(), selectedServices: updatedServices });
      } else {
        updatedServices.push(service);
        setCurrentBooking({ ...currentBooking, jobInfo: currentBooking.jobInfo ? `${currentBooking.jobInfo}, ${service}` : service, selectedServices: updatedServices });
      }
    }
  };

  const handleClientChange = (itemValue: string) => {
    const selectedClient = dummyClients.find(c => c.name === itemValue);
    if (selectedClient && currentBooking) {
      setCurrentBooking({ ...currentBooking, client: itemValue, dogInfo: { type: selectedClient.dogType, name: selectedClient.dogName } });
    } else if (currentBooking) {
      setCurrentBooking({ ...currentBooking, client: itemValue, dogInfo: { type: '', name: '' } });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {!isEditMode ? (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditMode(true)}>
            <Ionicons name="create-outline" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditMode(false)}>
            <Ionicons name="close-outline" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={currentBooking?.client}
        onChangeText={(text) => setCurrentBooking({ ...currentBooking, client: text })}
        editable={isEditMode}
      />
      <TouchableOpacity onPress={() => isEditMode && setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={currentBooking?.selectedDate.toDateString()}
          editable={false}
        />
      </TouchableOpacity>
      {/* <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleDateChange}
        onCancel={() => setShowDatePicker(false)}
      /> */}
      <TouchableOpacity onPress={() => isEditMode && setShowTimePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Time"
          value={currentBooking?.selectedTime.toLocaleTimeString()}
          editable={false}
        />
      </TouchableOpacity>
      {/* <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={handleTimeChange}
        onCancel={() => setShowTimePicker(false)}
      /> */}
      <View style={styles.serviceContainer}>
        <View style={styles.serviceCheckboxes}>
          {dummyServices.map((service, index) => (
            <View key={index} style={styles.checkboxContainer}>
              <Checkbox
                value={currentBooking?.selectedServices.includes(service)}
                onValueChange={() => handleServiceChange(service)}
              />
              <Text style={styles.label}>{service}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Job Info"
        value={currentBooking?.jobInfo}
        onChangeText={(text) => setCurrentBooking({ ...currentBooking, jobInfo: text })}
        multiline={true}
        numberOfLines={4}
        editable={isEditMode}
      />
      <View style={styles.clientContainer}>
        {/* <Picker
          selectedValue={currentBooking?.client}
          style={styles.picker}
          onValueChange={handleClientChange}
          enabled={isEditMode}
        >
          {dummyClients.map((client, index) => (
            <Picker.Item key={index} label={client.name} value={client.name} />
          ))}
        </Picker> */}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {currentBooking?.client && (
        <TextInput
          style={styles.input}
          placeholder="Dog Info"
          value={`${currentBooking.dogInfo.name} - ${currentBooking.dogInfo.type}`}
          editable={false}
        />
      )}
      <View style={styles.priceContainer}>
        <Text style={styles.currencySymbol}>£</Text>
        <TextInput
          style={[styles.input, styles.priceInput]}
          placeholder="Price"
          value={currentBooking?.price}
          onChangeText={(text) => setCurrentBooking({ ...currentBooking, price: text })}
          keyboardType="numeric"
          editable={isEditMode}
        />
      </View>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.uploadButton}>Upload Consent Form</Text>
      </TouchableOpacity>
      {currentBooking?.consentForm && <Image source={{ uri: currentBooking.consentForm }} style={styles.image} />}
      {isEditMode && (
        <Button title="Save Booking" onPress={handleSaveBooking} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  serviceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceCheckboxes: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxHeight: 150,
    overflow: 'scroll',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%', // Adjust this to fit two checkboxes per row
    marginBottom: 8,
  },
  label: {
    margin: 8,
  },
  clientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  addButton: {
    marginLeft: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  currencySymbol: {
    fontSize: 18,
    marginRight: 4,
  },
  priceInput: {
    flex: 1,
  },
  uploadButton: {
    color: 'blue',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  editButton: {
    marginBottom: 16,
  },
});

export default AddBookingScreen;