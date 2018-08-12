export const configuration = {
  routes: [
    { label: 'Dashboard', url: '/', icon: 'area-chart', sidebar: true },
    { label: 'Reservations', url: '/app/reservation', icon: 'book', sidebar: true, role: 'reservation:read' },
    { label: 'Devices', url: '/app/device', icon: 'desktop', sidebar: true, role: 'device:read' },
    { label: 'Room Reservations', url: '/app/room-reservation', icon: 'calendar', role: 'roomReservation:create', sidebar: true },
    { label: 'Rooms', url: '/app/room', icon: 'environment', role: 'room:read', sidebar: true },
    { label: 'Users', url: '/app/user', icon: 'team', sidebar: true },
    { label: 'Events', url: '/app/event', icon: 'schedule', sidebar: true, role: 'event:read' },
    { url: '/app/user/new', role: 'user:create' },
    { url: '/app/device/new', role: 'device:create' },
    { url: '/app/login' },
    { url: '/app/signup' }
  ]
};
