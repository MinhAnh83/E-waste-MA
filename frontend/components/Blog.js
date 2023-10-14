import React from 'react';
import { Button, Spinner, PaginationItem,PaginationLink, Pagination } from 'reactstrap';
export default function Blog() {

    return (
        <>
            <div className="header-post">
                <h2>Blog Name</h2>
            </div>

            <div className="row-post">
                <div className="leftcolumn-post">
                    <div className="card-post">
                        <h2>TITLE HEADING</h2>
                        <h5>Title description, Dec 7, 2017</h5>
                        <div className="fakeimg" style={{ height: '200px' }}>Image</div>
                        <p>Some text..</p>
                    </div>
                    <div className="card-post">
                        <h2>TITLE HEADING</h2>
                        <h5>Title description, Sep 2, 2017</h5>
                        <div className="fakeimg" style={{ height: '200px' }}>Image</div>
                        <p>Some text..</p>
                    </div>

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
        </>
    )
}