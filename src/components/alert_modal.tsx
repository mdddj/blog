///弹窗.


import {createRoot} from "react-dom/client";
import React from "react";
import {ModalProps, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/modal";
import {Button} from "@nextui-org/react";

function ShowCustomModal(
    customModalElement: React.ReactElement,
) {
    const div = document.createElement("div")
    div.id = "custom-modal"
    const modal = createRoot(div)
    const clone = React.cloneElement<ModalProps>(customModalElement, {
        isOpen: true,
        onOpenChange: isOpen => {
            if (!isOpen) {
                const closeClone = React.cloneElement<ModalProps>(clone, {
                    isOpen: false
                })
                modal.render(closeClone)
                setTimeout(() => {
                    modal.unmount()
                    div.remove()
                }, 300)
            }
        }
    })
    modal.render(clone)
    document.body.appendChild(div)
}


export function showDefaultMessage(message: string){
    ShowCustomModal(<Modal isOpen={true}>
        <ModalContent>
            {(onClose)=>(<>
                <ModalHeader>提示</ModalHeader>
                <ModalBody>
                    {message}
                </ModalBody>
                <ModalFooter>
                    <Button color={'primary'} onClick={onClose}>关闭</Button>
                </ModalFooter>
            </>)}
        </ModalContent>
    </Modal>)
}