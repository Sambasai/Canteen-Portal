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
// import { typography } from "@mui/system";
import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
//import './index.css';
import { Checkbox } from 'antd';
import { Button1, Modal, Form, Input, Radio } from 'antd';

// const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
//     const [form] = Form.useForm();
//     return (
//         <Modal
//             visible={visible}
//             title="Create a new collection"
//             okText="Create"
//             cancelText="Cancel"
//             onCancel={onCancel}
//             onOk={() => {
//                 form
//                     .validateFields()
//                     .then((values) => {
//                         form.resetFields();
//                         onCreate(values);
//                     })
//                     .catch((info) => {
//                         console.log('Validate Failed:', info);
//                     });
//             }}
//         >
//             <Form
//                 form={form}
//                 layout="vertical"
//                 name="form_in_modal"
//                 initialValues={{
//                     modifier: 'public',
//                 }}
//             >
//                 <Form.Item
//                     name="title"
//                     label="Title"
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Please input the title of collection!',
//                         },
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>
//                 <Form.Item>
//                     <Autocomplete
//                         id="combo-box-demo"
//                         options={users}
//                         getOptionLabel={(option) => option.name}
//                         fullWidth
//                         renderInput={(params) => (
//                             <TextField
//                                 {...params}
//                                 label="Select Names"
//                                 variant="outlined"
//                             />
//                         )}
//                     />
//                 </Form.Item>
//                 <Form.Item name="description" label="Description">
//                     <Input type="textarea" />
//                 </Form.Item>
//                 <Form.Item name="modifier" className="collection-create-form_last-form-item">
//                     <Radio.Group>
//                         <Radio value="public">Public</Radio>
//                         <Radio value="private">Private</Radio>
//                     </Radio.Group>
//                 </Form.Item>
//             </Form>
//         </Modal>
//     );
// };

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
    const [Name, setName] = useState("");
    const [cost, setCost] = useState(0);
    const [add, setAdd] = useState(0);

    useEffect(() => {
        axios
            .get("/api/food_item")
            .then((response) => {
                setUsers(response.data);
                setUsers1(response.data);
                setSortedUsers(response.data);
                setSearchText("");
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios
            .get("/api/buyer_details/" + sessionStorage.getItem("id"))
            .then((response) => {
                //alert("Created\t" + response.data.name);
                // setWallet(response.data.wallet);
                console.log(response.data.wallet);
                const tmp = Number(response.data.wallet) + Number(cost);
                setWallet(tmp);
                console.log(tmp);
                const newUser = {
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password,
                    contact_no: response.data.contact_no,
                    age: response.data.age,
                    batch_name: response.data.batch_name,
                    wallet: tmp,
                    favorites: response.data.favorites,
                };
                axios
                    .post("/api/buyer_details/update/" + sessionStorage.getItem("id"), newUser)
                    .then((response) => {
                        //  alert("Added " + cost + " to wallet");
                        // setWallet(response.data.wallet);
                        // setFavorites(response.data.favorites);
                        console.log(response.data);
                    });
            });
    }, []);
    // useEffect(() => {
    //     axios
    //         .get("/api/buyer_details/" + sessionStorage.getItem("id"))
    //         .then((response) => {
    //             //alert("Created\t" + response.data.name);
    //             setWallet(response.data.wallet);
    //             setFavorites(response.data.favorites);
    //             //console.log(response.data);
    //         });
    // }, []);

    const onChangeQuantity = (event) => {
        UpdateVendorName();
        setQuantity(event.target.value);
    };

    const onChangeAdd = (event) => {
        setAdd(event.target.value);
    };

    const sortPrice = () => {
        let usersTemp = users;
        const flag = sortName1;
        usersTemp.sort((a, b) => {
            if (a.price != undefined && b.price != undefined) {
                return (1 - flag * 2) * (new Number(a.price) - new Number(b.price));
            } else {
                return 1;
            }
        });
        setUsers(usersTemp);
        setSortName1(!sortName1);
    };

    const sortRating = () => {
        let usersTemp = users;
        const flag = sortName;
        usersTemp.sort((a, b) => {
            if (a.rating != undefined && b.rating != undefined) {
                return (1 - flag * 2) * (new Number(a.rating) - new Number(b.rating));
            } else {
                return 1;
            }
        });
        setUsers(usersTemp);
        setSortName(!sortName);
    };

    const customFunction = (event) => {
        console.log(event.target.value);
        setSearchText(event.target.value);
        //Search();
        let usersTemp = users1;
        const updated = usersTemp.filter((hmm) => {
            return hmm.name.includes(event.target.value);
        });
        setUsers(updated);
        //setUsers(usersTemp.name.includes(searchText));
    };

    const priceFunction = () => {
        //console.log(event.target.value);
        //setSearchText(event.target.value);
        //Search();
        let usersTemp = users1;
        // if (maxPrice == "") {
        //     maxPrice = minPrice;
        // }
        const updated = usersTemp.filter((hmm) => {
            return (hmm.price >= minPrice && hmm.price <= maxPrice);
        });
        setUsers(updated);
        //setUsers(usersTemp.name.includes(searchText));
    };

    const Vegfilter = () => {
        // if (maxPrice == "") {
        //     maxPrice = minPrice;
        // }
        console.log(Veg);
        console.log(Nonveg);
        if (Veg && Nonveg) {
            setUsers([]);
        }
        else if (Veg) {
            let usersTemp = users1;
            console.log(usersTemp);
            const updated = usersTemp.filter((hmm) => {
                return (hmm.veg);
            });
            setUsers(updated);
        }
        else if (Nonveg) {
            let usersTemp = users1;
            console.log(usersTemp);
            const updated = usersTemp.filter((hmm) => {
                return (!hmm.veg);
            });
            setUsers(updated);
        }
        else {
            setUsers(users1);
        }
        //setUsers(usersTemp.name.includes(searchText));
    };

    const FavoriteAdd = (item) => {
        axios
            .get("/api/buyer_details/" + sessionStorage.getItem("id"))
            .then((response) => {
                //alert("Created\t" + response.data.name);
                setWallet(response.data.wallet);
                setFavorites(response.data.favorites);
                console.log(response.data);
                console.log(response.data.favorites);
                console.log(favorites);
                const updated = response.data.favorites.filter((hmm) => {
                    return (hmm == item);
                });
                if (updated == item) {
                    console.log(updated);
                    alert(item + " is already a favorite");
                }
                else {
                    console.log(updated);
                    response.data.favorites.push(item);
                    console.log(favorites);
                    const newUser = {
                        name: response.data.name,
                        email: response.data.email,
                        password: response.data.password,
                        contact_no: response.data.contact_no,
                        age: response.data.age,
                        batch_name: response.data.batch_name,
                        wallet: response.data.wallet,
                        favorites: response.data.favorites,
                    };
                    axios
                        .post("/api/buyer_details/update/" + sessionStorage.getItem("id"), newUser)
                        .then((response) => {
                            alert("Added " + item + " to favorites");
                            // setWallet(response.data.wallet);
                            // setFavorites(response.data.favorites);
                            console.log(response.data);
                        });
                }
            });
    };

    const UpdateWallet = (cost) => {
        axios
            .get("/api/buyer_details/" + sessionStorage.getItem("id"))
            .then((response) => {
                //alert("Created\t" + response.data.name);
                // setWallet(response.data.wallet);
                console.log(response.data.wallet);
                const tmp = Number(response.data.wallet) - Number(cost);
                setWallet(tmp);
                console.log(tmp);
                const newUser = {
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password,
                    contact_no: response.data.contact_no,
                    age: response.data.age,
                    batch_name: response.data.batch_name,
                    wallet: tmp,
                    favorites: response.data.favorites,
                };
                axios
                    .post("/api/buyer_details/update/" + sessionStorage.getItem("id"), newUser)
                    .then((response) => {
                        alert("Subtracted " + cost + " from wallet");
                        // setWallet(response.data.wallet);
                        // setFavorites(response.data.favorites);
                        console.log(response.data);
                    });
            });
    };

    const UpdateVendorName = (cost) => {
        console.log(Item.vendor_id);
        axios
            .get("/api/vendor_details/" + Item.vendor_id)
            .then((response) => {
                //alert("Created\t" + response.data.manager_name);
                // setWallet(response.data.wallet);
                console.log(response.data.manager_name);
                setName(response.data.manager_name);
                // setUsers1(response.data);
            });
    };

    const UpdateOrder = (cost) => {
        console.log(new Date().toLocaleTimeString());
        const newUser = {
            name: Item.name,
            vendor_name: Name,
            price: Item.price,
            rating: Item.rating,
            quantity: quantity,
            cost: cost,
            veg: Item.veg,
            add_on: value,
            tags: Item.tags,
            vendor_id: Item.vendor_id,
            status: "PLACED",
            buyer_id: sessionStorage.getItem("id"),
            time: new Date().toLocaleTimeString(),
        };
        axios
            .post("/api/order_details/add/", newUser)
            .then((response) => {
                alert("Added to Orders DB");
                // setWallet(response.data.wallet);
                // setFavorites(response.data.favorites);
                console.log(response.data);
            });

    };

    const AddWallet = (cost) => {
        if (cost < 0) {
            alert("Not enough money in wallet");
            return;
        }
        axios
            .get("/api/buyer_details/" + sessionStorage.getItem("id"))
            .then((response) => {
                //alert("Created\t" + response.data.name);
                // setWallet(response.data.wallet);
                console.log(response.data.wallet);
                const tmp = Number(response.data.wallet) + Number(cost);
                setWallet(tmp);
                console.log(tmp);
                const newUser = {
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password,
                    contact_no: response.data.contact_no,
                    age: response.data.age,
                    batch_name: response.data.batch_name,
                    wallet: tmp,
                    favorites: response.data.favorites,
                };
                axios
                    .post("/api/buyer_details/update/" + sessionStorage.getItem("id"), newUser)
                    .then((response) => {
                        alert("Added " + cost + " to wallet");
                        // setWallet(response.data.wallet);
                        // setFavorites(response.data.favorites);
                        console.log(response.data);
                    });
            });
    };

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setVisible(false);
    };

    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
        //UpdateVendorName();
        const [form] = Form.useForm();
        if (visible) {
            //console.log("f");
            console.log(Food);
            // console.log(Food.keys);
            //console.log(Object.keys(Food));
        }
        if (Food.size == 0) {
            setValue("");
        }
        return (
            <Modal
                visible={visible}
                title="Create a new collection"
                okText="Create"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            if (value == "") {
                                const abc = Number(quantity) * (Number(cost));
                                form.resetFields();
                                //console.log(Food);
                                console.log(value);
                                //console.log(Food[value]);
                                console.log(quantity);
                                setCost(abc);
                                console.log(abc);
                                if (Number(abc) > wallet) {
                                    alert("NO");
                                    form.resetFields();
                                    return;
                                }
                                UpdateWallet(abc);
                                // UpdateVendorName();
                                UpdateOrder(abc);
                                console.log(cost);
                                onCreate(values);
                                form.resetFields();
                            }
                            else {
                                const abc = Number(quantity) * (Number(cost) + Number(Food[value]));
                                form.resetFields();
                                //console.log(Food);
                                console.log(value);
                                //console.log(Food[value]);
                                //console.log(quantity);
                                setCost(abc);
                                console.log(abc);
                                console.log(wallet);
                                if (Number(abc) > wallet) {
                                    alert("NO");
                                    form.resetFields();
                                    return;
                                }
                                UpdateWallet(abc);
                                // UpdateVendorName();
                                UpdateOrder(abc);
                                console.log(cost);
                                onCreate(values);
                                form.resetFields();
                            }
                            setValue("");
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item>
                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            id="combo-box-demo"
                            options={Object.keys(Food)}
                            getOptionLabel={(option) => option}
                            fullWidth
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Names"
                                    variant="outlined"
                                />
                            )}
                        />
                    </Form.Item>
                    <Form.Item name="quantity" label="Quantity">
                        <Input type="textarea" onChange={onChangeQuantity} />
                    </Form.Item>
                </Form>
            </Modal>
        );
    };
    // const [form] = Form.useForm();
    return (
        <div>
            {/* {priceFunction} */}
            <Grid container>
                {/* <Grid item xs={12} md={9} lg={9}>
                    <div>Hi</div>
                </Grid> */}
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                            <h1>Filters</h1>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField
                            id="standard-basic"
                            label="Search"
                            fullWidth={true}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={customFunction}
                        />
                    </List>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    Price Range
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        label="Enter Min"
                                        fullWidth={true}
                                        onChange={(event) => {
                                            console.log(event.target.value);
                                            setMinPrice(event.target.value);
                                            //priceFunction();
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id="standard-basic"
                                        label="Enter Max"
                                        fullWidth={true}
                                        onChange={(event) => {
                                            console.log(event.target.value);
                                            if (event.target.value == "") {
                                                setMaxPrice(100000);
                                            }
                                            else {
                                                setMaxPrice(event.target.value);
                                            }//priceFunction();
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button onClick={priceFunction}>
                                        Filter by Price
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Checkbox onChange={() => {
                                        setVeg(1 - Veg);
                                        // Vegfilter();
                                    }}>Veg</Checkbox>
                                </Grid>
                                <Grid item xs={6}>
                                    <Checkbox onChange={() => {
                                        setNonveg(1 - Nonveg);
                                        // Vegfilter();
                                    }}>Non-veg</Checkbox>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button onClick={Vegfilter}>
                                        Filter by Veg
                                    </Button>
                                </Grid>
                                <Grid item xs={20}>
                                    <div>Wallet : {wallet}</div>
                                </Grid>
                                <Grid item xs={18}>
                                    <TextField
                                        label="add to wallet"
                                        variant="outlined"
                                        value={add}
                                        onChange={onChangeAdd}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" onClick={() => { AddWallet(add); }}>
                                        Add
                                    </Button>
                                </Grid>
                                {/* {Vegfilter} */}
                            </Grid>

                        </ListItem>
                        <Divider />
                        <ListItem divider>
                            <Autocomplete
                                id="combo-box-demo"
                                options={users}
                                getOptionLabel={(option) => option.name}
                                fullWidth
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Select Names"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell> Sr No.</TableCell>
                                    <TableCell>
                                        Rating
                                        {/* {" "} */}
                                        <Button onClick={sortRating}>
                                            {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                        </Button>
                                    </TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>
                                        Price
                                        {/* {" "} */}
                                        <Button onClick={sortPrice}>
                                            {sortName1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                        </Button>
                                    </TableCell>
                                    <TableCell>Veg</TableCell>
                                    <TableCell>Tags</TableCell>
                                    <TableCell>Favorite</TableCell>
                                    <TableCell>Buy</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{ind}</TableCell>
                                        <TableCell>{user.rating}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.price}</TableCell>
                                        <TableCell>{user.veg ? "veg" : "nonveg"}</TableCell>
                                        <TableCell>{user.tags.map((hmm, ind) => (
                                            <div>{hmm}</div>
                                        ))}</TableCell>
                                        <TableCell><Button onClick={() => FavoriteAdd(user.name)}>
                                            Add
                                        </Button></TableCell>
                                        <TableCell>
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    setVisible(true);
                                                    setFood(user.add_on);
                                                    setCost(user.price);
                                                    setItem(user);
                                                    UpdateVendorName();
                                                    //console.log(user.add_on);
                                                    // const [form] = Form.useForm();
                                                }}
                                            >
                                                Add to Cart
                                            </Button>
                                            <CollectionCreateForm
                                                visible={visible}
                                                onCreate={onCreate}
                                                onCancel={() => {
                                                    setVisible(false);
                                                }}
                                            //food={Food}
                                            />
                                            {() => { console.log(value); }}
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
