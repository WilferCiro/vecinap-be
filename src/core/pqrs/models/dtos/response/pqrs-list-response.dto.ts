export interface PqrsListResponseDto {
  id: number;
  description: string;
  subject: string;
  createdAt: Date;
  type: string;
  status: string;
  user: {
    firstName: string;
    lastName: string;
  };
  pqrsResponses: {
    createdAt: Date;
    message: string;
    responder: {
      firstName: string;
      lastName: string;
    }
  }[]
}