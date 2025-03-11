import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AnalyticsDashboard = () => {
  const [articleStats, setArticleStats] = useState<any[]>([]);
  const [userActivity, setUserActivity] = useState<any[]>([]);
  const [commentStats, setCommentStats] = useState<any[]>([]);

  // Fetch article views (example: you might need to track views in a separate table)
  const fetchArticleStats = async () => {
    const { data } = await supabase
      .from('articles')
      .select('id, title, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setArticleStats(data.map((article) => ({
        ...article,
        views: Math.floor(Math.random() * 1000), // Replace with actual view count
      })));
    }
  };

  // Fetch user activity (e.g., signups over time)
  const fetchUserActivity = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('created_at')
      .order('created_at', { ascending: true });

    if (data) {
      const activityByDate = data.reduce((acc, user) => {
        const date = new Date(user.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setUserActivity(
        Object.entries(activityByDate).map(([date, count]) => ({
          date,
          count,
        }))
      );
    }
  };

  // Fetch comment trends
  const fetchCommentStats = async () => {
    const { data } = await supabase
      .from('comments')
      .select('created_at')
      .order('created_at', { ascending: true });

    if (data) {
      const commentsByDate = data.reduce((acc, comment) => {
        const date = new Date(comment.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setCommentStats(
        Object.entries(commentsByDate).map(([date, count]) => ({
          date,
          count,
        }))
      );
    }
  };

  useEffect(() => {
    fetchArticleStats();
    fetchUserActivity();
    fetchCommentStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Articles Card */}
      <Card>
        <CardHeader>
          <CardTitle>Total Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{articleStats.length}</div>
        </CardContent>
      </Card>

      {/* User Activity Card */}
      <Card>
        <CardHeader>
          <CardTitle>User Signups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivity}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Comment Trends Card */}
      <Card>
        <CardHeader>
          <CardTitle>Comment Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={commentStats}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Most Popular Articles */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Most Popular Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={articleStats}>
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;