import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './stores/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

/*

//unclassify file
'use strict';
import { combineReducers,createStore } from 'redux';
import React, { Component, PropTypes } from 'react';
import {Provider,connect } from 'react-redux';
import {render,findDOMNode} from 'react-dom';

import styles from './style.css';

//action..............
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SETFILTER='SETFILTER';
const VisibilityFilters = {
	SHOW_ALL: 'SHOW_ALL',
	SHOW_COMPLETED: 'SHOW_COMPLETED',
	SHOW_ACTIVE: 'SHOW_ACTIVE'
};
function addTodo(text) {
	return {
		type: ADD_TODO,
		text
	}
}
function toggleTodo(index) {
	return {
		type: TOGGLE_TODO,
		index
	}
}
function setFilter(filter){
	return {
		type:SETFILTER,
		filter
	}
}

//reducers...........
function todos(state = [], action) {
	switch (action.type) {
		case ADD_TODO:
			return [
				...state,
				{
					text: action.text,
					toggle: false
				}
			];
		case TOGGLE_TODO:
			return state.map((item, index)=> {
				if (action.index === index) {
					return Object.assign({}, item, {
						toggle: !item.toggle
					})
				}
				return item
			});
		default:
			return state
	}
}
function setVisibleFilter(state=VisibilityFilters.SHOW_ALL,action){
	switch (action.type){
		case SETFILTER:
			return action.filter;
		default:
			return state
	}
}
const combine = combineReducers({
	todos,
	setVisibleFilter
});

let store = createStore(combine);

//components
class AddTodo extends Component {
	render() {
		return (
			<div>
				<input type='text' ref='input'/>
				<button onClick={ e => this.handleClick(e) }>
					Add
				</button>
			</div>
		);
	}

	handleClick(e) {
		const inputNode = findDOMNode(this.refs.input);
		const text = inputNode.value.trim();
		this.props.onAddClick(text);
		inputNode.value = '';
	}
}
class List extends Component {
	render() {
		console.log(this.props);
		const {text,onClick}=this.props;
		return (
			<div>
				<a onClick={onClick} className={this.props.toggle?'toggle-active':'toggle'}>{text}</a>
			</div>
		)
	}
}
class ToggleTodo extends Component {
	render() {
		console.log(this.props);
		return (
			<ul>
				{
					this.props.data.map((item, index)=>(
						<List
							{...item}
							key={index}
							onClick={()=>(
						    this.props.onToggleClick(index)
						  )}
						/>
					))
				}
			</ul>
		)
	}
}
class Footer extends Component{
	renderFilter(filter, name) {
		if(filter == this.props.filter) {
			return name;
		}
		return (
			<a
				href="#"
				onClick={e => {
          e.preventDefault();
          this.props.onFilterChange(filter);
        }}>
				{name}
			</a>
		);
	}

	render() {
		return (
			<p>
				SHOW
				{' '}
				{this.renderFilter('SHOW_ALL', 'All')}
				{', '}
				{this.renderFilter('SHOW_COMPLETED', 'Completed')}
				{', '}
				{this.renderFilter('SHOW_ACTIVE', 'Active')}
				.
			</p>
		);
	}
}
//container
class App extends Component {
	render() {
		console.log(this.props);
		const {dispatch,VisibleTodo,setVisibleFilter} = this.props;
		return (
			<div>
				<AddTodo
					onAddClick={text =>
        dispatch(addTodo(text))}
				/>
				<ToggleTodo
					data={VisibleTodo}
					onToggleClick={
						index=>dispatch(toggleTodo(index))
					}/>
				<Footer
					filter={setVisibleFilter}
					onFilterChange={nextFilter => dispatch(setFilter(nextFilter))}
				/>
			</div>
		)
	}
}

function selectTodos(todos, filter) {
	switch (filter) {
		case VisibilityFilters.SHOW_ALL:
			return todos;
		case VisibilityFilters.SHOW_COMPLETED:
			return todos.filter(todo => todo.toggle);
		case VisibilityFilters.SHOW_ACTIVE:
			return todos.filter(todo => !todo.toggle);
	}
}
// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/reactjs/reselect 效果更佳。

function select(state) {
	console.log(state);
	return {
		VisibleTodo: selectTodos(state.todos,state.setVisibleFilter),
		setVisibleFilter: state.setVisibleFilter
	}
}

var ConnectedApp = connect(select)(App);


render(
	<Provider store={store}>
		<ConnectedApp/>
	</Provider>,
	document.getElementById('root')
);
/!*测试
 const combine=combineReducers({
 todos
 });

 let store=createStore(combine);

 console.log(store.getState());

 let watch=store.subscribe(()=>
 console.log(store.getState())
 );

 store.dispatch(addTodo('Learn about actions'));

 watch();*!/*/
