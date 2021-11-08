
import Input from "../../cp1-elements/el01-Input/Input";
import { TModal } from "../Modal/Modals";


type SignupFormErrorType = {
    email?: string
    password?: string
    confirmedPassword?: string
}

export type TSignupFormData = {
    email: string
    password: string
}

type TSignupProps = {
    revealModal: (modalType: TModal) => void
}

export const Signup = (props: TSignupProps) => {

    return (
        <>
            <h2 className="title">BECOME A MEMBER</h2>
            <h3 className="title">Become a Member — you'll enjoy exclusive deals, offers, invites and rewards.</h3>
            <form className="auth__signup__form" autoComplete={'off'}>
                <div className="auth__signup__fields">
                    <Input/>
                    <Input
                        type="password"
                    />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem reiciendis, veniam et fuga nemo itaque saepe modi hic nam deserunt praesentium corporis natus dolorem illo consequuntur neque id porro quae!
                    Mollitia vitae quos nesciunt saepe illo tempore. Sed tenetur corrupti quibusdam esse sequi provident ab perspiciatis soluta necessitatibus. Maiores, voluptatibus ratione. Consequuntur eveniet quia accusamus quisquam officia. Enim, ipsum! Deserunt?
                    Eius obcaecati possimus nulla dolore laboriosam? Laudantium optio nesciunt non esse, dolor ad accusamus ducimus sint corrupti praesentium, ipsa maiores tempora consequatur, dicta quod doloribus voluptatum harum unde! Ducimus, consectetur!
                    Dolor laudantium sit voluptatibus ipsam unde voluptatem! Praesentium inventore explicabo, mollitia eaque itaque nam autem a expedita officiis! Voluptatum placeat veniam quisquam, voluptatibus ad blanditiis eum nisi similique cum veritatis!
                    </p>
                    <a onClick={() => props.revealModal("login")}>Sign Up</a>
                    <Input
                        type="password"
                    />
                </div>
            </form>
        </>
    )
}