
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
        duration: 5000,
      });
      setEmail('');
    }, 1500);
  };

  return (
    <div className="bg-secondary/50 backdrop-blur-sm p-8 rounded-lg">
      <div className="max-w-lg mx-auto">
        <h3 className="text-2xl font-serif font-medium mb-2">Stay updated</h3>
        <p className="text-muted-foreground mb-6">
          Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 p-3 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium transition-colors hover:bg-primary/90 disabled:opacity-70"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            By subscribing, you agree to our privacy policy and consent to receive updates from our company.
          </p>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
