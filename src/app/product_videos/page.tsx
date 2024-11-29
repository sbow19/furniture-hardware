import SubHeader from "@/components/sub_header/SubHeader"
import Title from "./layout/title/Title"
import Visual from "./components/first_video/Visual"

export default function ProductVideos() {
    const videoPaths = [
        "/videos/pages/product_page/dewalt.mp4",
        "/videos/pages/product_page/stock.mp4",
        "/videos/pages/product_page/switch.mp4",
        "/videos/pages/product_page/cleaner.mp4",
    ];

    return (
        <>
            <SubHeader activePage="/product_videos" />
            <Title />
            {videoPaths.map((path, index) => (
                <Visual key={index} path={path} />
            ))}
        </>
    )
}