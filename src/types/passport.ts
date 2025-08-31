

export interface PassportUser {
  user: {
    _id: string;
    name: string;
    email: string;
    googleId: string;
  };
  token: string;
}
