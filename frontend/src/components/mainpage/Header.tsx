import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Settings, Menu } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

function Header({ setSidebarOpen }: { setSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }
  
  const toggleSidebar = () => {
    if (setSidebarOpen) {
      setSidebarOpen(prev => !prev)
    }
  }

  return (
    <header className="sticky top-0 bg-[#339AE6] flex justify-between items-center w-full px-6 py-4 border-b z-50">
      <ul className="flex w-full items-center justify-between">
        <li className="menu-element flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="md:hidden mr-2 text-white hover:bg-[#2589d5] hover:text-white"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="min-w-35 h-10 bg-[url('https://universitariadecolombia.edu.co/wp-content/uploads/2022/03/Logo_universitaria.png')] bg-cover bg-no-repeat bg-center" >
          </div>
          <div className="style-logo n2"></div>
          <div className="style-logo n3"></div>
        </li>
        <li className="menu-element">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt=""/>
                <AvatarFallback>
                  <span className="initials">{user?.nombre ? user.nombre.charAt(0) + (user.apellido ? user.apellido.charAt(0) : '') : 'AB'}</span>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>    
      </ul>
    </header>
  )
}

export default Header