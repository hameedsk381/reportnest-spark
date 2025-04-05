
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FileText, Send, ExternalLink } from 'lucide-react';

const Contribute = () => {
  useEffect(() => {
    // Set page title and scroll to top on mount
    window.scrollTo(0, 0);
    document.title = 'Contribute - OpenVaartha';
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-serif font-bold mb-6">Contribute to OpenVaartha</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl leading-relaxed mb-8">
                Your voice matters. There are many ways to contribute to OpenVaartha and help us deliver impactful journalism to our community.
              </p>
              
              <div className="bg-secondary/50 p-6 rounded-lg mb-10">
                <h2 className="text-2xl font-serif font-semibold mb-4 flex items-center">
                  <FileText className="mr-2" size={24} />
                  Submit a Story
                </h2>
                <p className="mb-4">
                  Have a story that needs to be told? We welcome submissions from freelance journalists, community members, and experts in various fields.
                </p>
                <Button className="mt-2">
                  <Send className="mr-2" size={16} />
                  Submit Your Story
                </Button>
              </div>
              
              <h2 className="text-2xl font-serif font-semibold mt-10 mb-4">Ways to Contribute</h2>
              
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="border border-border p-5 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Become a Correspondent</h3>
                  <p className="mb-4">Join our network of local correspondents who provide on-the-ground reporting from communities around the world.</p>
                  <a href="#" className="text-primary inline-flex items-center hover:underline">
                    Learn more <ExternalLink className="ml-1" size={16} />
                  </a>
                </div>
                
                <div className="border border-border p-5 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Fact-Checking Network</h3>
                  <p className="mb-4">Help us verify information and combat misinformation by joining our fact-checking community.</p>
                  <a href="#" className="text-primary inline-flex items-center hover:underline">
                    Join the network <ExternalLink className="ml-1" size={16} />
                  </a>
                </div>
                
                <div className="border border-border p-5 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Technical Contributions</h3>
                  <p className="mb-4">Developers and designers can contribute to our open-source projects that power our digital platforms.</p>
                  <a href="#" className="text-primary inline-flex items-center hover:underline">
                    View our GitHub <ExternalLink className="ml-1" size={16} />
                  </a>
                </div>
                
                <div className="border border-border p-5 rounded-lg">
                  <h3 className="text-xl font-medium mb-3">Financial Support</h3>
                  <p className="mb-4">Support independent journalism by making a donation or becoming a subscribing member.</p>
                  <a href="#" className="text-primary inline-flex items-center hover:underline">
                    Support us <ExternalLink className="ml-1" size={16} />
                  </a>
                </div>
              </div>
              
              <h2 className="text-2xl font-serif font-semibold mt-10 mb-4">Editorial Guidelines</h2>
              <p className="mb-4">
                We maintain high standards for all our content. If you're interested in contributing, please review our editorial guidelines to understand our expectations for accuracy, ethics, and style.
              </p>
              <Button variant="outline" className="mb-8">
                Read Our Guidelines
              </Button>
              
              <h2 className="text-2xl font-serif font-semibold mt-10 mb-4">Contact Our Editorial Team</h2>
              <p className="mb-6">
                Have questions about contributing? Reach out to our editorial team at <a href="mailto:editors@openvaartha.com" className="text-primary hover:underline">editors@openvaartha.com</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contribute;
