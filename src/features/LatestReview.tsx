"use client"

import Image from "next/image"
import { useParams } from "next/navigation"
import { CircleUserRound, NotepadTextDashed } from "lucide-react"

import { useReviewListHook } from "@/entities/review/list/hook/useReviewListHook"

import { DateFormat } from "@/shared/util/dateFormat"
import { PeanutLoader } from "@/shared/ui/PeanutLoader"

export const LatestReview = () => {

    const { seq } = useParams<{seq : string}>()

    const { data, reviewTotal, isLoading } = useReviewListHook(seq, false);
    
    return (
        <article className="relative block w-full min-h-[180px] p-[20px_10px] bg-[#222226] border border-border-color rounded-[10px] box-shadow-[3px 3px 3px rgba(0,0,0,0.8)]">
            <h3 className="mb-[30px] text-[#fff] text-[1.2rem] font-bold">
                최근 등록된 후기
            </h3>
            {
                isLoading ? <PeanutLoader className="absolute top-1/2 left-1/2 -translate-1/2"/>
                :
            <ol className="space-y-[20px]">
                {
                    reviewTotal === 0 ? 
                    <li className="text-basic-color text-center">
                        <NotepadTextDashed size={30} className="inline-block mb-[10px]"/>
                        <p className="text-basic-color text-center text-[0.9em] font-bold">
                            등록된 후기가 없습니다.
                        </p>
                    </li>
                    :
                    data?.pages[0]?.list.slice(0,3).map((el, i) => {
                        return (
                            <li key={`최근등록된후기-${i}-${el?.["contents"]}`} className="flex justify-between">
                                <div className="relative block size-[40px]">
                                    {
                                        el.writerIsProfileImg ? 
                                        <Image className="rounded-[100%]" src={`${process.env.NEXT_PUBLIC_FILE_DIRECTORY}/${el.writerId}/profile.jpeg`} alt={`${el.writerName} 프로필 이미지`} fill sizes="100vw" unoptimized loading="eager" /> :
                                        <CircleUserRound className="inline-block size-[36px] stroke-basic-color" size={36}/>
                                    }
                                </div>
                                <dl className="w-[calc(100%-50px)] text-basic-color text-[0.8rem] font-bold">
                                    <dt>{el["writerName"]}</dt>
                                    <dd>{DateFormat(el["updatedAt"])}</dd>
                                    <dd className="mt-[10px] text-[#fff] text-[0.9rem] line-clamp-2">{el["contents"]}</dd>
                                </dl>
                            </li>
                        )
                    })
                }
            </ol>
            }
        </article>
    )
}
