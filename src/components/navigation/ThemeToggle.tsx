import { useTheme } from "@/lib/tanstack/router/use-theme";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {

}

export function ThemeToggle({}:ThemeToggleProps){
const {theme,updateTheme} = useTheme()
return (
 <div className='flex flex-col items-center justify-center'>
    <button onClick={() => updateTheme(theme === "light" ? "dark" : "light")} className="btn">
        {theme === "light" ?<Moon/>:<Sun/>}
    </button>
 </div>
);
}
