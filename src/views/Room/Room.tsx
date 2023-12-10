import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@components/navbar";
import Sidebar from "@components/sidebar";
import Dashboard from "@views/admin/default/index";

const webSocket = new WebSocket("ws://localhost:5183/api/WebSocket/connect/1");

export default function Room(props: { [x: string]: any }) {
  const { ...rest } = props;

  const [open, setOpen] = useState(window.innerWidth > 1200);
  const [currentRoute, setCurrentRoute] = useState("Main Dashboard");

  useEffect(() => {
    const handleOpenNavbar = () => {
      window.innerWidth > 1200 && setOpen(true);
    };
    window.addEventListener("resize", handleOpenNavbar);
    return () => window.removeEventListener("resize", handleOpenNavbar);
  }, []);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    webSocket.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    webSocket.onmessage = (message) => {
      console.log(message);
    };
    webSocket.onclose = () => {
      console.log("WebSocket Client Disconnected");
    };
  }, []);

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto flex h-24 min-h-[84vh] flex-col gap-3 p-2 pt-10 md:pr-2">
              <Dashboard roomId={id} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
