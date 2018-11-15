import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'

import migrationReportStyle from '../assets/jss/migrationReportStyle.jsx'


// Rejected migrations report generation for export
  function convertRejectedInputsToCSV(data) {
    let firstName = "", lastName="", workPhone = "", homePhone= "", email="", birthday=""
    let result = 'firstNname,lastName,email,birthday,homePhone,workPhone,errorCode,errorTitle,errorSource\n';

    data.forEach(user => {
      const currentUser = user.user;
      const error = user.error
      if(currentUser.name){
        const nameArray = currentUser.name.split(" ")
        firstName= nameArray[0];
        lastName= nameArray[1];
      };
      if(currentUser.phones) {
        let wPhone = currentUser.phones.find(phone => {return phone.type === 'work'})
        let hPhone = currentUser.phones.find(phone => {return phone.type === 'home'})
        wPhone === undefined ? workPhone = "" : workPhone = wPhone.phone;
        hPhone === undefined ? workPhone = "" : homePhone = hPhone.phone;
      }

      if(currentUser.workPhone) { workPhone = currentUser.workPhone }

      if(currentUser.homePhone) { homePhone = currentUser.homePhone }

      if(currentUser.emails) {
        email = currentUser.emails[0].email
      }

      if(currentUser.birthdayAt) { birthday = currentUser.birthdayAt}
        const string =`${firstName},${lastName},${email},${birthday},${homePhone},${workPhone},${error.statusCode},${error.title},${error.source}\n`

        result = result.concat(string);
      })
      return result;
  };

  function downloadCSV(userArray) {
    let data, link, csv

      csv = convertRejectedInputsToCSV(userArray);

      if (csv == null) return;

      const filename = "rejected-users-export.csv";

      if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
      }
      link = encodeURI(csv);
      data = encodeURI(csv);
      link = document.createElement('a');
      link.setAttribute('href', data);
      link.setAttribute('download', filename);
      link.click();
  }

//Migration report element
  const MigrationReport= (props) => {
    const { classes } = props

    return(
      <Grid item xs={12} sm={7}>
        <Card className={classes.report}>
          <CardHeader
              classes ={{title: classes.cardHeader, root: classes.cardHeader }}
              title="Migration Report"
            />
            <CardContent>
            Report Lines
            </CardContent>
        </Card>
      </Grid>
    )
};

MigrationReport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(migrationReportStyle)(MigrationReport);
