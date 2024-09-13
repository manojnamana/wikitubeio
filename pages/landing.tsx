import { Button, Stack } from "@mui/material";
import Image from "next/image";

const Landing = () =>{
    return(
        <>
    <Stack sx={{overflowY:"hidden"}}  >
        <img src="/static/images/creater.jpeg" alt="creater" style={{height:625}} width={"100%"}/>  
    </Stack>
     <Stack alignItems={"center"} bgcolor={"#0b0b0b"} >
     <Button href="/directory"   variant="outlined" sx={{borderRadius:5,fontWeight:"bold",borderWidth:0,m:2,bgcolor:"white","&:hover":{bgcolor:"#3B71CA",color:"white"}}} >Remix With Web</Button>
     </Stack>
     </>
    )
}

export default Landing;