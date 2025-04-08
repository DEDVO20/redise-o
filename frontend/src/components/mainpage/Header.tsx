import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Header() {
  return (
    <header className="sticky top-0 bg-[#339AE6] flex justify-between items-center w-full px-6 py-4 border-b z-100">
      <ul className="flex w-full items-center justify-between">
        <li className="menu-element flex gap-2">
          <div className=" min-w-35 h-10 bg-[url('https://universitariadecolombia.edu.co/wp-content/uploads/2022/03/Logo_universitaria.png')] bg-cover bg-no-repeat bg-center" >
          </div>
          <div className="style-logo n2"></div>
          <div className="style-logo n3"></div>
        </li>
        <li className="menu-element">
          <Avatar>
            <AvatarImage src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" alt=""/>
            <AvatarFallback>
              <span className="initials">AB</span>
            </AvatarFallback>
          </Avatar>
        </li>    
      </ul>
    </header>
  )
}

export default Header