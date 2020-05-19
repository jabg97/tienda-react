import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/Producto";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import ProductoForm from "./ProductoForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";



const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Productos = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllProductos()
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('¿Quiere eliminar este registro?'))
            props.deleteProducto(id,()=>addToast("Eliminado Correctamente", { appearance: 'info' }))
    }
    const onVender = item=> {
        var cantidad = window.prompt('Digite la cantidad');
        if (cantidad >0){
            if (item.stock >cantidad){
            props.venderProducto(item.id,cantidad,()=>addToast("Eliminado Correctamente", { appearance: 'info' }))
        }else{
            alert("Maximo "+item.stock+" productos.");
        }
        }else{
            alert("Digite una cantidad mayor a 0.");
        }
    }

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <ProductoForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                <TableCell></TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Referencia</TableCell>
                                    <TableCell>Precio</TableCell>
                                    <TableCell>Peso</TableCell>
                                    <TableCell>Stock</TableCell>
                                    <TableCell>Categoria</TableCell>                                
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.ProductoList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                        <Button><EditIcon color="secondary"
                                                        onClick={() => onVender(record)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                            <TableCell>{record.nombre}</TableCell>
                                            <TableCell>{record.referencia}</TableCell>
                                            <TableCell>{record.precio}</TableCell>
                                            <TableCell>{record.peso}</TableCell>
                                            <TableCell>{record.stock}</TableCell>
                                            <TableCell>{record.categoria}</TableCell>
                       
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    ProductoList: state.Producto.list
})

const mapActionToProps = {
    fetchAllProductos: actions.fetchAll,
    deleteProducto: actions.Delete,
    venderProducto: actions.Vender
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Productos));