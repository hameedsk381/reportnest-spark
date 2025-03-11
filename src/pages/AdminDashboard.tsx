import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import ArticleManager from "./ArticleManager";
import { CategoriesManager } from "./CategoryManager";
import { UserManager } from "./UserManagement";
import CommentManager from "./CommentManager";
import AnalyticsDashboard from "./AnalyticsDashboard";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('articles');
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdminStatus = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                navigate('/');
                toast.error('You must be logged in to access this page');
                return;
            }

            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single()
                .throwOnError();

            if (!profile || (profile as { role?: string }).role !== 'admin') {
                navigate('/');
                toast.error('You must be an admin to access this page');
                return;
            }

            setIsAdmin(true);
        };

        checkAdminStatus();
    }, [navigate]);

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-20 pb-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="articles">Articles</TabsTrigger>
                            <TabsTrigger value="categories">Categories</TabsTrigger>
                            <TabsTrigger value="users">Users</TabsTrigger>
                            <TabsTrigger value="comments">Comments</TabsTrigger>
                            <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        </TabsList>
                        
                        <div className="mt-8">
                            {activeTab === 'articles' && <ArticleManager />}
                            {activeTab === 'categories' && <CategoriesManager />}
                            {activeTab === 'users' && <UserManager />}
                            {activeTab === 'comments' && <CommentManager />}
                            {activeTab === 'analytics' && <AnalyticsDashboard />}
                        </div>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboard;