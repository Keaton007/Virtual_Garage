import { ReactNode } from "react";

// components not made yet
// import { Logout } from "";



export default function VehiclesLayout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-gray-100">
            <main>
                {children}
            </main>
        </div>
    );
}