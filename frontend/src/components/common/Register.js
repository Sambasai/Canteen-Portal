import { useState } from "react";
import Grid from "@mui/material/Grid";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState('');

  const handleChange = (event) => {
    setFlag(event.target.value);
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
            <MenuItem onClick={() => navigate("./Vendor")}>Vendor</MenuItem>
            <MenuItem onClick={() => navigate("./Buyer")}>Buyer</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Grid>
  );
};

export default Register;
