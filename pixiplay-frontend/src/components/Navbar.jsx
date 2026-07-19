import "../styles/navbar.css";

function Navbar({ title = "Dashboard", username = "Player" }) {
        const user = JSON.parse(localStorage.getItem("user"));
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="navbar-logo">PixiPlay</h1>
            </div>
            <div className="navbar-center">
                <h2>{title}</h2>
            </div>
            <div className="navbar-right">
                <button className="notification-btn">
                    🔔
                </button>
                <div className="user-info">
                    <div className="avatar">
                        <img
                            src={user.avatarUrl}
                            alt={user.username}
                            className="profile-avatar"
                        />
                    </div>
                    <span>{user.username}</span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;