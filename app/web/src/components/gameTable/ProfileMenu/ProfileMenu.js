import React ,{useState} from 'react';
import './profileMenu.css'
import ClientsProfile from '../PlayersProfile/PlayersProfile.js';
import Button from '../Button/Button.tsx';


const ProfileMenu = ({userInfoProp}) => {

    const [editingName, setEditingName] = useState(false);
    const [name, setName] = useState(userInfoProp[0]);

    const handleEditName = () => {
        setEditingName(true);
    }

    const handleSaveName = () => {
        // Here you would typically update the user's name in your state or database
        setEditingName(false);
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

  return (
    <div className="profileMenu">
        <img className='userPP' src={require('./../../assets/images/pp_simple.jpg')} alt="User Profile" />
        
        <div className='userInfo'>
            <span>
            Name: {editingName ? (
                <input className="input-editName" type="text" value={name} onChange={handleNameChange} />
            ) : (   <>
                        {name}
                    </>
            )}
            </span>
            ID: {userInfoProp[1]}<br />
            Level: {userInfoProp[2]}<br />
            Games Played: {userInfoProp[3]}<br />
            Winning Ratio: {userInfoProp[4]}<br />
            Joined Date: {userInfoProp[5]}
        </div>

        <div className='container-btns'>
            <Button style={"btn-edit"} children={"Edit"} onClick={handleEditName}/>
            {editingName && <Button style={"btn-save"} onClick={handleSaveName} children={"save"}/>}
        </div>
    </div>
  )
}

export default ProfileMenu;