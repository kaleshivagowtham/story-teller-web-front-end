import styles from '../../../styles/Home.module.css';
import NavBar from "../NavBar";
import FooterComponent from "../FooterComponent";
import {closeNotification} from '../../features/modal/notificationSlice';
import { useDispatch} from 'react-redux';

export default function Layout({children}) {

    const dispatch = useDispatch();

    const allHandlers = () => {
        dispatch(closeNotification());
    }

    return(
        <div onCLick={e => (allHandlers)} >
            <NavBar />
                    <main>{children}</main>
            <FooterComponent />
        </div>
    )
}