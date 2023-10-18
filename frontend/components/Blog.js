import React from 'react';
import { Button,Form,FormGroup,Label,Input, Spinner, PaginationItem, PaginationLink, Pagination, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import Axios from '@/helper/axios.helper'
import axios from 'axios'


export default function Blog({ userData }) {
    const [posts, setPosts] = useState([])
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const refesh = () => {
        axios.get('/api/post').then((response) => {
            const { data } = response.data
            console.log(data)
            setPosts(data)
        })
    }
    useEffect(() => {
        refesh()
    }, [])

    return (
        <>
            <div className="header-post">
                <h2>Posts</h2>
            </div>

            <div className="row-post">
                <div className="leftcolumn-post">
{posts ?  posts.map((post, index) => {
                        return (
                            <> 
                                <div className="card-post" key={index} >
                                    <h2>{post.name}</h2>
                                    <h5>{post.createAt} <span>By {post.fullname}</span></h5> 
                                  

                                        <Image
                                           loader={() => { return post.image || "https://via.placeholder.com/100x100" }}
                                           src="https://via.placeholder.com/100x100"
                                            width={400}
                                            height={200}
                                            alt="Picture of the author"
                                            style={{ textAlign: 'center' }}
                                        />

                                  
                                    <p>{post.content}</p>
                                    <Button onClick={toggle} color="primary" style={{fontSize:'15px'}}>Ra giá</Button>
                                </div>
                            </>
                        )

                    }): 'Loading....' }

                   


                </div>
                <div className="rightcolumn-post">
                    <div className="card-post">
                        <h2>About Me</h2>
                        <div className="fakeimg" style={{ height: '100px' }}>Image</div>
                        <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
                    </div>
                    <div className="card-post">
                        <h3>Popular Post</h3>
                        <div className="fakeimg">Image</div><br></br>
                        <div className="fakeimg">Image</div><br></br>
                        <div className="fakeimg">Image</div>
                    </div>
                    <div className="card-post">
                        <h3>Follow Me</h3>
                        <p>Some text..</p>
                    </div>
                </div>
            </div>


            <div className="footer-post">
                <h2>footer-post</h2>
            </div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle} style={{ textAlign: 'center', fontSize: '12px' }}>   Ra giá</ModalHeader>
                <ModalBody>
<Form>
<FormGroup>
    <Label for="exampleText">
      Gía mà bạn nghĩ nó sẽ phù hợp với món đồ. Lí do (Nếu có thể)
    </Label>
    <Input
      id="exampleText"
      name="text"
      type="textarea"
    />
  </FormGroup>
</Form>
               

                </ModalBody>
                <ModalFooter>
         
          <Button color="secondary" onClick={toggle} style={{fontSize:'15px'}}>
            Cancel
          </Button>
        </ModalFooter>

            </Modal>
        </>
    )
}