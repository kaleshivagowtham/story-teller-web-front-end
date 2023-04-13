import NavBar from "../NavBar";
import FooterComponent from "../FooterComponent";

export default function Layout({children}) {

    return(
        <div>
            <NavBar />
                <main>{children}</main>
            <FooterComponent />
        </div>
    )
}