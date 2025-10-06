import { confirmable, createConfirmation } from 'react-confirm';
import { ConfirmDialog } from './ConfirmDialog';

export const confirmService = createConfirmation(confirmable(ConfirmDialog));
