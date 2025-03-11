import { supabase } from "@/integrations/supabase/client";
import AdminDashboard from "@/pages/AdminDashboard";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Create a custom hook for admin checks
const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const checkAdmin = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return setIsAdmin(false);
  
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single<{ role: string }>();

        setIsAdmin(profile?.role === 'admin');
        setLoading(false);
      };

      checkAdmin();
    }, []);
  
    return { isAdmin, loading };
  };
  
  // Use in admin components
  const AdminRoute = () => {
    const { isAdmin, loading } = useAdmin();
  
    if (loading) return <Loader />;
    if (!isAdmin) return <Navigate to="/" />;
    
    return <AdminDashboard />;
  };