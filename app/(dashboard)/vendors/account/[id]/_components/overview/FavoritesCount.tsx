import React from 'react';

// Reusable type for the favorite users
interface FavoriteUser {
  id: string;
  name: string;
  followerSince: string;
  orders: number;
  avatar: string;
}

const favorites: FavoriteUser[] = [
  { id: '1', name: 'Aiony Haust', followerSince: 'Oct 2023', orders: 15, avatar: '/avatar1.jpg' },
  { id: '2', name: 'Ralph Edwards', followerSince: 'Oct 2023', orders: 12, avatar: '/avatar2.jpg' },
  { id: '3', name: 'Floyd Miles', followerSince: 'Oct 2023', orders: 4, avatar: '/avatar3.jpg' },
  { id: '4', name: 'Eleanor Pena', followerSince: 'Oct 2023', orders: 4, avatar: '/avatar4.jpg' },
  { id: '1', name: 'Aiony Haust', followerSince: 'Oct 2023', orders: 15, avatar: '/avatar1.jpg' },
  { id: '2', name: 'Ralph Edwards', followerSince: 'Oct 2023', orders: 12, avatar: '/avatar2.jpg' },
  { id: '3', name: 'Floyd Miles', followerSince: 'Oct 2023', orders: 4, avatar: '/avatar3.jpg' },
  { id: '4', name: 'Eleanor Pena', followerSince: 'Oct 2023', orders: 4, avatar: '/avatar4.jpg' },
];

export default function FavoritesCountCard() {
  return (
    <div className="flex  flex-col items-start gap-4 self-stretch bg-white shadow-[0_0_16px_0_rgba(0,0,0,0.06)]  rounded-2xl h-[418px] overflow-y-auto w-full container-scrollbar">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-2 sticky top-0 bg-white z-10 px-5 pt-6">
        <h2 className="section-title">Favorites count</h2>
        <span className="text-[#2A3542] font-lora text-2xl font-bold leading-[130%] tracking-[0.48px]">756</span>
      </div>

      {/* List Container - Add 'overflow-y-auto' if you have many items */}
      <div className="w-full flex flex-col gap-3 px-5 pb-6">
        {favorites.map((user) => (
          <div 
            key={user.id} 
            className="border border-[#ECEFF3] [background:var(--background-normal-25,#F6F8FA)] px-4 py-3 rounded-2xl border-solid flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-12 h-12 rounded-full object-cover" 
              />
              <div>
                <h3 className="font-semibold text-[#1A1A2E] text-sm mb-1">{user.name}</h3>
                <p className="text-xs text-[#697586]">Follower since {user.followerSince}</p>
              </div>
            </div>
            
            <div className="px-3 py-1.5 bg-[#FFF7E6] text-[#2A3542] font-medium text-sm border border-[#FFBB1C]/20 border-solid rounded-full">
              {user.orders} Orders
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}