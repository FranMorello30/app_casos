/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

const menuApp: FuseNavigationItem[] = [
    {
        id: 'busqueda',
        title: 'Busqueda',
        tooltip : 'Busqueda ',
        type    : 'basic',
        icon: 'heroicons_outline:document-search',
        link: '/admin/busqueda',
    },
    {
        id: 'expediente',
        title: 'Crear Expediente',
        tooltip : 'Crear Expediente',
        type    : 'basic',
        icon: 'heroicons_outline:document-add',
        link: '/admin/expediente',
    },
    {
        id: 'configuracion',
        title: 'Configuración',
        tooltip : 'Configuración',
        type    : 'basic',
        icon: 'mat_solid:settings',
        link: '/admin/configuracion',
    },
    // {
    //     id: 'vehiculos',
    //     title: 'Vehiculos',
    //     type: 'basic',
    //     icon: 'mat_solid:directions_car',
    //     link: '/admin/vehiculos',
    // },
    // {
    //     id: 'inmuebles',
    //     title: 'Inmuebles',
    //     type: 'basic',
    //     icon: 'mat_solid:apartment',
    //     link: '/admin/inmuebles',
    // },
    // {
    //     id: 'armamentos',
    //     title: 'Armamentos',
    //     type: 'basic',
    //     icon: 'mat_solid:shield',
    //     link: '/admin/armamentos',
    // },
    // {
    //     id: 'expedientes',
    //     title: 'Expedientes',
    //     type: 'basic',
    //     icon: 'mat_solid:insert_drive_file',
    //     link: '/admin/expendientes',
    // },
    // {
    //     id: 'casos',
    //     title: 'Casos',
    //     type: 'basic',
    //     icon: 'mat_solid:folder',
    //     link: '/admin/casos',
    // },
    // {
    //     id: 'organizaciones',
    //     title: 'Organizaciones',
    //     type: 'basic',
    //     icon: 'mat_solid:account_tree',
    //     link: '/admin/organizaciones',
    // },

];

export const defaultNavigation: FuseNavigationItem[] = menuApp;
export const compactNavigation: FuseNavigationItem[] = menuApp;
export const futuristicNavigation: FuseNavigationItem[] = menuApp;
export const horizontalNavigation: FuseNavigationItem[] = menuApp;
