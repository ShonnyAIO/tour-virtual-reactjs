import React from "react";
import '../styles/modal.css';

export default function Modal({children, isOpen, close}){
    return (
        <article className={isOpen ? 'modal is-open' : 'modal'}>
            <button className="close-modal" onClick={() => close() }>X</button>
            <div className="modal-container">
                {children}
            </div>
        </article>
    );
}