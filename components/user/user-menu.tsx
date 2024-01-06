import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import Link from "next/link";
import {LogoutButton} from "@/components/auth/logout-button";

const UserMenu = () => {
    return (
        <div className='flex items-center justify-center'>
            <DropdownMenu>
                <DropdownMenuTrigger className='focus-visible:outline-0'>
                    <Avatar className='w-[24px] h-[24px]'>
                        <AvatarImage width={24} height={24} src="https://github.com/shadcn.png"/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <Link href='/user/profile'>
                            Профиль
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href='/user/settings'>
                            Настройки
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <LogoutButton>Выйти</LogoutButton>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserMenu