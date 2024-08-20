import { Button, Fab, Paper, Stack, Typography } from "@mui/material";
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import AddIcon from '@mui/icons-material/Add';
import { ArrowRightAlt, East, KeyboardBackspace, PlayArrow, PlayCircle, West } from "@mui/icons-material";

const Creater = () => {
    const [value, setValue] = React.useState('Computation');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };
    return (
        <Stack sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', }}>
            <Paper elevation={3} sx={{ my: 3, width: { md: "70%" }, p: 3, }} >
                <Stack display={"flex"} flexDirection={{ md: "row", xs: 'column' }} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography fontSize={25} fontWeight={"bold"} py={2}>C.R.E.A.T.E.R.</Typography>

                    <Stack display={"flex"} flexDirection={"row"} gap={2}>
                        <Button variant="contained" style={{ borderRadius: 50 }} color="success">Go!</Button>
                        <Button variant="contained" style={{ borderRadius: 50 }} color="secondary">Repeat?</Button>
                        <Button variant="contained" style={{ borderRadius: 50 }} color="primary">𝕏</Button>
                    </Stack>
                </Stack>
                <Stack display={"flex"} flexDirection={{ md: "row", xs: 'column' }} justifyContent={"space-between"} >
                    <Stack>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={value}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Computation" control={<Radio />} label="Computation" />
                                <Stack><Paper sx={{ bgcolor: "blueviolet", width: { xs: "100%", md: "200%" }, color: "white", borderRadius: 50, textAlign: "center" }}>100%</Paper></Stack>
                                <FormControlLabel value="Robotics" control={<Radio />} label="Robotics" />
                                <Stack><Paper sx={{ bgcolor: "blueviolet", width: { xs: "60%", md: "120%" }, color: "white", borderRadius: 50, textAlign: "center" }}>60%</Paper></Stack>
                                <FormControlLabel value="Engineering" control={<Radio />} label="Engineering" />
                                <Stack><Paper sx={{ bgcolor: "blueviolet", width: { xs: "75%", md: "150%" }, color: "white", borderRadius: 50, textAlign: "center" }}>75%</Paper></Stack>
                                <FormControlLabel value="Arts" control={<Radio />} label="Arts" />
                                <Stack><Paper sx={{ bgcolor: "blueviolet", width: { xs: "90%", md: "180%" }, color: "white", borderRadius: 50, textAlign: "center" }}>90%</Paper></Stack>
                                <FormControlLabel value="Technology" control={<Radio />} label="Technology" />
                                <Stack><Paper sx={{ bgcolor: "blueviolet", width: { xs: "55%", md: "110%" }, color: "white", borderRadius: 50, textAlign: "center" }}>55%</Paper></Stack>
                                <FormControlLabel value="Energy" control={<Radio />} label="Energy" />
                                <Stack><Paper sx={{ bgcolor: "blueviolet", width: { xs: "65%", md: "130%" }, color: "white", borderRadius: 50, textAlign: "center" }}>65%</Paper></Stack>
                                <FormControlLabel value="Random" control={<Radio />} label="Random" />
                                <Stack><Paper sx={{ bgcolor: "blueviolet", width: { xs: "95%", md: "190%" }, color: "white", borderRadius: 50, textAlign: "center" }}>95%</Paper></Stack>

                            </RadioGroup>
                        </FormControl>
                    </Stack>

                    <Paper elevation={0} sx={{ p: 3, overflowY: "hidden", overflowX: { xs: "scroll", md: "hidden" }, mr: { md: "35%", xs: 0 } }} >
                        <Stack flexDirection={{ xs: "row", md: "column" }} gap={2} maxWidth={160}>
                            <Stack>
                                <Paper elevation={0} sx={{ bgcolor: "lightgray", width: 160, height: 90, alignItems: "center", display: "flex", justifyContent: "center" }}>
                                    <PlayCircle color="primary" sx={{ fontSize: 50 }} />
                                </Paper>

                            </Stack>
                            <Stack>
                                <Paper elevation={0} sx={{ bgcolor: "lightgray", width: 160, height: 90, alignItems: "center", display: "flex", justifyContent: "center" }}>
                                    <PlayCircle color="primary" sx={{ fontSize: 50 }} />
                                </Paper>

                            </Stack>
                            <Stack>
                                <Paper elevation={0} sx={{ bgcolor: "lightgray", width: 160, height: 90, alignItems: "center", display: "flex", justifyContent: "center" }}>
                                    <PlayCircle color="primary" sx={{ fontSize: 50 }} />
                                </Paper>

                            </Stack>
                            <Stack>
                                <Paper elevation={0} sx={{ bgcolor: "lightgray", width: 160, height: 90, alignItems: "center", display: "flex", justifyContent: "center" }}>
                                    <PlayCircle color="primary" sx={{ fontSize: 50 }} />
                                </Paper>

                            </Stack>
                            <Stack>
                                <Paper elevation={0} sx={{ bgcolor: "lightgray", width: 160, height: 90, alignItems: "center", display: "flex", justifyContent: "center" }}>
                                    <PlayCircle color="primary" sx={{ fontSize: 50 }} />
                                </Paper>

                            </Stack>

                        </Stack>
                    </Paper>
                </Stack>

                <Stack display={"flex"} flexDirection={{ md: "row", xs: 'column' }} gap={3} justifyContent={"space-between"}>

                    <Stack display={"flex"} flexDirection={{ md: "row", xs: 'column' }} gap={{ md: 5 }} justifyContent={"space-between"}>
                        <Button variant="text" sx={{ color: "black" }}>+ Add to Database</Button>
                        <Button variant="contained" color="success"><West sx={{ mr: 1 }} />Select</Button>
                    </Stack>

                    <Stack display={"flex"} flexDirection={{ md: "row", xs: 'column' }} gap={{ md: 5 }} justifyContent={"space-between"}>
                        <Button variant="contained" color="error"><East sx={{ mr: 1 }} />Delete</Button>
                        <Button variant="text" sx={{ color: "black" }}> 🗑️ Remove from Results</Button>

                    </Stack>

                </Stack>
            </Paper>
        </Stack>
    )
}

export default Creater;