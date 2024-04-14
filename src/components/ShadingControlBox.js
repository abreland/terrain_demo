
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, Typography} from "@mui/material";
import {blueGrey, pink} from "@mui/material/colors";
import {useState} from "react";
import "../css/cesiumreact.css"

export const ShadingControlBox = ({handleSelectShadeType, handleTerrainExaggeration}) => {
    const [shadeType, setShadeType] = useState('none')

    const handleChange = (event)=>{
        const newType = event.target.value
        setShadeType(newType)
        handleSelectShadeType(newType)
    }

    const handleTerrain = (event) =>{
        const value = event.target.value
        handleTerrainExaggeration(value)
    }


    return (
        <div className={'controlBoxFill'}>
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group" style={{color:'white'}}>Shading</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={shadeType}
                    onChange={handleChange}
                >
                    <FormControlLabel style={{color:'white'}} value="none" control={<Radio sx={{
                        color: blueGrey[100],
                        '&.Mui-checked': {
                            color: blueGrey[100],
                        }}}/>} label="None" />
                    <FormControlLabel style={{color:'white'}} value="elevation" control={<Radio sx={{
                        color: blueGrey[100],
                        '&.Mui-checked': {
                            color: blueGrey[100],
                        }}}/>} label="Elevation" />
                    <FormControlLabel style={{color:'white'}} value="slope" control={<Radio sx={{
                        color: blueGrey[100],
                        '&.Mui-checked': {
                            color: blueGrey[100],
                        }}}/>} label="Slope" />
                    <FormControlLabel style={{color:'white'}} value="aspect" control={<Radio sx={{
                        color: blueGrey[100],
                        '&.Mui-checked': {
                            color: blueGrey[100],
                        }}}/>} label="Aspect" />
                </RadioGroup>
            </FormControl>
            <Typography id="brightness-slider" gutterBottom style={{color: 'white', marginTop:'16px', marginBottom:'16px'}}>
                Terrain Exageration
            </Typography>
            <Slider
                size="small"
                defaultValue={1}
                aria-label="Small"
                valueLabelDisplay="auto"
                onChange={handleTerrain}
                min={0}
                max={10}
                aria-labelledby="brightness-slider"
            />
        </div>
    )
};

