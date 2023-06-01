import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect,useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import AdminLayout from "layouts/Admin.js";
import Login from "layouts/Login";
import CreateAudit from "views/Audit/Create-Audit";
import CreatePerformer from "views/Performer/create_performer";
import CreateCategory from "views/Category/category_create";
import ErrorPage from "views/ErrorType/ErrorType+Cret";
import ErrorCategory from "views/ErrorCategory/ErrorCategoryListEdit";
import Errorkindlist from "views/ErrorKind/Errorkindlist";
import Location from "views/Location/CreateLocation";
import EditPerformer from "views/Performer/edit_perfomer";
import Category_eddit from "views/Category/category_eddit";
import NotFound from "views/NotFound";
import Forgetpasword from "./ForgetPasword/forget_pasword";
import AuditSearch from "views/Audit/AuditSearch";
import ReportDocument from "views/Report/Report_Document"
import PrivateRoute from "./PrivateRoute";

ReactDOM.render(  
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/login" component={Login} />
      <PrivateRoute path="/create-audits" exact={true} component={CreateAudit} />
      <Route exact={true} path="/create_performer" component={CreatePerformer} />
      <Route exact={true} path="/category_create" component={CreateCategory} />
      <Route exact={true} path="/ErrorType+Cret" component={ErrorPage} />
      <Route
        exact={true}
        path="/ErrorCategoryListEdit"
        component={ErrorCategory}
      />
      <Route exact={true} path="/Errorkindlist" component={Errorkindlist} />

      <Route exact={true} path="/Edit_Location/:id/username=:username" component={Location} />

      <Route exact={true} path="/edit_perfomer/:id" component={EditPerformer} />

      <Route exact={true} path="/category_eddit/:id" component={Category_eddit} />
      <Route exact={true} path="/Report-Document/:id" component={ReportDocument} />

      <Route exact={true} path="/forget_pasword" component={Forgetpasword} />
      <Route exact={true} path="/admin/auditsearch/:ucId" component={AuditSearch} />

      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect to="/login" />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
