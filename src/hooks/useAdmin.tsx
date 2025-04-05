
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
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
        if (!user) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }
  
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        setIsAdmin(profile?.role === 'admin');
        setLoading(false);
      };

      checkAdmin();
    }, []);
  
    return { isAdmin, loading };
  };
  
  // Use in admin components
  export const AdminRoute = () => {
    const { isAdmin, loading } = useAdmin();
  
    if (loading) return <div className="flex justify-center items-center h-screen"><Loader className="animate-spin" /></div>;
    if (!isAdmin) return <Navigate to="/" />;
    
    return <Navigate to="/admin" />;
  };

export default useAdmin;
