export interface UserProfile {
  username: string;
  id: string;
  name: string;
  surname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  userProfiles: UserAccessProfile[];
}

export interface UserAccessProfile {
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  profileId: string;
}
