import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';


const WrapInput = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  width:300px;
  margin: auto;
  font-family: sans-serif;
`;
const WrapContent = styled.div`
  margin-top:20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  width:300px;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  height:auto;
  box-shadow: 0 4px 8px 0 rgba(48,82,120,.08);
`;
const UnderWrapContent = styled.div`
  display: flex;
  font-family: sans-serif;
  width:300px;
  margin: 20px 0 20px 0;
`;
const Content = styled.div`
  width:50%;
  text-align: left;
  padding-left: 20px;
  color: #324c5b;
`;
const WrapButton = styled.div`
  width:50%;
  text-align: right;
  padding-right: 20px;
`;
const ButtonStyle = styled.button`
  width:70px;
  height: 25px;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: #12c48b;
  color: #fff;
  border-radius: 3px 3px 3px 3px;
  font-family: sans-serif;
`;
const TitleProject = styled.h2`
  color: #324c5b;
  font-family: sans-serif;
`;
const InputValue = styled.input`
  color: #324c5b;
  width: 150px;
  height: 20px;
  background-color: #fff;
  font-family: sans-serif;
  border: #222;
  border-radius: 3px 3px 3px 3px;
  outline: none;
  cursor: pointer;
  padding-left: 10px;
`;
const ButtonAdd = styled.button`
  width:70px;
  height: 25px;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: #12c48b;
  color: #fff;
  border-radius: 3px 3px 3px 3px;
  font-family: sans-serif;
`;


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });
    // update localStorage
    localStorage.setItem(key, value);
  }

  addItem() {
    // create a new item
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };
    // copy current list of items
    const list = [...this.state.list];
    // add the new item to the list
    list.push(newItem);
    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });
    // update localStorage
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("newItem", "");
  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);
    this.setState({ list: updatedList });
    // update localStorage
    localStorage.setItem("list", JSON.stringify(updatedList));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Mini project</h1>
        </header>
        <div>
          <TitleProject>
            Add an item
          </TitleProject>
          <WrapInput>
            <InputValue type="text" placeholder="Enter your value" value={this.state.newItem} onChange={e => this.updateInput("newItem", e.target.value)}/>
            <ButtonAdd onClick={() => this.addItem()} disabled={!this.state.newItem.length}>&#43; Add</ButtonAdd>
          </WrapInput>
          <WrapContent>
            {this.state.list.map(item => {
              return (
                <UnderWrapContent key={item.id}>
                  <Content>
                    {item.value}
                  </Content>
                  <WrapButton>
                    <ButtonStyle onClick={() => this.deleteItem(item.id)}>
                      Remove
                    </ButtonStyle>
                  </WrapButton>
                </UnderWrapContent>
              );
            })}
          </WrapContent>
        </div>
      </div>
    );
  }
}