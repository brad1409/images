import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl
} from 'react-native';
import {
  Text,
  Searchbar,
  Button,
  Card,
  Chip,
  ActivityIndicator,
  Snackbar
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { sampleHotels, fetchRecommendedHotels } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ExploreScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });
  const [recommendedHotels, setRecommendedHotels] = useState([]);

  useEffect(() => {
    loadHotels();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [hotels, searchQuery, selectedFilter]);

  const loadHotels = async () => {
    try {
      setLoading(true);
      
      // Load sample hotels
      setHotels(sampleHotels);
      
      // Load recommended hotels from Fake Store API
      const recommended = await fetchRecommendedHotels();
      setRecommendedHotels(recommended);
      
    } catch (error) {
      console.error('Error loading hotels:', error);
      setSnackbar({
        visible: true,
        message: 'Failed to load hotels. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHotels();
    setRefreshing(false);
  };

  const applyFiltersAndSearch = () => {
    let filtered = [...hotels];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(hotel => 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    switch (selectedFilter) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // 'all' - no additional sorting
        break;
    }

    setFilteredHotels(filtered);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="star"
        size={16}
        color={index < rating ? '#FFD700' : '#E0E0E0'}
      />
    ));
  };

  const renderHotelCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('HotelDetail', { hotel: item })}
      style={styles.cardWrapper}
    >
      <Card style={styles.hotelCard}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.hotelImage}
          resizeMode="cover"
        />
        <Card.Content style={styles.cardContent}>
          <Text variant="titleMedium" style={styles.hotelName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text variant="bodyMedium" style={styles.hotelLocation} numberOfLines={1}>
            <Icon name="location-on" size={14} color="#666" /> {item.location}
          </Text>
          <View style={styles.ratingRow}>
            <View style={styles.stars}>
              {renderStars(item.rating)}
            </View>
            <Text variant="labelMedium" style={styles.ratingText}>
              {item.rating}.0
            </Text>
          </View>
          <Text variant="titleLarge" style={styles.price}>
            ${item.price}<Text style={styles.priceUnit}>/night</Text>
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderRecommendedCard = ({ item }) => (
    <TouchableOpacity
      style={styles.recommendedCard}
      onPress={() => {
        // Convert recommended item to hotel format
        const hotel = {
          id: item.id,
          name: item.name,
          location: item.location,
          image: item.image,
          rating: item.rating,
          price: item.price,
          description: item.description,
          amenities: ['WiFi', 'Pool', 'Restaurant'],
          rooms: [
            { type: 'Standard', price: item.price, available: true },
            { type: 'Deluxe', price: item.price + 100, available: true }
          ]
        };
        navigation.navigate('HotelDetail', { hotel });
      }}
    >
      <Image 
        source={{ uri: item.image }} 
        style={styles.recommendedImage}
        resizeMode="cover"
      />
      <View style={styles.recommendedContent}>
        <Text variant="titleSmall" numberOfLines={1} style={styles.recommendedName}>
          {item.name}
        </Text>
        <Text variant="bodySmall" numberOfLines={1} style={styles.recommendedLocation}>
          {item.location}
        </Text>
        <Text variant="labelLarge" style={styles.recommendedPrice}>
          ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text variant="headlineSmall" style={styles.greeting}>
        Hello, {user?.displayName || 'User'}! 👋
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Find your perfect stay
      </Text>
      
      <Searchbar
        placeholder="Search hotels or locations"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        iconColor="#007AFF"
      />
      
      <View style={styles.filterContainer}>
        <Text variant="titleMedium" style={styles.filterTitle}>Sort by:</Text>
        <View style={styles.filterChips}>
          <Chip
            selected={selectedFilter === 'all'}
            onPress={() => setSelectedFilter('all')}
            style={styles.filterChip}
            textStyle={selectedFilter === 'all' ? styles.selectedChipText : styles.chipText}
          >
            All
          </Chip>
          <Chip
            selected={selectedFilter === 'price-low'}
            onPress={() => setSelectedFilter('price-low')}
            style={styles.filterChip}
            textStyle={selectedFilter === 'price-low' ? styles.selectedChipText : styles.chipText}
          >
            Price: Low to High
          </Chip>
          <Chip
            selected={selectedFilter === 'rating'}
            onPress={() => setSelectedFilter('rating')}
            style={styles.filterChip}
            textStyle={selectedFilter === 'rating' ? styles.selectedChipText : styles.chipText}
          >
            Rating
          </Chip>
        </View>
      </View>
      
      {recommendedHotels.length > 0 && (
        <View style={styles.recommendedSection}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Recommended for You
          </Text>
          <FlatList
            data={recommendedHotels.slice(0, 5)}
            renderItem={renderRecommendedCard}
            keyExtractor={(item) => `rec-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedList}
          />
        </View>
      )}
      
      <Text variant="titleLarge" style={styles.sectionTitle}>
        Featured Hotels ({filteredHotels.length})
      </Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="search-off" size={80} color="#E0E0E0" />
      <Text variant="titleLarge" style={styles.emptyTitle}>
        No hotels found
      </Text>
      <Text variant="bodyMedium" style={styles.emptyMessage}>
        Try adjusting your search or filters
      </Text>
      <Button
        mode="outlined"
        onPress={() => {
          setSearchQuery('');
          setSelectedFilter('all');
        }}
        style={styles.resetButton}
      >
        Clear Filters
      </Button>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text variant="bodyLarge" style={styles.loadingText}>
          Loading hotels...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredHotels}
        renderItem={renderHotelCard}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
      />
      
      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: '' })}
        duration={4000}
      >
        {snackbar.message}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  loadingText: {
    marginTop: 16,
    color: '#666'
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 16
  },
  greeting: {
    color: '#333',
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#666',
    marginBottom: 20
  },
  searchbar: {
    marginBottom: 20,
    backgroundColor: '#f8f8f8'
  },
  filterContainer: {
    marginBottom: 20
  },
  filterTitle: {
    marginBottom: 8,
    color: '#333'
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  filterChip: {
    marginRight: 8,
    marginBottom: 8
  },
  chipText: {
    fontSize: 12
  },
  selectedChipText: {
    fontSize: 12,
    color: '#007AFF'
  },
  recommendedSection: {
    marginBottom: 20
  },
  sectionTitle: {
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 16
  },
  recommendedList: {
    paddingRight: 20
  },
  recommendedCard: {
    width: 140,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  recommendedImage: {
    width: '100%',
    height: 80
  },
  recommendedContent: {
    padding: 8
  },
  recommendedName: {
    fontWeight: 'bold',
    marginBottom: 4
  },
  recommendedLocation: {
    color: '#666',
    marginBottom: 4
  },
  recommendedPrice: {
    color: '#007AFF',
    fontWeight: 'bold'
  },
  listContent: {
    flexGrow: 1
  },
  cardWrapper: {
    marginHorizontal: 20,
    marginBottom: 16
  },
  hotelCard: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6
  },
  hotelImage: {
    width: '100%',
    height: 200
  },
  cardContent: {
    padding: 16
  },
  hotelName: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333'
  },
  hotelLocation: {
    color: '#666',
    marginBottom: 8
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8
  },
  ratingText: {
    color: '#666'
  },
  price: {
    color: '#007AFF',
    fontWeight: 'bold'
  },
  priceUnit: {
    fontSize: 14,
    color: '#666'
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  emptyTitle: {
    color: '#333',
    marginTop: 16,
    marginBottom: 8
  },
  emptyMessage: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 24
  },
  resetButton: {
    borderColor: '#007AFF'
  }
});

export default ExploreScreen;
