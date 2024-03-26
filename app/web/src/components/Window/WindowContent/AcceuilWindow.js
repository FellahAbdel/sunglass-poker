// import './acceuilWindow.css'
import TextGlitch from '../../TextGlitch/TextGlitch.js';
import Button from "../../button/Button.tsx";
import { useAuth} from "../../AuthProvider";


const AcceuilWindow = ({onClickStartGame}) => {
    
    const {isLogged } = useAuth();


  return (
    <div className="AcceuilWindow">
        <TextGlitch
            children={"SunGlassPoker"}
            styleClass={"glitch-accueil"}
            glitchStyle={"glitchStyle-accueil"}
        />
        <Button
            styleClass={"btn-gameStart"}
            label={isLogged ? "Start Playing" : "Login to Play"}
            onClick={onClickStartGame}
        />
    </div>
  );
}

export default AcceuilWindow;