import React ,{Component} from 'react'
import { connect } from 'dva'
import TodoList from '../components/TodoList'
import Edit from '../components/Edit'
import {Modal, Button } from 'antd'
import styles from './Todos.css';



class Todos extends Component{
  state={
    modalTitle:'',
    modalVisible:false,
    modalContent:'',
    changeDetail:''
  }


  onUpdate=(item)=>{
    this.setState({
      changeDetail:item,
      modalContent:<Edit
        detail={item}
        onCancel={this.handleCancel}
      />,
    })
  }

  handleDelete= (id) =>{
    this.props.dispatch({
      type: 'todos/delete',
      payload: id,
    })
  }

  onDetail = (item) => {
      this.setState({
        modalTitle:item.name,
        modalVisible: true,
        modalContent:<div className={styles.modal}>
          {item.content}
          <Button onClick={()=>this.onUpdate(item)}>update</Button>
        </div>,
      });
  }

  onAdd = () => {
    this.setState({
      modalTitle: 'Modal',
      modalVisible: true,
      modalContent: <Edit
        detail={''}
        onCancel={this.handleCancel}
      />
    })
  }

  handleCancel = () => {
    this.setState({
      modalContent:'',
      modalVisible: false,
    });
  }

  render(){
    const {todos} = this.props
    const {modalTitle,modalVisible,modalContent} = this.state
    return (
      <div>

        <Modal
          title={modalTitle}
          visible={modalVisible}
          onCancel={this.handleCancel}
          footer={''}
        >
          {modalContent}
        </Modal>


        <TodoList onDelete={this.handleDelete} todos={todos} onDetail={this.onDetail} />


       <Button onClick={this.onAdd}>Add</Button>
      </div>
    )
  }
}

export default connect(({todos}) => ({todos}))(Todos)

