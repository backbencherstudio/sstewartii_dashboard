"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';

const orangeMarkerIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width: 28px; height: 28px;
      border-radius: 50%;
      background: rgba(251, 191, 36, 0.25);
      display: flex; align-items: center; justify-content: center;
    ">
      <div style="
        width: 16px; height: 16px;
        border-radius: 50%;
        background: #F59E0B;
        border: 2.5px solid #fff;
        box-shadow: 0 1px 4px rgba(0,0,0,0.18);
      "></div>
    </div>
  `,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
});

const serviceLocations: { position: [number, number]; name: string }[] = [
  { position: [23.8180, 90.4050], name: 'Mirpur' },
  { position: [23.8230, 90.4130], name: 'Pallabi' },
  { position: [23.8100, 90.4020], name: 'Kazipara' },
  { position: [23.8050, 90.4200], name: 'Shewrapara' },
  { position: [23.7980, 90.4100], name: 'Rayer Bazar' },
  { position: [23.8010, 90.4300], name: 'Dhanmondi' },
  { position: [23.8160, 90.4450], name: 'Gulshan' },
];

export default function ServiceArea() {
  const center: [number, number] = [23.8103, 90.4200];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Service Areas</h2>
        <Link
          href="#"
          className="text-sm font-medium text-amber-500 hover:text-amber-600 flex items-center gap-1"
        >
          View Map <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="h-[260px] w-full rounded-xl overflow-hidden">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          scrollWheelZoom={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
          />
          {serviceLocations.map((loc) => (
            <Marker key={loc.name} position={loc.position} icon={orangeMarkerIcon}>
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}