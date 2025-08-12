import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  Database, 
  Key,
  AlertCircle, 
  CheckCircle,
  FileText,
  Globe,
  Mail,
  Phone
} from 'lucide-react';
import AnimatedButton from '../../components/shared/AnimatedButton';

const PrivacyPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'collection', label: 'Data Collection', icon: Database },
    { id: 'usage', label: 'Data Usage', icon: Users },
    { id: 'sharing', label: 'Data Sharing', icon: Globe },
    { id: 'security', label: 'Data Security', icon: Shield },
    { id: 'rights', label: 'Your Rights', icon: Key },
    { id: 'cookies', label: 'Cookies & Tracking', icon: Lock }
  ];

  const privacyContent = {
    overview: [
      {
        title: "Our Commitment to Privacy",
        content: "At KrishiSafar, we are committed to protecting your privacy and ensuring the security of your personal information. This privacy policy explains how we collect, use, and safeguard your data when you use our platform."
      },
      {
        title: "Scope of This Policy",
        content: "This policy applies to all users of KrishiSafar, including travelers, hosts, and visitors to our website. It covers how we handle personal information, cookies, and other data collection methods."
      },
      {
        title: "Contact Information",
        content: "If you have any questions about this privacy policy or our data practices, please contact our Data Protection Officer at privacy@krishisafar.com or call us at +91 98765 43210."
      }
    ],
    collection: [
      {
        title: "Information You Provide",
        content: "We collect information you provide directly to us, such as when you create an account, make a booking, contact support, or submit reviews. This includes names, email addresses, phone numbers, and payment information."
      },
      {
        title: "Automatically Collected Information",
        content: "We automatically collect certain information when you use our platform, including IP addresses, device information, browser type, pages visited, and time spent on our website."
      },
      {
        title: "Third-Party Information",
        content: "We may receive information from third parties, such as payment processors, social media platforms (if you connect your accounts), and other service providers."
      },
      {
        title: "Location Information",
        content: "With your consent, we may collect location information to help you find nearby farm experiences and provide location-based recommendations."
      }
    ],
    usage: [
      {
        title: "Providing Our Services",
        content: "We use your information to provide, maintain, and improve our services, including processing bookings, facilitating communication between hosts and guests, and providing customer support."
      },
      {
        title: "Personalization",
        content: "We use your data to personalize your experience, such as recommending relevant farm experiences, showing relevant content, and tailoring our communications to your preferences."
      },
      {
        title: "Communication",
        content: "We use your contact information to send you important updates about your bookings, respond to your inquiries, and send marketing communications (with your consent)."
      },
      {
        title: "Analytics and Improvement",
        content: "We analyze usage patterns to improve our platform, develop new features, and ensure optimal performance and user experience."
      }
    ],
    sharing: [
      {
        title: "With Hosts",
        content: "We share necessary information with hosts to facilitate bookings, including your name, contact details, and booking preferences. This enables hosts to provide personalized experiences."
      },
      {
        title: "Service Providers",
        content: "We share data with trusted third-party service providers who help us operate our platform, including payment processors, hosting services, analytics providers, and customer support tools."
      },
      {
        title: "Legal Requirements",
        content: "We may disclose your information when required by law, such as in response to legal requests, court orders, or government investigations."
      },
      {
        title: "Business Transfers",
        content: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction, subject to the same privacy protections."
      }
    ],
    security: [
      {
        title: "Data Encryption",
        content: "We use industry-standard encryption protocols (SSL/TLS) to protect your data during transmission. All sensitive information is encrypted both in transit and at rest."
      },
      {
        title: "Access Controls",
        content: "We implement strict access controls and authentication measures to ensure that only authorized personnel can access your personal information."
      },
      {
        title: "Regular Security Audits",
        content: "We conduct regular security assessments and penetration testing to identify and address potential vulnerabilities in our systems."
      },
      {
        title: "Incident Response",
        content: "We have established procedures for responding to security incidents and will notify affected users promptly if we detect any unauthorized access to their data."
      }
    ],
    rights: [
      {
        title: "Access Your Data",
        content: "You have the right to request access to the personal information we hold about you and receive a copy of your data in a portable format."
      },
      {
        title: "Correct Your Data",
        content: "You can update or correct your personal information at any time through your account settings or by contacting our support team."
      },
      {
        title: "Delete Your Data",
        content: "You can request deletion of your personal information, subject to certain legal and contractual obligations that may require us to retain some data."
      },
      {
        title: "Opt-Out of Marketing",
        content: "You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or updating your communication preferences."
      }
    ],
    cookies: [
      {
        title: "What Are Cookies",
        content: "Cookies are small text files stored on your device that help us remember your preferences, analyze site usage, and provide personalized content."
      },
      {
        title: "Types of Cookies We Use",
        content: "We use essential cookies for basic functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings and choices."
      },
      {
        title: "Third-Party Cookies",
        content: "Some third-party services we use (like analytics and payment processors) may set their own cookies. We do not control these cookies and their use is governed by their respective privacy policies."
      },
      {
        title: "Managing Cookies",
        content: "You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of our platform."
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
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Data Protection</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Privacy Policy
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-primary-100 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Learn how we protect your privacy and handle your personal information 
              when you use KrishiSafar. Your trust and data security are our top priorities.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <AnimatedButton
                size="lg"
                variant="secondary"
                onClick={() => document.getElementById('privacy-content').scrollIntoView({ behavior: 'smooth' })}
              >
                Read Policy
              </AnimatedButton>
              
              <AnimatedButton
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                onClick={() => window.location.href = '/contact'}
              >
                Contact DPO
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

      {/* Privacy Content */}
      <section id="privacy-content" className="py-20">
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
                Detailed information about how we handle your data and protect your privacy
              </p>
            </motion.div>

            {/* Privacy Items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {privacyContent[activeSection]?.map((item, index) => (
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
                          {item.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {item.content}
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

      {/* Data Protection Principles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Data Protection Principles
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow these core principles to ensure your data is handled responsibly and securely
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Lock,
                title: "Lawful Processing",
                description: "We only process your data when we have a legal basis to do so, such as your consent or to fulfill our contractual obligations."
              },
              {
                icon: Eye,
                title: "Transparency",
                description: "We are clear about what data we collect, how we use it, and who we share it with. No hidden agendas or secret data collection."
              },
              {
                icon: Database,
                title: "Data Minimization",
                description: "We only collect the data we actually need to provide our services. We don't gather unnecessary or excessive information."
              },
              {
                icon: Shield,
                title: "Security First",
                description: "We implement robust security measures to protect your data from unauthorized access, loss, or destruction."
              },
              {
                icon: Users,
                title: "User Control",
                description: "You have full control over your data. You can access, correct, delete, or export your information at any time."
              },
              {
                icon: Globe,
                title: "Accountability",
                description: "We take full responsibility for how we handle your data and are committed to continuous improvement of our privacy practices."
              }
            ].map((principle, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-gray-50 rounded-xl p-6 text-center hover:bg-primary-50 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{principle.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{principle.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions About Your Privacy?
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Our Data Protection Officer is here to help you with any privacy-related questions, 
              concerns, or requests regarding your personal data.
            </motion.p>
            
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">privacy@krishisafar.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Response Time</h3>
                    <p className="text-gray-600">We respond to all privacy requests within 48 hours</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
              Your Privacy Matters to Us
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              We're committed to protecting your privacy and being transparent about how we handle your data. 
              If you have any concerns, don't hesitate to reach out.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton
                size="lg"
                variant="secondary"
                onClick={() => window.location.href = '/contact'}
                icon={<Mail className="w-4 h-4" />}
              >
                Contact Us
              </AnimatedButton>
              
              <AnimatedButton
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                onClick={() => window.location.href = '/terms'}
                icon={<FileText className="w-4 h-4" />}
              >
                Terms & Conditions
              </AnimatedButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;