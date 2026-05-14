export interface Button {
  path: string;
  src: React.ReactNode;
  action: () => void;
}

export interface Navigate {
  path: string;
  label: string;
}


