export interface JwtPayload {
  sub: string;
  residential?: {
    role: string;
    id: string;
  }
}