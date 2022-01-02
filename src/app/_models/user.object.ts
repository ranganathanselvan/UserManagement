export class UserObject {
  userId: number;
  guid: string;
  firstName: string;
  lastName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneConfirmed: boolean;
  isLocked: boolean;
  isActive: boolean;
  isForcePasswordChange: boolean;
  createdBy: number;
  createdDate: Date;
}