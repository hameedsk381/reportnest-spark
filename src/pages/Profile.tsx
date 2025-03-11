
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { fetchUserProfile, updateUserProfile, fetchSavedArticles } from '@/lib/supabase';
import { Article } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    document.title = 'Your Profile | NewsDaily';
    
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        loadProfile(data.user);
      } else {
        setLoading(false);
      }
    };
    
    getUser();
  }, []);

  const loadProfile = async (user: any) => {
    try {
      const profileData = await fetchUserProfile();
      setProfile(profileData);
      
      if (profileData) {
        setDisplayName(profileData.display_name || '');
        setBio(profileData.bio || '');
        setAvatarUrl(profileData.avatar_url || '');
      }
      
      const articles = await fetchSavedArticles();
      setSavedArticles(articles);
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      await updateUserProfile({
        display_name: displayName,
        bio,
        avatar_url: avatarUrl,
      });
      
      toast({
        title: "Success",
        description: "Your profile has been updated successfully.",
      });
      
      // Refresh profile data
      loadProfile(user);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse space-y-6 w-full max-w-md">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-48 bg-gray-200 rounded w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-card rounded-lg shadow-lg p-6 md:p-8 animate-fade-in">
            <h1 className="text-3xl font-serif font-medium mb-8">Your Profile</h1>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="saved">Saved Articles</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-8">
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={user.email}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Display Name</label>
                    <Input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter your display name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Avatar URL</label>
                    <Input
                      type="text"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="Enter your avatar URL"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter a URL to an image online, or leave blank to use your initial.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself"
                      rows={4}
                    />
                  </div>
                  
                  <Button type="submit" disabled={updating}>
                    {updating ? 'Updating...' : 'Update Profile'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="saved">
                {savedArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedArticles.map((article, index) => (
                      <ArticleCard 
                        key={article.id} 
                        article={article} 
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      You haven't saved any articles yet.
                    </p>
                    <Button asChild variant="outline">
                      <a href="/">Browse Articles</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-8">
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-4">Account Management</h3>
                  <p className="text-muted-foreground mb-6">
                    Manage your account settings and preferences.
                  </p>
                  
                  <div className="space-y-4">
                    <Button 
                      variant="outline" 
                      onClick={() => toast({
                        title: "Coming Soon",
                        description: "This feature will be available soon.",
                      })}
                    >
                      Change Password
                    </Button>
                    
                    <Button 
                      variant="destructive" 
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
