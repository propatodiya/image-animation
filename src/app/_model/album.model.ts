export class AlbumModel {
  id: string;
  title: string;
  productUrl: string;
  mediaItemsCount?: string;
  coverPhotoBaseUrl: string;
  coverPhotoMediaItemId?: string;
}

export class GoogleAlbumResponse {
  mediaItems: MediaItem[];
  nextPageToken: string;
}

export class MediaItem {
  id: string;
  productUrl: string;
  baseUrl: string;
  mimeType: string;
  mediaMetadata: MediaMetadata;
  filename: string;
  selected?: boolean;
}

export class MediaMetadata {
  creationTime: string;
  width: string;
  height: string;
  photo: Photo;
}

export class Photo {
  cameraMake?: string;
  cameraModel?: string;
  focalLength?: number;
  apertureFNumber?: number;
  isoEquivalent?: number;
}
export class VideoOptions {
  fps: number;
  loop: number;
  transition: boolean;
  transitionDuration: number;
  videoBitrate: number;
  videoCodec: string;
  size: string;
  audioBitrate: string;
  audioChannels: number;
  format: string;
  pixelFormat: string;
}
