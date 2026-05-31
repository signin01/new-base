import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      toast.success('Message sent! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to send. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600">Have questions? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
                <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required className="w-full p-3 border rounded-lg"></textarea>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <div className="bg-white rounded-2xl shadow-md p-6 h-full">
              <h2 className="text-2xl font-semibold mb-4">Other Ways to Reach Us</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3"><span className="text-2xl">📧</span><span>support@collabflow.com</span></div>
                <div className="flex items-center space-x-3"><span className="text-2xl">📞</span><span>+1 (555) 123-4567</span></div>
                <div className="flex items-center space-x-3"><span className="text-2xl">📍</span><span>123 Innovation Drive, Suite 100, San Francisco, CA</span></div>
              </div>
              <div className="mt-8"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019108829369!2d-122.419415484681!3d37.77492927975951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5c2f2b5b%3A0x3b6b0b0b0b0b0b0!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus" width="100%" height="200" style={{ border: 0 }} allowFullScreen loading="lazy" title="map"></iframe></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
