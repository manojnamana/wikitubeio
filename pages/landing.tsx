// @ts-nocheck
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button, Stack } from "@mui/material";

const Landing = () => {
  const router = useRouter();
  const article_name = "calculus";
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const token = router.query.token;
      if (token) {
        console.log("Received Token:", token);
        Cookies.set("access_token", token, { expires: 7, sameSite: "Lax", secure: true });
        setAccessToken(token);
      }
    }
  }, [router.isReady, router.query.token]);

  return (
    <>
      <Stack sx={{ overflowY: "hidden" }}>
        <img
          src="/static/images/creater.jpeg"
          alt="creator"
          style={{ height: 625 }}
          width={"100%"}
        />
      </Stack>
      <Stack alignItems={"center"} bgcolor={"#0b0b0b"}>
        <Button
          onClick={() => router.push(`/wiki/${article_name}`)}
          variant="outlined"
          sx={{
            borderRadius: 5,
            fontWeight: "bold",
            borderWidth: 0,
            m: 2,
            bgcolor: "white",
            "&:hover": { bgcolor: "#3B71CA", color: "white" },
          }}
        >
          Remix With Web
        </Button>
      </Stack>
    </>
  );
};

export default Landing;

// // @ts-nocheck
// import { useRouter } from "next/router";
// import Cookies from "js-cookie";
// import { Button, Stack } from "@mui/material";

// const Landing = () => {
//   const router = useRouter();
//   const article_name = "calculus";

  // useEffect(() => {
  //   // Extract token from URL
  //   const urlParams = new URLSearchParams(window.location.search);
  //   //const token = urlParams.get("token");
  //   const token = document.cookie.split('; ').find(row => row.startsWith('token='));

  //   if (token) {
  //     Cookies.set("access_token", token, { expires: 1800, secure: true });
  //     router.replace("/landing"); // Remove token from URL
  //   }
  // }, [router]);


//   let access_token = router?.query?.token

//   if (access_token){
//     console.log(access_token)
//     Cookies.set('access_token', access_token, { expires: 7 });
//   }

//   return (
//     <>
//       <Stack sx={{ overflowY: "hidden" }}>
//         <img
//           src="/static/images/creater.jpeg"
//           alt="creater"
//           style={{ height: 625 }}
//           width={"100%"}
//         />
//       </Stack>
//       <Stack alignItems={"center"} bgcolor={"#0b0b0b"}>
//         <Button
//           onClick={() => {
//             router.push(`/wiki/${article_name}`);
//           }}
//           variant="outlined"
//           sx={{
//             borderRadius: 5,
//             fontWeight: "bold",
//             borderWidth: 0,
//             m: 2,
//             bgcolor: "white",
//             "&:hover": { bgcolor: "#3B71CA", color: "white" },
//           }}
//         >
//           Remix With Web
//         </Button>
//       </Stack>
//     </>
//   );
// };

// export default Landing;



// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import Cookies from 'js-cookie';
// import { Button, Stack } from '@mui/material';

// const Landing = () => {
//   const router = useRouter();
//   const article_name = 'calculus';

//   useEffect(() => {
//     // Extract token from URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get('token');

//     if (token) {
//       Cookies.set('access_token', token, { expires: 7, secure: true });
//       router.replace('/landing'); // Remove token from URL
//     }
//   }, [router]);

//   return (
//     <>
//       <Stack sx={{ overflowY: 'hidden' }}>
//         <img
//           src="/static/images/creater.jpeg"
//           alt="creater"
//           style={{ height: 625 }}
//           width={'100%'}
//         />
//       </Stack>
//       <Stack alignItems={'center'} bgcolor={'#0b0b0b'}>
//         <Button
//           onClick={() => {
//             router.push(`/wiki/${article_name}`);
//           }}
//           variant="outlined"
//           sx={{
//             borderRadius: 5,
//             fontWeight: 'bold',
//             borderWidth: 0,
//             m: 2,
//             bgcolor: 'white',
//             '&:hover': { bgcolor: '#3B71CA', color: 'white' },
//           }}
//         >
//           Remix With Web
//         </Button>
//       </Stack>
//     </>
//   );
// };

// export default Landing;
