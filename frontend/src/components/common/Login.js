import { useState } from "react";
import Link from '@mui/material/Link';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Vendor from "./Register_Vendor";
import Buyer from "./Register_Buyer";
import Navbar from "../templates/Navbar";
import Home from "./Home";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState('');

  const handleChange = (event) => {
    setFlag(event.target.value);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (event) => {
    setEmail(event.target.value);
  };

  const onChangePrice = (event) => {
    setPassword(event.target.value);
  };

  const resetInputs = () => {
    setEmail("");
    setPassword("");
  };

  const dummy = () => {
    flag = 1;
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      password: password,
      flag: flag
    };
    if (flag === 1) {
      // navigate("./Vendor")
      axios
        .post("/api/login", newUser)
        .then((response) => {
          //alert("Found vendor\t" + response.data.manager_name);
          sessionStorage.setItem("id", response.data._id);
          sessionStorage.setItem("type", flag);
          navigate("/Vendor");
          //console.log(response.data);
        });
    }
    else if (flag === 2) {
      axios
        .post("/api/login", newUser)
        .then((response) => {
          //alert("Found buyer\t" + response.data.name);
          sessionStorage.setItem("id", response.data._id);
          sessionStorage.setItem("type", flag);
          navigate("/Buyer");
          //console.log(response.data);
        });
    }
    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Choose</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={flag}
            label="Flag"
            onChange={handleChange}
          >
            <MenuItem value={1}>Vendor</MenuItem>
            <MenuItem value={2}>Buyer</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={onChangeUsername}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={onChangePrice}
          type={'password'}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Login
        </Button>
      </Grid>
    </Grid >
  );
};

export default Login;
