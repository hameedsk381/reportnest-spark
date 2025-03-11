
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DataImporter from '@/components/DataImporter';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    document.title = 'Admin Dashboard | NewsDaily';
    
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      
      // In a real app, you would check if the user has admin role
      // For this demo, we'll just check the email (not secure)
      if (data.user) {
        // Check if user is an admin (this is only for demo purposes)
        // In a real app, you would use RLS policies with an admin role
        setIsAdmin(true);
      }
      
      setLoading(false);
    };
    
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse h-8 bg-gray-200 rounded w-48"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
            <h1 className="text-3xl font-serif font-medium mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground mb-8">Manage your website content and settings</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-xl font-medium">Content Management</h2>
                
                <DataImporter />
                
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <p className="text-muted-foreground mb-4">
                    Manage your article categories.
                  </p>
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description: "This feature will be available soon.",
                    });
                  }}>
                    Manage Categories
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-xl font-medium">Website Settings</h2>
                
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4">User Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Manage users and permissions.
                  </p>
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description: "This feature will be available soon.",
                    });
                  }}>
                    Manage Users
                  </Button>
                </div>
                
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium mb-4">Site Configuration</h3>
                  <p className="text-muted-foreground mb-4">
                    Configure general site settings.
                  </p>
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "Coming Soon",
                      description: "This feature will be available soon.",
                    });
                  }}>
                    Site Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
