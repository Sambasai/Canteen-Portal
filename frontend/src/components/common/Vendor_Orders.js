import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Autocomplete from "@mui/material/Autocomplete";
// import ArrowUpwardIcon1 from "@mui/icons-material/ArrowUpward";
// import ArrowDownwardIcon1 from "@mui/icons-material/ArrowDownward";
import React from 'react';
import "antd/dist/antd.css";
//import './index.css';
// import { Form } from 'antd';
import { Button1, Modal, Form, Input, Radio } from 'antd';
import FormItem from "antd/lib/form/FormItem";

const UsersList = (props, onCancel) => {
    const [users, setUsers] = useState([]);
    const [users1, setUsers1] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [Veg, setVeg] = useState(0);
    const [Nonveg, setNonveg] = useState(0);
    const [sortName1, setSortName1] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [wallet, setWallet] = useState(0);
    const [favorites, setFavorites] = useState([]);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [Food, setFood] = useState(new Map());
    const [Item, setItem] = useState([]);
    const [value, setValue] = useState("");
    const [quantity, setQuantity] = useState("");
    const [limit, setLimit] = useState(0);
    const [add, setAdd] = useState(0);
    const [Name, setName] = useState("");
    const [Id, setID] = useState("");


    useEffect(() => {
        axios
            .get("/api/order_details")
            .then((response) => {
                const updated = response.data.filter((hmm) => {
                    return (hmm.vendor_id == sessionStorage.getItem("id"))
                });
                setUsers(updated);
                setUsers1(updated);
                const updated1 = response.data.filter((hmm) => {
                    return (hmm.vendor_id == sessionStorage.getItem("id") && ((hmm.status == "ACCEPTED") || (hmm.status == "COOKED")))
                });
                setLimit(updated1.length);
                setSortedUsers(response.data);
                setSearchText("");
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/api/vendor_details/")
            .then((response) => {
                //alert("Created\t" + response.data.manager_name);
                // setWallet(response.data.wallet);
                //console.log(Id);
                //setName(response.data.manager_name);
                // setUsers1(response.data);
            });
    }, []);

    const UpdateStatus = (id, flag) => {
        console.log(limit);
        axios
            .get("/api/order_details/" + id)
            .then((response) => {
                //alert("Created\t" + response.data.name);
                // setWallet(response.data.wallet);
                // console.log(response.data.wallet);
                // const tmp = Number(response.data.wallet) - Number(cost);
                // setWallet(tmp);
                // console.log(tmp);
                if (response.data.status == "PLACED") {

                    if (flag == 1) {
                        response.data.status = "REJECTED";
                    }
                    else {
                        if (limit >= 10) {
                            alert("Can't accept any more orders");
                            return;
                        }
                        response.data.status = "ACCEPTED";
                    }
                }
                else if (response.data.status == "ACCEPTED") {
                    response.data.status = "COOKING";
                }
                else if (response.data.status == "COOKING") {
                    response.data.status = "READY FOR PICKUP";
                }
                const newUser = {
                    name: response.data.name,
                    vendor_name: response.data.vendor_name,
                    price: response.data.price,
                    rating: response.data.rating,
                    quantity: response.data.quantity,
                    cost: response.data.cost,
                    veg: response.data.veg,
                    add_on: response.data.add_on,
                    tags: response.data.tags,
                    vendor_id: response.data.vendor_id,
                    status: response.data.status,
                    buyer_id: response.data.buyer_id,
                    time: response.data.time,
                };
                axios
                    .post("/api/order_details/update/" + id, newUser)
                    .then((response) => {
                        alert("Updated");
                        // setWallet(response.data.wallet);
                        // setFavorites(response.data.favorites);
                        //console.log(response.data);
                        window.location.reload()
                    });
            });
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell> Sr No</TableCell>
                                    <TableCell>Placed Time</TableCell>
                                    <TableCell>Food Item</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Cost</TableCell>
                                    <TableCell>Move To Next Stage</TableCell>
                                    <TableCell>Reject</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{ind}</TableCell>
                                        <TableCell>{user.time}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.quantity}</TableCell>
                                        <TableCell>{user.status}</TableCell>
                                        <TableCell>{user.cost}</TableCell>
                                        <TableCell>
                                            {(user.status == "REJECTED") ? <Button><div></div></Button> : <Button type="primary"
                                                onClick={() => {
                                                    //setVisible(true);
                                                    UpdateStatus(user._id, 0);
                                                    setID(user._id);
                                                    //console.log(user.add_on);
                                                    // const [form] = Form.useForm();
                                                }}
                                            >
                                                Move To Next Stage
                                            </Button>}
                                        </TableCell>
                                        <TableCell>{(user.status == "PLACED") ? <Button type="primary"
                                            onClick={() => {
                                                UpdateStatus(user._id, 1);
                                            }}
                                        >
                                            Reject
                                        </Button> : <div></div>}
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </div >
    );
};

export default UsersList;
