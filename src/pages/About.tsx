
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  useEffect(() => {
    // Set page title and scroll to top on mount
    window.scrollTo(0, 0);
    document.title = 'About - OpenVaartha';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-serif font-bold mb-6">About OpenVaartha</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-relaxed mb-6">
                OpenVaartha stands for "The Truth Openly Told." We are dedicated to delivering news that matters with transparency, integrity, and impact.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">Our Mission</h2>
              <p className="mb-6">
                At OpenVaartha, we believe in the power of information to transform societies. Our mission is to provide accurate, balanced, and thoughtful reporting that helps our readers understand the complex world around them.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">Our Values</h2>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>Truth:</strong> We are committed to factual accuracy and correcting our mistakes promptly.</li>
                <li><strong>Independence:</strong> We maintain editorial independence and report without fear or favor.</li>
                <li><strong>Transparency:</strong> We are open about our methods and the challenges we face in our reporting.</li>
                <li><strong>Diversity:</strong> We seek diverse perspectives and voices in our coverage and our team.</li>
                <li><strong>Innovation:</strong> We embrace new technologies and formats to tell stories effectively.</li>
              </ul>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">Our Team</h2>
              <p className="mb-6">
                OpenVaartha is powered by a dedicated team of journalists, editors, and technologists who are passionate about delivering quality journalism in the digital age. Our diverse backgrounds and experiences inform our approach to coverage and help us serve our community better.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4">Contact Us</h2>
              <p className="mb-6">
                We welcome your feedback, tips, and story ideas. Reach out to us at <a href="mailto:contact@openvaartha.com" className="text-primary hover:underline">contact@openvaartha.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
