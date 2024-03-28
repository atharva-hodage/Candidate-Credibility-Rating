import React, { useState } from "react";
import Navbar from "../Commom/Navbar";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "2px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "50px",
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

const EnterEmail = () => {
  const accessToken = Cookies.get("accessToken");
  const defaultTheme = createTheme();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/forgot-password",
        {
          email: email,
        },
        
      );

      if (response.status === 200) {
        localStorage.setItem("email", email);
        navigate("/enterOtp");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during sending OTP");
    }
  };

  return (
    <>
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
            <Typography component="h1" variant="h5" sx={styles.title}>
              Forgot Password?
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              sx={styles.textField}
            />

            {error && <p style={styles.error}>{error}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.button}
            >
              Generate OTP
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default EnterEmail;
