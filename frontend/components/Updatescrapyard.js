import { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap'
import dynamic from 'next/dynamic'
import { uploadFileToStorage } from '@/helper/firebase.helper'
import axios from 'axios'
export default function Updatescrapyard({ scrapyardSelected }) {
    console.log('scrapyardd', scrapyardSelected)
    const { address, image, langlat, name, open_time, popupContent, scrapyard_id, user_id } = scrapyardSelected
    const [File, setFile] = useState(null)
    const [errMsg, setErrMsg] = useState(null)

    // const handledUploadFile = (file) => {
    //     //file nay lay tu fileinput cua uplaod file su khi callback
    //     setFiles(file.files[0])
    //   }

    const [updateScrapyard, setupdateScrapyard] = useState(scrapyardSelected);
    console.log('haho', updateScrapyard)

    let selectedLatLng = null
    const Map = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
    })

    const handlUpdateScrapyard = () => {
        if(!File) {
            updateScrapyard.image=image;
         updateScrapyard.scrapyard_id=scrapyard_id;
         if(!selectedLatLng){
            updateScrapyard.langlat =  langlat;
         }
        //  updateScrapyard.langlat = `${selectedLatLng.lat}, ${selectedLatLng.lng}`
            axios.post('/api/myscrapyard/update', { ...updateScrapyard }).then(() => {
                window.location.replace('/dashboard/myscrapyard')
            })
            
        }
        uploadFileToStorage(File).then((imgURL) => {      
            updateScrapyard.image = imgURL;
            if(!selectedLatLng){
                updateScrapyard.langlat =  langlat;   }
             updateScrapyard.langlat = `${selectedLatLng.lat}, ${selectedLatLng.lng}`
            axios.post('/api/myscrapyard/update', { ...updateScrapyard }).then(() => {
                window.location.replace('/dashboard/myscrapyard')
            })
        }).catch(() => {

        })
    }
    const handleClickMapCb = (latlng) => {
        console.log(latlng)
        selectedLatLng = latlng
    }
    return (
        <>
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
                            value={updateScrapyard.name}
                            onChange={(e) => {
                                setupdateScrapyard({
                                    ...updateScrapyard,
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
                            type="text" value={updateScrapyard.address}
                            onChange={(e) => {
                                setupdateScrapyard({
                                    ...updateScrapyard,
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
                            value={updateScrapyard.open_time}
                            onChange={(e) => {
                                setupdateScrapyard({
                                    ...updateScrapyard,
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
                            onChange={(e) => {

                                setFile(e.target.files[0])
                                console.log(e.target.files[0])

                            }}
                        />

                    </Col>
                    <Map style={{ marginTop: '10px' }}
                        handleClickMapCb={handleClickMapCb} />
                </FormGroup>
            </Form>
            <button className='delete-button' style={{ background: '#ef9090' }} onClick={(e) => {
                handlUpdateScrapyard()
            }}> Cập nhật vựa</button>
       
        </>

    )

}
