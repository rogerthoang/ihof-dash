'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york-v4/ui/tabs';
import { Shield, Settings, Database, Server, RefreshCw } from 'lucide-react';

export default function AdminPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  // Check if user has super_admin permission to access this page
  useEffect(() => {
    if (user && user.role !== 'super_admin') {
      router.push('/dashboard');
    }
  }, [user, router]);

  // If user doesn't have permission, don't render the page
  if (!user || user.role !== 'super_admin') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground">
            Advanced system configuration and management.
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="system">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="system" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                System Status
              </CardTitle>
              <CardDescription>
                Overview of system performance and resources.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">CPU Usage</p>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[35%] rounded-full bg-primary"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">35% - Normal</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Memory Usage</p>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[62%] rounded-full bg-primary"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">62% - Normal</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Disk Usage</p>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[47%] rounded-full bg-primary"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">47% - Normal</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Network</p>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 w-[28%] rounded-full bg-primary"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">28% - Low</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button>View Detailed Metrics</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configuration
                </CardTitle>
                <CardDescription>
                  System configuration settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Environment Variables
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    API Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Cache Management
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  System security configuration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Authentication Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Role Management
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Security Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="security" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security settings and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Security settings content will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="database" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Management</CardTitle>
              <CardDescription>
                Manage database connections and settings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Database management content will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="logs" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>
                View and analyze system logs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">System logs content will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
