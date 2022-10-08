import logo from "../../common/logo/logo.png";

export const icons = {
  add: "add",
  bag: "bag",
  burger: "burger",
  cigarrete: "cigarrete",
  coffee: "coffee",
  "customer-service": "customer-service",
  diet: "diet",
  freelance: "freelance",
  gadgets: "gadgets",
  home: "home",
  joystick: "joystick",
  laundry: "laundry",
  liquor: "liquor",
  more: "more",
  "online-shopping": "online-shopping",
  pharmacy: "pharmacy",
  rent: "rent",
  restaurant: "restaurant",
  "shopping-bag": "shopping-bag",
  sport: "sport",
  sweets: "sweets",
  taxi: "taxi",
  "travel-bag": "travel-bag",
  vehicle: "vehicle",
  "watching-a-movie": "watching-a-movie"
};

const fetchIcons = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(icons);
    }, 2000);
  });

const fetchLogo = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(logo);
    }, 2000);
  });

export default { fetchIcons, fetchLogo };
