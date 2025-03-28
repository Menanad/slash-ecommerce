import image1 from './p1.jpg'
import image2 from './p2.jpg'
import image3 from './p3.jpg'
import image4 from './p4.jpg'
export default function InfiniteScroll() {
    return (
        <div>
            <div className="carousel">
                <div className="group">
                    <div className="card1">
                        <img className='imageinifnite' src={image1} />
                    </div>
                    <div className="card1">
                        <img className='imageinifnite' src={image2} />
                    </div>
                    <div className="card1">
                        <img className='imageinifnite' src={image3} />
                    </div>
                    <div className="card1">
                        <img className='imageinifnite' src={image4} />
                    </div>
                </div>

                <div aria-hidden className="group">
                    <div className="card1"> <img className='imageinifnite' src={image1} /></div>
                    <div className="card1"> <img className='imageinifnite' src={image2}/></div>
                    <div className="card1"> <img className='imageinifnite' src={image3} /></div>
                    <div className="card1"> <img className='imageinifnite' src={image4} /></div>
                </div>
            </div>
        </div>
    )
}