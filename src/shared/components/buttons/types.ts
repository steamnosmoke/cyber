type TProps = {
  children: string;
  onClick?: () => void;
  twclass?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
};

export default TProps;