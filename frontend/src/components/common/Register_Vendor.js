import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Vendor = (props) => {
  const [manager_name, setManager_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact_no, setContact_no] = useState("");
  const [open_time, setOpenTime] = useState("");
  const [close_time, setCloseTime] = useState("");
  const [shop_name, setShop_name] = useState("");

  const onChangeUsername = (event) => {
    setManager_name(event.target.value);
  };

  const onChangeemail = (event) => {
    setEmail(event.target.value);
  };

  const onChangecontact_no = (event) => {
    setContact_no(event.target.value);
  };

  const onChangeOpenTime = (event) => {
    setOpenTime(event.target.value);
  };

  const onChangeCloseTime = (event) => {
    setCloseTime(event.target.value);
  };

  const onChangeShop_name = (event) => {
    setShop_name(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setManager_name("");
    setEmail("");
    setPassword("");
    setContact_no("");
    setOpenTime("");
    setCloseTime("");
    setShop_name("");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      manager_name: manager_name,
      email: email,
      password: password,
      contact_no: contact_no,
      open_time: open_time,
      close_time: close_time,
      shop_name: shop_name
    };

    axios
      .post("/api/vendor_details/add", newUser)
      .then((response) => {
        alert("Created\t" + response.data.shop_name);
        console.log(response.data);
      });

    resetInputs();
  };

  return (

    <Grid container align={"center"} spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Manager Name"
          variant="outlined"
          value={manager_name}
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="email"
          variant="outlined"
          value={email}
          onChange={onChangeemail}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="password"
          variant="outlined"
          value={password}
          onChange={onChangePassword}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="contact_no"
          variant="outlined"
          value={contact_no}
          onChange={onChangecontact_no}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="opening time"
          variant="outlined"
          value={open_time}
          onChange={onChangeOpenTime}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="closing time"
          variant="outlined"
          value={close_time}
          onChange={onChangeCloseTime}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="shop_name"
          variant="outlined"
          value={shop_name}
          onChange={onChangeShop_name}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default Vendor;
