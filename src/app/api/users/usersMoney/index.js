import { icons } from "../../icons";

const usersMoney = {
  12345: [
    { id: 101, name: "Cash", amount: 0, currency: "$" },
    { id: 102, name: "Swedbank", amount: 0, currency: "$" }
  ],
  67890: [
    { id: 103, name: "Cash", amount: 0, currency: "€" },
    { id: 104, name: "Swedbank", amount: 0, currency: "€" },
    { id: 105, name: "Revolut", amount: 0, currency: "$" },
    { id: 106, name: "Sber", amount: 0, currency: "$" }
  ]
};

const usersIncomes = {
  12345: [
    { id: 101, name: "Cash", amount: 0, currency: "$" },
    { id: 102, name: "Swedbank", amount: 0, currency: "$" }
  ],
  67890: [
    { id: 103, name: "Cash", amount: 0, currency: "€" },
    { id: 104, name: "Swedbank", amount: 0, currency: "€" },
    { id: 105, name: "Revolut", amount: 0, currency: "$" },
    { id: 106, name: "Sber", amount: 0, currency: "$" }
  ]
};

const usersExpenses = {
  12345: [
    { name: "Food", icon: icons.burger, amount: 0, currency: "$", id: 1 },
    { name: "Rent", icon: icons.rent, amount: 0, currency: "$", id: 2 },
    {
      name: "Pharmacy",
      icon: icons.pharmacy,
      amount: 0,
      currency: "$",
      id: 3
    },
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
  ],
  67890: [
    { name: "Food", icon: icons.burger, amount: 0, currency: "€", id: 1 },
    { name: "Rent", icon: icons.rent, amount: 0, currency: "$", id: 2 },
    { name: "Pharmacy", icon: icons.pharmacy, amount: 0, currency: "$", id: 3 },
    { name: "Car", icon: icons.vehicle, amount: 0, currency: "€", id: 4 },
    { name: "Sports", icon: icons.sport, amount: 0, currency: "$", id: 8 },
    { name: "Coffee", icon: icons.coffee, amount: 0, currency: "$", id: 10 }
  ]
};

const currencies = [
  { name: "$", tooltipTitle: "US Dollar", id: 1 },
  { name: "€", tooltipTitle: "EURO", id: 2 },
  { name: "£", tooltipTitle: "British Pound", id: 3 },
  { name: "₴", tooltipTitle: "Ukrainian Hryvnia", id: 4 },
  { name: "¥", tooltipTitle: "Japanese Yen", id: 5 },
  { name: "₽", tooltipTitle: "Russian Ruble", id: 6 },
  { name: "₺", tooltipTitle: "Turkish Lira", id: 7 }
];

const fetchUsersMoney = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(usersMoney);
    }, 2000);
  });

const fetchUsersIncomes = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(usersIncomes);
    }, 2000);
  });

const fetchUsersExpenses = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(usersExpenses);
    }, 2000);
  });

const fetchCurrencies = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(currencies);
    }, 2000);
  });

export default {
  fetchUsersMoney,
  fetchUsersIncomes,
  fetchUsersExpenses,
  fetchCurrencies
};
