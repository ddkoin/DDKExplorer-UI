import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard', title: 'Dashboards', icon: 'mdi mdi-gauge', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },{
        path: '', title: 'Forms & Tables', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    },{
        path: '', title: 'Tables', icon: 'mdi mdi-table', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/tables/basictable', title: 'Basic Tables', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/tables/smarttable', title: 'Smart Tables', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/tables/datatable', title: 'Data Tables', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ]
    },{
        path: '', title: 'Charts & Icons', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    },{
        path: '', title: 'Charts', icon: 'mdi mdi-chart-arc', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/charts/chartjs', title: 'Chart Js', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/charts/chartistjs', title: 'Chartist Js', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ]
    },{
        path: '', title: 'Pages', icon: '', class: 'nav-small-cap', label: '', labelClass: '', extralink: true, submenu: []
    },{
        path: '', title: 'Authentication', icon: 'mdi mdi-lock', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/authentication/login', title: 'Login', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/authentication/signup', title: 'Register', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/authentication/404', title: '404', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            
        ]
    }
     
];

