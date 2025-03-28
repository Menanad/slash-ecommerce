import image1 from './p1.jpg'
import image2 from './p2.jpg'
import image3 from './p3.jpg'
export default function ScrollOnHeader(){
    return(
        <section   style={{paddingBottom:'2rem' ,scrollbarWidth:'none'}}>
            <div  style={{position:'relative',maxWidth:'95vw',margin:'0 auto',scrollbarWidth:'none'}}>
                <div   style={{display:'flex',width:'100%',overflowX:'auto', scrollBehavior:'smooth',boxShadow:`0 1.5rem 3rem ${'hsla(0 , 0% , 0% , 0.25 )'}`,scrollbarWidth:'none',scrollSnapPointsX:'repeat(90%)', scrollSnapType:'mandatory',scrollSnapType:'x mandatory'}} className='imagescrollin'>
                    {/* <img style={{flex:'1 0 100%',scrollSnapAlign:'start',objectFit:'cover',borderRadius:'5px'}} src={image1} id="slide1"/>
                    <img style={{flex:'1 0 100%',scrollSnapAlign:'start',objectFit:'cover',borderRadius:'5px'}} src={image2} id="slide2"/>
                    <img style={{flex:'1 0 100%',scrollSnapAlign:'start',objectFit:'cover',borderRadius:'5px'}} src={image3} id="slide3"/> */}

                    <div style={{flex:'1 0 100%',scrollSnapAlign:'start',objectFit:'cover',borderRadius:'5px' ,backgroundImage:`url(${image1})`,backgroundSize:'cover',backgroundPosition:'center'}}  id="slide1" ></div>                   
                    <div style={{flex:'1 0 100%',scrollSnapAlign:'start',objectFit:'cover',borderRadius:'5px' ,backgroundImage:`url(${image2})`,backgroundSize:'cover',backgroundPosition:'center'}}  id="slide2" ></div>                   
                    <div style={{flex:'1 0 100%',scrollSnapAlign:'start',objectFit:'cover',borderRadius:'5px' ,backgroundImage:`url(${image3})`,backgroundSize:'cover',backgroundPosition:'center'}} id="slide3" ></div>                   
                </div>

                <div style={{display:'flex' ,columnGap:'1rem',position:'absolute',bottom:'1.25rem',left:'50%' ,transform:`${'translateX(-50%)'}`,zIndex:'1'}}>
                    <a className='aa' style={{width:'0.5rem',height:'0.5rem' ,borderRadius:'50%',backgroundColor:'#fff',opacity:'0.75',transition:'opacity ease 250ms'}} href='#slide1'/>
                    <a className='aa' style={{width:'0.5rem',height:'0.5rem' ,borderRadius:'50%',backgroundColor:'#fff',opacity:'0.75',transition:'opacity ease 250ms'}} href='#slide2'/>
                    <a className='aa' style={{width:'0.5rem',height:'0.5rem' ,borderRadius:'50%',backgroundColor:'#fff',opacity:'0.75',transition:'opacity ease 250ms'}} href='#slide3'/>
                </div>
            </div>
        </section>
    ) 
}