import React, {Component } from 'react'
import Scene from "../scene/Scene"
import './concert.css';

export default class Concert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price: props.price,
            sales: props.sales, //number of tickets sold
            genre: props.genre,
            capacity: props.capacity //skal komme fra Scene component
            //Må også ha en Artist component og en liste med Tekniker components
             
        }
    }

    render() {
        return (
            <div className = "concertDiv">
                <h1> Concert with: Artist</h1>
                <p> Genre: {this.state.genre}</p> 
                <p> ticket price: {this.state.price} </p>
                <p> tickets sold: {this.state.sales} </p>
                <p> Sold out : {this.isSoldOut()} </p>
            </div>

        )
    }

    isSoldOut() {
        if (this.state.sales >= this.state.capacity) {
            return "true";
        }
        return "false"
        
    }


}