'use strict'

import { useState } from 'react'
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap'
import UploadComponent from '@/components/uploadFile'
import { uploadFileToStorage } from '@/helper/firebase.helper'
import axios from 'axios'

export default function CreatePost({handleCreatedCB, userData}) {
  const {id, email} = userData
  const [files, setFiles] =useState(null)
  const [errMsg, setErrMsg] =useState(null)

  const [createPost, setcreatePost] = useState({
    name:null,
    user_id: id,
    image:null,
    content:null,
    expect_price: null
  })

  const handledUploadFile = (file) => {
    //file nay lay tu fileinput cua uplaod file su khi callback
    setFiles(file.files[0])
  }
const handleCreatePost=()=>{
  if(!files) return setErrMsg('Vu long them anh !!')
  uploadFileToStorage(files).then((imgURL)=>{
    createPost.image=imgURL
    axios.post('/api/post',{...createPost}).then(()=>{
      handleCreatedCB && handleCreatedCB()
      //goi nguoc lai ham me
    })

  
  }).catch(()=>{
    setErrMsg('Tai anh len that bai')
  })
console.log(createPost)
}
  return (
    <>
      {/* <input type='file'
            onChange={(event) => {
                console.log(event.target.files[0])
                setImageUpload(event.target.files[0])
            }}
        /> */}
      <Form>
        <FormGroup row>
          <Label for="namepost" sm={4}>
            Tiêu đề
          </Label>
          <Col sm={8}>
            <Input
              id="namepost"
              name="email"
              placeholder="Tiêu đề bài viết"
              type="text"
              value={createPost.name}
              onChange={(e)=>{setcreatePost({
                ...createPost,
                name: e.target.value
              })}}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="pricepost" sm={4}>
            Giá muốn bán
          </Label>
          <Col sm={8}>
            <Input
              id="pricepost"
              name="email"
              placeholder="Giá tiền"
              type="number"  value={createPost.expect_price}
              onChange={(e)=>{setcreatePost({
                ...createPost,
                expect_price:parseFloat(e.target.value) 
              })}}
            
            />
          </Col> 

        </FormGroup>
        <FormGroup row>
          <Label
            for="exampleText"
            sm={4}
          >
            Nội dung
          </Label>
          <Col sm={8}>
            <Input
              id="exampleText"
              name="text"
              type="textarea" 
              value={createPost.content}
              onChange={(e)=>{setcreatePost({
                ...createPost,
                content : e.target.value
              })}}
            />
          </Col>
        </FormGroup>
      </Form>
      <UploadComponent uploadCallBack={handledUploadFile}></UploadComponent>
      <hr></hr>
      <p>{errMsg}</p>
      <Button style={{fontSize:'12px'}} onClick={() => {
       handleCreatePost()
      }}> Tạo bài Viết</Button>
      <Button style={{fontSize:'12px'}} 
      > Cancel </Button>
    </>
  );
}