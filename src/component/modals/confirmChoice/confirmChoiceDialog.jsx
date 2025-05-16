import {Dialog} from "@mui/material";
import React from "react";
import "./confirmChoiceDialog.css"

export default function ConfirmChoiceDialog({callback, choice, open, setOpen}){


    return (
        <div className={"confirm-choice-container"}>
            <Dialog open={open}>
                <div className={"confirm-choice-modal"}>
                    <p className={"confirm-choice-delete-dialog-confirmation-text"}>
                        {choice}
                    </p>
                    <div className={"confirm-choice-modal-all-buttons"}>
                        <button className={"cta-button"} id={"confirm-choice-delete-button"} onClick={() => {
                            callback(true)
                            setOpen(false)
                        }}>
                            <p>Confirm</p>
                    </button>
                        <button className={"cta-button"} id={"confirm-choice-cancel-button"} onClick={() => {
                            callback(false)
                            setOpen(false);
                        }}>
                           <p> Cancel</p>
                        </button>
                    </div>
                </div>
            </Dialog>
        </div>
            )
            }