import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import Navbar from "../Commom/Navbar";
import Cookies from "js-cookie";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "50px", // Add padding-top
  },
  form: {
    width: "100%",
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: "1rem",
    textAlign: "center",
  },
  textField: {
    marginBottom: "1rem",
  },
  error: {
    color: "red",
  },
  button: {
    marginTop: "1rem",
    marginBottom: "2rem",
  },
};

const EnterOTP = () => {
  const defaultTheme = createTheme();
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isExpired) {
      setIsExpired(true); // Set isExpired to true
      return;
    }

    try {
      const response = await axios.post(
        "/api/v1/userOtpValidation",
        {
          userOtp: otp,
        },
        
      );

      if (response.status === 200) {
        navigate("/changePasswordOtp");
      } else {
        setError("Please Enter Correct OTP");
      }
    } catch (err) {
      setError("Please Enter Correct OTP.");
    }
  };

  const handleChange = (value: string) => {
    setOtp(value);
  };

  const handleChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    handleChange(value);
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          // Handle expiration, e.g., show a message, navigate away, or perform an action
          setIsExpired(true);
          console.log("isExpired is set to true:", isExpired); // Add this line
          clearInterval(timer);
        }
      }, 1000);

      // Clean up the timer when the component unmounts
      return () => {
        clearInterval(timer);
      };
    }
  }, [countdown]);

  return (
    <div className="row g-0 auth-wrapper">
      <Navbar />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs" sx={styles.container}>
          <CssBaseline />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={styles.form}
          >
            <Typography component="h3" variant="h5" sx={styles.title}>
              Verify OTP
            </Typography>
            <br />

            <MuiOtpInput length={5} value={otp} onChange={handleChange} />
            <p>
              Time remaining: {Math.floor(countdown / 60)}:
              {(countdown % 60).toString().padStart(2, "0")}
            </p>
            {isExpired && (
              <p className="error-message">
                OTP has expired. Please request a new OTP.
              </p>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-50 theme-btn mx-auto"
              disabled={isExpired} // Disable the button if OTP has expired
              sx={styles.button}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default EnterOTP;
