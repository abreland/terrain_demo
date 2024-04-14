import {useEffect, useRef, useState} from "react";
import {Viewer} from "resium";
import {Material, Terrain} from "cesium";
import {ShadingControlBox} from "./ShadingControlBox";
import {Button} from "@mui/material";

const elevationRamp = [0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0];
const slopeRamp = [0.0, 0.29, 0.5, Math.sqrt(2) / 2, 0.87, 0.91, 1.0];
const aspectRamp = [0.0, 0.2, 0.4, 0.6, 0.8, 0.9, 1.0];

export const ViewerComponent = () => {
    const ref = useRef(null);
    const [terrainExaggeration, setTerrainExaggeration] = useState(1.0)

    useEffect(() => {
        if (ref.current && ref.current.cesiumElement) {
            ref.current.cesiumElement.scene.verticalExaggeration = terrainExaggeration
        }
    }, [terrainExaggeration]);


    const getColors = (shadeType) => {

        const ramp = document.createElement("canvas");
        ramp.width = 100;
        ramp.height = 1;
        const ctx = ramp.getContext("2d");

        let values;
        if (shadeType === "elevation") {
            values = elevationRamp;
        } else if (shadeType === "slope") {
            values = slopeRamp;
        } else if (shadeType === "aspect") {
            values = aspectRamp;
        }

        const grd = ctx.createLinearGradient(0, 0, 100, 0);
        // grd.addColorStop(values[0], "#100f0f"); //black
        // grd.addColorStop(values[1], "#2747E0"); //blue
        // grd.addColorStop(values[2], "#D33B7D"); //pink
        // grd.addColorStop(values[3], "#D33038"); //red
        // grd.addColorStop(values[4], "#FF9742"); //orange
        // grd.addColorStop(values[5], "#ffd700"); //yellow
        // grd.addColorStop(values[6], "#ffffff"); //white

        grd.addColorStop(values[0], "#100f0f"); //black
        grd.addColorStop(values[1], "#2747E0"); //blue
        grd.addColorStop(values[2], "#3bd33e"); //pink
        grd.addColorStop(values[3], "#d3bd30"); //red
        grd.addColorStop(values[4], "#FF9742"); //orange
        grd.addColorStop(values[5], "#ff0099"); //yellow
        grd.addColorStop(values[6], "#ee0404"); //white

        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, 100, 1);

        return ramp;
    }

    const handleSelectShadeType = (type) => {
        const globe = ref.current.cesiumElement.scene.globe
        if (type === "elevation")
            globe.material = Material.fromType("ElevationRamp")
        else if (type === 'aspect')
            globe.material = Material.fromType("AspectRamp")
        else if (type === 'slope')
            globe.material = Material.fromType("SlopeRamp")
        else
            globe.material = undefined

        if (globe.material !== undefined) {
            globe.material.uniforms.image = getColors("elevation");
        }

    }

    const terrain = Terrain.fromWorldTerrain({
        requestVertexNormals: true
    })

    const handleTerrainExaggeration = (value) => {
        setTerrainExaggeration(value)
    }


    return (
        <div>
            <ShadingControlBox
                handleSelectShadeType={handleSelectShadeType}
                handleTerrainExaggeration={handleTerrainExaggeration}
            >
            </ShadingControlBox>
            <Viewer
                terrain={terrain}
                infoBox={false}
                navigationHelpButton={false}
                fullscreenButton={false}
                animation={false}
                timeline={false}
                selectionIndicator={false}
                ref={ref}/>
        </div>
    )
};

