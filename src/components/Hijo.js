import React, { Component } from 'react';
import Global from './../Global';
import axios from 'axios';

export default class Hijo extends Component {

    state = {
        doctores: [],
        status: false
    }

    loadDoctores = () => {
        var request = Global.url + "api/Doctores";
        axios.get(request).then(response => {
            this.setState({
                doctores: response.data,
                status: true
            })
        })
    }

    componentDidMount = () => {
        console.log("Inicia")
        this.loadDoctores();
    }

    componentDidUpdate = (oldProps) => {
        if(oldProps.contador != this.props.contador){
            console.log("Actualiza")
            this.loadDoctores();
        }
    }

    render() {
        return (
            <div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Especialidad</th>
                            <th>Salario</th>
                        </tr>   
                    </thead>
                    <tbody>
                        {
                            this.state.status &&
                            this.state.doctores.map((doctor, index) => {
                                return (
                                <tr key={index}>
                                    <td>{doctor.apellido}</td>
                                    <td>{doctor.especialidad}</td>
                                    <td>{doctor.salario}</td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
