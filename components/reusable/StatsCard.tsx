interface StatsCardProps {
    color: string;
    title: string;
    value: number;
    update: string;
    icon: React.ReactNode;
  }
  
  
  
     const StatsCard: React.FC<StatsCardProps> = ({ color, title, value, update, icon }) => {
    return (
      <div className="flex flex-col w-full  relative overflow-hidden shadow-sm rounded-[var(--Other-Radius-md,8px)] border border-[color:var(--Color-Gray-100,#EDEDED)] [background:var(--BG-Linear,linear-gradient(180deg,#ECF1F8_0%,#FEFEFE_100%))]">
  
        {/* Top Section */}
        <div className="flex items-start gap-4 px-5 pt-4 pb-1 border-b border-[color:var(--Color-Gray-100,#EDEDED)]">
  
          {/* Left Indicator Bar (Added based on image) */}
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-[75%] w-1 rounded-r-sm`} style={{ backgroundColor: color }} />
  
          {/* Icon Container */}
          <div className="flex flex-col items-center justify-center rounded-full [background:var(--Primary-Linear,linear-gradient(136deg,#FFBB1C_0%,#E28611_100%))] p-2.5">
            {icon}
          </div>
  
          {/* Text Content */}
          <div className="flex flex-col gap-1.5 grow">
            <h3 className="text-[color:var(--Secondary-Text,#697586)] font-inter text-sm font-medium leading-[160%]">
              {title}
            </h3>
            <p className="text-[#071E27] font-inter text-4xl font-semibold leading-[124%] tracking-tight">
              {value}
            </p>
          </div>
        </div>
  
        {/* Bottom Footer */}
        <div className="flex items-center gap-2.5 px-5 py-3.5 bg-gray-50/10">
          <p className="text-[color:var(--Secondary-Text,#697586)] text-sm font-normal opacity-70">
            Update: {update}
          </p>
        </div>
      </div>
    );
  };

  export default StatsCard;