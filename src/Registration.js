import React from "react";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Divider,
  FormControlLabel,
  Checkbox,
  Tab,
  FormControl,
  TextField,
} from "@mui/material";
import { Label } from "@mui/icons-material";
import useDebounce from "./hooks/useDebounce";


import axios from "axios";
import { ZellPayment } from "./zell/zellPayment";
import { Signup } from "./SignUp";

const apiUrl = process.env.REACT_APP_API_URL;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const RegistrationPage = () => {
  const [email, setEmail] = React.useState("");
  const [emailStatus, setEmailStatus] = React.useState(null); // null | 'checking' | 'available' | 'taken' | 'error'
  const [userInfo, setUserInfo] = React.useState(null);
  const debouncedEmail = useDebounce(email, 500);
  const [show, setShow] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [openZelleModal, setOpenZelleModal] = React.useState(false);
  const total = 29.99;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailStatus(null);
  };

  React.useEffect(() => {
    // Only check when debouncedEmail is a non-empty string and looks like an email
    const emailToCheck = (debouncedEmail || "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailToCheck) {
      setEmailStatus(null);
      return;
    }

    if (!emailRegex.test(emailToCheck)) {
      setEmailStatus("error");
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    async function checkEmail() {
      setEmailStatus("checking");
      try {
        // POST to pre-book endpoint; ensure Content-Type is set so Django accepts JSON payload
        const resp = await fetch(`${apiUrl}/pre-book-api/`, {
          method: "POST",
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailToCheck }),
        });

        if (cancelled) return;

        if (!resp.ok) {
          setEmailStatus("error");
          return;
        }

        const data = await resp.json();

        // Expecting backend JSON like: { exists: true } or { exists: false }
        if (data && data.success) {
            if(data.already_registered){
            setEmailStatus("taken");
            setUserInfo(null);
            setShow(true);
            return;
          }
          else{
            setEmailStatus("available");
            setUserInfo(data.message || null);
            setToken(data.token || null);
            setShow(true);
          }
        } else {
          setEmailStatus("not_available");
          setUserInfo(null);
          setShow(true);
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        setEmailStatus("error");
        setUserInfo(null);
        setShow(false);
      }
    }

    checkEmail();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [debouncedEmail]);
  const handleAvailoffer = () => {
    // Logic to handle the offer availment
    const data = {
      userId: userInfo ? userInfo.id : null,
      email: email,
    };
    console.log("Offer availed with data:", data);
  };
  const handleZelleModal = () => {
    setOpenZelleModal(true);
  };
  const calculateTotal = (subtotal) => {
        return subtotal ;
    };
    const helperText = (emailStatus) => {
        switch (emailStatus) {
            case "checking":
                return "Checking...";
            case "available":
                return "Email is available";
            case "not_available":
                return "Email not registered. Please sign up to avail the offer.";
            case "error":
                return "Enter a valid email or try again later";
            default:
                return "";
        }
    };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "#f7f7f7",
        py: 6,
        mt: 4,
      }}
    >
      <Container maxWidth="md">
        <Box>
          <FormControl fullWidth>
            <Typography variant="subtitle1">
              Enter you email to pre-book the offer:
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              sx={{
                mt: 2,
                mb: 4,
                "& .MuiInputBase-input": {
                  fontSize: 20, // Change 20 to your desired font size
                },
              }}
              value={email}
              onChange={handleEmailChange}
              helperText={helperText(emailStatus)}
              error={emailStatus === "taken" || emailStatus === "error"}
            />
          </FormControl>
        </Box>
        {show &&
          (emailStatus === "taken" ? (
            <Box>
              <Card sx={{ bgcolor: "#ffebee", p: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} color="error">
                  You have already registered for the offer. Multiple
                  registrations are not allowed.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ borderRadius: 2, mt: 2 }}
                  onClick={() =>
                    (window.location.href = "https://www.savetaxllc.com/login")
                  }
                >
                  Go to Login
                </Button>
              </Card>
            </Box>
          ) : (
            <Box sx={{ mb: 2 }}>
              {userInfo && (
                <>
                  <Card sx={{ bgcolor: "#e0f7fa", p: 2 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Hello {userInfo.firstName} {userInfo.lastName}
                    </Typography>
                    <Typography variant="subtitle2">
                      Please click on the link button to avail the offer
                    </Typography>
                  </Card>
                  <Box textAlign="center" mt={4}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{ borderRadius: 2 }}
                      onClick={handleZelleModal}
                    >
                      Pre-Book Now for $29.99
                    </Button>
                  </Box>
                </>
              )}
              {!userInfo && (
                <>
                  <Signup
                    setUserInfo={setUserInfo}
                    setToken={setToken}
                    email={email}
                    onSuccess={handleAvailoffer}
                  />
                </>
              )}
            </Box>
          ))}
      </Container>
      <ZellPayment
        openZelleModal={openZelleModal}
        onClose={() => setOpenZelleModal(false)}
        total={total}
        user_id={userInfo ? userInfo.id : null}
        token={token}
        userInfo={userInfo}
        style={style}
        setOpenZelleModal={setOpenZelleModal}
      />
    </Box>
  );
};
