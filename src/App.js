import React, { Component, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux';
import value from "./data.json";
import './App.css';
import {getData} from "./action";
import { useSelector } from 'react-redux'
import { useStore } from 'react-redux'

class App extends Component {
  state={
    userInfo: []
  }
  componentDidMount() {
    this.props.dispatch(getData());
  }


  componentDidUpdate(nextProps) {
    if(nextProps.users !== this.props.users){
      this.setState({
        userInfo: this.props.users
      })
    }
    console.log("nextProps",nextProps.users);
    console.log("user did update",this.props.users)
  }

  onClickSelect = (index) => {
    const {userInfo} = this.state
    let tempUserData = userInfo;
    let tempObj = tempUserData[index];
    if(tempObj && !tempObj["selectRow"]) {
      tempObj["selectRow"] = true
    } else {
      tempObj.selectRow = !tempObj.selectRow
    }
    tempUserData[index] = tempObj;
    this.setState({
      userInfo: tempUserData
    })
  }

  render() {
    const { userInfo } = this.state;
    return (
        <table id='userData'>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>MiddleName</th>
              <th>Prefix</th>
              <th>NickName</th>
              <th>line1</th>
              <th>line2</th>
              <th>zipCode</th>
              <th>city</th>
              <th>state</th>
              <th>country</th>
              <th>friends</th>
              <th>hobbies</th>
            </tr>
          </thead>
          <tbody>
            {userInfo && userInfo.map((data, index)=> {
              let friendData = "";
              let hobbiesValue = "";
              let selectRow = data && data.selectRow ? data.selectRow : false;
              return (
                <tr key={index} onClick={()=> this.onClickSelect(index)} style={{ backgroundColor:  selectRow ? "red" : ""  }}>
                  <td>{data.name.firstName}</td>
                  <td>{data.name.lastName}</td>
                  <td>{data.name.middleName}</td>
                  <td>{data.name.prefix}</td>
                  <td>{data.name.nickName}</td>
                  <td>{data.Address.line1}</td>
                  <td>{data.Address.line2}</td>
                  <td>{data.Address.zipCode}</td>
                  <td>{data.Address.city}</td>
                  <td>{data.Address.state}</td>
                  <td>{data.Address.country}</td>
                  {data && data.friends && data.friends.map((friendsData, index)=> {
                     if(friendsData && data.friends.length -1 !== index) {
                      friendData = friendsData + "," + friendData;
                     } else {
                      friendData = friendData + friendsData;
                      return (
                      <td>{friendData}</td>
                      )
                     }
                  }) }
                {data && data.hobbies && data.hobbies.map((hobbiData, index)=> {
                     if(hobbiData && data.hobbies.length -1 !== index) {
                      hobbiesValue = hobbiData + "," + hobbiesValue;
                     } else {
                      hobbiesValue = hobbiesValue + hobbiData;
                      return (
                      <td>{hobbiesValue}</td>
                      )
                     }
                  }) }
                    
                    
                </tr>
              )
            }) }
          </tbody>
        </table>
    );
  }
}

function initMapStateToProps(data) {
  return {
      users: data
  }
}

export default connect(initMapStateToProps)(App);
