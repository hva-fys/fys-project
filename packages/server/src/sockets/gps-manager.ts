import * as SocketIO from 'socket.io';

export class GPSManager {
    private socket: SocketIO.Namespace;
    private updateInterval: NodeJS.Timer;
    private attrs: any;
    private plane: any;

    /**
     * GPS Manager.
     *
     * @param {SocketIO.Server} socket
     */
    constructor(socket: SocketIO.Server) {
        this.socket = socket.of('/gps-manager');

        this.attrs = {
            time: {
                start: 0,
                end: 1000 * 60 * 60 * 2,
            },
            speed: {
                max: 7200,
                min: 0,
            },
            start: {
                lat: 49.2715000,
                lon: -121.7493500,
            },
            end: {
                lat: 49.18258,
                lon: -121.75441,
            },
            dist: 0,
        };

        this.plane = {
            lat: 0,
            lon: 0,

            dist: 0,
            height: 0,
            speed: 0,
        };

        this.distance();

        this.run();
    }

    /**
     * Distance.
     */
    private distance(): void {
        const {start, end} = this.attrs;

        const R = 6371; // Radius earth.

        const dLat = (end.lat - start.lat) * Math.PI / 180;
        const dLon = (end.lon - start.lon) * Math.PI / 180;

        const a = 0.5 - Math.cos(dLat) / 2 + Math.cos(start.lat * Math.PI / 180) * Math.cos(start.lat * Math.PI / 180) * (1 - Math.cos(dLon)) / 2;

        this.attrs.dist = R * 2 * Math.asin(Math.sqrt(a));
    }

    /**
     * Update GPS.
     */
    private update(): void {
        const {time} = this.attrs;
        if (time.start >= time.end) {
            clearInterval(this.updateInterval);
        }
        else {
            this.attrs.time.start += 100;
        }


    }

    /**
     * Start GPS Faker.
     */
    private run(): void {
        this.updateInterval = setInterval(() => this.update(), 100);
    }
}