import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";


//axios.get("/api/vendor/"+sessionStorage.getItem("id"));

const Buyer = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact_no, setContact_no] = useState("");
    const [age, setAge] = useState("");
    const [batch_name, setBatch_name] = useState("");
    const [wallet, setWallet] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [iD, setID] = useState("");
    //setID(sessionStorage.getItem("id"));
    useEffect(() => {
        axios
            .get("/api/buyer_details/" + sessionStorage.getItem("id"))
            .then((response) => {
                //alert("Created\t" + response.data.name);
                setName(response.data.name);
                setEmail(response.data.email);
                setPassword(response.data.password);
                setContact_no(response.data.contact_no);
                setAge(response.data.age);
                setBatch_name(response.data.batch_name);
                setWallet(response.data.wallet);
                setFavorites(response.data.favorites);
                console.log(response.data);
            });
    }, []);
    const onChangeUsername = (event) => {
        setName(event.target.value);
    };

    const onChangeemail = (event) => {
        setEmail(event.target.value);
    };

    const onChangecontact_no = (event) => {
        setContact_no(event.target.value);
    };

    const onChangeage = (event) => {
        setAge(event.target.value);
    };

    const onChangebatch_name = (event) => {
        setBatch_name(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onChangeWallet = (event) => {
        setWallet(event.target.value);
    };

    const onChangeFavorites = (event) => {
        setFavorites(event.target.value);
    };

    const resetInputs = () => {
        setName("");
        setEmail("");
        setPassword("");
        setContact_no("");
        setAge("");
        setBatch_name("");
        setWallet("");
        setFavorites("");
    };

    const onEdit = (event) => {
        event.preventDefault();

        const newUser = {
            name: name,
            email: email,
            password: password,
            contact_no: contact_no,
            age: age,
            batch_name: batch_name,
            wallet: wallet,
            favorites: favorites,
        };

        axios
            .post("/api/buyer_details/update/" + sessionStorage.getItem("id"), newUser)
            .then((response) => {
                alert("Updated\t" + name);
                console.log(response.data);
            });

        //resetInputs();
    };

    return (

        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
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
                    label="age"
                    variant="outlined"
                    value={age}
                    onChange={onChangeage}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="batch_name"
                    variant="outlined"
                    value={batch_name}
                    onChange={onChangebatch_name}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="wallet"
                    variant="outlined"
                    value={wallet}
                    onChange={onChangeWallet}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="favorites"
                    variant="outlined"
                    value={favorites}
                    onChange={onChangeFavorites}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={onEdit}>
                    Edit
                </Button>
            </Grid>
        </Grid>
    );
};

export default Buyer;
