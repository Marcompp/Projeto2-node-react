import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { request } from 'http'
import './App.css';



export default class Cards extends Component {
    constructor(props) {
        super(props)
        console.log(window.location.search)
        var setString = window.location.search.substring(1)
        this.state = {lista: [
            {name: 'prototype', type:'Hello World', text:'Runs the app'},
            {name: 'generic', type:'Test', text:'Debugs'}
        ], cardset: {set: setString} }
        console.log("AAAAAAAAA");
        /*
        console.log(localStorage.getItem("set"));
        if (localStorage.getItem("set") != null) {
            this.state.cardset.set = localStorage.getItem("dset");
        }
        */
        
        this.handleButton = this.handleButton.bind(this)
    }

    async componentDidMount() {

        console.log("CCCCCCCCCCCCC")
        console.log(this.state.cardset)
        await axios.get('http://localhost:3000/api/cardset/',{params: this.state.cardset})
            .then(resp=> {
                if(Math.floor(resp.status/100) === 2) {
                    this.setState({lista:resp.data,
                                    cardset:this.state.cardset})
                    return;
                }
                console.log(resp)
            })
            .catch(erro => console.log(erro))

    }

    



    render() {
        if (this.state.redirectToReferrer === true) {
            return (
                <Redirect to="/cards"/>
            )
        }

        
        var cards = this.state.lista;
        console.log(cards)

        var liCards = cards.map(card => {
            return (
                    <li key={card.name}>
                        <h3>{card.name}</h3>
                        {card.type}<br/><br/>
                        <small>{card.text}</small><br></br>
                        <button onClick={this.addCard} value= {card.name + "/" + card.type + "/" + card.text} >Adicionar ao Deck</button>
                        <hr></hr>
                    </li>
            )
        })
        return (
            <div>
            <button onClick={this.handleButton} value="Basic">Basic</button>
            <button onClick={this.handleButton} value="Classic">Classic</button>
            <button onClick={this.handleButton} value="Naxxramas">Naxxramas</button>
            <h3>{this.state.cardset.set}</h3>
                <ul>
                    {liCards}
                </ul>
            </div>
        )
    }

    handleButton(event) {
        var handleState = (state,event) => {
            state.cardset.set = event.target.value
            return state
        }
        console.log(this.state)
        this.setState(handleState(this.state,event))
        
        /*
        localStorage.setItem("set",this.state.cardset.set);
        console.log(localStorage.getItem("set"));
        */
        window.location.href="./?" + this.state.cardset.set;
        
    }


    addCard(event) {

        var splits = event.target.value.split("/")
        console.log(event.target.value)
        console.log(splits)
        var cardvalues = {name: splits[0], type: splits[1], text: splits[2]}
        console.log(cardvalues)
        axios.post('http://localhost:3000/decks/', cardvalues)
            .then(resp=> {
                if(Math.floor(resp.status/100) === 2) {
                    this.setState((state) => {
                        return {
                            lista: [...state.lista, state.cardset],
                            redirectToReferrer: true
                        }
                    })
                    return;
                }
                console.log(resp);
            })
            .catch(erro => console.log(erro));

    
    window.location.href="./decks"
    }

}