import React, { useState } from "react";
import { Pannellum } from "pannellum-react";
import dataScene from "../helpers/dataScene";
import useModal from "../hooks/useModal";
import Modal from "./modal";
import ModelContainer from "./modelContainer";

export default function Scene() {

    const {isOpen, openModal, closeModal} = useModal();

    const [scene, setScene] = useState(dataScene['insideOne']);
    const [model, setModel] = useState(null);

    const hotSpots = (element, i) => {
        if(element.cssClass === 'hotSpotElement') return (
            <Pannellum.Hotspot
                key={i}
                type={element.type}
                pitch={element.pitch}
                yaw={element.yaw}
                handleClick = {() => { openModal(); setModel(element.nameModel); }}
            />
        );
        else if(element.cssClass === 'moveScene') return (
            <Pannellum.Hotspot
                key={i}
                type={element.type}
                pitch={element.pitch}
                yaw={element.yaw}
                handleClick = {() => { setScene(dataScene[element.scene]); }}
            />
        );
    }


    return (
        <>
            <Pannellum
                width={'100%'}
                height={'100vh'}
                title={scene.title}
                image={scene.image}
                pitch={-16.28}
                yaw={-1.66}
                hfov={130}
                autoLoad
                showControls={false}
                showFullscreenCtrl={false}
                showZoomCtrl={false}
                orientationOnByDefault={true}
                hotspotDebug={true}
            >
                {
                    Object.values(scene.hostSpots).map((element, i) => 
                        hotSpots(element, i)
                    )
                }

            </Pannellum>
            <Modal isOpen={isOpen} close={ () => closeModal() }>
                {isOpen ? <ModelContainer nameModel={model} /> : null }
            </Modal>
        </>
    );
}