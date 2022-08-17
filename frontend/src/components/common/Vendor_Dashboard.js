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
// import { findOneAndDelete } from "../../../../backend/models/order.model";

const UsersList = (props, onCancel) => {
    const [users, setUsers] = useState([]);
    const [users1, setUsers1] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);
    // const [Veg, setVeg] = useState(0);
    const [Nonveg, setNonveg] = useState(0);
    const [sortName1, setSortName1] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [wallet, setWallet] = useState(0);
    const [favorites, setFavorites] = useState([]);
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [Food, setFood] = useState(new Map());
    const [Item, setItem] = useState([]);
    const [value, setValue] = useState("");
    const [quantity, setQuantity] = useState("");
    const [cost, setCost] = useState(0);
    const [add, setAdd] = useState(0);
    // const [Name, setName] = useState("");
    const [Id, setID] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [veg, setVeg] = useState("");
    // const [add_on, setAddon] = useState(new Map());
    const [tags, setTags] = useState([]);
    const [vendor_id, setVendorId] = useState("");

    useEffect(() => {
        axios
            .get("/api/food_item/")
            .then((response) => {
                const updated = response.data.filter((hmm) => {
                    return (hmm.vendor_id == sessionStorage.getItem("id"))
                });
                setUsers(updated);
                setUsers1(updated);
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

    // const onCreate = (values) => {
    //     console.log('Received values of form: ', values);
    //     setVisible(false);
    // };

    const resetInputs = () => {
        setName("");
        setPrice("");
        setRating("");
        setVeg("");
        setTags("");
        setVendorId("");
    };

    const onEdit = (values) => {
        // event.preventDefault();

        const newUser = {
            name: values.name,
            price: values.price,
            rating: values.rating,
            veg: values.veg,
            tags: values.tags,
            add_on: new Map(),
            vendor_id: sessionStorage.getItem("id"),
        };

        axios
            .post("/api/food_item/update/" + Id, newUser)
            .then((response) => {
                alert("Updated\t" + name);
                console.log(response.data);
            });

        resetInputs();
    };

    const onAdd = (values) => {
        // event.preventDefault();

        const newUser = {
            name: values.name,
            price: values.price,
            rating: values.rating,
            veg: values.veg,
            tags: values.tags,
            add_on: new Map(),
            vendor_id:  sessionStorage.getItem("id") ,
        };

        axios
            .post("/api/food_item/add", newUser)
            .then((response) => {
                alert("Added\t" + name);
                console.log(response.data);
            });

        resetInputs();
    };

    const OnDelete = (id) => {
        // event.preventDefault();
        console.log(id);
        axios
            .delete("/api/food_item/" + id)
            .then((response) => {
                alert("Deleted\t" + name);
                console.log(response.data);
            });

        resetInputs();
    };

    const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
        //UpdateVendorName();
        const [form] = Form.useForm();
        // if (visible) {
        //     //console.log("f");
        //     console.log(Food);
        //     // console.log(Food.keys);
        //     console.log(Object.keys(Food));
        // }
        // if (Food.size == 0) {
        //     setValue("");
        // }
        return (
            <Modal
                visible={visible}
                title="Edit food item"
                okText="Edit"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            // onCreate(values);
                            console.log(values);
                            form.resetFields();
                            setVisible(false);
                            onEdit(values);
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
                    <Form.Item name="name" label="Name">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="price" label="Price">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="rating" label="Rating">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="tags" label="Tags">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="veg" label="Veg">
                        <Input type="textarea" />
                    </Form.Item>
                </Form>
            </Modal >
        );
    };

    const CollectionCreateForm1 = ({ visible1, onCreate, onCancel }) => {
        //UpdateVendorName();
        const [form] = Form.useForm();
        // if (visible) {
        //     //console.log("f");
        //     console.log(Food);
        //     // console.log(Food.keys);
        //     console.log(Object.keys(Food));
        // }
        // if (Food.size == 0) {
        //     setValue("");
        // }
        return (
            <Modal
                visible={visible1}
                title="Add food item"
                okText="Add"
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            // onCreate(values);
                            console.log(values);
                            form.resetFields();
                            setVisible(false);
                            onAdd(values);
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
                    <Form.Item name="name" label="Name">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="price" label="Price">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="rating" label="Rating">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="tags" label="Tags">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="veg" label="Veg">
                        <Input type="textarea" />
                    </Form.Item>
                </Form>
            </Modal >
        );
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12} md={9} lg={9}>
                    <Button onClick={() => {
                        setVisible1(true);
                        setID(sessionStorage.getItem("id"));
                        //console.log(user.add_on);
                        // const [form] = Form.useForm();
                    }}>
                        Add Food Item
                    </Button>
                    <CollectionCreateForm1
                        visible1={visible1}
                        // onCreate={onCreate}
                        onCancel={() => {
                            setVisible1(false);
                        }}
                    //food={Food}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell> Sr No.</TableCell>
                                    <TableCell>
                                        Rating
                                    </TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Vendor ID</TableCell>
                                    <TableCell>
                                        Price
                                    </TableCell>
                                    <TableCell>Veg</TableCell>
                                    <TableCell>Tags</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{ind}</TableCell>
                                        <TableCell>{user.rating}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.vendor_id}</TableCell>
                                        <TableCell>{user.price}</TableCell>
                                        <TableCell>{user.veg ? "veg" : "nonveg"}</TableCell>
                                        <TableCell>{user.tags.map((hmm, ind) => (
                                            <text>{hmm}, </text>
                                        ))}</TableCell>
                                        <TableCell>
                                            <Button type="primary"
                                                onClick={() => {
                                                    setVisible(true);
                                                    setID(user._id);
                                                    //console.log(user.add_on);
                                                    // const [form] = Form.useForm();
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <CollectionCreateForm
                                                visible={visible}
                                                // onCreate={onCreate}
                                                onCancel={() => {
                                                    setVisible(false);
                                                }}
                                            //food={Food}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button type="primary"
                                                onClick={() => {
                                                    OnDelete(user._id);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </div >
    );
};

export default UsersList;

// const onChangeName = (event) => {
//     setName(event.target.value);
// };

// const onChangePrice = (event) => {
//     setPrice(event.target.value);
// };

// const onChangeRating = (event) => {
//     setRating(event.target.value);
// };

// const onChangeVeg = (event) => {
//     setVeg(event.target.value);
// };

// // const onCahngeAddon = (event) => {
// //     setAddon(event.target.value);
// // };

// const onChangeTags = (event) => {
//     setTags(event.target.value);
// };

// const onChangeVendorId = (event) => {
//     setVendorId(event.target.value);
// };

{/* <Form.Item>
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={onChangeName}
                        />
                    </Form.Item>
                    <FormItem>
                        <TextField
                            label="price"
                            variant="outlined"
                            value={price}
                            onChange={onChangePrice}
                        />
                    </FormItem>
                    <FormItem>
                        <TextField
                            label="rating"
                            variant="outlined"
                            value={rating}
                            onChange={onChangeRating}
                        />
                    </FormItem>
                    <FormItem><TextField
                        label="veg"
                        variant="outlined"
                        value={veg}
                        onChange={onChangeVeg}
                    /></FormItem>
                    <FormItem>
                        <TextField
                            label="add ons"
                            variant="outlined"
                            value={add_on}
                            onChange={onCahngeAddon}
                        />
                    </FormItem>
                    <FormItem><TextField
                        label="tags"
                        variant="outlined"
                        value={tags}
                        onChange={onChangeTags}
                    /></FormItem>
                    <FormItem>
                        <TextField
                            label="Vendor ID"
                            variant="outlined"
                            value={vendor_id}
                            onChange={onChangeVendorId}
                        />
                    </FormItem> */}