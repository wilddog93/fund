import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../redux/actions/authActions';

import CardProfile from '../../components/Cards/CardProfile';
import CardFormAccount from '../../components/Cards/Account/CardFormAccount';
import ModalPassword from '../../components/Modals/ModalPassword';
import { swalWithTWButton } from '../../components/Button/swalWithTWButton';

const Settings = (props) => {
    const { auth, getUser } = props;

    const [showModal, setShowModal] = useState(false);
    const modalHandler = () => setShowModal(!showModal);

    useEffect(() => {
        getUser()
    }, [getUser])

    if (auth.errorsUser) {
        swalWithTWButton.fire({
            icon: 'error',
            title: 'Ops!',
            text: auth.errorsUser
        })
    }

    return (
        <>
            {showModal ?
                <ModalPassword modalHandler={modalHandler} /> : null
            }
            <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                    <CardProfile auth={auth} setShowModal={setShowModal} />
                </div>
                <div className="w-full lg:w-8/12 mt-10 px-4">
                    <CardFormAccount auth={auth} />
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => {
            dispatch(userActions());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
