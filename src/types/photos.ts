export interface PhotoStory {
  id: string;
  title: string;
  photos: string[];
  duration: number;
}

export interface Photo {
  id: string;
  src: string;
  title: string;
  location: string;
  date: string;
  dominantColor: string;
  tags: string[];
  views?: number;
  likes?: number;
  aspectRatio: number;
  story?: PhotoStory;
  placeholder?: string;
  width: number;
  height: number;
}

export interface PhotoAlbum {
  id: string;
  title: string;
  cover: string;
  count: number;
  palette: string[];
  location: string;
  date: string;
  description: string;
  photos: Photo[];
}


