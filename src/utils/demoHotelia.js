import HotelImage from '../assets/img/hotel-1.png';
import Descubre1 from '../assets/img/descubreHL1.png';
import Descubre2 from '../assets/img/descubreHL2.png';
import Descubre3 from '../assets/img/descubreHL3.png';

const ROOMS_KEY = 'hotelia-demo-rooms-v1';

const roomImages = {
    hotel: HotelImage,
    doble: Descubre1,
    suite: Descubre2,
    ejecutiva: Descubre3,
};

export const defaultRooms = [
    {
        _id: '101',
        nombrehab: 'Habitación Deluxe',
        descripcion: 'Un espacio cómodo para descansar después de recorrer Bogotá, con los servicios esenciales para una estadía tranquila.',
        capacidad: 2,
        valornoche: 180000,
        camas: 1,
        cajafuerte: 'si',
        tv: 'si',
        wifi: 'si',
        nevera: 'si',
        banio: 'si',
        estado: 'Disponible',
        imageKey: 'hotel',
    },
    {
        _id: '204',
        nombrehab: 'Habitación Doble',
        descripcion: 'Pensada para viajes en pareja o con compañía, con distribución amplia y una experiencia práctica y acogedora.',
        capacidad: 4,
        valornoche: 220000,
        camas: 2,
        cajafuerte: 'si',
        tv: 'si',
        wifi: 'si',
        nevera: 'si',
        banio: 'si',
        estado: 'Disponible',
        imageKey: 'doble',
    },
    {
        _id: '305',
        nombrehab: 'Suite Hotelia',
        descripcion: 'Más espacio para estancias largas o viajes de trabajo, con una zona de descanso cómoda y servicios completos.',
        capacidad: 2,
        valornoche: 290000,
        camas: 1,
        cajafuerte: 'si',
        tv: 'si',
        wifi: 'si',
        nevera: 'si',
        banio: 'si',
        estado: 'Disponible',
        imageKey: 'suite',
    },
    {
        _id: '410',
        nombrehab: 'Ejecutiva Bogotá',
        descripcion: 'Habitación de trabajo con escritorio, buena iluminación y servicios pensados para una estancia productiva.',
        capacidad: 2,
        valornoche: 250000,
        camas: 1,
        cajafuerte: 'si',
        tv: 'si',
        wifi: 'si',
        nevera: 'no',
        banio: 'si',
        estado: 'En mantenimiento',
        imageKey: 'ejecutiva',
    },
];

export const demoUser = {
    name: 'Sofía Martínez',
    email: 'usuario@hotela.com',
    phone: '+57 300 555 0184',
    document: 'CC 1.024.***.***',
    city: 'Bogotá, Colombia',
    memberSince: '2026',
};

export const demoReservations = [
    {
        id: 'HTL-2409',
        roomId: '204',
        roomName: 'Habitación Doble',
        status: 'Confirmada',
        checkIn: '18 sep 2026',
        checkOut: '21 sep 2026',
        guests: 2,
        nights: 3,
        total: 660000,
    },
    {
        id: 'HTL-1906',
        roomId: '101',
        roomName: 'Habitación Deluxe',
        status: 'Completada',
        checkIn: '8 ago 2026',
        checkOut: '10 ago 2026',
        guests: 1,
        nights: 2,
        total: 360000,
    },
];

const cloneDefaults = () => defaultRooms.map((room) => ({ ...room }));

export const getRooms = () => {
    if (typeof window === 'undefined') return cloneDefaults();

    try {
        const stored = window.localStorage.getItem(ROOMS_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length) return parsed;
        }
    } catch (error) {
        console.warn('No fue posible leer el inventario demo.', error);
    }

    const seeded = cloneDefaults();
    window.localStorage.setItem(ROOMS_KEY, JSON.stringify(seeded));
    return seeded;
};

const saveRooms = (rooms) => {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms));
    }
    return rooms;
};

export const createRoom = (room) => {
    const rooms = getRooms();
    const roomId = String(room._id).trim();

    if (rooms.some((item) => String(item._id) === roomId)) {
        throw new Error('ROOM_EXISTS');
    }

    const nextRoom = {
        ...room,
        _id: roomId,
        capacidad: Number(room.capacidad),
        camas: Number(room.camas),
        valornoche: Number(room.valornoche),
        imageKey: room.imageKey || 'hotel',
    };

    saveRooms([...rooms, nextRoom]);
    return nextRoom;
};

export const updateRoom = (id, changes) => {
    const roomId = String(id);
    const rooms = getRooms();
    const updated = rooms.map((room) => (
        String(room._id) === roomId
            ? {
                ...room,
                ...changes,
                _id: roomId,
                capacidad: Number(changes.capacidad ?? room.capacidad),
                camas: Number(changes.camas ?? room.camas),
                valornoche: Number(changes.valornoche ?? room.valornoche),
            }
            : room
    ));

    saveRooms(updated);
    return updated.find((room) => String(room._id) === roomId);
};

export const deleteRoom = (id) => {
    const roomId = String(id);
    const rooms = getRooms().filter((room) => String(room._id) !== roomId);
    saveRooms(rooms);
    return rooms;
};

export const resetDemoRooms = () => saveRooms(cloneDefaults());

export const getRoomImage = (room) => {
    if (room?.imageData) return room.imageData;
    if (room?.imageKey && roomImages[room.imageKey]) return roomImages[room.imageKey];
    return HotelImage;
};

export const fileToDataUrl = (file) => new Promise((resolve, reject) => {
    if (!file) {
        resolve(null);
        return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
});

export const formatCOP = (value) => Number(value || 0).toLocaleString('es-CO');
