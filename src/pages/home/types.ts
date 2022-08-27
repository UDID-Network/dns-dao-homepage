export enum CONTACT_METHODS {
  SMS = 'sms',
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  TELEGRAM = 'telegram',
  GITHUB = 'github',
  LINKEDIN = 'linkedin',
}

export enum DIRECTION {
  LEFT,
  RIGHT,
}

export interface Research {
  id: string;
  title: string;
  previewImg: string;
  link: string;
  clicked: boolean;
}

export interface Project {
  id: string;
  name: string;
  logo: string;
  bgColor: string;
  link?: string;
  description: string;
  memberList: Member[];
  activeIndex?: number;
}

export interface Member {
  id: string;
  name: string;
  workYears: number;
  icon: string;
  role: string;
  contacts: { type: CONTACT_METHODS; link: string }[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface News {
  id: string;
  title: string;
  subTitle: string;
  previewImg: string;
  introduction: string;
  link: string;
}

export interface DocPage {
  id: string;
  url: string;
}
