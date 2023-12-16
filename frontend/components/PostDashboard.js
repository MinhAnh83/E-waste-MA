import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from 'react'
import Link from "next/link";
export default function PostDashboard({ posts }) {
    const [data, setData] = useState(posts)
    useEffect(() => {
        setData(posts)
    }, [posts])

    function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
            let j = (i.length > 3) ? i.length % 3 : 0;

            return negativeSign +
                (j ? i.substr(0, j) + thousands : '') +
                i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
                (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
            console.log(e)
        }
    };
    return (
        <>
            <div className="nfts">
                <div className="trending heading flex flex-sb " style={{ marginTop: "20px" }}>
                    <h2>Các bài đăng gần đây nhất</h2>
                </div>

                {/* <!-- =====Browse NFT===== --> */}
                <div className="browse">

                    {data.map((post, index) => {

                        return (
                          <>
                          {post && post.is_deleted===0 ? 
                            <div className="nft" key={index} style={{width:'350px'}}>

                            <div>
                                <Image
                                    loader={() => { return post.image || "https://via.placeholder.com/100x100" }}
                                    src="https://via.placeholder.com/100x100"
                                    width={268}
                                    height={254}
                                    alt="Picture of the author"
                                />

                                <div className="title">{post.name}</div>
                                <Link  href={`/dashboard/detailPost/${post.post_id}`} style={{ textDecoration: 'underline', marginTop: '7px', fontSize: '15px', color: '#77cdff' }}>Xem chi tiết</Link>
                                <div className="details flex flex-sb" style={{ marginTop: '7px' }}>
                                    <div className="author flex">
                                        <img
                                            src="https://raw.githubusercontent.com/programmercloud/nft-dashboard/main/img/user.png"
                                            alt=""
                                        />

                                        <p>{post.fullname}</p>

                                    </div>
                                    <div className="price" style={{ fontSize: '10px' }}>{formatMoney(post.expect_price, 0) || 'Thương lượng'}</div> <hr />


                                </div>

                            </div>

                        </div>: null
                        }
                        
                          </>
                           




                        )
                    })}




                </div>
            </div>

        </>
    )
}