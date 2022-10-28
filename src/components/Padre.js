import axios from 'axios';
import React, { Component } from 'react';
import Global from './../Global';
import Hijo from './Hijo';

export default class Padre extends Component {

    selectespecialidad = React.createRef();
    incremento = React.createRef();

    state = {
        especialiades: [],
        status: false,
        contador: 0
    }

    incrementarSalario = (e) => {
        e.preventDefault();
        var request = Global.url + "api/Doctores/" + this.selectespecialidad.current.value + "/" + this.incremento.current.value
        console.log(request)
        axios.put(request).then(response => {
            this.setState({
                contador: this.state.contador + 1
            })
        })
    }

    loadEspecialidad = () => {
        var request = Global.url + "api/Doctores/Especialidades";

        axios.get(request).then(response => {
            this.setState({
                especialiades: response.data,
                status: true
            })
        });
    }

    componentDidMount = () => {
        this.loadEspecialidad();
    }

    render() {
        return (
            <div>
                <h1>Incremento salario doctores</h1>
                <form onSubmit={this.incrementarSalario}>
                    <label>Seleccione especialidad</label>
                    <select ref={this.selectespecialidad}>
                        {
                            this.state.status &&
                            this.state.especialiades.map((especialidad, index) => {
                                return (<option key={index} value={especialidad}>{especialidad}</option>)
                            })
                        }
                    </select><br/>
                    <label>Incremento salarial</label>
                    <input type={"text"} ref={this.incremento}/><br/>
                    <button>Incrementar salarios</button>
                </form>
                <Hijo contador={this.state.contador}/>                
            </div>
        )
    }
}
