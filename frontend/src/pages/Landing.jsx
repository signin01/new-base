import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiUsers, FiBarChart2, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const FeatureCard = ({ icon, title, description, delay }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition"
    >
      <div className="text-4xl mb-4 text-blue-600">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const Landing = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            ref={heroRef}
            initial={{ opacity: 0, y: -30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-4"
          >
            CollabFlow
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8"
          >
            Streamline your team's productivity with our intelligent task management
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link to="/register" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:shadow-lg transition">
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CollabFlow?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to manage projects and teams efficiently</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard icon={<FiCheckCircle />} title="Task Management" description="Create, assign, and track tasks with ease" delay={0} />
            <FeatureCard icon={<FiUsers />} title="Team Collaboration" description="Invite team members and work together" delay={0.1} />
            <FeatureCard icon={<FiBarChart2 />} title="Analytics Dashboard" description="Real-time insights into your productivity" delay={0.2} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to boost your productivity?</h2>
          <Link to="/register" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
            Join CollabFlow Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
