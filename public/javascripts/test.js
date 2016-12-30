/**
 * Created by hvming on 2016/10/11.
 */
require('../less/test.less')
var gg=require('./com.js');
var React = require('react');
var ReactDOM = require('react-dom');


var HelloMessage = React.createClass({
  getInitialState: function() {
    return {name: 'wjlnhs',list:[],ppp:'sss'};
  },
  componentDidMount:function(){
	   var that=this;
	$.get('/getList',function(data){
		  console.log(data)
		  that.setState({list:data})
	  })

  },
  render: function() {
	  var that=this;
	var createTable = function(item) {
      return <div >
	  			<div>用户名：{item.name}</div>
	  			<table className="w-800">
				<thead>
				<tr><td>日期</td><td>积分</td><td>挂机时长（小时）</td><td>任务数</td></tr>
				</thead>
				<tbody>{item.data.map(createItem)}</tbody>
				</table>
	  		</div>;
    };
	var createItem = function(subitem) {
      return <tr >
	  			<td>{subitem.date}</td>
				<td>{subitem.credit_point}</td>
				<td>{subitem.hangup_time}</td>
				<td>{subitem.task_num}</td>
			</tr>;
    };
	return  <div>{this.state.list.map(createTable)}</div>;
  }
});

ReactDOM.render(
    <HelloMessage />,
    document.getElementById('example')

);

