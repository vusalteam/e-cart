export type MenuItem = {
    name: string;
    link: string;
    auth?: boolean;
    children?: MenuItem[];
    icon?: string;
    separator?: boolean;
}
export const MenuItems:MenuItem[] = [
    {
        name: 'Авторизация',
        link: '/auth/sign-in',
    },
    {
        name: 'Пациенты',
        link: '/patients',
        auth : true,
    },
    {
        name: 'Группы',
        link: '/groups',
        auth: true,
    },
    {
        name: 'Отчеты',
        link: '/reports',
        auth: true,
        children: [
            {
                name: 'Манту/Энтеробиоз',
                link: '/reports/mantas-enterobizos',
            },
            {
                name: 'Возрастная сетка',
                link: '/reports/age',
            },
            {
                name: 'Заболеваемость',
                link: '/reports/morbidity',
            },
            {
                name: 'Полиомиелит',
                link: '/reports/poliomielit',
            },
            {
                name: 'План',
                link: '/reports/plane',
            },
        ],
    },
    {
        name: 'График',
        link: '/graph',
        auth: true,
    },

];