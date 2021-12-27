export class JwtObject {
  EmailId: string = '';
  FirstName: string = '';
  LastName: string = '';
  UserId: string = '';
  UserName: string = '';
  exp: Date = new Date();
  iat: Date = new Date();
  jti: string = '';
  nbf: Date = new Date();
  role: string[] = [];
}
