import { icons } from "../icons";

const defExpenses = [
  { name: "Food", icon: icons.burger, amount: 0, currency: "$", id: 1 },
  { name: "Rent", icon: icons.rent, amount: 0, currency: "$", id: 2 },
  { name: "Pharmacy", icon: icons.pharmacy, amount: 0, currency: "$", id: 3 },
  { name: "Car", icon: icons.vehicle, amount: 0, currency: "$", id: 4 },
  { name: "Alcohol", icon: icons.liquor, amount: 0, currency: "$", id: 5 },
  { name: "Sweets", icon: icons.sweets, amount: 0, currency: "$", id: 6 },
  {
    name: "Travel",
    icon: icons["travel-bag"],
    amount: 0,
    currency: "$",
    id: 7
  },
  { name: "Sports", icon: icons.sport, amount: 0, currency: "$", id: 8 },
  {
    name: "Online",
    icon: icons["online-shopping"],
    amount: 0,
    currency: "$",
    id: 9
  },
  { name: "Coffee", icon: icons.coffee, amount: 0, currency: "$", id: 10 }
];

const fetchDefExpenses = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(defExpenses);
    }, 2000);
  });

export default { fetchDefExpenses };
