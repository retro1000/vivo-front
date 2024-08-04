export const navigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  { 
    name: "Products", 
    icon: "shopping_basket",
    children: [
      { name: "Product list", icon: "web_asset", path: "/product/list" },
      { name: "Create new product", icon: "mode_edit", path: "/product/create" },
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
