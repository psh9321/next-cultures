"use client"

import { MapPinned, MapPinHouse, Phone, CalendarDays } from 'lucide-react';

import { useCultureInfoDetailHook } from "../../hook/useCultureInfoDetailHook";

import { InfoList } from "./_html"

export const CultureInfoDetailInfo = () => {

    const { date, price, phone, place, placeAddr } = useCultureInfoDetailHook();

    return (
        <InfoList>
            <li><CalendarDays/> {date}</li>
            { placeAddr && <li><MapPinned/> <p>{placeAddr}</p></li> }
            { place && <li><MapPinHouse/> <p>{place}</p></li> }
            { phone && <li><Phone/> <p>{phone}</p></li> }
            { price && <li className={`price ${price === "무료" && "free"}`}> {price} </li> }
        </InfoList>
    )
}