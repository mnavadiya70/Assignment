import { Component } from 'react';
import axios from '../../axios';
import { Link } from 'react-router-dom';

import Unauthorized from '../../components/Unauthorized/Unauthorized';
import Input from '../../components/Input/Input';
import classes from '../../main.module.css';

const employee = [
    { label: 'Name' },
    { label: 'UserName' },
    { label: 'Email' },
    { label: 'Address' },
    { label: 'Website' },
    { label: 'Company' }
]

class Create extends Component {    
    state = {
        Name: '',
        UserName: '',
        Email: '',
        Address: '',
        Website: '',
        CompanyName: '',
        Key: ''
    }

    componentDidMount(){
        if (this.props.match.params.id !== null) {
            axios.get('/users/' + this.props.match.params.id + '.json')
                .then(response => {
                    if (response.data !== null) {
                        this.setState({
                            Key: this.props.match.params.id,
                            Name: response.data.Name,
                            UserName: response.data.UserName,
                            Email: response.data.Email,
                            Company: response.data.Company,
                            Address: response.data.Address,
                            Website: response.data.Website,
                        });
                    }
                })
        }
    }

    inputChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    addEmployee = () => {
        const employee = {
            Name: this.state.Name,
            UserName: this.state.UserName,
            Email: this.state.Email,
            Website: this.state.Website,
            Company: this.state.Company,
            Address: this.state.Address
        }
        
        const emp = JSON.stringify(employee);
        if (this.state.Key !== null && this.state.Key !== "" && this.state.Key !== undefined) {
            axios.put('/users/' + this.state.Key + '.json', emp)
                .then(response => {
                    // alert('User edited');
                    // this.props.history.push("/manage-employees");
                })
        }
        else {
            axios.post('/users.json', emp)
                .then(response => {
                    // alert('User added');
                    // this.props.history.push("/manage-employees");
                })
        }
        this.props.history.push("/manage-employees");
    }

    render() {
        localStorage.setItem('PageSize', 5);
        localStorage.setItem('PageIndex', 1);
        const isAuthenticated = localStorage.getItem('authenticated');
        return (
            isAuthenticated === "true"
                ? <div style={{textAlign: 'center'}}>
                    <h4 className={classes.header}>Add Employee Details</h4>
                    <form onSubmit={this.addEmployee}>
                    {
                        employee.map(emp => {
                            return (
                                <Input key={emp.label} label={emp.label} fieldType="input" name={emp.label} type={emp.label === "Email" ? "email" : "text"} emp={emp} value={this.state[emp.label]} change={this.inputChangeHandler}/>
                                // <div key={emp.label}>
                                //     <label className={classes.displayLabel}>{emp.label}</label>
                                //     <input className={classes.displayField} type='text' name={emp.label} value={this.state[emp.label]} onChange={this.inputChangeHandler} />
                                // </div>
                            )
                        })
                    }
                    <button className={classes.ButtonSave} >Save</button>&nbsp;&nbsp;
                    <Link to="/manage-employees" style={{textDecoration: 'none'}}>
                        <button className={classes.ButtonCancel}>Cancel</button>
                    </Link>
                    </form>
                </div>
                : <Unauthorized />
        );
    }
}

export default Create;