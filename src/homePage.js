import { Box, Button, Card, CardContent, Checkbox, Container, Divider, FormControlLabel, Typography } from "@mui/material";
import React from "react";

export const HomePage = () => {
  const [checked, setChecked] = React.useState(false);

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (checked) {
            window.location.replace("/offer-registration");
        }
    };

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#f7f7f7", py: 6,mt:4 }}>
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Terms & Conditions
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" fontWeight={600} gutterBottom>
              1. Eligibility
            </Typography>
            <Typography gutterBottom>
              • Offer available only to individual U.S. taxpayers aged 18 or older.<br />
              • Limited to one use per customer.<br />
              • Not applicable to dependent tax filings.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              2. Non-Transferability
            </Typography>
            <Typography gutterBottom>
              • Offer cannot be transferred, assigned, or purchased for another person.<br />
              • Only the purchasing customer may use the offer.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              3. Payment Terms
            </Typography>
            <Typography gutterBottom>
              • Full payment of $29.99 is required at the time of pre-booking.<br />
              • Offer becomes active only after successful payment.<br />
              • Payments are non-refundable except where required by law.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              4. Scope of Service
            </Typography>
            <Typography gutterBottom>
              • Offer includes standard individual tax filing only.<br />
              • Additional schedules, forms, or complex filings may require extra fees.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              5. Limited-Time Offer
            </Typography>
            <Typography gutterBottom>
              • Offer may be changed or discontinued at any time without notice.<br />
              • Offer availability is not guaranteed until payment is completed.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              6. Compliance Requirements
            </Typography>
            <Typography gutterBottom>
              • Customer must provide accurate and complete information.<br />
              • Company is not responsible for delays caused by incorrect or missing information.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              7. Limitation of Liability
            </Typography>
            <Typography gutterBottom>
              • Company is not liable for indirect, incidental, or consequential damages.
            </Typography>

            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mt: 3 }}>
              8. Privacy Notice
            </Typography>
            <Typography gutterBottom>
              • Customer data is used only for tax preparation services.
              • Data will not be sold or shared beyond what is required for service delivery.
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Box display={"flex"} justifyContent="center" mb={4}>
                <FormControlLabel
                    control={<Checkbox />}
                    label={
                        <Typography variant="subtitle1" color="text.secondary">
                            i have read and agree to the terms and conditions
                        </Typography>
                    }
                    onChange={handleCheckboxChange}
                />
            </Box>

            <Box textAlign="center">
              <Button variant="contained" size="large" sx={{ borderRadius: 2 }} onClick={handleSubmit} disabled={!checked}>
                Pre-Book Now for $29.99
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};