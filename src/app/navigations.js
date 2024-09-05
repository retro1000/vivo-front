export const navigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  { 
    name: "Products", 
    icon: "shopping_basket",
    children: [
      { name: "Product list", iconText: "E", path: "/product/list" },
      { name: "Create new product", iconText: "E", path: "/product/create" },
    ] 
  },
  { 
    name: "Orders", 
    icon: "attach_money",
    children: [
      { name: "Product list", iconText: "E", path: "/order/list" },
    ] 
  },

  // { label: "PAGES", type: "label" },
  {
    name: "Charts",
    icon: "trending_up",
    children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }]
  },
  // {
  //   name: "Documentation",
  //   icon: "launch",
  //   type: "extLink",
  //   path: "http://demos.ui-lib.com/matx-react-doc/"
  // }
];
