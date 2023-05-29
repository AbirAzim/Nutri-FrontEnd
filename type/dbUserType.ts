export interface DbUserType {
  _id: string;
  bio: string;
  yourBlender: string;
  provider: string;
  displayName: string;
  firstName: string;
  orderHistoty: any[];
  lastName: string;
  email: string;
  location: string;
  myCart: any[];
  recentViewedProducts: any[];
  image: string;
  createdAt: string;
  configuration: Configuration;
  compareLength: number;
  wikiCompareCount: number;
}

export interface Configuration {
  _id: string;
  gender: string;
  age: Age;
  weightInKilograms: number;
  heightInCentimeters: number;
  pregnantOrLactating: any;
  activity: string;
  dieteryLifeStyle: string;
  allergies: string[];
  preExistingMedicalConditions: string[];
  meditcation: string[];
  whyBlending: string[];
}

export interface Age {
  quantity: number;
  years: boolean;
  months: boolean;
}
