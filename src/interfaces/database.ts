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

export interface IFarmerData {
  $id: string;
  farm_size: string;
  digital_literacy_level: string;
  [key: string]: any;
}

export interface IInvestorData {
  $id: string;
  funding_cap: string;
  region_preference: string;
  [key: string]: any;
}

export interface IStakeholderData {
  $id: string;
  sector_focus: string;
  area_of_interest: string;
  [key: string]: any;
}

export interface ILocationData {
  $id: string;
  region: string;
  district: string;
  [key: string]: any;
}