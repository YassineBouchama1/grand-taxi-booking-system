
import NavBar from "../ui/shared/navbar/NavBar";



export default function HomeLayout({ children }) {
    return (
<div>
      <NavBar/>
                {children}
      
</div>
    );
}
