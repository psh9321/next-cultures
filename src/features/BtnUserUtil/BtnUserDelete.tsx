"use client"

import { LogoutCallback } from "@/entities/auth/util/logout";
import { useDeleteUserHook } from "@/entities/users/delete/hook/useDeleteUserHook";
import { useSessionHook } from "@/shared/hook/useSessionHook";
import { useToastHook } from "@/shared/hook/useToastHook";
import { toastOpts } from "@/shared/util/toastOps";

export const BtnUserDelete = () => {

    const { user } = useSessionHook();

    const { ToastAlert, ToastConfirm, InitAlert, InitConfirm } = useToastHook();

    const { mutateAsync } = useDeleteUserHook();

    function DeleteUserCallback() {
        try {
            InitConfirm(toastOpts["userDelete"], async () => {
                const { resultCode } = await mutateAsync();

                if(resultCode === -999) return InitAlert(toastOpts["unAuthorized"], async () => {
                    await LogoutCallback()
                });    

                if(resultCode !== 200) return console.log("????")

                await LogoutCallback();
            })
        }
        catch(err) {
            console.log("UtilBox DeleteUserCallback 알수없는 에러", err);
            InitAlert(toastOpts["unknownError"]);
        }
    }

    return (
        <>
            <ToastAlert/> 
            <ToastConfirm/>

            <button onClick={DeleteUserCallback}>회원탈퇴</button>
        </>
    )
}