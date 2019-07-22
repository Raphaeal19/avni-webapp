import React from "react";
import { includes, intersection, isEmpty } from "lodash";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { AccessDenied } from "../common/components";
import { OrgManager } from "../adminApp";
import { DataEntry } from "../dataEntryApp";
import Forms from "../formDesigner/components/Forms";
import FormDetails from "../formDesigner/components/FormDetails";
import Concepts from "../formDesigner/components/Concepts";
import NewConcept from "../formDesigner/components/NewConcept";
import Concept from "../formDesigner/components/Concept";
import { ROLES, withoutDataEntry } from "../common/constants";
import "./SecureApp.css";

const RestrictedRoute = ({
  component: C,
  allowedRoles,
  currentUserRoles,
  ...rest
}) => (
  <Route
    {...rest}
    render={routerProps =>
      isEmpty(allowedRoles) ||
      !isEmpty(intersection(allowedRoles, currentUserRoles)) ? (
        <C {...routerProps} />
      ) : (
        <AccessDenied />
      )
    }
  />
);

const Routes = props => (
  <Switch>
    <RestrictedRoute
      exact
      path="/admin"
      allowedRoles={[ROLES.ORG_ADMIN]}
      currentUserRoles={props.userRoles}
      component={OrgManager}
    />
    <RestrictedRoute
      path="/app/:page"
      allowedRoles={[ROLES.USER]}
      currentUserRoles={props.userRoles}
      component={DataEntry}
    />
    <RestrictedRoute
      exact
      path="/forms"
      allowedRoles={[ROLES.ORG_ADMIN]}
      currentUserRoles={props.userRoles}
      component={Forms}
    />
    <RestrictedRoute
      exact
      path="/forms/:formUUID"
      allowedRoles={[ROLES.ORG_ADMIN]}
      currentUserRoles={props.userRoles}
      component={FormDetails}
    />
    <RestrictedRoute
      exact
      path="/concepts"
      allowedRoles={[ROLES.ORG_ADMIN]}
      currentUserRoles={props.userRoles}
      component={Concepts}
    />
    <RestrictedRoute
      exact
      path="/concepts/addConcept"
      allowedRoles={[ROLES.ORG_ADMIN]}
      currentUserRoles={props.userRoles}
      component={NewConcept}
    />
    <RestrictedRoute
      exact
      path="/concepts/:conceptId"
      allowedRoles={[ROLES.ORG_ADMIN]}
      currentUserRoles={props.userRoles}
      component={Concept}
    />
    <Route exact path="/app">
      <Redirect to="/app/search" />
    </Route>
    <Route exact path="/">
      <Redirect
        to={includes(props.userRoles, ROLES.ORG_ADMIN) ? "/admin" : "/app"}
      />
    </Route>
    <Route
      component={() => (
        <div>
          <span>Page Not found</span>
        </div>
      )}
    />
  </Switch>
);

const RoutesWithoutDataEntry = props => (
  <Switch>
    <RestrictedRoute
      exact
      path="/admin"
      allowedRoles={[ROLES.ORG_ADMIN]}
      currentUserRoles={props.userRoles}
      component={OrgManager}
    />
    <Route exact path="/">
      <Redirect to="/admin" />
    </Route>
  </Switch>
);

const mapStateToProps = state => ({
  userRoles: state.app.user.roles
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(withoutDataEntry ? RoutesWithoutDataEntry : Routes)
);