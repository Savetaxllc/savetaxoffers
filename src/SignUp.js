import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";


export const Signup = ({setUserInfo, onSuccess, setToken,email}) => {
    const [formData, setFormData] = React.useState({
      username: "",
      email: email || "",
      password: "",
      reEnterPassword: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const isReadOnly = Boolean(formData.referralCode);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage("");

      if (formData.password !== formData.reEnterPassword) {
        setErrorMessage("Passwords do not match.");
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/offer-user-signup/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          // Handle successful signup (e.g., redirect to login)
            setUserInfo({
                ...data.userdata,
                firstName: data.userdata.first_name,
                lastName: data.userdata.last_name,
            });
            setToken(data.userdata.access_token);
            if(onSuccess){
                onSuccess();
            }

        } else {
          // Handle errors from the server
          setErrorMessage(data.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during signup:", error);
        setErrorMessage("An error occurred. Please try again later.");
      }
    };
  return (
    <Container>
        <Box sx={{ mt: 1, mb: 1 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="dense"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            inputProps={{ style: { fontSize: '14px' } }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="dense"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
            inputProps={{ style: { fontSize: '14px' } }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="dense"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            type="password"
            inputProps={{ style: { fontSize: '14px' } }}
          />
          <TextField
            label="Re-enter Password"
            variant="outlined"
            fullWidth
            margin="dense"
            name="reEnterPassword"
            value={formData.reEnterPassword}
            onChange={handleChange}
            required
            type="password"
            inputProps={{ style: { fontSize: '14px' } }}
          />
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="dense"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            inputProps={{ style: { fontSize: '14px' } }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="dense"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            inputProps={{ style: { fontSize: '14px' } }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            margin="dense"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            type="tel"
            inputProps={{ style: { fontSize: '14px' } }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            type="submit"
            sx={{ mt: 3 }}
          >
            Create Account
          </Button>
        </form>
      </Box>
    </Container>
  );
};