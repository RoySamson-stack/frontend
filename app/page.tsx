"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, FileText, Users, Shield, Phone, Mail } from 'lucide-react';

const ScamGuardKenyaPage = () => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.push('/login');
  };

  const navigateToSignup = () => {
    router.push('/signup');
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">ScamGuard Kenya</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={navigateToLogin}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </button>
              <button 
                onClick={navigateToSignup}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Report Scams.
            </h1>
            <h2 className="text-5xl font-bold text-red-500 mb-8">
              Protect Others.
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Help keep Kenya safe by reporting fraudulent activities. From mobile money 
              scams to fake investments, your report can prevent others from becoming 
              victims.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={navigateToLogin}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md text-lg font-medium"
              >
                Report a Scam
              </button>
              <button className="text-gray-700 hover:text-gray-900 px-8 py-3 rounded-md text-lg font-medium">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Help</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to report scams and helps authorities 
              take action to protect the community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Easy Reporting */}
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Reporting</h3>
              <p className="text-gray-600">
                Simple forms to report different types of scams including mobile money, investment, 
                and online fraud.
              </p>
            </div>

            {/* Community Protection */}
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Protection</h3>
              <p className="text-gray-600">
                Your reports help warn others and create a database of known scams and fraudulent 
                activities.
              </p>
            </div>

            {/* Official Collaboration */}
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Official Collaboration</h3>
              <p className="text-gray-600">
                We work with law enforcement and regulatory bodies to ensure your reports 
                reach the right authorities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Scams Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Scams in Kenya</h2>
            <p className="text-xl text-gray-600">
              Be aware of these common fraudulent schemes targeting Kenyans.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* M-Pesa Fraud */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">M-Pesa Fraud</h3>
              <p className="text-gray-600 text-sm">
                Fake mobile money transactions and reversed payments
              </p>
            </div>

            {/* Investment Scams */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Investment Scams</h3>
              <p className="text-gray-600 text-sm">
                Ponzi schemes and fake investment opportunities
              </p>
            </div>

            {/* Online Shopping */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Online Shopping</h3>
              <p className="text-gray-600 text-sm">
                Fake online stores and non-delivery of goods
              </p>
            </div>

            {/* Job Scams */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Scams</h3>
              <p className="text-gray-600 text-sm">
                Fake job offers requiring upfront payments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-500 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Been Scammed? Help Others Avoid the Same Fate
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Your report matters. Every scam reported helps build a stronger 
            defense against fraud in Kenya.
          </p>
          <button 
            onClick={navigateToLogin}
            className="bg-white text-red-500 hover:bg-gray-100 px-8 py-3 rounded-md text-lg font-medium"
          >
            Report Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">ScamGuard Kenya</span>
              </div>
              <p className="text-gray-400">
                Protecting Kenyans from fraud through community reporting and awareness.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Report Scam</a></li>
                <li><a href="#" className="hover:text-white">Scam Alerts</a></li>
                <li><a href="#" className="hover:text-white">Safety Tips</a></li>
                <li><a href="#" className="hover:text-white">About Us</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5" />
                  <span>+254 700 000 000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5" />
                  <span>help@scamguard.ke</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ScamGuard Kenya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ScamGuardKenyaPage;