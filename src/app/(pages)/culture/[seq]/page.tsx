
import { CultureInfoDetailPrefetchComponent } from "@/widgets/CultureInfoDetailPrefetchComponent";
import { generateCultureMetadata } from "@/entities/culture/detail/lib/generateMetadata";

export async function generateMetadata({ params } : CULTURE_INFO_DETAIL_PAGE_SERVER) {
    const { seq } = await params;

    return generateCultureMetadata(seq);
}

const CultureInfoDetailPageServer = async ({ params } : CULTURE_INFO_DETAIL_PAGE_SERVER) => {
    const { seq } = await params;
    
    return <CultureInfoDetailPrefetchComponent seq={seq}/>
}

export default CultureInfoDetailPageServer
