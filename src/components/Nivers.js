import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'; //[*StyleSheet] A animacao eh padrao no React
import IconButton from '@material-ui/core/IconButton';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class Niver extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            nivers: Array(),  // Array vazio de aniversarios 
            person: '', 
            birthday: ' '
        }
    }

    // [*Submit]
    onClickSubmit = (e) => {
        this.state.nivers.push({ list: [this.state.birthday, this.state.person] } )

        // Limpa o valor do campo depois do submit
        this.setState({person: '', birthday: ' '});
        e.preventDefault();
    }

    onTextChange = (e) => {
        if (e.target.id === 'person'){
            this.setState({person: e.target.value})
        } else if (e.target.id === 'birthday'){
            this.setState({birthday: e.target.value})
        }
    }

    // [*Delete_Item]
    delNiver = (idx) => {
        this.state.nivers.splice(idx, 1)
        this.setState({person: '', birthday: ' '});
    }

    render(){
        return(
            <div>
                <h2>
                    {this.props.title}
                </h2>

                {/* [*Form] */}
                <form onSubmit={this.onClickSubmit}>
                    <TextField
                        required margin="small" id="person" value={this.state.person} 
                        label="Aniversariante" onChange={this.onTextChange}
                    />
                    {" "}
                    <TextField
                        required margin="small" id="birthday" value={this.state.birthday}
                        type="date" label="Niver" onChange={this.onTextChange}
                    />
                    {" "}

                    {/* [*CustomButton] Utilizando o padrao de cores */}
                    <CustomButton type="submit" size="large">
                        INSERIR
                    </CustomButton>                    
                </form>  

                {/* [*LoopCreation] Varre os aniversarios preenchidos no Json de "estados" */}
                { this.state.nivers.map((nivers, index) => {
                    return <NiverItem 
                        delNiver={this.delNiver} // [*Interop] Associa a funcao delNiver do Parent
                        idx={index} 
                        birthday={nivers.list[0]}
                        person={nivers.list[1]}
                        />
                    })
                }

            </div>
        );
    }
}

// Importante: Only one default export allowed per module.
class NiverItem extends React.Component{
    constructor(props){
        // [*InputParams] No React os parametros sao facilmente acessados via this.props.PARAM 
        super(props)

        this.state = {
            idx: props.idx
        }
    }
    render(){
        return(
            // [*Template_Item]
            <div style={{
                    margin: 0,
                    marginBottom: 2,
                    borderBottomColor: "#ff0000",
                    borderBottomStyle: "dotted",
                    borderBottomWidth: 1
                    }}>

                <IconButton color="inherit" size="small" 
                    onClick={this.props.delNiver.bind(this, this.state.idx)}>
                    <DeleteForever />
                </IconButton>

                | <FormControlLabel 
                    control={<Switch color="primary" />}
                    label="Ativo" />
                | {this.props.birthday} | {this.props.person}

            </div>
        );
    }
}

// [*CustomButton] Define padrao de cores, funcionando como um WebComponent
const CustomButton = withStyles((theme: Theme) => ({
    root: {
      color: theme.palette.getContrastText('#007bff'),
      backgroundColor: '#007bff',
      '&:hover': {
        backgroundColor: '#0069d9'
      },
    },
}))(Button);
