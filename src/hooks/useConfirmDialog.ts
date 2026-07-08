import { useState } from 'react';

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const useConfirmDialog = () => {
  const [dialogState, setDialogState] = useState<ConfirmDialogState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
  });

  const confirm = (title: string, message: string, onConfirm: () => void, onCancel: () => void = () => {}) => {
    setDialogState({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        close();
      },
      onCancel: () => {
        onCancel();
        close();
      },
    });
  };

  const close = () => setDialogState((prev) => ({ ...prev, isOpen: false }));

  return { dialogState, confirm, close };
};
