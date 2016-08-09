export const navigationRoutes = [
  { label: 'Dashboard', url: '/', icon: 'ion-planet' },
  { label: 'Reservations', url: '/app/reservation', icon: 'ion-folder' },
  { label: 'Devices', url: '/app/device', icon: 'ion-videocamera', admin: true },
  { label: 'Users', url: '/app/user', icon: 'ion-ios-people' , admin: true },
];

export const nonSidebarRoutes = [
  '/app/login',
  '/app/signup',
];
