export interface RSVPForm {
  name: string;
  email: string;
  attending: boolean;
  message?: string;
}

export interface WeddingDetails {
  date: string;
  time: string;
  venue: string;
}

export interface CoupleStory {
  title: string;
  content: string;
  images: string[];
}