import React, { ReactElement, useEffect, useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { ExtendedUserData } from 'api/user';
import { FormInput } from 'components/common';
import FormHeader from './UserFormHeader';
import ProfileActions from './UserFormActions';
import { emailPattern } from 'utils/validation/patterns';
import illustration from 'images/watering-plant.svg';
import './style.css';

interface UserFormProps {
    user: ExtendedUserData;
    emptyEmail: boolean;
    updateData(data: ExtendedUserData): void;
}

const UserInfoForm = ({ user, emptyEmail, updateData }: UserFormProps): ReactElement => {
    const [isEditingMode, setEditingMode] = useState<boolean>(false);
    const [isEmailEmpty, setEmailEmpty] = useState<boolean>(emptyEmail);
    const { setValue, errors, control, watch, trigger, clearErrors } = useForm();
    const history = useHistory();

    const setFormValues = useCallback(
        (userData: ExtendedUserData): void => {
            Object.keys(userData).forEach((key) => {
                setValue(key, userData[key]);
            });
        },
        [setValue],
    );

    useEffect(() => {
        setFormValues(user);
    }, [user, setFormValues]);

    const getEmailError = (): string | undefined => {
        if (errors.email) {
            return errors.email['message'];
        }
        if (isEmailEmpty || user.username === user.email) {
            setValue('email', '');
            return 'Please fill in your email';
        }
    };

    const clearEmailError = (): void => {
        if (errors.email) {
            clearErrors();
        }
        if (isEmailEmpty) {
            setEmailEmpty(false);
        }
    };

    const handleStartEdit = () => {
        clearEmailError();
        setEditingMode(true);
    };

    const handleSaveEdit = async (): Promise<void> => {
        const isFormValid = await trigger();
        if (isFormValid) {
            const updatedValues = watch();
            const isDirty = Object.keys(updatedValues).some(
                (key) => user[key] !== updatedValues[key],
            );
            if (isDirty) {
                await updateData({ ...user, ...updatedValues });
            }
            history.push('/profile');
            setEditingMode(false);
        }
    };

    const handleCancelEdit = () => {
        setFormValues(user);
        setEditingMode(false);
        if (Object.keys(errors).length !== 0) {
            clearErrors();
        }
        setEmailEmpty(emptyEmail);
    };

    return (
        <div className="user-info-content">
            <div className="user-info-content-main">
                <FormHeader user={user} />
                <form className="user-info-form" autoComplete="off" onSubmit={() => false}>
                    <Controller
                        as={FormInput}
                        name="email"
                        label="email"
                        control={control}
                        disabled={!isEditingMode}
                        rules={{
                            required: 'Required field',
                            pattern: { value: emailPattern, message: 'Invalid email' },
                        }}
                        errorMessage={getEmailError()}
                        onFocus={clearEmailError}
                        setValue={setValue}
                    />
                    <Controller
                        as={FormInput}
                        name="location"
                        label="location"
                        control={control}
                        disabled={!isEditingMode}
                        setValue={setValue}
                    />
                    <ProfileActions
                        isEditingMode={isEditingMode}
                        handleStartEdit={handleStartEdit}
                        handleSave={handleSaveEdit}
                        handleCancel={handleCancelEdit}
                    />
                </form>
            </div>
            <div className="user-info-placeholder">
                <img src={illustration} alt="person planting tree" />
            </div>
        </div>
    );
};

export default UserInfoForm;
