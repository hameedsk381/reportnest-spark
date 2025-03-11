import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const UserManager = () => {
    const [users, setUsers] = useState<Profile[]>([]);
    const [newUser, setNewUser] = useState({ 
        email: '', 
        password: '', 
        role: 'user',
        display_name: '',
        avatar_url: ''
    });
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const { data } = await supabase
            .from('profiles')
            .select('*');
        if (data) {
            const usersWithRoles = data.map(user => ({
                ...user,
                role: ((user as { role?: 'user' | 'admin' }).role || 'user') as 'user' | 'admin',
                email: (user as { email?: string }).email || '',
                display_name: user.display_name || '',
                avatar_url: user.avatar_url || '',
                bio: user.bio || ''
            }));
            setUsers(usersWithRoles);
        }
    };

    const createUser = async () => {
        console.log('Attempting to create user with:', newUser);
        setIsAdding(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email: newUser.email,
                password: newUser.password,
            });

            console.log('SignUp response:', { data, error });

            if (error) throw error;

            if (!data.user) {
                throw new Error('User creation failed - no user data returned');
            }

            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    id: data.user.id,
                    email: newUser.email,
                    role: newUser.role,
                    display_name: newUser.display_name,
                    avatar_url: newUser.avatar_url,
                    bio: ''
                });

            if (profileError) throw profileError;

            setNewUser({ 
                email: '', 
                password: '', 
                role: 'user',
                display_name: '',
                avatar_url: ''
            });
            await fetchUsers();
            toast.success("User created successfully");
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error(`Error creating user: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsAdding(false);
        }
    };

    const updateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
        const { error } = await supabase
            .from('profiles')
            .update({ role: newRole } as any)
            .eq('id', userId);

        if (!error) {
            setUsers(users.map(user => 
                user.id === userId ? { ...user, role: newRole } : user
            ));
            toast.success("User role updated");
        } else {
            toast.error("Error updating user role");
        }
    };

    const deleteUser = async (userId: string) => {
        setIsDeleting(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', userId);

            if (error) throw error;

            await supabase.auth.admin.deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId));
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error("Error deleting user");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />
                        <Select
                            value={newUser.role}
                            onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Display Name"
                            value={newUser.display_name}
                            onChange={e => setNewUser({ ...newUser, display_name: e.target.value })}
                        />
                        <Input
                            placeholder="Avatar URL"
                            value={newUser.avatar_url}
                            onChange={e => setNewUser({ ...newUser, avatar_url: e.target.value })}
                        />
                    </div>
                    <Button 
                        onClick={createUser}
                        disabled={isAdding || !newUser.email || !newUser.password}
                    >
                        {isAdding ? "Adding..." : "Add User"}
                    </Button>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="20" 
                                            height="20" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"
                                        >
                                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                                            <circle cx="12" cy="7" r="4"/>
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <div>{user.email}</div>
                                        {user.display_name && <div className="text-sm text-gray-500">{user.display_name}</div>}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={user.role}
                                        onValueChange={value => updateUserRole(user.id, value as 'user' | 'admin')}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="user">User</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        variant="destructive" 
                                        size="sm"
                                        onClick={() => deleteUser(user.id)}
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? "Deleting..." : "Delete"}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};