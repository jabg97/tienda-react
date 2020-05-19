import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/Producto";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    nombre: '',
    referencia: '',
    precio: '',
    peso: '',
    stock: '',
    categoria: ''
}

const ProductoForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nombre' in fieldValues)
            temp.nombre = fieldValues.nombre ? "" : "Este campo es requerido."
        if ('referencia' in fieldValues)
            temp.referencia = fieldValues.referencia ? "" : "Este campo es requerido."
            if ('precio' in fieldValues)
            temp.precio = (/^\d+$/).test(fieldValues.precio) ? "" : "Debe ser un valor numerico."
            if ('peso' in fieldValues)
            temp.peso = (/^\d+$/).test(fieldValues.peso) ? "" : "Debe ser un valor numerico."
            if ('stock' in fieldValues)
            temp.stock = (/^\d+$/).test(fieldValues.stock) ? "" : "Debe ser un valor numerico."
        if ('categoria' in fieldValues)
            temp.categoria = fieldValues.categoria ? "" : "Este campo es requerido."   
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Exito al enviar", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createProducto(values, onSuccess)
            else
                props.updateProducto(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.ProductoList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="nombre"
                        variant="outlined"
                        label="Nombre"
                        value={values.nombre}
                        onChange={handleInputChange}
                        {...(errors.nombre && { error: true, helperText: errors.nombre })}
                    />
                    <TextField
                        name="precio"
                        variant="outlined"
                        label="Precio"
                        value={values.precio}
                        onChange={handleInputChange}
                        {...(errors.precio && { error: true, helperText: errors.precio })}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.categoria && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Categoria</InputLabel>
                        <Select
                            name="categoria"
                            value={values.categoria}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Seleccione una Categoria</MenuItem>
                            <MenuItem value="Alimentos">Alimentos</MenuItem>
                            <MenuItem value="Tecnologia">Tecnologia</MenuItem>
                        </Select>
                        {errors.categoria && <FormHelperText>{errors.categoria}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        name="referencia"
                        variant="outlined"
                        label="Referencia"
                        value={values.referencia}
                        onChange={handleInputChange}
                        {...(errors.referencia && { error: true, helperText: errors.referencia })}
                    />
                    <TextField
                        name="peso"
                        variant="outlined"
                        label="Peso"
                        value={values.peso}
                        onChange={handleInputChange}
                        {...(errors.peso && { error: true, helperText: errors.peso })}
                    />
                    <TextField
                        name="stock"
                        variant="outlined"
                        label="Stock"
                        value={values.stock}
                        onChange={handleInputChange}
                        {...(errors.stock && { error: true, helperText: errors.stock })}
                    />
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Enviar
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Limpiar
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    ProductoList: state.Producto.list
})

const mapActionToProps = {
    createProducto: actions.create,
    updateProducto: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ProductoForm));