'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/new-york-v4/ui/avatar';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york-v4/ui/tabs';
import { UserCircle, Key, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Product enthusiast and technology advocate.',
    location: 'San Francisco, CA',
    website: 'https://example.com',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile via API
    setIsEditing(false);
    // Update user in store if needed
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          View and manage your profile information.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <Card>
          <CardHeader>
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatar || '/avatars/user.png'} alt={user?.name || 'User'} />
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center">
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground capitalize">{user?.role.replace('_', ' ')}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Email</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Authentication Provider</p>
                <p className="text-sm text-muted-foreground capitalize">{user?.provider}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Member Since</p>
                <p className="text-sm text-muted-foreground">June 2025</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              {user?.provider === 'discord' ? 'Manage Discord Connection' : 'Change Password'}
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Security
              </TabsTrigger>
              {(user?.role === 'admin' || user?.role === 'super_admin') && (
                <TabsTrigger value="permissions" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Permissions
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your profile information and personal details.
                      </CardDescription>
                    </div>
                    {!isEditing && (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      {isEditing && (
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">Save Changes</Button>
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and authentication settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password</h3>
                    {user?.provider === 'credentials' ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button>Update Password</Button>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        You are using Discord authentication. Password management is handled through Discord.
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-4 pt-6">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                  
                  <div className="space-y-4 pt-6">
                    <h3 className="text-lg font-medium">Login Sessions</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage your active login sessions across devices.
                    </p>
                    <Button variant="outline">View Active Sessions</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {(user?.role === 'admin' || user?.role === 'super_admin') && (
              <TabsContent value="permissions" className="space-y-4 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Role and Permissions</CardTitle>
                    <CardDescription>
                      View your role and associated permissions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Current Role</h3>
                        <div className="flex items-center gap-2 rounded-md border p-3">
                          <Shield className="h-5 w-5 text-primary" />
                          <span className="font-medium capitalize">{user?.role.replace('_', ' ')}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">Permissions</h3>
                        <div className="space-y-2">
                          {user?.role === 'super_admin' ? (
                            <p className="text-sm">
                              As a Super Admin, you have full access to all features and functionality of the system.
                            </p>
                          ) : user?.role === 'admin' ? (
                            <p className="text-sm">
                              As an Admin, you have access to most features except for system-level configurations.
                            </p>
                          ) : (
                            <p className="text-sm">
                              As a User, you have access to basic features and your own data.
                            </p>
                          )}
                          
                          <div className="space-y-2 pt-2">
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                'View Dashboard',
                                'Access Reports',
                                'View Analytics',
                                ...((user?.role === 'admin' || user?.role === 'super_admin') ? ['Manage Users', 'Create Reports'] : []),
                                ...(user?.role === 'super_admin' ? ['System Configuration', 'Role Management', 'API Access'] : []),
                              ].map((permission, i) => (
                                <div key={i} className="flex items-center gap-2 rounded-md border p-2">
                                  <div className="h-2 w-2 rounded-full bg-green-500" />
                                  <span className="text-sm">{permission}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
