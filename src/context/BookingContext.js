import React, { createContext, useContext, useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from './AuthContext';

const BookingContext = createContext({});

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user bookings when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserBookings();
      fetchUserReviews();
    } else {
      setBookings([]);
      setReviews([]);
    }
  }, [isAuthenticated, user]);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const bookingsSnapshot = await firestore()
        .collection('bookings')
        .where('userId', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get();
      
      const userBookings = bookingsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setBookings(userBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserReviews = async () => {
    try {
      const reviewsSnapshot = await firestore()
        .collection('reviews')
        .where('userId', '==', user.uid)
        .orderBy('createdAt', 'desc')
        .get();
      
      const userReviews = reviewsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setReviews(userReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const createBooking = async (bookingData) => {
    try {
      setLoading(true);
      
      const booking = {
        ...bookingData,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        status: 'confirmed',
        createdAt: firestore.FieldValue.serverTimestamp()
      };
      
      const docRef = await firestore().collection('bookings').add(booking);
      
      // Add booking to local state
      const newBooking = { id: docRef.id, ...booking };
      setBookings(prev => [newBooking, ...prev]);
      
      return { success: true, bookingId: docRef.id };
    } catch (error) {
      console.error('Error creating booking:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (hotelId, reviewData) => {
    try {
      setLoading(true);
      
      const review = {
        ...reviewData,
        hotelId,
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        createdAt: firestore.FieldValue.serverTimestamp()
      };
      
      const docRef = await firestore().collection('reviews').add(review);
      
      // Add review to local state
      const newReview = { id: docRef.id, ...review };
      setReviews(prev => [newReview, ...prev]);
      
      return { success: true, reviewId: docRef.id };
    } catch (error) {
      console.error('Error adding review:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const fetchHotelReviews = async (hotelId) => {
    try {
      const reviewsSnapshot = await firestore()
        .collection('reviews')
        .where('hotelId', '==', hotelId)
        .orderBy('createdAt', 'desc')
        .get();
      
      return reviewsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching hotel reviews:', error);
      return [];
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      setLoading(true);
      
      await firestore().collection('bookings').doc(bookingId).update({
        status: 'cancelled',
        cancelledAt: firestore.FieldValue.serverTimestamp()
      });
      
      // Update local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );
      
      return { success: true };
    } catch (error) {
      console.error('Error cancelling booking:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    bookings,
    reviews,
    loading,
    createBooking,
    addReview,
    fetchHotelReviews,
    cancelBooking,
    fetchUserBookings,
    fetchUserReviews
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
