import Dashboard from "views/Home/home";
import Audit from "views/Audit/Audits";
import Categories from "views/Category/Categories";
import Performers from "views/Performer/performers";
import Floor from "views/floor/floor";
import Element from "views/ElementType/Elements";
import CreateAudit from "views/Audit/Create-Audit";
import Location from "views/Location/Location";
import Area from "views/Area/Area";
import KPI_Element from "views/KPIElement/KPI_Element";
import Reports from "views/Report/Reports";
import Error from "views/ErrorType/Error_type";
import CreatePerformer from "views/Performer/create_performer";
import CreateCategory from "./views/Category/category_create";
import ErrorPage from "./views/ErrorType/ErrorType+Cret";
import ErrorCategory from "./views/ErrorCategory/ErrorCategoryListEdit";
import Errorkindlist from "./views/ErrorKind/Errorkindlist";
import Edit_perfomer from "./views/Performer/edit_perfomer";

var routes = [
  {
    path: "/dashboard",
    name: "Home",
    component: Dashboard,
    layout: "/admin",
    childs: [],
  },
  {
    path: "/audit",
    name: "Audits",
    component: Audit,
    layout: "/admin",
    childs: [
      {
        name: "Create",
        path: "/create-audits",
        component: CreateAudit,
        layout: "/admin",
      },
    ],
  },
  
  {
    path: "/performers",
    name: "Performers",
    component: Performers,
    layout: "/admin",
    childs: [
      {
        name: "Create",
        path: "/create_performer",
        component: CreatePerformer,
        layout: "/admin",
      },
    ],
  },

  {
    path: "/categories",
    name: "Categories",
    component: Categories,
    layout: "/admin",
    childs: [
      {
        name: "Create",
        path: "/category_create",
        component: CreateCategory,
        layout: "/admin",
      },
    ],
  },

  {
    path: "/floor",
    name: "Floor",
    component: Floor,
    layout: "/admin",
    childs: [],
  },

  {
    path: "/elements",
    name: "Element Types",
    component: Element,
    layout: "/admin",
    childs: [],
  },
  {
    path: "/ErrorTypes",
    name: "Error Types",
    component: Error,
    layout: "/admin",

    childs: [
      {
        name: "Error Types",
        path: "/ErrorType+Cret",
        component: ErrorPage,
        layout: "/admin",
      },
      {
        name: "Error Category List",
        path: "/Error Category List",
        component: ErrorCategory,
        layout: "/admin",
      },
      {
        name: "Error kind List",
        path: "/ErrorkindList",
        component: Errorkindlist,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/locations",
    name: "Location",
    component: Location,
    layout: "/admin",
    childs: [],
  },
  {
    path: "/area-description",
    name: "Area",
    component: Area,
    layout: "/admin",

    childs: [],
  },
  {
    path: "/KPIElements",
    name: "KPI Element",
    component: KPI_Element,
    layout: "/admin",

    childs: [],
  },
  {
    path: "/reports",
    name: "Reports",
    component: Reports,
    layout: "/admin",

    childs: [],
  },
];
export default routes;
