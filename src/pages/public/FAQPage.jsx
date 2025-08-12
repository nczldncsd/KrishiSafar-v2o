import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Search, 
  Users, 
  MapPin, 
  DollarSign, 
  Calendar,
  Shield,
  Heart,
  Star,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const initialCategories = [
    { id: 'all', label: 'All Questions', icon: Users, count: 0 },
    { id: 'booking', label: 'Booking & Payment', icon: Calendar, count: 0 },
    { id: 'experiences', label: 'Farm Experiences', icon: MapPin, count: 0 },
    { id: 'hosting', label: 'Becoming a Host', icon: Heart, count: 0 },
    { id: 'safety', label: 'Safety & Support', icon: Shield, count: 0 }
  ];

  const faqData = [
    {
      id: 1,
      question: "How do I book an agri-tourism experience?",
      answer: "Booking is simple! Browse our farm experiences, select your preferred date and time, fill in your details, and complete the payment. You'll receive a confirmation email with all the details including the host's contact information and directions to the farm.",
      category: "booking",
      tags: ["booking", "payment", "confirmation"]
    },
    {
      id: 2,
      question: "What should I bring for a farm visit?",
      answer: "We recommend comfortable clothing suitable for outdoor activities, closed-toe shoes, sunscreen, hat, water bottle, and any specific items mentioned in the experience description. Some farms may provide equipment, but it's best to check the experience details.",
      category: "experiences",
      tags: ["what to bring", "clothing", "equipment"]
    },
    {
      id: 3,
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel up to 24 hours before your scheduled experience for a full refund. Cancellations within 24 hours are non-refundable. In case of extreme weather or farm emergencies, we work with hosts to reschedule or provide refunds.",
      category: "booking",
      tags: ["cancellation", "refund", "reschedule"]
    },
    {
      id: 4,
      question: "How do I become a host?",
      answer: "Becoming a host is easy! Fill out our host application form, provide details about your farm, and our team will guide you through the onboarding process. We'll help you create compelling experience listings and set up your host profile.",
      category: "hosting",
      tags: ["host application", "onboarding", "farm listing"]
    },
    {
      id: 5,
      question: "What safety measures are in place?",
      answer: "All our hosts are verified and farms are inspected for safety. We provide safety guidelines, emergency contact information, and ensure hosts have basic first aid knowledge. Travelers are also covered by our safety protocols and insurance.",
      category: "safety",
      tags: ["safety", "verification", "insurance"]
    },
    {
      id: 6,
      question: "Are the experiences suitable for children?",
      answer: "Many experiences are family-friendly and perfect for children! Look for the 'Family-Friendly' badge on experience listings. Hosts often provide age-appropriate activities and ensure a safe environment for young visitors.",
      category: "experiences",
      tags: ["children", "family", "age-appropriate"]
    },
    {
      id: 7,
      question: "What if the weather is bad on my booking date?",
      answer: "We monitor weather conditions and work with hosts to ensure safe experiences. If severe weather is forecast, hosts may reschedule or offer indoor alternatives. You'll be notified of any changes and can choose to reschedule or get a refund.",
      category: "booking",
      tags: ["weather", "reschedule", "indoor alternatives"]
    },
    {
      id: 8,
      question: "How much can I earn as a host?",
      answer: "Hosts typically earn ₹1,000-₹5,000 per guest depending on the experience type and duration. Popular hosts with multiple experiences can earn ₹25,000+ monthly. We provide pricing guidance and help optimize your listings for better earnings.",
      category: "hosting",
      tags: ["earnings", "pricing", "revenue"]
    },
    {
      id: 9,
      question: "Do I need farming experience to visit?",
      answer: "Not at all! Our experiences are designed for people of all skill levels. Hosts provide guidance and instruction, making it perfect for beginners. Whether you're a farming expert or just curious about rural life, you'll have a great time.",
      category: "experiences",
      tags: ["beginners", "skill level", "guidance"]
    },
    {
      id: 10,
      question: "What payment methods are accepted?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets like Paytm and PhonePe. Payments are processed securely, and hosts receive their earnings after the experience is completed.",
      category: "booking",
      tags: ["payment methods", "UPI", "digital wallets"]
    },
    {
      id: 11,
      question: "Can I bring my own food or drinks?",
      answer: "This varies by farm and experience. Some farms provide meals as part of the experience, while others allow you to bring your own. Check the experience description for details, and always ask the host if you're unsure.",
      category: "experiences",
      tags: ["food", "meals", "beverages"]
    },
    {
      id: 12,
      question: "How do I leave a review after my experience?",
      answer: "After your experience, you'll receive an email with a link to leave a review. You can rate the experience, host, and leave detailed feedback. Reviews help other travelers and provide valuable feedback to hosts.",
      category: "booking",
      tags: ["reviews", "rating", "feedback"]
    }
  ];

  // Calculate category counts
  React.useEffect(() => {
    const counts = { all: faqData.length };
    faqData.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    
    setCategories(prev => prev.map(cat => ({
      ...cat,
      count: counts[cat.id] || 0
    })));
  }, []);

  const [categories, setCategories] = useState(initialCategories);

  const toggleItem = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Frequently Asked
              <span className="block text-primary-200">Questions</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Find answers to common questions about booking experiences, becoming a host, 
              and everything else you need to know about KrishiSafar.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search for questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-2xl text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full border-2 font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'border-primary-600 bg-primary-600 text-white shadow-lg'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.label}</span>
                <span className="bg-white bg-opacity-20 text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-6"
          >
            {filteredFAQs.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="text-center py-16"
              >
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or browse all categories.
                </p>
                <AnimatedButton
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                >
                  View All Questions
                </AnimatedButton>
              </motion.div>
            ) : (
              filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{
                          rotate: expandedItems.has(faq.id) ? 180 : 0
                        }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </motion.div>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedItems.has(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {faq.answer}
                          </p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {faq.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="inline-block bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-primary-600" />
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you 
              with any questions or concerns.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton
                size="lg"
                onClick={() => window.location.href = '/contact'}
                icon={<AlertCircle className="w-4 h-4" />}
              >
                Contact Support
              </AnimatedButton>
              
              <AnimatedButton
                size="lg"
                variant="outline"
                onClick={() => window.location.href = '/about'}
                icon={<Heart className="w-4 h-4" />}
              >
                Learn More About Us
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quick Tips for the Best Experience
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make the most of your agri-tourism adventure with these helpful tips
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Clock,
                title: "Book in Advance",
                description: "Popular experiences fill up quickly, especially during peak seasons. Book at least 1-2 weeks ahead."
              },
              {
                icon: MapPin,
                title: "Check Directions",
                description: "Rural locations may have limited GPS coverage. Save the host's contact number for directions."
              },
              {
                icon: Shield,
                title: "Follow Safety Guidelines",
                description: "Listen to your host's safety instructions and wear appropriate clothing for farm activities."
              },
              {
                icon: Heart,
                title: "Respect the Farm",
                description: "Treat the farm as you would your own home. Follow rules and be mindful of crops and animals."
              },
              {
                icon: Star,
                title: "Leave Reviews",
                description: "Share your experience to help other travelers and provide valuable feedback to hosts."
              },
              {
                icon: Users,
                title: "Ask Questions",
                description: "Don't hesitate to ask questions about farming practices, local culture, and farm history."
              }
            ].map((tip, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <tip.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;