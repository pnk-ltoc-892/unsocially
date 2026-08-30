import GridIcons from '@/components/landing/GridIcons.jsx'

const AppBackground = () => {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0 bg-black">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:32px_32px]" />
            <GridIcons />
        </div>
    )
}

export default AppBackground
