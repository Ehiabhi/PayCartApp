import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { globalVar } from "./PreapprovalPage1";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const { loanApprovalData } = useContext(globalVar);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review Your Loan Application
      </Typography>
      <List disablePadding id="reviewList">
        {Object.keys(loanApprovalData).map((field, index) => (
          <ListItem className={classes.listItem} key={index}>
            <ListItemText primary={field.toUpperCase()} />
            <Typography variant="body2">{loanApprovalData[field]}</Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
