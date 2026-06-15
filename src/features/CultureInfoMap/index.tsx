"use client"

import { useRouter } from "next/navigation";

import { useCallback, useEffect, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { Minus, Plus, Search } from "lucide-react";

import { useGeolocationHook } from "@/entities/culture/map/hook/useGeolocationHook"
import { useCultureInfoMapHook } from "@/entities/culture/map/hook/useCultureInfoMapHook";
import { NaviMarker } from "@/entities/culture/map/ui/NaviMarker";

import { MapBox, MapFrame, BtnSearchArea, BtnZoom, ZoomControls } from "./_html";

const DEFAULT_MIN_ZOOM_LEVEL = 3;
const DEFAULT_MAX_ZOOM_LEVEL = 7;
const DEFAULT_INITIAL_ZOOM_LEVEL = 3;

type CultureInfoMapProps = {
    minZoomLevel?: number;
    maxZoomLevel?: number;
    initialZoomLevel?: number;
};

function IsSameCoordinates(prevCoordinates: COORDINATES | null, nextCoordinates: COORDINATES | null) {
    if(!prevCoordinates || !nextCoordinates) return false;

    return (
        prevCoordinates.fromY.toFixed(6) === nextCoordinates.fromY.toFixed(6) &&
        prevCoordinates.fromX.toFixed(6) === nextCoordinates.fromX.toFixed(6) &&
        prevCoordinates.toY.toFixed(6) === nextCoordinates.toY.toFixed(6) &&
        prevCoordinates.toX.toFixed(6) === nextCoordinates.toX.toFixed(6)
    );
}

function GetMapCoordinates(map : kakao.maps.Map) : COORDINATES {
    const bounds = map.getBounds();

    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    return {
        fromY: sw.getLat(),
        fromX: sw.getLng(),
        toY: ne.getLat(),
        toX: ne.getLng(),
    }
}

export const CultureInfoMap = ({
    minZoomLevel = DEFAULT_MIN_ZOOM_LEVEL,
    maxZoomLevel = DEFAULT_MAX_ZOOM_LEVEL,
    initialZoomLevel = DEFAULT_INITIAL_ZOOM_LEVEL,
}: CultureInfoMapProps) => {

    const navigation = useRouter();

    const { isLoad, nx, ny } = useGeolocationHook();

    const minLevel = Math.min(minZoomLevel, maxZoomLevel);
    const maxLevel = Math.max(minZoomLevel, maxZoomLevel);
    const startLevel = Math.max(minLevel, Math.min(maxLevel, initialZoomLevel));

    const [ coordinates, SetCoordinates ] = useState<COORDINATES | null>(null);
    const [ zoomLevel, SetZoomLevel ] = useState(startLevel);
    const [ canSearchArea, SetCanSearchArea ] = useState(false);

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<kakao.maps.Map | null>(null);
    const mapCoordinatesRef = useRef<COORDINATES | null>(null);
    const searchedCoordinatesRef = useRef<COORDINATES | null>(null);
    const markerOverlayListRef = useRef<kakao.maps.CustomOverlay[]>([]);
    const markerRootListRef = useRef<Root[]>([]);

    const { list } = useCultureInfoMapHook(coordinates);

    function ClearMarkerOverlays() {
        const overlays = markerOverlayListRef.current;
        const roots = markerRootListRef.current;

        markerOverlayListRef.current = [];
        markerRootListRef.current = [];

        overlays.forEach((overlay) => overlay.setMap(null));

        window.setTimeout(() => {
            roots.forEach((root) => root.unmount());
        }, 0);
    }

    function ClampZoomLevel(level: number) {
        return Math.max(minLevel, Math.min(maxLevel, level));
    }

    const SyncMapState = useCallback((map: kakao.maps.Map) => {
        const nextCoordinates = GetMapCoordinates(map);

        mapCoordinatesRef.current = nextCoordinates;
        SetZoomLevel(map.getLevel());
        SetCanSearchArea(!IsSameCoordinates(searchedCoordinatesRef.current, nextCoordinates));
    }, []);

    function onClickZoomCallback(e: React.MouseEvent<HTMLButtonElement>, delta: number){
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();

        const map = mapInstanceRef.current;

        if (!map) return;

        const nextLevel = ClampZoomLevel(map.getLevel() + delta);

        if (nextLevel === map.getLevel()) return;

        map.setLevel(nextLevel);

        window.setTimeout(() => {
            SyncMapState(map);
        }, 100);
    };

    const NavigationCallback = useCallback((seq : string) => {
        navigation.push(`/culture/${seq}`);
    }, [navigation]);

    function onClickSearchAreaCallback(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        e.stopPropagation();

        const map = mapInstanceRef.current;

        if(!map) return;

        const nextCoordinates = GetMapCoordinates(map);

        mapCoordinatesRef.current = nextCoordinates;
        searchedCoordinatesRef.current = nextCoordinates;
        SetCanSearchArea(false);
        SetCoordinates(nextCoordinates);
    }

    useEffect(() => {
        if (!isLoad) return;

        let isMounted = true;
        let timer: ReturnType<typeof setTimeout>;

        const renderMap = () => {
            const kakao = window.kakao;

            if (!mapRef.current || !kakao?.maps) {
                timer = setTimeout(renderMap, 100);
                return;
            }

            kakao.maps.load(() => {
                if (!isMounted || !mapRef.current) return;

                const center = new kakao.maps.LatLng(ny, nx);
                const map = new kakao.maps.Map(mapRef.current, {
                    center,
                    level: startLevel,
                    minLevel,
                    maxLevel,
                });

                mapInstanceRef.current = map;
                SetZoomLevel(map.getLevel());

                if(typeof map.setDisableDoubleClickZoom === "function") {
                    map.setDisableDoubleClickZoom(true);
                }

                if(typeof map.setMinLevel === "function") {
                    map.setMinLevel(minLevel);
                }

                if(typeof map.setMaxLevel === "function") {
                    map.setMaxLevel(maxLevel);
                }

                kakao.maps.event.addListener(map, "zoom_changed", () => {
                    SyncMapState(map);
                });

                kakao.maps.event.addListener(map, "idle", () => {
                    SyncMapState(map);
                });

                const initialCoordinates = GetMapCoordinates(map);

                mapCoordinatesRef.current = initialCoordinates;
                searchedCoordinatesRef.current = initialCoordinates;
                SetCanSearchArea(false);
                SetCoordinates(initialCoordinates);
                SetZoomLevel(map.getLevel());
            });
        };

        renderMap();

        return () => {
            isMounted = false;
            mapInstanceRef.current = null;
            clearTimeout(timer);
        };
    }, [isLoad, nx, ny, minLevel, maxLevel, startLevel, SyncMapState]);

    useEffect(() => {
        if(!mapInstanceRef["current"]) return
        if(!list) return 
        const kakao = window.kakao;

        if(!kakao?.maps) return;

        const map = mapInstanceRef["current"];

        ClearMarkerOverlays();

        const markerGroupMap = new Map<string, {
            items: CULTURE_ITEM[];
            latitude: number;
            longitude: number;
        }>();

        list?.forEach((item) => {
            
            const latitude = Number(item?.gpsY);
            const longitude = Number(item?.gpsX);

            if(!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;

            const markerKey = `${latitude}:${longitude}`;
            const prevMarkerGroup = markerGroupMap.get(markerKey);

            if(prevMarkerGroup) {
                markerGroupMap.set(markerKey, {
                    ...prevMarkerGroup,
                    items: [...prevMarkerGroup.items, item],
                });
                return;
            }

            markerGroupMap.set(markerKey, {
                items: [item],
                latitude,
                longitude,
            });
        });

        markerGroupMap.forEach(({ items, latitude, longitude }) => {
            const container = document.createElement("div");
            const root = createRoot(container);
            const overlay = new kakao.maps.CustomOverlay({
                position: new kakao.maps.LatLng(latitude, longitude),
                content: container,
                yAnchor: 1,
                zIndex: 20,
            });

            root.render(<NaviMarker navigationCallback={NavigationCallback} items={items} />);
            overlay.setMap(map);

            markerOverlayListRef.current.push(overlay);
            markerRootListRef.current.push(root);
        });

        return () => {
            ClearMarkerOverlays();
        }
    },[list, NavigationCallback])

    return (
        <MapFrame>
            <MapBox ref={mapRef} />
            <BtnSearchArea
                type="button"
                onClick={onClickSearchAreaCallback}
                disabled={!canSearchArea}
                aria-label="현재 지도 영역 문화정보 검색"
            >
                <Search size={18} strokeWidth={2.4} />
                현 지도에서 검색
            </BtnSearchArea>
            <ZoomControls aria-label="지도 확대 축소">
                <BtnZoom
                    type="button"
                    onClick={(event) => onClickZoomCallback(event, -1)}
                    title="지도 확대"
                    aria-label="지도 확대"
                    disabled={zoomLevel <= minLevel}
                >
                    <Plus size={20} strokeWidth={2.4} />
                </BtnZoom>
                <BtnZoom
                    type="button"
                    onClick={(event) => onClickZoomCallback(event, 1)}
                    title="지도 축소"
                    aria-label="지도 축소"
                    disabled={zoomLevel >= maxLevel}
                >
                    <Minus size={20} strokeWidth={2.4} />
                </BtnZoom>
            </ZoomControls>
        </MapFrame>
    )
}
