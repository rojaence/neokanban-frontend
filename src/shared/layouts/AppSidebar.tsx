import useAuthState from '@/modules/auth/state/authState';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from '../components/ui/sidebar';
import { AppMenu } from './AppMenu';

export const AppSidebar = () => {
  const userData = useAuthState((state) => state.userData);

  return (
    <Sidebar variant="floating">
      <SidebarContent>
        <AppMenu />
      </SidebarContent>
      <SidebarFooter>{userData?.username}</SidebarFooter>
    </Sidebar>
  );
};
