import { type ConfirmDialogProps } from 'react-confirm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import type {
  ActionButtonProps,
  DialogVariantColor,
} from '../../interfaces/uiCommon';
import { useTranslation } from 'react-i18next';
import { AlertCircle, XCircle } from 'lucide-react';

export interface CustomDialogProps {
  variant?: DialogVariantColor;
  message: string;
  title: string;
  subtitle?: string;
  confirmButton?: ActionButtonProps;
  cancelButton?: ActionButtonProps;
  showCancelButton?: boolean;
}

export const ConfirmDialog = ({
  show,
  variant = 'default',
  proceed,
  message,
  subtitle,
  title,
  cancelButton,
  confirmButton,
  showCancelButton = false,
}: ConfirmDialogProps<CustomDialogProps, boolean>) => {
  const { t } = useTranslation(['common']);
  const defaultConfirmButton: ActionButtonProps = {
    label: t('common:actions.accept'),
  };
  const defaultCancelButton: ActionButtonProps = {
    label: t('common:actions.cancel'),
  };
  const handleOnConfirm = () => {
    proceed(true);
  };

  const handleOnCancel = () => {
    proceed(false);
  };

  const iconColors: Record<DialogVariantColor, string> = {
    default: 'stroke-primary',
    success: 'stroke-success',
    destructive: 'stroke-destructive',
  };
  const iconMap: Record<DialogVariantColor, React.ReactNode> = {
    default: <AlertCircle className={iconColors[variant]} />,
    success: <AlertCircle className={iconColors[variant]} />,
    destructive: <XCircle className={iconColors[variant]} />,
  };
  const configConfirmButton = { ...defaultConfirmButton, ...cancelButton };
  const configCancelButton = { ...defaultCancelButton, ...confirmButton };

  return (
    <Dialog open={show}>
      <DialogContent showCloseButton={false}>
        <DialogTitle className="flex items-center gap-2">
          {iconMap[variant]}
          <span>{title}</span>
        </DialogTitle>
        {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
        <div>
          <p>{message}</p>
        </div>
        <DialogFooter>
          {showCancelButton && (
            <Button
              onClick={handleOnCancel}
              variant="ghost"
              className="capitalize"
            >
              {configCancelButton.label}
            </Button>
          )}
          <Button
            onClick={handleOnConfirm}
            variant={variant}
            className="capitalize"
          >
            {configConfirmButton.label}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
