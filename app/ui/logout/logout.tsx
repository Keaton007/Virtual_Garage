<button onClick={() => {
    fetch("/api/auth/logout", { method: "POST" })
        .then(() => window.location.href = "/login");
}}>Logout</button>
