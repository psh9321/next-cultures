"use client"

import Image from "next/image"

import { useState } from "react";

import { useForm, useFormState } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowBigLeft, CircleUserRound, ImageOff, RefreshCcw, ImagePlus } from "lucide-react"

import { useUpdateUserHook } from "@/entities/users/update/hook/useUpdateUserHook";
import { userUpdateModel } from "@/entities/users/update/schema/user.update.schema";

import { useSessionHook } from "@/shared/hook/useSessionHook";
import { OnValueLimit } from "@/shared/util/onValueLimit";
import { API_CLIENT_USER_PROFILE } from "@/entities/users/profile/api/api.client.profile";
import { LogoutCallback } from "@/entities/auth/util/logout";
import { useToastHook } from "@/shared/hook/useToastHook";
import { toastOpts } from "@/shared/util/toastOps";

const MAX_PROFILE_IMAGE_SIZE = 5 * 1024 * 1024;

interface UPDATE_USER_FORM {
    cancelCallback : () => void
}

export const UpdateUserForm = ({ cancelCallback } : UPDATE_USER_FORM) => {

    const { user, SessionUpdateCallback } = useSessionHook();
    const profileImgSrc = `${process.env.NEXT_PUBLIC_FILE_DIRECTORY}/${user?.id}/profile.jpeg${user?.profileImgVersion ? `?v=${user.profileImgVersion}` : ""}`;
    const [ profileImgVersion, SetProfileImgVersion ] = useState(user?.profileImgVersion);

    const { mutateAsync } = useUpdateUserHook();

    const { InitAlert, ToastAlert } = useToastHook();

    const { register, control, setValue, getValues, handleSubmit, reset } = useForm({
        resolver : zodResolver(userUpdateModel),
        defaultValues : {
            updateName : user?.name??"",
            updateIsProfileImg : user?.isProfileImg??false,
            profileImg : user?.isProfileImg ? profileImgSrc : "",
            formFile : null,
        }
    });

    const { isDirty, errors } = useFormState({ control });

    function IsFileSizeOver(file : FormDataEntryValue | null) {
        return file instanceof File && file.size > MAX_PROFILE_IMAGE_SIZE;
    }

    function SetProfileImgCallback(e : React.ChangeEvent<HTMLInputElement>) {

        const item = e.target.files?.[0];

        if(!item) return;

        if(IsFileSizeOver(item)) {
            e.target.value = "";
            return InitAlert(toastOpts["fileSizeOver"]);
        }

        const data = new FormData();

        data.append("item",item);

        const imgSrc = URL.createObjectURL(item);
        SetProfileImgVersion(`${item.lastModified}-${item.size}`);

        if(!getValues("updateIsProfileImg")) setValue("updateIsProfileImg", true, {shouldDirty : true});
        setValue("formFile", data);
        setValue("profileImg",imgSrc, {shouldDirty : true});
    }

    function ResetProfileImgCallback() {
        if(!getValues("updateIsProfileImg")) return
        setValue("profileImg","", {shouldDirty : true});
        setValue("updateIsProfileImg", false, {shouldDirty : true});
    }

    async function SubmitCallback(params : USER_UPDATE_ITEM) {
        if(!isDirty) return

        if(getValues("formFile")) {
            const file = getValues("formFile")?.get("item") ?? null;

            if(IsFileSizeOver(file)) return InitAlert(toastOpts["fileSizeOver"]);

            await API_CLIENT_USER_PROFILE(getValues("formFile") as FormData);
        }

        const { resultCode, data } = await mutateAsync(params);

        if(resultCode === -999) return InitAlert(toastOpts["unAuthorized"], async () => {
            await LogoutCallback()
        });

        const newInfo = {
            name : data?.updateInfo.name,
            isProfileImg : data?.updateInfo.isProfileImg,
            profileImgVersion : getValues("formFile") ? profileImgVersion : user?.profileImgVersion,
        }

        await SessionUpdateCallback(newInfo);

        reset({
            ...newInfo,
            profileImg : newInfo["isProfileImg"] ? `${process.env.NEXT_PUBLIC_FILE_DIRECTORY}/${user?.id}/profile.jpeg${newInfo.profileImgVersion ? `?v=${newInfo.profileImgVersion}` : ""}` : "",
            updateIsProfileImg : newInfo.isProfileImg
        })
    }

    return (
        <>
            <ToastAlert/>
            <article className="relative w-full p-[10px_20px]">
                <h2 className="sr-only">유저 정보 수정 폼</h2>
                <button onClick={cancelCallback}>
                    <ArrowBigLeft/>
                </button>
                <form onSubmit={handleSubmit(SubmitCallback)} className="flex flex-col justify-center items-end">
                    <ul className="inline-block w-full mx-auto space-y-[20px]">
                        <li>
                            <label className="inline-block mb-[10px] text-[1.1rem]" htmlFor="userName">유저 이름 <span className="block text-main-color text-[0.7rem]">(공복제외 최대 7자 입력가능)</span></label>
                            <input maxLength={7} onInput={OnValueLimit} {...register("updateName")} defaultValue={user?.name} placeholder="변경할 유저 이름을 입력해주세요." type="text" id="userName" className="block w-full p-[5px_10px] border rounded-[5px] outline-none [&::placeholder]:text-[0.75rem]" />
                            <p className="h-[19px] mt-[6px] text-[#ff5c8a] text-[0.8rem]">{errors.updateName && `* ${errors.updateName.message}`}</p>
                        </li>
                        <li className="flex flex-wrap items-center gap-x-[15px]">
                            <h3 className="inline-block  text-[1.1rem]">프로필 이미지</h3>
                            <div className="flex gap-[5px] [&>*>svg]:size-[20px]">
                                <label className="cursor-pointer" htmlFor="userProfileImg">
                                    { getValues("updateIsProfileImg") ? <RefreshCcw/> : <ImagePlus/> }
                                </label>
                                { getValues("updateIsProfileImg") && <button onClick={ResetProfileImgCallback} type="button"><ImageOff/></button> }
                            </div>
                            <div className="relative w-[200px] h-[240px] mt-[10px] text-center [@media(max-width:499px)]:w-[120px] [@media(max-width:499px)]:h-[160px]">
                                {
                                    getValues("updateIsProfileImg") ? 
                                    <Image className="border border-basic-color rounded-[10px]" loading="eager" src={getValues("profileImg") as string} alt="유저 이미지" sizes="100%" fill unoptimized />
                                    :
                                    <CircleUserRound className="inline-block mt-[20px]" size={120}/>
                                }
                                
                            </div>
                            <input onChange={SetProfileImgCallback} type="file" id="userProfileImg" accept="image/*" hidden/>
                        </li>
                    </ul>
                    <button type="submit" className={`inline-block mt-[15px] p-[5px_20px] text-[#fff] border rounded-[5px] ${isDirty ? "bg-main-color border-main-color" : "bg-basic-color border-basic-color"}`}>수정</button>
                </form>
                <p className="mt-[20px] text-right text-[0.8rem]">가입일 : {user?.createDate}</p>
            </article>
        </>

    )
}
