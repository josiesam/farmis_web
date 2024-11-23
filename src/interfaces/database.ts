export interface IUserData {
    $id: string;
    name: string;
    username: string;
    pref: {
      userType: string;
      username: string;
      gender: string;
    }
    [key: string]: any;
  }