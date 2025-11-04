import axios from 'axios';

// Fake Store API for hotel recommendations
const FAKE_STORE_API = 'https://fakestoreapi.com';

// OpenWeatherMap API
const WEATHER_API_KEY = 'your_openweather_api_key'; // Replace with your API key
const WEATHER_API = 'https://api.openweathermap.org/data/2.5';

// Fake Store API calls
export const fetchRecommendedHotels = async () => {
  try {
    const response = await axios.get(`${FAKE_STORE_API}/products?limit=6`);
    // Transform products into hotel format
    return response.data.map((product, index) => ({
      id: product.id,
      name: `Hotel ${product.title.split(' ')[0]}`,
      location: ['New York', 'Los Angeles', 'Miami', 'Chicago', 'Boston', 'Seattle'][index % 6],
      image: product.image,
      rating: Math.floor(product.rating.rate),
      price: Math.floor(product.price * 10), // Convert to hotel price range
      description: product.description,
      category: product.category
    }));
  } catch (error) {
    console.error('Error fetching recommended hotels:', error);
    return [];
  }
};

// Weather API calls
export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `${WEATHER_API}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );
    return {
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

// Mock hotel data for the app
export const sampleHotels = [
  {
    id: '1',
    name: 'Grand Plaza Hotel',
    location: 'New York City',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    rating: 5,
    price: 299,
    description: 'Luxury hotel in the heart of Manhattan with stunning city views.',
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa'],
    rooms: [
      { type: 'Standard', price: 299, available: true },
      { type: 'Deluxe', price: 399, available: true },
      { type: 'Suite', price: 599, available: false }
    ]
  },
  {
    id: '2',
    name: 'Ocean View Resort',
    location: 'Miami Beach',
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400',
    rating: 4,
    price: 199,
    description: 'Beautiful beachfront resort with ocean views and tropical atmosphere.',
    amenities: ['WiFi', 'Beach Access', 'Pool', 'Restaurant', 'Bar'],
    rooms: [
      { type: 'Ocean View', price: 199, available: true },
      { type: 'Ocean Front', price: 299, available: true },
      { type: 'Presidential Suite', price: 499, available: true }
    ]
  },
  {
    id: '3',
    name: 'Mountain Lodge',
    location: 'Denver, Colorado',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
    rating: 4,
    price: 159,
    description: 'Cozy mountain lodge with fireplace and scenic mountain views.',
    amenities: ['WiFi', 'Fireplace', 'Hiking Trails', 'Restaurant', 'Spa'],
    rooms: [
      { type: 'Standard', price: 159, available: true },
      { type: 'Mountain View', price: 229, available: true },
      { type: 'Cabin Suite', price: 349, available: true }
    ]
  }
];
