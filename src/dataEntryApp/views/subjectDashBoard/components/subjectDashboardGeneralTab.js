import React, { Fragment } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Visit from "./Visit";
import SubjectButton from "./Button";
import { useTranslation } from "react-i18next";
import { InternalLink } from "common/components/utils";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  label: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  expansionPanel: {
    marginBottom: "11px",
    borderRadius: "5px",
    boxShadow:
      "0px 0px 3px 1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.3)"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left"
  },
  programStatusStyle: {
    color: "red",
    backgroundColor: "#FFB6C1",
    borderRadius: "5px"
  },
  expansionHeading: {
    fontSize: theme.typography.pxToRem(16),
    flexBasis: "33.33%",
    flexShrink: 0,
    fontWeight: "500"
  },
  listItem: {
    paddingBottom: "0px",
    paddingTop: "0px"
  },
  infomsg: {
    marginLeft: 10
  },
  expandMoreIcon: {
    color: "#0e6eff"
  },
  visitAllButton: {
    marginLeft: "20px",
    marginBottom: "10px"
  }
}));

const SubjectDashboardGeneralTab = ({ general, subjectUuid, enableReadOnly }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  let plannedVisits = [];
  let completedVisits = [];

  if (general) {
    general.forEach(function(row, index) {
      if (!row.encounterDateTime) {
        let sub = {
          key: index,
          name: row.encounterType.name,
          index: index,
          visitDate: row.earliestVisitDateTime,
          overdueDate: row.maxVisitDateTime
        };
        plannedVisits.push(sub);
      } else if (row.encounterDateTime) {
        let sub = {
          key: index,
          name: row.encounterType.name,
          index: index,
          visitDate: row.encounterDateTime,
          earliestVisitDate: row.earliestVisitDateTime
        };
        completedVisits.push(sub);
      }
    });
  }

  return (
    <Fragment>
      <Paper className={classes.root}>
        <Grid container justify="flex-end">
          {!enableReadOnly ? <SubjectButton btnLabel={t("newform")} /> : ""}
        </Grid>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon} />}
            aria-controls="plannedVisitPanelbh-content"
            id="plannedVisitPanelbh-header"
          >
            <Typography component={"span"} className={classes.expansionHeading}>
              {t("plannedVisits")}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={2}>
              {general && plannedVisits.length != 0 ? (
                general.map((row, index) =>
                  !row.encounterDateTime ? (
                    <Visit
                      type={"encounter"}
                      key={index}
                      name={row.encounterType.name}
                      index={index}
                      visitDate={row.earliestVisitDateTime}
                      overdueDate={row.maxVisitDateTime}
                      enableReadOnly={enableReadOnly}
                    />
                  ) : (
                    ""
                  )
                )
              ) : (
                <Typography variant="caption" gutterBottom className={classes.infomsg}>
                  {" "}
                  {t("no")} {t("plannedVisits")}{" "}
                </Typography>
              )}
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon className={classes.expandMoreIcon} />}
            aria-controls="completedVisitPanelbh-content"
            id="completedVisitPanelbh-header"
          >
            <Typography component={"span"} className={classes.expansionHeading}>
              {t("completedVisits")}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container spacing={2}>
              {general && completedVisits.length != 0 ? (
                general.map((row, index) =>
                  row.encounterDateTime ? (
                    <Visit
                      type={"encounter"}
                      uuid={row.uuid}
                      key={index}
                      name={t(row.encounterType.name)}
                      index={index}
                      visitDate={row.encounterDateTime}
                      earliestVisitDate={row.earliestVisitDateTime}
                      enableReadOnly={enableReadOnly}
                    />
                  ) : (
                    ""
                  )
                )
              ) : (
                <Typography variant="caption" gutterBottom className={classes.infomsg}>
                  {" "}
                  {t("no")} {t("completedVisits")}{" "}
                </Typography>
              )}
            </Grid>
          </ExpansionPanelDetails>
          {general && completedVisits.length != 0 ? (
            <InternalLink to={`/app/subject/completedEncounters?uuid=${subjectUuid}`}>
              <Button color="primary" className={classes.visitAllButton}>
                {t("viewAllVisits")}
              </Button>
            </InternalLink>
          ) : (
            ""
          )}
        </ExpansionPanel>
      </Paper>
    </Fragment>
  );
};

export default SubjectDashboardGeneralTab;
