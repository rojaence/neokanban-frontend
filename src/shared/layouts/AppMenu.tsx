import { Home } from 'lucide-react';
import { DashboardFullRoutePaths } from '@/modules/dashboard/constants/dashboardRoutePaths';
import {
  SidebarMenuItem,
  SidebarMenu,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarGroup,
  SidebarMenuButton,
} from '../components/ui/sidebar';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export const AppMenu = () => {
  const { t } = useTranslation(['common']);
  const menu = [
    {
      id: 'dashboard',
      title: t('routes.home'),
      children: [
        {
          id: 'home',
          title: t('routes.home'),
          url: DashboardFullRoutePaths.base,
          icon: Home,
        },
      ],
    },
  ];

  return (
    <>
      {menu.map((item) => (
        <SidebarGroup key={item.id}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.children.map((subItem) => (
                <SidebarMenuItem key={subItem.id}>
                  <SidebarMenuButton asChild>
                    <Link to={subItem.url}>
                      <subItem.icon />
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
};
