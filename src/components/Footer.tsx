import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Twitter, Facebook, Instagram, Github } from 'lucide-react';
import { Logo } from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  const footerLinks = [
    {
      title: 'Content',
      links: [
        { name: 'Latest News', href: '/' },
        { name: 'Categories', href: '/' },
        { name: 'Featured', href: '/' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contribute', href: '/contribute' },
        { name: 'Contact', href: '/about' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <Logo className="h-8 w-8 transition-transform duration-200 group-hover:scale-105" />
              <span className="text-xl font-serif font-bold text-gray-900">
                OpenVaartha
              </span>
            </Link>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
              The truth openly told. Stay informed with the latest news, 
              breaking stories, and in-depth articles from our trusted sources.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/5 transition-all duration-200 hover:scale-110 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Stay updated
              </h3>
              <p className="text-gray-600 text-sm">
                Subscribe to our newsletter for the latest updates.
              </p>
            </div>
            
            <div className="flex gap-2 max-w-sm">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
              <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center gap-1">
                <Mail className="w-4 h-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-500">
          <p>
            © {currentYear} OpenVaartha by Foss Andhra Foundation. All rights reserved.
          </p>
          <p>
            Made with ❤️ for truthful journalism.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
