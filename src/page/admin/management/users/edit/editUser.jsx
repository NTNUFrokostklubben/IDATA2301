import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {ProviderFormSkeleton} from "../../providers/edit/providerEdit";
import {getRoles, getUser, putUser, uploadImage} from "../../../../../utils/commonRequests";
import "./editUser.css"
import {Role} from "../../../../../utils/Classes/commonClasses";
import {Skeleton} from "@mui/material";

function UserEditForm({user, roles}) {

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

        if (imageChanged) {
            uploadImage(image).then(r => {
                data.set("profilePicture", r);

                handleFormSubmission(data).then(navigate("../"));
            })
        } else {
            data.set("profilePicture", user.profilePicture);
            handleFormSubmission(data).then(navigate("../"));
        }
    }

    async function handleFormSubmission(data) {
        const value = Object.fromEntries(data.entries());
        value.role = buildRoleObject();

        const response = await putUser(user.id, value);
        return response
    }


    function handleChangeImage(image) {
        const img = new Image();
        img.src = URL.createObjectURL(image[0]);

        setUserImage(img);
        setImageChanged(true);
    }

    function buildRoleObject() {

        const role = [];
        const checkboxes = document.querySelectorAll("input[name='role']:checked");
        checkboxes.forEach((checkbox) => {
            role.push(new Role(checkbox.id, checkbox.value));
        })

        return role;
    }

    return (

        <form className="userInfo-form" action={"http://localhost:3000/user"} onSubmit={handleSubmit}>
            <section id="user-info">
                <input id={"id"} name={"id"} type={"number"} hidden={true} value={user.id}/>
                <div className="input-wrapper"><label htmlFor="user-email"><p>Email</p></label>
                    <input disabled={true} type="text" id="user-email" name="email" defaultValue={user.email}
                           required/>
                </div>

                <div className="input-wrapper"><label htmlFor="user-name"><p>Full Name</p></label>
                    <input disabled={true} type="text" id="user-name" name="name" defaultValue={user.name}
                           required/>
                </div>


                <div className={"imageUpload-wrapper"}>
                    <div className="input-wrapper">
                        <label htmlFor="user-image"><p>Provider Image</p></label>
                        <input type="file" id="user-image" name="profilePicture" accept={"image/png,image/jpeg,image/webp"}
                               onChange={(e) => handleChangeImage(e.target.files)} required={imageChanged}/>
                    </div>
                    <img className={"img-preview"} src={userImage.src}/>
                </div>

                <div id={"user-roles"} name={"role"}>
                    <label htmlFor="user-roles"><p>User Roles</p></label>
                    {/*    Multiple checkboxes, 1 for each role. Should pre-check the roles that the user already has. roles property has same structure as the role parameter on user*/}

                    {roles.map((role) =>
                        (
                            <div className={"role-checkbox"} key={role.id}>
                                <input type="checkbox" id={role.id} name={"role"} value={role.name}
                                       defaultChecked={user.role.some(r => JSON.stringify(r) === JSON.stringify(role))}/>
                                <label htmlFor={role}><p>{role.name}</p></label>
                            </div>
                        )
                    )}
                </div>

                <div className={"input-wrapper"}>
                    <label htmlFor={"active"}><p>Active</p></label>
                    <input type="checkbox" id={"active"} name={"active"}
                           defaultChecked={user.active} value={true}/>
                </div>


                <button type="submit" className={"button cta-button"}><p>Update User</p></button>
            </section>
        </form>

    )
}

function UserFormSkeleton() {
    return (
        <div className={"user-edit-skeleton"} id="user-info">

            <div className="input-wrapper"><label htmlFor="user-email">Email</label>
                <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/>
            </div>
            <div className="input-wrapper"><label htmlFor="user-name">Full Name</label>
                <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/>
            </div>

            <div className="input-wrapper">
                <label htmlFor="course-image">Course Image</label>
                <Skeleton className={"loader"} variant={"rectangular"} height={"2.5rem"} width={"100%"}/>
            </div>


            <div className={"input-wrapper"} name={"role"}>
                <label htmlFor="user-roles">User Roles</label>
                <Skeleton className={"loader"} variant={"rectangular"} height={"20rem"} width={"100%"}/>
            </div>



            <div className={"input-wrapper"}>
                <label htmlFor={"visibility"}>Visibility</label>
                <Skeleton className={"loader"} variant={"rectangular"} width={"2.5rem"} height={"2.5rem"}/>
            </div>


            <Skeleton variant={"rectangular"} className={"cta-button"} height={"2.5rem"}
                      sx={"background-color: var(--cta)"}/>

        </div>
    )
}

export default function UserEdit(userId) {
    const {id} = useParams();

    const [user, setUser] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchUser(),
                    fetchRoles()
                ])
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
            setUser(u);
        } catch (e) {
            throw new Error(e);
        }
    }

    async function fetchRoles() {
        try {
            const r = await getRoles();
            setRoles(r)
        } catch (e) {
            throw new Error(e);
        }
    }

    return (
        <div className="userInfo-page">
            <h2>Edit User</h2>
            {loading ? <UserFormSkeleton/> : <UserEditForm user={user} roles={roles}/>}
        </div>
    )
}