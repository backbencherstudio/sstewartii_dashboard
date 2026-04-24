interface StatsCardIconProps {
    className?: string;
}

const StatsCardIcon = {

    TotalUsersIcon: ({ className = "" }: StatsCardIconProps) => {
        return (
            <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            </svg>
        )
    },

    ActiveRidersIcon: ({ className = "" }: StatsCardIconProps) => {
        return (
            <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            </svg>
        )
    },

    TotalRevenueIcon: ({ className = "" }: StatsCardIconProps) => {
        return (
            <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            </svg>
        )
    },

    PendingOrdersIcon: ({ className = "" }: StatsCardIconProps) => {
        return (
            <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            </svg>
        )
    }

}

export default StatsCardIcon;
