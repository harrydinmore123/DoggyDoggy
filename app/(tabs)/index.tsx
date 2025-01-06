import React, { useState, useRef } from 'react';
import { Button, Text, View, StyleSheet, Dimensions, TextInput, FlatList, TouchableOpacity, Modal, Animated, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState([
    { id: '1', name: 'Client 1' },
    { id: '2', name: 'Client 2' },
    { id: '3', name: 'Client 3' },
    { id: '4', name: 'Client 4' },
    { id: '5', name: 'Client 5' },
    { id: '6', name: 'Client 6' },
    { id: '7', name: 'Client 7' },
    { id: '8', name: 'Client 8' },
    { id: '9', name: 'Client 9' },
    { id: '10', name: 'Client 10' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
  };

  const handleAddClient = () => {
    navigation.navigate('ClientDetailsScreen', { createMode: true });
  };

  const handleNewAppointment = () => {
    setIsModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    navigation.navigate('Home');
  };

  const handleNext = () => {
    setIsModalVisible(false);
    navigation.navigate('AddBookingScreen', { date: selectedDate.toISOString().split('T')[0], fromHome: true });
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (event: any, date: Date) => {
    const selected = date || selectedDate;
    setSelectedDate(selected);
    hideDatePicker();
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Text style={styles.menuButtonText}></Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button title="New Appointment" onPress={handleNewAppointment} />
        <Button title="New Client" onPress={handleAddClient} />
      </View>
      <Calendar
        style={styles.calendar}
        onDayPress={(day: { dateString: any; }) => {
          navigation.navigate('DayScreen', { date: day.dateString });
        }}
        markedDates={{
          '2023-10-16': { selected: true, marked: true, selectedColor: 'blue' },
          '2023-10-17': { marked: true },
          '2023-10-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
          '2023-10-19': { disabled: true, disableTouchEvent: true },
        }}
      />
      <View style={styles.searchListContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search clients..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Button title="Enter" onPress={handleSearch} />
        </View>
        <FlatList
          data={clients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ClientDetailsScreen', { clientId: item.id })}>
              <View style={styles.clientItem}>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {isModalVisible && (
        <View style={styles.modalBackground}>
          <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
            <Text style={styles.modalTitle}>Select Appointment Date</Text>
            {Platform.OS === 'web' ? (
              // <DatePicker
              //   selected={selectedDate}
              //   onChange={(date: React.SetStateAction<Date>) => date && setSelectedDate(date)}
              // />
              <input>hi</input>
            ) : (
              <>
                <Button title="Show Date Picker" onPress={showDatePicker} />
                {/* {isDatePickerVisible && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleConfirm}
                  />
                )} */}
              </>
            )}
            <View style={styles.modalButtonContainer}>
              <Button title="Cancel" onPress={handleCancel} />
              <Button title="Next" onPress={handleNext} />
            </View>
          </Animated.View>
        </View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  calendar: {
    width: Dimensions.get('window').width - 32,
    marginBottom: 16,
  },
  searchListContainer: {
    flex: 1,
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
  },
  clientItem: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1,
  },
  menuButtonText: {
    fontSize: 24,
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default HomeScreen;