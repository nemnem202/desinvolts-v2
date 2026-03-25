export type ApiResponse<Body> =
  | {
      success: true;
      message?: string;
      description?: string;
      body: Body;
    }
  | {
      success: false;
      message?: string;
      description?: string;
    };

export type ApiRequest<Body, Reply> = {
  Body: Body;
  Reply: ApiResponse<Reply>;
};

export type PostImageReply = {
  image: string;
};

export type GetEmbedReply = {
  url: string;
};

export type ConnexionReply = {
  connected: boolean;
  jwt: string;
};

export type UploadImageReply = {
  fileName: string;
};

export type ImageReply = {
  image: Buffer<ArrayBufferLike>;
};

export type ApiRoute = "connexion";
