import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import { Menu, ConfigProvider } from "antd";

// Helper function to create a menu item object
function getItem(label, key, icon) {
    return {
        key,
        icon,
        label,
    };
}

// Array of menu items for the sidebar
const items = [
    getItem("Dashboard", "/admin", <Icon icon="material-symbols:dashboard-outline" />),
    getItem("Manage Events", "/admin/manage-ticket", <Icon icon="ic:outline-inventory" />),
    getItem("Manage Bookings", "/admin/manage-Booking", <Icon icon="akar-icons:book" />),
];

// Keys of submenu items that have children, used to manage open states
const rootSubmenuKeys = ["sub1", "sub2", "sub3"];

function SideMenu() {
    const location = useLocation();  // Get current location (URL path)
    const navigate = useNavigate();  // Navigate programmatically to different routes
    const [openKeys, setOpenKeys] = useState(["/admin"]);  // State for open submenus
    const [selectedKeys, setSelectedKeys] = useState("/admin");  // State for selected menu item

    // Update selected menu item based on current URL path
    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
    }, [location.pathname]);

    // Handle submenu opening/closing
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <div className="Admin_SideMenu bg-white h-full shadow-lg flex flex-col">
            {/* Sidebar "Farmcart" logo text */}
            <div className="p-6 text-center">
                <h1 className="text-3xl font-bold text-green-600 tracking-wide">Farmcart</h1>
            </div>

            {/* Sidebar Menu */}
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#27ae61",  // Primary color accent
                    },
                    components: {
                        Menu: {
                            iconSize: "24px",   // Size of the icons
                            itemHeight: "48px", // Height of each menu item
                            subMenuItemBg: "#f5f5f5",  // Background color for submenu items
                        },
                    },
                }}
            >
                <Menu
                    mode="inline"  // Vertical sidebar layout
                    openKeys={openKeys}  // Open submenu keys
                    selectedKeys={[selectedKeys]}  // Selected menu item key
                    onOpenChange={onOpenChange}  // Submenu open/close handler
                    onClick={(item) => navigate(item.key)}  // Navigate on menu item click
                    style={{
                        width: 256,  // Sidebar width
                        border: "none",  // Remove default border
                        fontSize: "16px",  // Font size for menu items
                    }}
                    items={items}  // Array of menu items
                    theme="light"
                />
            </ConfigProvider>
        </div>
    );
}

export default SideMenu;
