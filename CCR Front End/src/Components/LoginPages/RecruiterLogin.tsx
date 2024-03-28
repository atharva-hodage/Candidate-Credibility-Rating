import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../Commom/Navbar";
import { createTheme, ThemeProvider } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copywight @"}
      <Link color="inherit" href="https://mui.com/">
        Candidate Credibility Rating
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const RecruiterLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<String | null>(null);
  const[rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const savedEmail = localStorage.getItem("recruiterEmail");
    const savedPassword = localStorage.getItem("recruiterPassword");

    if(savedEmail && savedPassword){
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  },[]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios
        .post(`http://localhost:8080/recruiterLogin`, {
          recruiterEmail: email,
          recruiterPassword: password,
        })
        .then(
          (response) => {
            // Save the recruiter ID to localStorage
            localStorage.setItem("recruiterId", response.data.recruiterId);
            if(rememberMe){
              localStorage.setItem("recruiterEmail",email);
              localStorage.setItem("recruiterPassword",password);
            }else{
              localStorage.removeItem("recruiterEmail");
              localStorage.removeItem("recruiterPassword");
            }
            navigate("/recruiterDashbord");
          },
          (error) => {
            console.log(error);
            alert("Enter correct credentials");
          }
        );
    } catch (error) {
      setError("An error occured during login");
    }
  };
  return (
    <>
      <Navbar />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Recruiter Login 
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                mt: 1,
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" onChange={(e)=> setRememberMe(e.target.checked)}/>}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default RecruiterLogin;
