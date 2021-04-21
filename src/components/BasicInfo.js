import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import "date-fns";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import { globalVar } from "./PreapprovalPage1";

const useStyles = makeStyles((theme) => ({
  payForm: {
    width: "100%", // Fix IE 11 issue.
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  radioGroup: {
    display: "block",
  },
}));

const BasicInfo = () => {
  const { basicInfo, setBasicInfo } = useContext(globalVar);
  const classes = useStyles();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBasicInfo((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="row">
      <div className="col-xs-7" id="col-xs-12">
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography component="p">Please Enter Your Full Name</Typography>
              <form className={classes.payForm} noValidate>
                <TextField
                  type="text"
                  variant="outlined"
                  margin="normal"
                  name="fullName"
                  value={basicInfo.fullName}
                  onChange={handleChange}
                  autoFocus
                />
              </form>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography component="p">
                Please Enter Total Cart Value
              </Typography>
              <form className={classes.payForm} noValidate>
                <TextField
                  type="number"
                  variant="outlined"
                  margin="normal"
                  name="totalCartValue"
                  value={basicInfo.totalCartValue}
                  onChange={handleChange}
                />
              </form>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" gutterBottom>
                What Do You Do?
              </Typography>
              <RadioGroup
                aria-label="Questions"
                name="Questions1"
                onChange={handleChange}
                row
                className={classes.radioGroup}
              >
                <FormControlLabel
                  value="PE"
                  name="workstatus"
                  onChange={handleChange}
                  control={<Radio color="primary" />}
                  label="Paid Employment"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="SEF"
                  name="workstatus"
                  control={<Radio color="primary" />}
                  label="Self Employed/Freelance"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="CO"
                  name="workstatus"
                  control={<Radio color="primary" />}
                  label="Corporate Organisation"
                  labelPlacement="start"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" gutterBottom>
                How much do you get paid monthly?
              </Typography>
              <TextField
                variant="outlined"
                // error={signupFormData.error.contact.status}
                // helperText={signupFormData.error.contact.message}
                value={basicInfo.pay}
                type="number"
                onChange={handleChange}
                required
                name="pay"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justify="space-around">
                <TextField
                  type="date"
                  className={classes.textField}
                  name="selectedDate"
                  format="MM/dd/yyyy"
                  value={basicInfo.selectedDate}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" gutterBottom>
                Do you have any existing loan(s)?
              </Typography>
              <RadioGroup
                aria-label="Questions"
                name="Questions1"
                onChange={handleChange}
                row
                className={classes.radioGroup}
              >
                <FormControlLabel
                  value="YES"
                  name="loan"
                  control={<Radio color="primary" />}
                  label="YES"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="NO"
                  name="loan"
                  control={<Radio color="primary" />}
                  label="NO"
                  labelPlacement="start"
                />
              </RadioGroup>
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    </div>
  );
};

export default BasicInfo;
