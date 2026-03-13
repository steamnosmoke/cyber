export interface Inputs {
  type: string;
  label: string;
  value: string;
  placeholder: string;
  func: (s: string) => void;
}

export interface ModalProps {
  onClose: () => void;
  onSwitchToRegister?: () => void;
  onSwitchToLogin?: () => void;
}
