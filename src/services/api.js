// Mock data for development - replace with actual API calls
const mockExperiences = [
  {
    id: 1,
    title: "Organic Farm Experience",
    description: "Experience the joy of organic farming with hands-on activities like planting, harvesting, and learning sustainable agricultural practices.",
    location: "Pune, Maharashtra",
    price: 1500,
    duration: "4 hours",
    maxGuests: 15,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop"
    ],
    host: {
      name: "Rajesh Kumar",
      rating: 4.8,
      experience: "5+ years"
    },
    activities: ["Planting", "Harvesting", "Farm Tour", "Organic Lunch"],
    category: "Farming",
    rating: 4.7,
    reviews: 124
  },
  {
    id: 2,
    title: "Dairy Farm Adventure",
    description: "Learn about dairy farming, milk cows, make fresh cheese, and understand the complete dairy production process.",
    location: "Nashik, Maharashtra",
    price: 2000,
    duration: "6 hours",
    maxGuests: 12,
    images: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=600&fit=crop"
    ],
    host: {
      name: "Priya Sharma",
      rating: 4.9,
      experience: "8+ years"
    },
    activities: ["Milk Cows", "Cheese Making", "Farm Tour", "Dairy Products"],
    category: "Dairy",
    rating: 4.8,
    reviews: 89
  },
  {
    id: 3,
    title: "Vineyard & Wine Tasting",
    description: "Explore beautiful vineyards, learn about grape cultivation, and enjoy wine tasting sessions with expert sommeliers.",
    location: "Nashik, Maharashtra",
    price: 3500,
    duration: "8 hours",
    maxGuests: 20,
    images: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
    ],
    host: {
      name: "Vikram Singh",
      rating: 4.7,
      experience: "12+ years"
    },
    activities: ["Vineyard Tour", "Wine Tasting", "Grape Picking", "Lunch"],
    category: "Vineyard",
    rating: 4.6,
    reviews: 156
  },
  {
    id: 4,
    title: "Spice Garden Tour",
    description: "Discover the aromatic world of spices, learn about their cultivation, and participate in traditional spice processing.",
    location: "Kerala",
    price: 1200,
    duration: "3 hours",
    maxGuests: 18,
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
    ],
    host: {
      name: "Lakshmi Nair",
      rating: 4.6,
      experience: "6+ years"
    },
    activities: ["Spice Tour", "Processing Demo", "Cooking Class", "Tea Tasting"],
    category: "Spices",
    rating: 4.5,
    reviews: 78
  }
];

// Simulate API latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const getExperiences = async () => {
  await delay(800); // Simulate network delay
  return {
    success: true,
    data: mockExperiences,
    total: mockExperiences.length
  };
};

export const getExperience = async (id) => {
  await delay(500);
  const experience = mockExperiences.find(exp => exp.id === parseInt(id));
  
  if (!experience) {
    throw new Error('Experience not found');
  }
  
  return {
    success: true,
    data: experience
  };
};

export const login = async ({ email, password }) => {
  await delay(1000); // Simulate authentication delay
  
  // Demo accounts
  if (email === 'user@demo.com') {
    return {
      success: true,
      data: {
        user: {
          id: 1,
          email: 'user@demo.com',
          name: 'Demo User',
          role: 'user'
        },
        token: 'mock-user-token-' + Date.now()
      }
    };
  }
  
  if (email === 'host@demo.com') {
    return {
      success: true,
      data: {
        user: {
          id: 2,
          email: 'host@demo.com',
          name: 'Demo Host',
          role: 'host'
        },
        token: 'mock-host-token-' + Date.now()
      }
    };
  }
  
  throw new Error('Invalid credentials');
};

export const createBooking = async (payload) => {
  await delay(1200); // Simulate booking processing
  
  const { experienceId, date, guests, name, phone } = payload;
  
  // Validate required fields
  if (!experienceId || !date || !guests || !name || !phone) {
    throw new Error('Missing required fields');
  }
  
  // Simulate successful booking
  return {
    success: true,
    data: {
      id: Math.floor(Math.random() * 10000),
      experienceId,
      date,
      guests,
      name,
      phone,
      status: 'confirmed',
      bookingDate: new Date().toISOString(),
      totalAmount: mockExperiences.find(exp => exp.id === experienceId)?.price * guests || 0
    }
  };
};

// Search experiences (mock implementation)
export const searchExperiences = async (query) => {
  await delay(600);
  
  if (!query) {
    return getExperiences();
  }
  
  const filtered = mockExperiences.filter(exp => 
    exp.title.toLowerCase().includes(query.toLowerCase()) ||
    exp.location.toLowerCase().includes(query.toLowerCase()) ||
    exp.category.toLowerCase().includes(query.toLowerCase())
  );
  
  return {
    success: true,
    data: filtered,
    total: filtered.length
  };
};