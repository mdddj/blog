
import {createRoot} from "react-dom/client";
import React from "react";

import dsImage from '../assets/ds.jpg'


export const MyRewardDialog: React.FC = () => {
    return <dialog id="ds" className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">打赏</h3>
            <p className="py-4">
                <img src={dsImage} alt={'打赏'} className={'shadow shadow-blue-100'}/>
            </p>
            <div className={'modal-action'}>
                <form method="dialog">
                    <button className="btn">取消</button>
                </form>
            </div>
        </div>

    </dialog>
}