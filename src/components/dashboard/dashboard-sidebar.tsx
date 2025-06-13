'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuthStore } from '@/lib/store/auth-store';
import { useUIStore } from '@/lib/store/ui-store';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/registry/new-york-v4/ui/sidebar';

import {
  BarChart3,
  Users,
  Settings,
  Home,
  ShieldCheck,
  LayoutDashboard,
  FileText,
  ChevronLeft,
  ChevronRight,
  UserCircle
} from 'lucide-react';
import { Button } from '@/registry/new-york-v4/ui/button';
import { NavUser } from '@/components/nav-user';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles?: Array<'super_admin' | 'admin' | 'user'>;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    roles: ['super_admin', 'admin', 'user']
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    roles: ['super_admin', 'admin', 'user']
  },
  {
    title: 'Reports',
    href: '/dashboard/reports',
    icon: FileText,
    roles: ['super_admin', 'admin', 'user']
  },
  {
    title: 'User Management',
    href: '/dashboard/users',
    icon: Users,
    roles: ['super_admin', 'admin']
  },
  {
    title: 'Admin Panel',
    href: '/dashboard/admin',
    icon: ShieldCheck,
    roles: ['super_admin']
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: UserCircle,
    roles: ['super_admin', 'admin', 'user']
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    roles: ['super_admin', 'admin', 'user']
  }
];

export function DashboardSidebar() {
  const { user } = useAuthStore();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const pathname = usePathname();

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  return (
    <Sidebar collapsible={sidebarCollapsed ? 'icon' : undefined} className="border-r shrink-0">
      <SidebarHeader className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6" />
          {!sidebarCollapsed && <span className="font-semibold">IHOF Dashboard</span>}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="h-8 w-8"
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {filteredNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  asChild 
                  className={cn(
                    pathname === item.href && "bg-accent text-accent-foreground"
                  )}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {user && (
          <NavUser 
            user={{
              name: user.name,
              email: user.email,
              avatar: user.avatar || '/avatars/user.png'
            }} 
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
