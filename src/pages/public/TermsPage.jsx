import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  DollarSign, 
  Calendar, 
  AlertCircle, 
  CheckCircle,
  FileText,
  Lock,
  Eye,
  Heart
} from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';
import { AnimatePresence } from 'framer-motion';

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', label: 'General Terms', icon: FileText },
    { id: 'users', label: 'User Responsibilities', icon: Users },
    { id: 'hosts', label: 'Host Guidelines', icon: Heart },
    { id: 'bookings', label: 'Booking & Cancellation', icon: Calendar },
    { id: 'payments', label: 'Payment Terms', icon: DollarSign },
    { id: 'privacy', label: 'Privacy & Security', icon: Lock },
    { id: 'liability', label: 'Liability & Disclaimers', icon: Shield }
  ];

  const termsContent = {
    general: [
      {
        title: "Acceptance of Terms",
        content: "By accessing and using KrishiSafar, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
      },
      {
        title: "Service Description",
        content: "KrishiSafar is an agri-tourism platform that connects travelers with farm hosts across India. We facilitate bookings, payments, and provide support services for authentic rural experiences."
      },
      {
        title: "Eligibility",
        content: "You must be at least 18 years old to use our services. By using KrishiSafar, you represent and warrant that you meet all eligibility requirements."
      },
      {
        title: "Account Registration",
        content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use."
      }
    ],
    users: [
      {
        title: "Booking Responsibilities",
        content: "Users are responsible for providing accurate booking information, arriving on time, following host instructions, and respecting farm rules and safety guidelines."
      },
      {
        title: "Behavior Standards",
        content: "Users must behave respectfully towards hosts, other guests, and farm property. Any damage caused by users will be their responsibility to repair or compensate."
      },
      {
        title: "Health & Safety",
        content: "Users should assess their own health and fitness for farm activities. Those with medical conditions should consult healthcare providers before booking experiences."
      },
      {
        title: "Reviews & Feedback",
        content: "Users are encouraged to provide honest, constructive feedback about their experiences. False or malicious reviews are prohibited and may result in account suspension."
      }
    ],
    hosts: [
      {
        title: "Host Verification",
        content: "All hosts must complete our verification process, including farm inspections, safety assessments, and background checks to ensure quality and safety standards."
      },
      {
        title: "Experience Quality",
        content: "Hosts must provide experiences that match their descriptions, maintain high safety standards, and ensure all activities are conducted in accordance with local regulations."
      },
      {
        title: "Guest Safety",
        content: "Hosts are responsible for guest safety during experiences, providing safety equipment when needed, and having emergency procedures in place."
      },
      {
        title: "Professional Conduct",
        content: "Hosts must maintain professional behavior, respond promptly to guest inquiries, and handle any issues or complaints professionally and promptly."
      }
    ],
    bookings: [
      {
        title: "Booking Confirmation",
        content: "Bookings are confirmed only after payment is received and processed. You will receive a confirmation email with all relevant details and host contact information."
      },
      {
        title: "Cancellation Policy",
        content: "Cancellations made 24+ hours before the experience are fully refundable. Cancellations within 24 hours are non-refundable unless due to extreme weather or host cancellation."
      },
      {
        title: "Rescheduling",
        content: "Rescheduling requests must be made at least 24 hours in advance and are subject to host availability. No additional fees apply for rescheduling."
      },
      {
        title: "No-Shows",
        content: "Failure to attend without prior cancellation results in full charge with no refund. Hosts may wait up to 30 minutes before considering a guest a no-show."
      }
    ],
    payments: [
      {
        title: "Payment Methods",
        content: "We accept all major credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment partners."
      },
      {
        title: "Pricing & Fees",
        content: "Prices are set by hosts and include all applicable taxes. We charge a service fee of 10-15% which covers platform costs, insurance, and support services."
      },
      {
        title: "Refund Processing",
        content: "Refunds are processed within 5-7 business days to the original payment method. Processing times may vary depending on your bank or payment provider."
      },
      {
        title: "Host Payouts",
        content: "Hosts receive their earnings after the experience is completed, minus our service fees. Payouts are processed weekly via bank transfer or digital wallets."
      }
    ],
    privacy: [
      {
        title: "Data Collection",
        content: "We collect personal information necessary for providing our services, including contact details, booking information, and payment data. We do not sell your personal information."
      },
      {
        title: "Data Security",
        content: "We implement industry-standard security measures to protect your data. All sensitive information is encrypted and stored securely on our servers."
      },
      {
        title: "Data Sharing",
        content: "We share necessary information with hosts for booking coordination and with payment processors for transaction processing. We never share data with third parties for marketing purposes."
      },
      {
        title: "Your Rights",
        content: "You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications at any time."
      }
    ],
    liability: [
      {
        title: "Platform Liability",
        content: "KrishiSafar acts as an intermediary and is not liable for the actions of hosts or guests. We provide insurance coverage and support but cannot guarantee specific outcomes."
      },
      {
        title: "Host Liability",
        content: "Hosts are responsible for maintaining safe environments and providing accurate experience descriptions. They must carry appropriate insurance and comply with local regulations."
      },
      {
        title: "Guest Liability",
        content: "Guests are responsible for their own safety and behavior during experiences. They must follow host instructions and respect farm property and rules."
      },
      {
        title: "Force Majeure",
        content: "Neither party is liable for delays or failures due to circumstances beyond reasonable control, including natural disasters, government actions, or other unforeseeable events."
      }
    ]
  };

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
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3 mb-6"
            >
              <FileText className="w-5 h-5" />
              <span className="text-sm font-medium">Legal Information</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Terms & Conditions
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-primary-100 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Please read these terms and conditions carefully before using KrishiSafar. 
              By using our platform, you agree to be bound by these terms.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <AnimatedButton
                size="lg"
                variant="secondary"
                onClick={() => document.getElementById('terms-content').scrollIntoView({ behavior: 'smooth' })}
              >
                Read Terms
              </AnimatedButton>
              
              <AnimatedButton
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Legal Team
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-12 bg-white sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            {sections.map((section) => (
              <motion.button
                key={section.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full border-2 font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'border-primary-600 bg-primary-600 text-white shadow-lg'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-primary-300 hover:text-primary-600'
                }`}
              >
                <section.icon className="w-4 h-4" />
                <span>{section.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section id="terms-content" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {sections.find(s => s.id === activeSection)?.label}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Important information about your rights and responsibilities when using KrishiSafar
              </p>
            </motion.div>

            {/* Terms Items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {termsContent[activeSection]?.map((term, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {term.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {term.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-yellow-600" />
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Important Notice
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              These terms and conditions are legally binding. By using KrishiSafar, you acknowledge 
              that you have read, understood, and agree to be bound by these terms.
            </motion.p>
            
            <motion.div variants={itemVariants} className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-left">
              <div className="flex items-start space-x-4">
                <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                    Changes to Terms
                  </h3>
                  <p className="text-yellow-700 mb-4">
                    We may update these terms from time to time. We will notify users of any material 
                    changes via email or through our platform. Continued use of KrishiSafar after 
                    changes constitutes acceptance of the new terms.
                  </p>
                  <p className="text-yellow-700">
                    <strong>Last updated:</strong> January 15, 2024
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Legal Team */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
              Questions About These Terms?
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              If you have any questions about these terms and conditions or need clarification 
              on any legal matters, our legal team is here to help.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton
                size="lg"
                variant="secondary"
                onClick={() => window.location.href = '/contact'}
                icon={<Eye className="w-4 h-4" />}
              >
                Contact Legal Team
              </AnimatedButton>
              
              <AnimatedButton
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                onClick={() => window.location.href = '/privacy'}
                icon={<Lock className="w-4 h-4" />}
              >
                Privacy Policy
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;