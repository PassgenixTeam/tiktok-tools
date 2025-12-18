import {
  Button,
  cn,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarProps,
} from "@heroui/react";
import { PlusIcon, SettingsIcon, TerminalIcon } from "lucide-react";
import { TikTokProfiles } from "../tiktok-profiles/tiktok-profiles";

function AppNavBar({ className, ...props }: NavbarProps) {
  return (
    <Navbar
      className={cn("shrink-0 bg-white/80 shadow-md", className)}
      maxWidth="full"
      {...props}
    >
      <NavbarBrand>
        <TerminalIcon />
        <p className="font-bold text-inherit">TIKTOK TOOLS</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <TikTokProfiles />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export { AppNavBar };
