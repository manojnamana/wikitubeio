import Footer from "./Footer"
import Header from "./Header"

const  Layout =(props:any) =>{
    return(
        <>
        <Header/>
        {props.children}
        <Footer/>
        </>
    )
}


export default Layout