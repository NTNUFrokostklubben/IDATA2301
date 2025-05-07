import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ProviderFormSkeleton} from "../../providers/edit/providerEdit";
import {getUser, putUser, uploadImage} from "../../../../../utils/commonRequests";
import "./editUser.css"

function UserEditForm({user}) {

    const navigate = useNavigate();
    const [userImage, setUserImage] = useState([])
    const [imageChanged, setImageChanged] = useState(false)

    useEffect(() => {
        const img = new Image();
        img.src = user.profilePicture;
        setUserImage(img);
    }, [user.profilePicture]);

    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const image = data.get("profilePicture")
        const active = data.get("active")
        console.log(active)


        if (imageChanged) {
            console.log(image)
            uploadImage(image).then(r => {
                data.set("profilePicture", r);

                handleFormSubmission(data).then(alert("Submitted form")).then(navigate(-1));
            })
        } else {
            data.set("profilePicture", user.profilePicture);
            handleFormSubmission(data).then(alert("Submitted form")).then(navigate(-1));
        }
    }

    async function handleFormSubmission(data) {
        const value = Object.fromEntries(data.entries());
        console.log(value)
        const response = await putUser(user.id, value);
        return response
    }




    function handleChangeImage(image) {
        console.log(image)
        const img = new Image();
        img.src = URL.createObjectURL(image[0]);

        setUserImage(img);
        setImageChanged(true);
    }

    return (

        <form className="userInfo-form" action={"http://localhost:3000/user"} onSubmit={handleSubmit}>
            <section id="user-info">
                <input id={"id"} name={"id"} type={"number"} hidden={true} value={user.id}/>
                <div className="input-wrapper"><label htmlFor="user-email">Email</label>
                    <input disabled={true} type="text" id="user-email" name="email" defaultValue={user.email}
                           required/>
                </div>

                <div className="input-wrapper"><label htmlFor="user-name">Email</label>
                    <input disabled={true} type="text" id="user-name" name="name" defaultValue={user.name}
                           required/>
                </div>


                <div className={"imageUpload-wrapper"}>
                    <div className="input-wrapper">
                        <label htmlFor="user-image">Provider Image</label>
                        <input type="file" id="user-image" name="profilePicture"
                               onChange={(e) => handleChangeImage(e.target.files)} required={imageChanged}/>
                    </div>
                    <img className={"img-preview"} src={userImage.src}/>
                </div>

                <div className={"input-wrapper"}>
                    <label htmlFor={"active"}>Active</label>
                    <input type="checkbox" id={"active"} name={"active"}
                           defaultChecked={user.active} value={true}/>
                </div>


                <button type="submit" className={"button cta-button"}>Update User</button>
            </section>
        </form>

    )
}

function UserFormSkeleton() {
    return (
        <>
            <h1>XD</h1>
        </>
    )
}

export default function UserEdit(userId) {
    const {id} = useParams();

    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchUser();
                setLoading(false);
            } catch (e) {
                console.error(e)
            }
        }

        fetchData();
    }, []);

    async function fetchUser() {
        try {
            const u = await getUser(id);
            console.log(u);
            setUser(u);
        } catch (e) {
            throw new Error(e);
        }
    }

    return (
        <div className="userInfo-page">
            <h2>Edit Provider</h2>
            {loading ? <UserFormSkeleton/> : <UserEditForm user={user}/>}
        </div>
    )
}