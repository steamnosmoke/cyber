export type TButton = {
  path: string;
  action: () => void;
  src: React.ReactNode;
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
