const users = [
  {
    id: 12345,
    email: "user@user.lv",
    password: "Maklakovs123",
    name: "Andrejs",
    surname: "Maklakovs",
    currency: "$"
  },
  {
    id: 67890,
    email: "test@test.lv",
    password: "Nikitina123",
    name: "Anna",
    surname: "Nikitina",
    currency: "€"
  }
];

const fetchUsers = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(users);
    }, 2000);
  });

export default { fetchUsers };
