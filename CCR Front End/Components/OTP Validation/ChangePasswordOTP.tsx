import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
  passwordInput: {
    marginBottom: "1rem",
    width: "100%",
  },
  error: {
    color: "red",
  },
  button: {
    marginTop: "1rem",
    marginBottom: "2rem",
  },
};

const ChangePasswordOTP = () => {
  const accessToken = Cookies.get("accessToken");
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [password, setPassword] = useState("");
  let a = localStorage.getItem("email");
  console.log(a);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(password);
    try {
      const response = await axios.put(
        "/api/v1/userChangePassword",
        {
          email: a,
          password: password,
    
        },
       
      );

      if (response.status === 201) {
        alert("Password Changed Successfully...!");
        navigate("/loginForm");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during Set New Password...");
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
              Enter New Password
            </Typography>

            <FormControl sx={styles.passwordInput} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.button}
            >
              Change Password
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ChangePasswordOTP;
