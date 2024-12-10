declare global {
    type LayoutProps = {
        layoutName: number
        handleLayoutLoad: () => void
        handleChangeSlide: (direction:number)=>void
    }
}

export {};