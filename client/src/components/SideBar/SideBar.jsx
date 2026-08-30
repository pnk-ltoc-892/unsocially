import Navbar from './Navbar.jsx'

const SideBar = () => {
    return (
        <aside className='fixed inset-y-0 left-0 z-20 flex w-[4.5rem] flex-col border-r border-white/15 bg-black/55 backdrop-blur-xl'>
            <Navbar />
        </aside>
    )
}

export default SideBar
