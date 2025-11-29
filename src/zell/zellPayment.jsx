import { Box, Button, CircularProgress, Divider, Modal, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";


const apiUrl = process.env.REACT_APP_API_URL;
export const ZellPayment = ({openZelleModal,total,style,setOpenZelleModal,user_id,token,userInfo}) => {
  const [transactionId, setTransactionId] = React.useState("");
  const [accountHolderName, setAccountHolderName] = React.useState("");
  const [openNameSearchModal, setOpenNameSearchModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openTransactionModal, setOpenTransactionModal] = React.useState(false);
  console.log("ZellPayment Props:", {openZelleModal,total,style,user_id,token,userInfo});
  const handleTransactionModal = async() =>{
        if(!token){
            alert('Please login to continue');

            return window.location.href = '/login';
        }
        const response = await axios.post(`${apiUrl}/users/check-payments`, {
            expected_amount: total,
            expected_name: userInfo ? `${userInfo?.firstName} ${userInfo?.lastName}` : ''
        },
        {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = response.data;
        if(data.status === 'success'){
          setLoading(false);
           setOpenZelleModal(false);
           setOpenTransactionModal(true);
        }
        else if(data.status === 'not-received'){
            setLoading(false);
            setOpenZelleModal(false);
            setOpenTransactionModal(false);
            setOpenNameSearchModal(true);
        }
        else{
            setLoading(false);
            setOpenZelleModal(false);
            setOpenTransactionModal(false);
            setOpenNameSearchModal(true);
        }

        
    }
  const handleNameSearchModal = async() =>{

        setLoading(true);
        if(!token){
            alert('Please login to continue');

            return window.location.href = '/login';
        }
        const response = await axios.post(`${apiUrl}/users/check-payments`, {
            expected_amount: total,
            expected_name: accountHolderName
        },
        {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = response.data;
        if(data.status === 'success'){
            setLoading(false);
           setOpenZelleModal(false);
           setOpenNameSearchModal(false);
           setOpenTransactionModal(true);
        }
        else{
            setLoading(false);
           setOpenZelleModal(false);
           setOpenNameSearchModal(false);
           setOpenTransactionModal(true);
        }

    }
  const saveTransaction = async() =>{
      setLoading(true);
        if(!token){
            alert('Please login to continue');

            return window.location.href = '/login';
        }
        
        try{
            const response = await axios.post(`${apiUrl}/update-zelle-payment/`, {
                // ticket_id: ticketId,
                user_id:userInfo?.user_id,
                transaction_id: transactionId,
                ammount: total,
                request_from: "offers_page"
            },
            {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if(response.data.success){
              setLoading(false);
                // setTicketData(response.data.data);
                // setTicketData((prevData) => ({ ...prevData, ticket_status: 'Payment Made' }));
                alert('Payment was successfully processed.');
                setOpenTransactionModal(false);
                window.location.href = 'https://www.savetaxllc.com';
            }
            else{
              setLoading(false);
                console.error('Error updating invoice:', response.data.error);
                alert('There was an error updating the payment. Please try again.');
                setOpenTransactionModal(false);

            }
        }
        catch(error){
          setLoading(false);
            console.error('Error updating invoice:', error);
            alert('An error occurred while processing your payment. Please try again.');
            setOpenTransactionModal(false);
        }
    }
    console.log("Rendering ZellePayment Component", total, openZelleModal)
    return (
    <>
      <Modal
        open={openZelleModal}
        onClose={(event, reason) => {
          if (reason === "backdropClick") {
            return; // Prevent closing when clicking outside
          }
          // setOpenTransactionModal(false); // Close only when explicitly intended
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loading ? (
          <Box sx={{ ...style, alignItems: "center" }}>
            <CircularProgress size="3rem" color="success" />
          </Box>
        ) : (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              Please Follow the instructions below to pay with Zelle
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              1. Open your Zelle App<br></br>
              2. Click on Send Money<br></br>
              3. Enter the amount of $
              <br></br>
              4. Enter the following email address:{" "}
              <strong>invoices@savetaxllc.com</strong>
              <br></br>
              5. Click on Send
            </Typography>
            <Typography
              variant="caption"
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              Once you have made the payment, click on the button below
            </Typography>
            <Divider sx={{ mt: 2 }} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Button
                onClick={handleTransactionModal}
                variant="contained"
                sx={{ mt: 2 }}
              >
                On it! I have paid
              </Button>
              <Button
                onClick={() => setOpenZelleModal(false)}
                variant="contained"
                sx={{ mt: 2, backgroundColor: "red", color: "white" }}
              >
                I will Pay Later
              </Button>
            </Box>
          </Box>
        )}
      </Modal>
      <Modal
        open={openTransactionModal}
        onClose={(event, reason) => {
          if (reason === "backdropClick") {
            return; // Prevent closing when clicking outside
          }
          // setOpenTransactionModal(false); // Close only when explicitly intended
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loading ? (
          <Box sx={{ ...style, alignItems: "center" }}>
            <CircularProgress size="3rem" color="success" />
          </Box>
        ) : (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              Please Enter the Transaction ID
            </Typography>
            <TextField
              id="outlined-basic"
              label="Transaction ID"
              variant="outlined"
              sx={{ mt: 2 }}
              helperText="Enter the Transcation id"
              onChange={(e) => setTransactionId(e.target.value)}
            />

            <Divider sx={{ mt: 2 }} />
            <Button
              onClick={saveTransaction}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        )}
      </Modal>
      <Modal
        open={openNameSearchModal}
        onClose={(event, reason) => {
          if (reason === "backdropClick") {
            return; // Prevent closing when clicking outside
          }
          // setOpenTransactionModal(false); // Close only when explicitly intended
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loading ? (
          <Box sx={{ ...style, alignItems: "center" }}>
            <CircularProgress size="3rem" color="success" />
          </Box>
        ) : (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              We could not able to find the transaction. Can you please enter
              the Zelle Account Holder's Name used for the transaction?
            </Typography>
            <TextField
              id="outlined-basic"
              label="Enter Name"
              variant="outlined"
              sx={{ mt: 2 }}
              helperText="Enter the Zelle Account Holder Name"
              onChange={(e) => setAccountHolderName(e.target.value)}
            />

            <Divider sx={{ mt: 2 }} />
            <Button
              onClick={handleNameSearchModal}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        )}
      </Modal>
    </>
  );
};
