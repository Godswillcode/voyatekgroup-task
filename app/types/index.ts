export interface IEmptyProps {
  image: string;
  title: string;
  linkPath: string;
}

export interface ICardWrapProps {
  icon: string;
  title: string;
  bgColor: string;
  children: React.ReactNode
  titleColor?: string;
  link: string;
  buttonTextColor?: string;
}