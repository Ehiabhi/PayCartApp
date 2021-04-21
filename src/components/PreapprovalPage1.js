import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import { toast } from "react-toastify";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import BasicInfo from "./BasicInfo";
import PaymentBreakdown from "./PaymentBreakdown";
import Review from "./Review";
export const globalVar = React.createContext("");

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Basic Info", "Payment Breakdown", "Review Application"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicInfo />;
    case 1:
      return <PaymentBreakdown />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const PreapprovalPage1 = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [basicInfo, setBasicInfo] = React.useState({
    fullName: "",
    workstatus: "",
    totalCartValue: "",
    selectedDate: "",
    pay: "",
    loan: "",
  });
  const [formData, setformData] = React.useState({
    payplan: "",
    downpayment: "",
  });
  const [buttonStateForBaseInfo, setButtonStateForBaseInfo] = React.useState(
    true
  );
  const [bdpbutton, setbdpbutton] = React.useState(true);
  const [bdpContinueButton, setbdpContinueButton] = React.useState(true);
  const [buttonStateForPay, setButtonStateForPay] = React.useState(true);

  const [loanApprovalData, setLoanApprovalData] = React.useState({
    fullName: basicInfo.fullName,
    totalCartValue: null,
    downPayment: null,
    shoppingCredit: null,
    payDuration: null,
    interestRate: null,
    totalInterestPayable: null,
    monthlyRepayment: null,
  });

  useEffect(() => {
    formData.payplan === ""
      ? setButtonStateForPay(true)
      : setButtonStateForPay(false);

    basicInfo.fullName === ""
      ? setButtonStateForPay(true)
      : Number(basicInfo.totalCartValue) <= 0 ||
        !Boolean(basicInfo.totalCartValue)
      ? setButtonStateForBaseInfo(true)
      : Number(basicInfo.pay) <= 0 || !Boolean(basicInfo.pay)
      ? setButtonStateForBaseInfo(true)
      : basicInfo.selectedDate === ""
      ? setButtonStateForBaseInfo(true)
      : basicInfo.workstatus === ""
      ? setButtonStateForBaseInfo(true)
      : basicInfo.loan === ""
      ? setButtonStateForBaseInfo(true)
      : setButtonStateForBaseInfo(false);
  }, [
    basicInfo.fullName,
    basicInfo.totalCartValue,
    basicInfo.pay,
    basicInfo.selectedDate,
    basicInfo.loan,
    basicInfo.workstatus,
    formData.payplan,
  ]);

  const handleNext = () => {
    setLoanApprovalData((prevState) => {
      return { ...prevState, fullName: basicInfo.fullName };
    });
    if (activeStep !== steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(loanApprovalData),
      })
        .then((response) => {
          if (response.ok) {
            toast.success("Loan Application Submitted Successful", {
              autoClose: 3000,
            });
          } else {
            let error = new Error();
            error.message = {
              text: response.statusText,
              status: response.status,
            };
            toast.error(error, {
              autoClose: 3000,
            });
          }
        })
        .then(() => {
          document.getElementById("submitButton").style.display = "none";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleBack = () => {
    setbdpbutton(true);
    setbdpContinueButton(true);
    setformData({
      payplan: "",
      downpayment: "",
    });
    setButtonStateForBaseInfo(true);
    if (steps[activeStep] === "Payment Breakdown") {
      setBasicInfo((prevState) => {
        return { ...prevState, workstatus: "", loan: "" };
      });
    }
    setActiveStep(activeStep - 1);
  };

  return (
    <globalVar.Provider
      value={{
        basicInfo,
        setBasicInfo,
        formData,
        setformData,
        setButtonStateForPay,
        setLoanApprovalData,
        loanApprovalData,
        bdpbutton,
        setbdpbutton,
        setbdpContinueButton,
      }}
    >
      <React.Fragment>
        <Stepper
          id="stepper"
          activeStep={activeStep}
          className={classes.stepper}
          alternativeLabel
        >
          {steps.map((label) => (
            <Step id="stepLabel" key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
        <div id="foot_buttons" className={classes.buttons}>
          {activeStep !== 0 && (
            <Button
              style={{
                display: steps[activeStep] !== "Payment Breakdown" && "none",
              }}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
          )}
          {activeStep !== 0 && (
            <Button
              id="submitButton"
              style={{
                display: steps[activeStep] !== "Review Application" && "none",
              }}
              onClick={handleBack}
              className={classes.button}
            >
              Back
            </Button>
          )}
          <Button
            style={{ display: steps[activeStep] !== "Basic Info" && "none" }}
            disabled={buttonStateForBaseInfo}
            variant="contained"
            color="primary"
            onClick={handleNext}
            className={classes.button}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Continue"}
          </Button>
          <Button
            style={{
              display: steps[activeStep] !== "Payment Breakdown" && "none",
            }}
            disabled={buttonStateForPay || bdpContinueButton}
            variant="contained"
            color="primary"
            onClick={handleNext}
            className={classes.button}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Continue"}
          </Button>
          <Button
            style={{
              display: steps[activeStep] !== "Review Application" && "none",
            }}
            variant="contained"
            color="primary"
            onClick={handleNext}
            className={classes.button}
          >
            {activeStep === steps.length - 1 ? "Submit" : "Continue"}
          </Button>
        </div>
      </React.Fragment>
    </globalVar.Provider>
  );
};

export default PreapprovalPage1;
