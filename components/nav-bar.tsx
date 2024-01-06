"use client";
import {useCurrentUser} from "@/hooks/use-current-user";
import {usePathname} from "next/navigation";
import {MenuItems} from "@/data/menu-items"
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import UserMenu from "@/components/user/user-menu";

const NavBar = () => {
    const pathname = usePathname();
    const user = useCurrentUser()
    return (
        <nav className='flex items-center justify-between px-10 py-2 border-b-[1px] border-gray-100'>
            <div>
                <Link href='/'
                      className='text-cyan-700 hover:border-b-2 hover:border-b-cyan-700 px-1 transition-colors delay-75'>
                    ЭМК
                </Link>
            </div>
            <div className='flex items-center justify-between gap-12'>
                <ul className='flex items-center space-x-6'>
                    <li>
                        <Link href='/'
                              className={`hover:border-b-2 hover:border-b-cyan-700 px-1 transition-colors delay-75 ${pathname === '/' && 'text-cyan-700'}`}>
                            Главная
                        </Link>
                    </li>
                    {MenuItems.map((item, index) => {
                        if (item.auth && user && !item.children)
                            return (
                                <li key={index}>
                                    <Link href={item.link}
                                          className={`hover:border-b-2 hover:border-b-cyan-700 px-1 transition-colors delay-75 ${pathname === item.link && 'text-cyan-700'}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            )
                        else if (!item.auth && !user)
                            return (
                                <li key={index}>
                                    <Link href={item.link}
                                          className={`hover:border-b-2 hover:border-b-cyan-700 px-1 transition-colors delay-75 ${pathname === item.link && 'text-cyan-700'}`}>
                                        {item.name}
                                    </Link>
                                </li>
                            )
                        else if (item.auth && user && item.children)
                            return (
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        className={`focus-visible:outline-0 ${pathname.startsWith(item.link) && 'text-cyan-700'}`}>
                                        {item.name}
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {item.children.map((childrenItem, index) => {
                                            if (childrenItem.separator)
                                                return (
                                                    <DropdownMenuSeparator/>
                                                )
                                            return (
                                                <DropdownMenuItem key={index}>
                                                    <Link className={`${pathname == childrenItem.link && 'text-cyan-700'}`}
                                                          href={childrenItem.link}>
                                                        {childrenItem.name}
                                                    </Link>
                                                </DropdownMenuItem>
                                            )
                                        })}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )

                    })}
                </ul>
                {user && (
                    <UserMenu/>
                )}
            </div>
        </nav>
    )
}
export default NavBar