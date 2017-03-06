import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

  const ToDoListContainer = React.createClass({

    getInitialState: function(){
      return {
        toDoList: ['Feed the dog', 'Go for a run', 'Learn React']
      }
    },

    _removeItems: function(index, evt){
      // console.log(this.state)
      // console.log(index)
      this.setState({
        toDoList: this.state.toDoList.filter( function(item, i){
          console.log(item, i)
          return i !== index
        })
      });
    },

    _addItems: function(item){
      // console.log(this.state)
      this.setState({
        toDoList: this.state.toDoList.concat([item])
      });
    },

    render: function(){
      return (
        <div className="todo-container">
          <div className="header">
            <h1>Doing Things</h1>
          </div>
          <UpdateItems _updateItemsCb={this._addItems}/>
          <ShowList itemNames={this.state.toDoList} _removeItemsCb={this._removeItems}/>
        </div>
      )
    }
  });

  const UpdateItems = React.createClass({

    getInitialState: function(){
      return {
        newItem: ''
      }
    },

    _updateNewItem: function(evt){
      this.setState({
        newItem: evt.target.value
      })
    },

    _handleAddNew: function(){
      this.props._updateItemsCb(this.state.newItem);
      this.setState({
        newItem: ''
      })
    },

    _handleKeyPress: function(event){
      if(event.key === 'Enter'){
        console.log(event)
        this.props._updateItemsCb(this.state.newItem);
        this.setState({
          newItem:''
        })
      }
    },

    render: function(){
      return (
      <div className="item-input">
        <input type="text" value={this.state.newItem} onChange={this._updateNewItem} onKeyPress={this._handleKeyPress}/>
        <button onClick={this._handleAddNew}>
          <i className="fa fa-plus"/>
        </button>
      </div>
      )
    }
  });

  const ShowList = React.createClass({
    render: function(){
      let listItems = this.props.itemNames.map(function(item, i){
        let component = this
        return <li key={i}>
          <label className="check-box-style">
            <input type="checkbox" value="on"/>
          </label>
          <span>{item}</span>
          <i onClick={() => component.props._removeItemsCb(i)} className="fa fa-times"/>
          </li>
      }, this);

      return(
        <div className="todo-list">
          <h3>The List</h3>
          <ul>{listItems}</ul>
        </div>
      )
    }
  });


  ReactDOM.render(
    <ToDoListContainer/>, document.querySelector('#app-container')
  )
