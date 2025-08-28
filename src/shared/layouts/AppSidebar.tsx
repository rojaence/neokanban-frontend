import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from '../components/ui/sidebar';
import { AppMenu } from './AppMenu';
import { UserMenu } from './UserMenu';

export const AppSidebar = () => {
  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <AppMenu />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
};
