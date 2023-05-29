import { DbUserType } from "../type/dbUserType";

const sampleUser: DbUserType = {
  _id: "61c0623791c8b413ee79b661",
  bio: "Hi I am developer ",
  yourBlender: "extra large",
  provider: "email",
  displayName: "Md Foysal Kazi",
  firstName: "Foysal",
  orderHistoty: [],
  lastName: "Kazi",
  email: "foysalkazi11@gmail.com",
  location: "leafy",
  myCart: [],
  recentViewedProducts: [],
  image: "https://blending.s3.us-east-1.amazonaws.com/4046470.jpg",
  createdAt: "2021-12-20T11:00:07.061Z",
  configuration: {
    _id: "61c0623791c8b413ee79b65f",
    gender: "Male",
    age: {
      quantity: 31,
      years: true,
      months: false,
    },
    weightInKilograms: 90.70294784580499,
    heightInCentimeters: 198.12,
    pregnantOrLactating: null,
    activity: "Moderate",
    dieteryLifeStyle: "low fodmap",
    allergies: ["low", "high"],
    preExistingMedicalConditions: ["rgrgr", "tumi", "hello"],
    meditcation: ["dfgdfg", "dfgdfg", "hello"],
    whyBlending: [
      "eat more fruits and vegetables",
      "less food waste",
      "save time",
      "prevent disease",
      "workouts booster",
      "loose weight",
    ],
  },
  compareLength: 4,
  wikiCompareCount: 0,
};

export default sampleUser;
