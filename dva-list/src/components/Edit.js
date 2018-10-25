import React, { Component } from 'react'
import { connect } from 'dva'
import { Input, Card, Button } from 'antd'
import styles from './edit.css';

class Edit extends Component {
  state = {
    name:this.props.detail === '' ? '' : this.props.detail.name,
    content:this.props.detail === '' ? '' : this.props.detail.content ,
  }


  handleChangeInput=(event,name)=>{
    let value = {};
    value[name]=event.target.value
    this.setState(value)
  }


  onEdit = () => {
    const { detail} = this.props
    const {name, content} = this.state
    if (detail === '') {
      const item = {
        name: name,
        content: content,
        id: (new Date()).valueOf()
      }
      this.setState({name: '', content: ''})
      const {dispatch} = this.props
      dispatch({
        type: 'todos/add',
        payload: item,
      })
      this.props.onCancel()
    } else {
      const newItem = {
        id: detail.id,
        name:name,
        content:content
      }
      this.setState({name: '', content: ''})
        this.props.dispatch({
          type: 'todos/update',
          payload: newItem,
        })
      this.props.onCancel()
    }
  }
    // TODO：应该干什么
    // 将现有的数据格式化为store中使用的格式



  render () {
    const {name,content} = this.state
    const {show} = this.props
    return (
      <Card>
        <h4>name</h4>
        <Input
          value={name}
          name={'name'}
          onChange={(event)=>{this.handleChangeInput(event,'name')}}
        />
        <h4>content</h4>
        <Input
          value={content}
          name={'content'}
          onChange={(event)=>{this.handleChangeInput(event,'content')}}
        />
        <Button className={styles.add} type="primary" disabled={!name || !content}  onClick={this.onEdit}>{!show?'add':'edit'}</Button>
      </Card>
    )
  }

}

export default connect()(Edit)

