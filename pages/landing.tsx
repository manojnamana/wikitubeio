import { Button, Stack } from "@mui/material";
import Image from "next/image";

const Landing = () =>{
    return(
    <Stack sx={{overflowY:"hidden"}} height={"80%"} >
        <img src="/static/images/creater.jpeg" alt="creater" style={{height:659}} width={"100%"}/>
        <Button href="/directory"  variant="contained" sx={{borderRadius:0}} >Remix With Web</Button>
    </Stack>
    )
}

export default Landing;