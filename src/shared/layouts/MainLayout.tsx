import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Menu as MenuIcon } from 'lucide-react';
import { AppHeader } from './AppHeader';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <AppHeader start={<SidebarTrigger icon={<MenuIcon />} />} />
      <main className="p-2">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
