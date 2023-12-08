
document.addEventListener("DOMContentLoaded", () => {
    const logout = document.getElementById("logoutButton");


    if (logout) {
        logout.addEventListener("click", async (event) => {
            event.preventDefault();
            console.log("logout clicked");

            try {
                const response = await fetch("/api/homeRoutes/logout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                });
                console.log("logout response", response);

                if (response.ok) {
                    console.log("logout successful");
                } else {
                    alert(response.statusText);
                }
            } catch (err) {
                console.error("logout error", err);
            }
        });
    }
});

