import React ,{useState} from 'react';
import './profileMenu.css'
import ClientsProfile from '../ClientsProfile';


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
    <img className='userPP' src={require('./../images/pp_simple.jpg')} alt="User Profile" />
    <div className='userInfo'>
        Name: {editingName ? (
            <input type="text" value={name} onChange={handleNameChange} />
        ) : (
            <>
                {name}
                <button onClick={handleEditName}>Edit</button>
            </>
        )}
        <br />
        ID: {userInfoProp[1]}<br />
        Level: {userInfoProp[2]}<br />
        Games Played: {userInfoProp[3]}<br />
        Winning Ratio: {userInfoProp[4]}<br />
        Joined Date: {userInfoProp[5]}
    </div>
    {editingName && <button onClick={handleSaveName}>Save</button>}
    </div>
  )
}

export default ProfileMenu;