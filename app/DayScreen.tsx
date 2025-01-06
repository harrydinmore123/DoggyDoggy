import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../App'; // Adjust the import path as needed
// import { Booking } from '../interfaces/types';

// type DayScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Day'>;
// type DayScreenRouteProp = RouteProp<RootStackParamList, 'Day'>;

// type Props = {
//   navigation: DayScreenNavigationProp;
//   route: DayScreenRouteProp;
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

const DayScreen = () => {
  // const { date } = route.params;
  const date = Date.now();
  const navigation = useNavigation<NavigationProp<any>>();
  // useEffect(() => {
  //   navigation.getParent()?.setOptions({
  //     headerShown: false,
  //   });

  //   return () => {
  //     navigation.getParent()?.setOptions({
  //       headerShown: true,
  //     });
  //   };
  // }, [navigation]);

  const [bookings, setBookings] = useState<Booking[]>([
    { id: '1', client: 'John Doe', date: '2024-12-10', service: 'Full Grooming', jobInfo: '', price: '', consentForm: null, selectedDate: new Date('2024-12-10'), selectedTime: new Date(), selectedServices: [], dogInfo: { type: '', name: '' } },
    { id: '2', client: 'Jane Smith', date: '2024-12-15', service: 'Nail Trim', jobInfo: '', price: '', consentForm: null, selectedDate: new Date('2024-12-15'), selectedTime: new Date(), selectedServices: [], dogInfo: { type: '', name: '' } },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookings for {date}</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('AddBookingScreen', { date: item.date, fromHome: false, booking: item })}>
            <View style={styles.bookingItem}>
              <Text>{item.client}</Text>
              <Text>{item.date}</Text>
              <Text>{item.service}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Button title="Add Booking" onPress={() => navigation.navigate('AddBookingScreen', { date, fromHome: false })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  bookingItem: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default DayScreen;