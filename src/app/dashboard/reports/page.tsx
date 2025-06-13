'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york-v4/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york-v4/ui/tabs';
import { FileText, Download, Filter, Calendar, RefreshCw } from 'lucide-react';

// Mock report data
const reports = [
  { id: '1', name: 'Monthly Performance Report', date: '2025-06-01', type: 'Performance', status: 'Completed' },
  { id: '2', name: 'User Activity Summary', date: '2025-06-05', type: 'Activity', status: 'Completed' },
  { id: '3', name: 'Financial Overview Q2', date: '2025-06-10', type: 'Financial', status: 'Completed' },
  { id: '4', name: 'System Health Check', date: '2025-06-11', type: 'System', status: 'Processing' },
  { id: '5', name: 'User Engagement Analysis', date: '2025-06-12', type: 'Engagement', status: 'Scheduled' },
];

export default function ReportsPage() {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Filter reports based on search term and type
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || report.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            View and generate system reports.
          </p>
        </div>
        {(user?.role === 'admin' || user?.role === 'super_admin') && (
          <Button className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generate New Report
          </Button>
        )}
      </div>

      <Tabs defaultValue="all-reports">
        <TabsList>
          <TabsTrigger value="all-reports">All Reports</TabsTrigger>
          <TabsTrigger value="my-reports">My Reports</TabsTrigger>
          {(user?.role === 'admin' || user?.role === 'super_admin') && (
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="all-reports" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Available Reports</span>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </CardTitle>
              <CardDescription>
                Browse and download available reports.
              </CardDescription>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="activity">Activity</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="engagement">Engagement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReports.length > 0 ? (
                  filteredReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-primary/10 p-2">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{report.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {report.date}
                            </div>
                            <div>Type: {report.type}</div>
                            <div>
                              Status: 
                              <span className={`ml-1 ${
                                report.status === 'Completed' ? 'text-green-500' : 
                                report.status === 'Processing' ? 'text-amber-500' : 'text-blue-500'
                              }`}>
                                {report.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        disabled={report.status !== 'Completed'}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                    <p className="text-muted-foreground">No reports found matching your criteria</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-reports" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>My Reports</CardTitle>
              <CardDescription>
                Reports you have generated or requested.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                <p className="text-muted-foreground">You haven't generated any reports yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {(user?.role === 'admin' || user?.role === 'super_admin') && (
          <TabsContent value="scheduled" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>
                  Manage scheduled and recurring reports.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed">
                  <p className="text-muted-foreground">No scheduled reports configured</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

// Search icon component
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
