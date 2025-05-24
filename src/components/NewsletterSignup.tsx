
import React, { useState } from 'react';
import { Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    
    toast({
      title: "Welcome aboard!",
      description: "You've successfully subscribed to our newsletter.",
    });
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 text-center animate-scale-in">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
            Thank you for subscribing!
          </h3>
          <p className="text-gray-600">
            You'll receive our latest news and articles directly in your inbox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 lg:p-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        
        <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">
          Stay Informed
        </h3>
        
        <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
          Get the latest news and insights delivered straight to your inbox. 
          Join our community of informed readers.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 px-4 bg-white border-0 rounded-xl shadow-sm focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="h-12 px-8 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Subscribe'
              )}
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
