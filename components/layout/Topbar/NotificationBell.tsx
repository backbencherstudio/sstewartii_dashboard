import { Bell } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


const fakeNotifications = [
    {
        id: 1,
        title: 'New Vendor Application',
        description: 'Taco Truck submitted business documents.',
    },

    {
        id: 2,
        title: 'New Vendor Application',
        description: 'Taco Truck submitted business documents.',
    },
];

export default function NotificationBell() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="relative p-2 rounded-full border border-white/10 bg-gray-100 hover:border-[#F6D642]/40 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#EB3D4D] rounded-full border-2 border-white" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-100 p-0 shadow-lg rounded-xl overflow-hidden mt-2" align="end">
                {/* Prevent the menu from closing when clicking tabs */}
                <Tabs defaultValue="all" className="w-full border" onSelect={(e) => e.preventDefault()}>
                    <div className="border-b bg-[#F6F8FA] px-4 pt-4">
                        <h3 className="font-semibold text-lg mb-3">Notification <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">8</span></h3>
                        <TabsList className="w-fit justify-start bg-transparent p-0 h-auto gap-4">
                            <TabsTrigger value="all" className="border-0 data-[state=active]:border-b-2 data-[state=active]:border-orange-400 rounded-none p-0 pb-1 shadow-none px-2  data-[state=active]:shadow-none data-[state=active]:shadow-transparent [&[data-state='active']]:shadow-none data-[state=active]:bg-transparent">All</TabsTrigger>
                            <TabsTrigger value="unread" className="border-0 data-[state=active]:border-b-2 data-[state=active]:border-orange-400 rounded-none p-0 pb-1 shadow-none px-2  data-[state=active]:shadow-none data-[state=active]:shadow-transparent [&[data-state='active']]:shadow-none data-[state=active]:bg-transparent">Unread</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="all" className="max-h-[300px] overflow-y-auto m-0 gap-0">
                        {/* Map your ALL notifications here */}
                        <div className="border-b">
                            {fakeNotifications.map((notification) => (
                                <div key={notification.id} className="p-4 hover:bg-gray-50 flex items-start gap-3 border-b">
                                    <div className="bg-emerald-100 p-2 rounded-full">
                                        <span className="text-xl">🏪</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{notification.title}</p>
                                        <p className="text-xs text-gray-500">{notification.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="unread" className="max-h-[300px] overflow-y-auto m-0">
                        {/* Map your UNREAD notifications here */}
                        <div className="border-b">Only Unread Items</div>
                    </TabsContent>
                </Tabs>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}