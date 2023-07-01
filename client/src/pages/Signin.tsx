// import * as React from 'react';
import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

import mood3 from "../mood-3-min.png";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      TaskChaska {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Signin() {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isFormValid, setIsFormValid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isValid = username !== "" && password.length >= 6;
    setIsFormValid(isValid);
  }, [username, password]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    const password = data.get("password") as string;

    dispatch(loginStart()); // ログイン開始のアクションをディスパッチ

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signin",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        dispatch(loginSuccess(username)); // ログイン成功のアクションをディスパッチ
        navigate("/");
        console.log("Signin successful!");
      } else {
        console.log("Signin failed.");
        setError(response.data.message);
        dispatch(loginFailed()); // ログイン失敗のアクションをディスパッチ
      }
    } catch (error) {
      console.error("Failed to signin:", error);
      setError("An error occurred while signing in. Please try again later.");
      dispatch(loginFailed()); // ログイン失敗のアクションをディスパッチ
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${mood3})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              pb: 3,
            }}>
            {/* <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              >
              <img
                src={logo}
                alt="mainlogo"
                width="100px"
                height="100px"
                style={{
                  padding: '12px'
                  }}
                />
              <Typography
                variant="h1"
                noWrap
                component="h1"
                sx={{ display: { xs: 'none', sm: 'block' }, pl:2 }}
                style={{
                    fontFamily: "'Pathway Extreme', sans-serif",
                    fontSize:'42px',
                    fontWeight: 'bold'
                }}
              >
                Task<span style={{ fontWeight:'400' }}>Chaska</span>
              </Typography>
            </Box> */}
            <Typography
              component="h5"
              variant="h5"
              sx={{
                pt: 3,
                fontWeight: "bold",
                fontSize: "40px",
                fontFamily: "'Pathway Extreme', sans-serif",
              }}>
              Sign In
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                py: 1,
                fontSize: "22px",
                color: "grey",
                fontFamily: "'Roboto', sans-serif",
              }}>
              Donec id elit non mi porta gravida at eget metus.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                inputProps={{ minLength: 6 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  fontSize: "18px",
                }}
                disabled={!isFormValid}>
                Sign in
              </Button>
              <Grid container>
                <Grid item sx={{ fontSize: "16px" }}>
                  <Link
                    href="/register"
                    variant="body2"
                    sx={{ fontSize: "16px" }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Signin;
