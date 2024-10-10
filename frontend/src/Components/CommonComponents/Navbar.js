import React, { useState, useEffect } from "react";
import {
    Button,
    Dropdown,
    Space,
    Avatar,
    ConfigProvider,
    Grid,
    theme,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const { useToken } = theme;
const { useBreakpoint } = Grid;

function NavBarUser() {
    const { token } = useToken();
    const screens = useBreakpoint();
    const [user, setUser] = useState(null);
    const defaultProfilePic =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1200px-Windows_10_Default_Profile_Picture.svg.png";

    useEffect(() => {
        const fetchUserByID = async () => {
            const userJSON = localStorage.getItem("currentUser");

            if (!userJSON) {
                console.error("User not found in localStorage.");
                return;
            }

            const user = JSON.parse(userJSON);
            setUser(user);

            if (!user || !user.userID) {
                console.error("Invalid user object or userID not found.");
                return;
            }
        };

        fetchUserByID();
    }, []);

    function logout() {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("selectedCategory");
        window.location.href = "/login";
    }

    const styles = {
        header: {
            backgroundColor: token.colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 1000,
            backdropFilter: "blur(10px)", // Glossy effect
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparent background
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)", // Slight shadow for glossy effect
            borderBottom: `${token.lineWidth}px ${token.lineType} ${token.colorSplit}`,
        },
        logo: {
            display: "block",
            height: screens.md ? token.sizeLG * 1.5 : token.sizeLG,
            fontSize: screens.md ? "1.5rem" : "1.2rem",
            color: "#27ae61",
            fontWeight: "bold",
        },
    };

    const items = [
        {
            label: (
                <a href="/profile">My Account</a>
            ),
            key: "0",
        },
        user &&
            user.userType === "Admin" && {
                label: (
                    <a href="/admin">Admin</a>
                ),
                key: "admin",
            },
        {
            label: (
                <a href="/login" onClick={logout}>Log Out</a>
            ),
            key: "2",
        },
    ];

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#27ae61",
                },
            }}
        >
            <nav style={styles.header} className="sticky top-0 bg-white shadow-lg z-50">
                <div className="container mx-auto flex justify-between items-center px-4 py-4">
                    <Link to="/" className="text-lg font-bold">
                        <span style={styles.logo}>FarmCart</span>
                    </Link>
                    {user ? (
                        <Dropdown menu={{ items }}>
                            <a onClick={(e) => e.preventDefault()} className="flex items-center space-x-2">
                                <Avatar size={30} src={user.profilePic || defaultProfilePic} />
                                <span>{user.username}</span>
                                <Icon icon="gridicons:dropdown" />
                            </a>
                        </Dropdown>
                    ) : (
                        <Space>
                            {screens.md && (
                                <Link to="/login">
                                    <Button className="text-lg">Log in</Button>
                                </Link>
                            )}
                            <Link to="/signup">
                                <Button className="text-lg">Sign up</Button>
                            </Link>
                        </Space>
                    )}
                </div>
            </nav>
        </ConfigProvider>
    );
}

export default NavBarUser;
