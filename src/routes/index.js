import { asyncComponentLoader } from "utils";

const routes = [
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/Login")),
    path: "/login",
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/Sign_Up")),
    path: "/signup",
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/Welcome")),
    path: "/",
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/TransactionList")),
    path: "/page-1",
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/Add_Trx_Page")),
    path: "/page-2",
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/Product_Details_Page")),
    path: "/page-3",
  },
  {
    exact: true,
    component: asyncComponentLoader(() => import("pages/Product_Page")),
    path: "/:batchId",
  },
  {
    component: asyncComponentLoader(() => import("components/NotFound")),
  },
];

export default routes;
