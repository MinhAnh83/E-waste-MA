import { useState } from 'react'
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap'
import dynamic from 'next/dynamic'
import { uploadFileToStorage } from '@/helper/firebase.helper'
import axios from 'axios'
export default function Createscrapyard({ userData }) {
    const [File, setFile] =useState(null)
    const [errMsg, setErrMsg] =useState(null)
    const { id, email } = userData
    // const handledUploadFile = (file) => {
    //     //file nay lay tu fileinput cua uplaod file su khi callback
    //     setFiles(file.files[0])
    //   }
    const [createScrapyard, setcreateScrapyard] = useState({
        address: null,
        name: null,
        image: null,
        langlat: null,
        open_time: null,
        user_id: id
    })
 const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    })
    const handleCreateScrapyard=()=>{
        if(!File) return setErrMsg('Vu long them anh !!')
        uploadFileToStorage(File).then((imgURL)=>{
            createScrapyard.image=imgURL
          axios.post('/api/scrapyard',{...createScrapyard}).then(()=>{
            // handleCreatedCB && handleCreatedCB()
            //goi nguoc lai ham me
          })
      
        
        }).catch(()=>{
          setErrMsg('Tai anh len that bai')
        })
     
      }
    return (
        <>
        <p>Hello</p>
            <Form>
                <FormGroup row>
                    <Label for="namepost" sm={4}>
                        Tên vựa
                    </Label>
                    <Col sm={8}>
                        <Input
                            id="namepost"
                            name="name"
                            placeholder="Tên vựa"
                            type="text"
                            value={createScrapyard.name}
                            onChange={(e) => {
                                setcreateScrapyard({
                                    ...createScrapyard,
                                    name: e.target.value
                                })
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="addresspost" sm={4}>
                        Địa điểm
                    </Label>
                    <Col sm={8}>
                        <Input
                            id="addresspost"
                            name="address"
                            placeholder="Địa chỉ"
                            type="text" value={createScrapyard.address}
                            onChange={(e) => {
                                setcreateScrapyard({
                                    ...createScrapyard,
                                    address: e.target.value
                                })
                            }}

                        />
                    </Col>

                </FormGroup>
                <FormGroup row>
                    <Label
                        for="open_time"
                        sm={4}
                    >
                        Thời gian mở
                    </Label>
                    <Col sm={8}>
                        <Input
                            id="open_time"
                            name="text"
                            type="text"
                            value={createScrapyard.open_time}
                            onChange={(e) => {
                                setcreateScrapyard({
                                    ...createScrapyard,
                                    open_time: e.target.value
                                })
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="image"
                        sm={4}
                    >
                        Hình ảnh
                    </Label>
                    <Col sm={8}>
                        <Input
                            id="image"
                            name="text"
                            type="file"
                            value={createScrapyard.image}
                            onChange={(e) => {

                                     setFile(e.target.files[0])
   console.log(e.target.files[0])

                                    
                               
                            }}
                        />
                    </Col>
                    <Map style={{marginTop: '10px'}}/>
                </FormGroup>
            </Form>
            <Button style={{ fontSize: '12px' }} onClick={() => {
              handleCreateScrapyard()
            }}> Tạo vựa</Button>
            <Button style={{ fontSize: '12px' }}
            > Cancel </Button>
        </>

    )

}
