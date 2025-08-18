import { Outlet } from 'react-router';
import { SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Menu as MenuIcon } from 'lucide-react';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-2">
        <SidebarTrigger icon={<MenuIcon />} />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
