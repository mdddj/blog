///弹窗.


import {createRoot} from "react-dom/client";
import React from "react";

function ShowCustomModal(
    customModalElement: React.ReactElement,
) {
    const div = document.createElement("div")
    div.id = "custom-modal"
    const modal = createRoot(div)
    const clone = React.cloneElement<{}>(customModalElement, {
        isOpen: true,
        onOpenChange: isOpen => {
            if (!isOpen) {
                const closeClone = React.cloneElement<{}>(clone, {
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