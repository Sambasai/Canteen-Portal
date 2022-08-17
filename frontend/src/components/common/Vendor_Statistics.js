import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowUpwardIcon1 from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import ArrowDownwardIcon1 from "@mui/icons-material/ArrowDownward";
import { typography } from "@mui/system";
import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
//import './index.css';
import { Checkbox } from 'antd';
import { Button1, Modal, Form, Input, Radio } from 'antd';

const UsersList = (props, onCancel) => {
    const [users, setUsers] = useState([]);
    const [users1, setUsers1] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [Orders, setOrders] = useState(0);
    const [Pending, setPending] = useState(0);
    const [Completed, setCompleted] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [wallet, setWallet] = useState(0);
    const [favorites, setFavorites] = useState([]);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [Temp, setTemp] = useState(new Object());
    const [Items, setItems] = useState([]);
    const [value, setValue] = useState("");
    const [quantity, setQuantity] = useState("");
    const [Name, setName] = useState("");
    const [cost, setCost] = useState(0);
    const [add, setAdd] = useState(0);

    useEffect(() => {
        axios
            .get("/api/order_details")
            .then((response) => {
                //setOrders(response.data.length);
                const updated = response.data.filter((hmm) => {
                    return (hmm.vendor_id == sessionStorage.getItem("id") && hmm.status == "COMPLETED")
                });
                // const tmp = new Object();
                // for (let i = 0; i < updated.data.length; i++) {
                //     const element = updated.data[i];
                //     tmp[element.Name] = 0;
                // }
                // setTemp(tmp);
                setCompleted(updated.length);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/api/order_details")
            .then((response) => {
                //setOrders(response.data.length);
                const tmp = new Map();
                for (let i = 0; i < response.data.length; i++) {
                    const element = response.data[i];
                    //console.log(element.name);
                    tmp.set(element.name, 0);
                }
                for (let i = 0; i < response.data.length; i++) {
                    const element = response.data[i];
                    // tmp[element.Name] = 0;
                    if (element.status == "COMPLETED") {
                        const c = tmp.get(element.name);
                        tmp.set(element.name, Number(c) + Number(element.quantity));
                    }
                }
                console.log(tmp);
                const mapSort1 = new Map([...tmp.entries()].sort((a, b) => b[1] - a[1]));
                console.log(mapSort1);
                setTemp(mapSort1);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/api/order_details")
            .then((response) => {
                //setOrders(response.data.length);
                const updated = response.data.filter((hmm) => {
                    return (hmm.vendor_id == sessionStorage.getItem("id"))
                });
                setOrders(updated.length);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        // <div>{Temp}</div>
        axios
            .get("/api/order_details")
            .then((response) => {
                //setOrders(response.data.length);
                const updated = response.data.filter((hmm) => {
                    return (hmm.vendor_id == sessionStorage.getItem("id") && ((hmm.status == "ACCEPTED") || (hmm.status == "COOKED") || (hmm.status == "PLACED")))
                });
                setPending(updated.length);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // useEffect(() => {
    //     axios
    //         .get("/api/order_details")
    //         .then((response) => {
    //             //setOrders(response.data.length);
    //             const updated = response.data.filter((hmm) => {
    //                 return (hmm.vendor_id == sessionStorage.getItem("id") && ((hmm.status=="ACCEPTED") || (hmm.status=="COOKED") || (hmm.status=="PLACED")))
    //             });
    //             setOrders(updated.length);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <div>STATISTICS</div>
                </Grid>
            </Grid>
            <Divider />
            <br></br>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <Grid item xs={20}>
                        <div>Top 5 Items that have been sold</div>
                        
                    </Grid>
                    <Divider />
                </Grid>
            </Grid>
            <br></br>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <Grid item xs={20}>
                        <div>Orders Placed: {Orders}</div>
                        
                    </Grid>
                    <Divider />
                </Grid>
            </Grid>
            <br></br>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <Grid item xs={20}>
                        <div>Pending Orders:{Pending} </div>
                    </Grid>
                    <Divider />
                </Grid>
            </Grid>
            <br></br>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <Grid item xs={20}>
                        <div>Completed Orders: {Completed}</div>
                    </Grid>
                    <Divider />
                </Grid>
            </Grid>
        </div >
    );
};

export default UsersList;
