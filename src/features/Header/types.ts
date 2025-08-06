export type TButton = {
  path: string;
  src: React.ReactNode;
  action: () => void;
};

export type TNavigate = {
  path: string;
  label: string;
};


export type TSearchStore = {
  value: string;
  Searching: (value: string) => void;
  ClearValue: () => void;
};

