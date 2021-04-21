import React, { useContext, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { globalVar } from "./PreapprovalPage1";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    margin: "auto",
  },
  grid: {
    // backgroundColor: "yellow",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  gridroot: {
    flexGrow: 1,
  },
  gridpaper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  payRoot: {
    height: "100%",
    border: "1px solid black",
    borderRadius: "5px",
  },
  payBack: {
    borderRadius: "5px",
  },
  payPaper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "80%",
  },
  payForm: {
    width: "100%", // Fix IE 11 issue.
  },
  paySubmit: {
    margin: theme.spacing(3, 0, 0),
  },
}));

const PaymentBreakdown = () => {
  const {
    formData,
    setformData,
    basicInfo,
    setButtonStateForPay,
    setLoanApprovalData,
    bdpbutton,
    setbdpbutton,
    setbdpContinueButton,
  } = useContext(globalVar);
  const classes = useStyles();
  const [payBreakDown, setPayBreakDown] = React.useState({
    ShoppingCredit: null,
    DownPayment: null,
    MonthlyInstallment: null,
    Tenure: null,
  });
  const [error, setError] = React.useState({
    status: false,
    message: null,
  });

  useEffect(() => {
    if (
      Number(formData.downpayment) >=
      Number(basicInfo.totalCartValue) * 0.3
    ) {
      setButtonStateForPay(false);
      setbdpbutton(false);
      setError({
        status: false,
        message: null,
      });
    } else {
      setPayBreakDown({
        ShoppingCredit: "",
        DownPayment: "",
        MonthlyInstallment: "",
        Tenure: "",
      });
      setButtonStateForPay(true);
      setError({
        status: true,
        message: "Minimum down payment must be 30% of the total cart value",
      });
      setbdpbutton(true);
    }
  }, [formData.downpayment, basicInfo.totalCartValue]);

  const handleInputChange = (e) => {
    setbdpContinueButton(true);
    const name = e.target.name;
    const value = e.target.value;
    const stateDownPay = {
      [name]: Number(value),
    };
    const statePayPlan = {
      [name]: Number(value),
      downpayment: Number(basicInfo.totalCartValue) * 0.3,
    };
    setformData((prevState) => {
      if (name === "downpayment") {
        return { ...prevState, ...stateDownPay };
      }
      if (name === "payplan") {
        return { ...prevState, ...statePayPlan };
      }
    });
  };

  const submit = (e) => {
    e.preventDefault();
    setbdpContinueButton(false);
    const totalCartValue = Number(basicInfo.totalCartValue);
    const downPayment = Number(formData.downpayment);
    const shoppingCredit = totalCartValue - downPayment;
    const payDuration = Number(formData.payplan);
    const interestRate = 0.04 * shoppingCredit;
    const totalInterestPayable = interestRate * payDuration;
    const monthlyRepayment =
      (shoppingCredit + totalInterestPayable) / payDuration;

    setPayBreakDown({
      ShoppingCredit: "=N= " + shoppingCredit,
      DownPayment: "=N= " + downPayment,
      MonthlyInstallment: "=N= " + monthlyRepayment,
      Tenure: payDuration,
    });

    setLoanApprovalData((prevState) => {
      return {
        ...prevState,
        totalCartValue,
        downPayment,
        shoppingCredit,
        payDuration,
        interestRate,
        totalInterestPayable,
        monthlyRepayment,
      };
    });
  };

  const categories = {
    "Shopping Credit": !payBreakDown.ShoppingCredit
      ? ""
      : payBreakDown.ShoppingCredit,
    "Down Payment": !payBreakDown.ShoppingCredit
      ? ""
      : payBreakDown.DownPayment,
    "Monthly Installment": !payBreakDown.ShoppingCredit
      ? ""
      : payBreakDown.MonthlyInstallment,
    Tenure: !payBreakDown.ShoppingCredit ? "" : payBreakDown.Tenure,
  };

  function LeftFormRow() {
    return (
      <React.Fragment>
        {Object.keys(categories).map((cat, index) => {
          return (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <Paper className={classes.gridpaper}>{cat}</Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.gridpaper}>{categories[cat]}</Paper>
              </Grid>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }

  return (
    <div className="row">
      <div className="col-xs-12" id="col-xs-12">
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" gutterBottom>
                Choose Your Plan
              </Typography>
              <RadioGroup
                aria-label="Questions"
                name="Questions1"
                onChange={handleInputChange}
                row
                className={classes.radioGroup}
              >
                <FormControlLabel
                  value="1"
                  name="payplan"
                  control={<Radio color="primary" />}
                  label="1 Month"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="2"
                  name="payplan"
                  control={<Radio color="primary" />}
                  label="2 Months"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="3"
                  name="payplan"
                  control={<Radio color="primary" />}
                  label="3 Months"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="4"
                  name="payplan"
                  control={<Radio color="primary" />}
                  label="4 Months"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="5"
                  name="payplan"
                  control={<Radio color="primary" />}
                  label="5 Months"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="6"
                  name="payplan"
                  control={<Radio color="primary" />}
                  label="6 Months"
                  labelPlacement="start"
                />
              </RadioGroup>
            </Grid>
            <Grid className={classes.grid} item xs={12} sm={12}>
              <Card className={classes.root}>
                <CardHeader title="Payment Breakdown" />
                <CardContent>
                  <div className={classes.gridroot}>
                    <Grid container spacing={1}>
                      <Grid container item xs={7} spacing={3}>
                        <LeftFormRow />
                      </Grid>
                      <Grid container item xs={5} spacing={3}>
                        <Grid
                          container
                          component="main"
                          className={classes.payRoot}
                        >
                          <CssBaseline />
                          <Grid
                            item
                            xs={12}
                            className={classes.payBack}
                            component={Paper}
                            square
                          >
                            <div className={classes.payPaper}>
                              <Typography component="p">
                                Customize Down Payment
                              </Typography>
                              <form
                                className={classes.payForm}
                                onSubmit={submit}
                                noValidate
                              >
                                <TextField
                                  type="number"
                                  error={error.status}
                                  helperText={error.message}
                                  id="downPay"
                                  variant="outlined"
                                  margin="normal"
                                  required
                                  fullWidth
                                  name="downpayment"
                                  value={formData.downpayment}
                                  onChange={handleInputChange}
                                  autoFocus
                                />
                                <Button
                                  disabled={bdpbutton}
                                  type="submit"
                                  fullWidth
                                  variant="contained"
                                  color="primary"
                                  className={classes.paySubmit}
                                >
                                  Update Breakdown
                                </Button>
                              </form>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    </div>
  );
};

export default PaymentBreakdown;
