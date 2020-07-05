import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormInput } from 'components/common';

interface EditItemProps {
    item: UserListItem;
}

const VenuesListItemEdit = ({ item }: EditItemProps) => {
    const { setValue, control, watch } = useForm();

    console.log(watch());

    return (
        <div className="list-item-edit">
            <form>
                <Controller
                    as={FormInput}
                    name="instagram"
                    label="instagram"
                    control={control}
                    defaultValue={item.instagram || ''}
                    setValue={setValue}
                />
                <Controller
                    as={FormInput}
                    isToggle={true}
                    name="only delivery"
                    label="only delivery"
                    type="checkbox"
                    control={control}
                    defaultValue={item.onlyDelivery}
                    setValue={setValue}
                />
                <Controller
                    as={FormInput}
                    isToggle={true}
                    name="only takeaway"
                    label="only takeaway"
                    type="checkbox"
                    control={control}
                    defaultValue={item.onlyTakeaway}
                    setValue={setValue}
                />
                <Controller
                    as={FormInput}
                    isToggle={true}
                    name="maybe closed"
                    label="maybe closed"
                    labelClassName="warning"
                    type="checkbox"
                    control={control}
                    defaultValue={item.maybeClosed}
                    setValue={setValue}
                />
            </form>
        </div>
    );
};

export default VenuesListItemEdit;
