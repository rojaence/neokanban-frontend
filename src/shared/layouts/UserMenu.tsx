import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../components/ui/sidebar';
import { ChevronUp, UserIcon } from 'lucide-react';
import useAuthState from '@/modules/auth/state/authState';
import { useTranslation } from 'react-i18next';

export const UserMenu = () => {
  const userData = useAuthState((state) => state.userData);
  const { t } = useTranslation(['auth', 'common']);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-full">
              <UserIcon /> {userData?.username}
              <ChevronUp className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="w-full">
            <DropdownMenuItem>
              <span className="capitalize">{t('common:routes.account')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span className="capitalize">{t('auth:logout')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
