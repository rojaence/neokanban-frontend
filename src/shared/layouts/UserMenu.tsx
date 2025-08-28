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
import { ChevronUp, UserIcon, CircleUserIcon, LogOutIcon } from 'lucide-react';
import useAuthState from '@/modules/auth/state/authState';
import { useTranslation } from 'react-i18next';
import { useLogout } from '@/modules/auth/services/authService';
import { useNavigate } from 'react-router';
import { AuthFullRoutePaths } from '@/modules/auth/constants/authRoutePaths';

export const UserMenu = () => {
  const userData = useAuthState((state) => state.userData);
  const navigate = useNavigate();
  const logout = useLogout();
  const handleLogout = async () => {
    await logout.mutateAsync(undefined, {
      onSuccess: () => {
        void navigate(AuthFullRoutePaths.login);
      },
    });
  };
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
              <CircleUserIcon />
              <span className="capitalize">{t('common:routes.account')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon />
              <span className="capitalize">{t('auth:logout')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
