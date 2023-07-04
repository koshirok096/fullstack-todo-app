import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  setUser,
  setUserId,
} from "../redux/userSlice";
import { RootState } from "../redux/store";

import logo from "../main-logo.png";
import mood1 from "../mood-1-min.png";

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

const defaultTheme = createTheme();

function Register() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);

    // 正規表現を使用してemailの形式を検証
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (value && !emailRegex.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (!username || !email || !password) {
      setError("Please fill in all the fields.");
      return;
    }

    if (emailError || passwordError) {
      return;
    }

    dispatch(loginStart()); // ログイン開始のアクションをディスパッチ

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      if (response.status === 200 || response.status === 201) {
        dispatch(loginSuccess(username)); // ログイン成功のアクションをディスパッチ
        dispatch(setUserId(response.data._id)); // Dispatch the setUserId action
        // console.log(response.data._id); // ユーザーIDをコンソールに表示
        navigate("/signin");
        } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Failed to register:", error);
      setError("An error occurred while registering. Please try again later.");
    }
  };
  const isFormValid =
    username && email && password && !emailError && !passwordError;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh"}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${mood1})`,
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
              mx: 3
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <img
                src={logo}
                alt="mainlogo"
                width="100px"
                height="100px"
                style={{
                  padding: "12px",
                }}
              />
              <Typography
                variant="h1"
                noWrap
                component="h1"
                sx={{ display: { xs: "none", sm: "block" }, pl: 2 }}
                style={{
                  fontFamily: "'Pathway Extreme', sans-serif",
                  fontSize: "42px",
                  fontWeight: "bold",
                }}>
                Task<span style={{ fontWeight: "400" }}>Chaska</span>
              </Typography>
            </Box>
            <Typography
              component="h5"
              variant="h5"
              sx={{
                pt: 3,
                fontWeight: "bold",
                fontSize: "40px",
                fontFamily: "'Pathway Extreme', sans-serif",
              }}>
              Create your account
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
              sx={{ mt: 1, mx:3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!emailError}
                helperText={emailError}
                onChange={handleEmailChange}
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value);
                  handlePasswordChange(event);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  fontSize: "18px",
                  opacity: isFormValid ? 1 : 0.5,
                }} // フォームの有効性に応じて透明度を変更
                disabled={!isFormValid} // フォームが無効な場合はボタンを無効化
              >
                Register
              </Button>
              <Grid container>
                <Grid item sx={{ fontSize: "16px" }}>
                  Already have an account?&nbsp;
                  <Link
                    href="/signin"
                    variant="body2"
                    sx={{ fontSize: "16px" }}>
                    {"Sign In"}
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

export default Register;
