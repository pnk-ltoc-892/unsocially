import { NavLink, useLocation } from 'react-router-dom'
import { Compass, House, LogOut, UserRound } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import AddPost from '../home/AddPost.jsx'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.jsx'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip.jsx'
import { toast } from '@/hooks/use-toast.js'
import { logOutUser } from '@/store/slices/authSlice.js'
import { avatar } from '@/config/index.js'
import { cn } from '@/lib/utils'


const navButtonClass = (active) => cn(
    'flex h-11 w-11 items-center justify-center rounded-xl transition-colors',
    active
        ? 'bg-white/15 text-white'
        : 'text-white/50 hover:bg-white/10 hover:text-white',
)

const Navbar = () => {
    const { user } = useSelector(state => state.auth);
    const profileTo = user?.username ? `/profile/user/${user.username}` : '/profile';

    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logOutUser())
            .unwrap()
            .catch((message) => {
                toast({
                    variant: "destructive",
                    title: "Could not sign you out",
                    description: message,
                });
            });
    }

    return (
        <TooltipProvider delayDuration={80}>
            <div className='flex h-full flex-col items-center px-2 py-5'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <NavLink
                            to="/home"
                            aria-label="unsocially home"
                            className='mb-8 flex h-11 w-11 items-center justify-center text-white transition-opacity hover:opacity-80'
                        >
                            <span className='font-brand text-[2.15rem] leading-none'>u</span>
                        </NavLink>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        unsocially
                    </TooltipContent>
                </Tooltip>

                <nav className='flex flex-1 flex-col items-center gap-2'>
                    <AddPost />

                    <NavItem to="/home" title="Home">
                        <House size={22} strokeWidth={1.75} />
                    </NavItem>

                    <NavItem to="/people" title="Explore">
                        <Compass size={22} strokeWidth={1.75} />
                    </NavItem>

                    <NavItem to={profileTo} title="Profile">
                        {user?.username ? (
                            <Avatar className='h-7 w-7'>
                                <AvatarImage src={user?.avatar || avatar} className='object-cover' />
                                <AvatarFallback className='text-xs'>
                                    {user.username[0]}
                                </AvatarFallback>
                            </Avatar>
                        ) : (
                            <UserRound size={22} strokeWidth={1.75} />
                        )}
                    </NavItem>
                </nav>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            aria-label="Log out"
                            onClick={handleLogout}
                            className='mt-auto flex h-11 w-11 items-center justify-center rounded-xl text-white/45 transition-colors hover:bg-red-500/10 hover:text-red-400'
                        >
                            <LogOut size={20} strokeWidth={1.75} />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                        Log out
                    </TooltipContent>
                </Tooltip>
            </div>
        </TooltipProvider>
    )
}


const NavItem = ({ to, title, children }) => {
    const { pathname } = useLocation();
    const active = pathname === to || (to !== '/home' && pathname.startsWith(`${to}/`));

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <NavLink
                    to={to}
                    aria-label={title}
                    aria-current={active ? 'page' : undefined}
                    className={navButtonClass(active)}
                >
                    {children}
                </NavLink>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
                {title}
            </TooltipContent>
        </Tooltip>
    )
}

export default Navbar
