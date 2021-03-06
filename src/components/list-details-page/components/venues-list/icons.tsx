import React, { ReactElement } from 'react';
import { FiBox, FiShoppingBag, FiAlertTriangle } from 'react-icons/fi';
import { Tooltip } from 'components/common';

interface IconWithTooltipProps {
    icon: ReactElement;
    tooltipText: string;
}

const IconWithTooltip = ({ icon, tooltipText }: IconWithTooltipProps): ReactElement => {
    return (
        <div className="list-item-icon-container">
            {icon}
            <Tooltip top="-10px" right="30px">
                {tooltipText}
            </Tooltip>
        </div>
    );
};

export const DeliveryIcon = () => {
    const text = 'only delivery from the restaurant';
    const icon = <FiBox className="list-item-icon negative" />;
    return <IconWithTooltip icon={icon} tooltipText={text} />;
};

export const TakeawayIcon = () => {
    const text = 'only takeaway from the restaurant';
    const icon = <FiShoppingBag className="list-item-icon positive" />;
    return <IconWithTooltip icon={icon} tooltipText={text} />;
};

export const ClosedIcon = () => {
    const text = 'place may be closed';
    const icon = <FiAlertTriangle className="list-item-icon negative" />;
    return <IconWithTooltip icon={icon} tooltipText={text} />;
};
