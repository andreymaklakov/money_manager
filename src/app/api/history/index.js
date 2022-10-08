const usersHistory = {
  12345: {
    expenses: [
      {
        item: 1,
        name: "Food",
        amount: 7,
        account: 101,
        comment: "McDonalds",
        date: "2022,07,10",
        id: 54321,
        currency: "$"
      },
      {
        item: 1,
        name: "Food",
        amount: 3,
        account: 101,
        comment: "",
        date: "2022,08,22",
        id: 54322,
        currency: "$"
      },
      {
        item: 3,
        name: "Pharmacy",
        amount: 15,
        account: 102,
        comment: "",
        date: "2022,09,10",
        id: 54323,
        currency: "$"
      },
      {
        item: 2,
        name: "Rent",
        amount: 10,
        account: 102,
        comment: "",
        date: "2022,09,04",
        id: 54324,
        currency: "$"
      }
    ],
    incomes: [
      {
        amount: 100,
        name: "Cash",
        account: 101,
        comment: "salary",
        date: "2022,07,10",
        id: 54325,
        currency: "$"
      },
      {
        name: "Cash",
        amount: 200,
        account: 101,
        comment: "",
        date: "2022,08,22",
        id: 54326,
        currency: "$"
      },
      {
        amount: 300,
        name: "Swedbank",
        account: 102,
        comment: "",
        date: "2022,09,10",
        id: 54327,
        currency: "$"
      },
      {
        amount: 410,
        name: "Swedbank",
        account: 102,
        comment: "salary august",
        date: "2022,09,04",
        id: 54328,
        currency: "$"
      }
    ]
  },
  67890: {
    expenses: [
      {
        item: 1,
        name: "Food",
        amount: 45,
        account: 103,
        comment: "food",
        date: "2022,03,10",
        id: 54331,
        currency: "€"
      },
      {
        item: 1,
        name: "Food",
        amount: 55,
        account: 103,
        comment: "",
        date: "2022,08,22",
        id: 54332,
        currency: "€"
      },
      {
        item: 3,
        name: "Pharmacy",
        amount: 23,
        account: 105,
        comment: "",
        date: "2022,09,10",
        id: 54333,
        currency: "$"
      },
      {
        item: 2,
        name: "Rent",
        amount: 12,
        account: 106,
        comment: "",
        date: "2022,09,04",
        id: 54334,
        currency: "$"
      }
    ],
    incomes: [
      {
        amount: 100,
        account: 103,
        name: "Cash",
        comment: "advanse",
        date: "2022,07,10",
        id: 54335,
        currency: "€"
      },
      {
        amount: 200,
        account: 103,
        name: "Cash",
        comment: "",
        date: "2022,08,22",
        id: 54336,
        currency: "€"
      },
      {
        amount: 300,
        account: 104,
        name: "Swedbank",
        comment: "",
        date: "2022,09,10",
        id: 54337,
        currency: "€"
      },
      {
        amount: 410,
        account: 105,
        name: "Revolut",
        comment: "cash",
        date: "2022,09,04",
        id: 54338,
        currency: "$"
      },
      {
        amount: 10,
        account: 106,
        name: "Sber",
        comment: "add",
        date: "2022,09,04",
        id: 54339,
        currency: "$"
      }
    ]
  }
};

const fetchUsersHistory = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(usersHistory);
    }, 2000);
  });

export default { fetchUsersHistory };
